"use client"

import React from 'react'
import { Filter, LayoutGrid, Archive, FileText } from "lucide-react"
import { DragDropContext } from "@hello-pangea/dnd"
import Column from "./Column"
import FilterSystem from "./FilterSystem"
import { type Column as ColumnType, type Card, type Activity } from "@/types/board"
import { useState } from "react"
import CardModal from "./CardModal"
import ConfirmDialog from "@/components/shared/ConfirmDialog"
import ActivityLog from "./ActivityLog"
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts"
import { sortCards } from "@/utils/sortCards"
import SortMenu from "./SortMenu"
import ArchivedCards from "./ArchivedCards"
import CardTemplates from "./CardTemplates"

type Priority = 'low' | 'medium' | 'high' | undefined;

const initialColumns: ColumnType[] = [
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "1",
        title: "Update user dashboard",
        labels: [
          { id: "1", name: "Frontend", color: "bg-purple-500" },
          { id: "2", name: "High Priority", color: "bg-red-500" }
        ]
      }
    ]
  },
  {
    id: "current",
    title: "Current Sprint",
    cards: [
      {
        id: "2",
        title: "Implement authentication flow",
        labels: [
          { id: "3", name: "Backend", color: "bg-blue-500" }
        ]
      }
    ]
  },
  {
    id: "progress",
    title: "In Progress",
    cards: [
      {
        id: "3",
        title: "Design system updates",
        labels: [
          { id: "4", name: "Design", color: "bg-green-500" }
        ]
      }
    ]
  },
  {
    id: "hold",
    title: "On Hold",
    cards: [
      {
        id: "4",
        title: "API documentation",
        labels: [
          { id: "5", name: "Documentation", color: "bg-orange-500" }
        ]
      }
    ]
  }
]

const availableLabels = [
  { id: "1", name: "Frontend", color: "bg-purple-500" },
  { id: "2", name: "High Priority", color: "bg-red-500" },
  { id: "3", name: "Backend", color: "bg-blue-500" },
  { id: "4", name: "Design", color: "bg-green-500" },
  { id: "5", name: "Documentation", color: "bg-orange-500" },
]

interface DragResult {
  destination: {
    droppableId: string;
    index: number;
  } | null;
  source: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
}

export default function Board() {
  const [columns, setColumns] = useState(initialColumns)
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingCard, setEditingCard] = useState<{card?: Card, columnId: string} | null>(null)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([])
  const [confirmDialog, setConfirmDialog] = useState<{
    show: boolean
    cardId?: string
    action: 'delete' | 'duplicate'
  }>({ show: false, action: 'delete' })
  const [activities, setActivities] = useState<Activity[]>([])
  const [showActivityLog, setShowActivityLog] = useState(false)
  const [sortConfig, setSortConfig] = useState<{
    field: string
    direction: 'asc' | 'desc'
  } | null>(null)
  const [showArchived, setShowArchived] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  const handleOnDragEnd = (result: DragResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceColumn = columns.find(col => col.id === source.droppableId)
    const destColumn = columns.find(col => col.id === destination.droppableId)

    if (!sourceColumn || !destColumn) return

    const card = sourceColumn.cards.find(card => card.id === draggableId)
    if (!card) return

    const newColumns = columns.map(column => {
      if (column.id === source.droppableId) {
        return {
          ...column,
          cards: column.cards.filter(card => card.id !== draggableId)
        }
      }
      if (column.id === destination.droppableId) {
        const newCards = [...column.cards]
        newCards.splice(destination.index, 0, card)
        return {
          ...column,
          cards: newCards
        }
      }
      return column
    })

    setColumns(newColumns)
  }

  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    setActivities(prev => [{
      ...activity,
      id: `activity-${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, ...prev])
  }

  const clearFilters = () => {
    setShowFilters(false)
    setSearchTerm("")
    setSelectedLabels([])
    setSelectedPriorities([])
  }

  const toolbarProps = {
    onAddCard: () => setEditingCard({ columnId: columns[0].id }),
    onSearch: () => setShowFilters(true),
    onClearFilters: clearFilters,
    onEscape: () => {
      setShowFilters(false)
      setEditingCard(null)
      setShowActivityLog(false)
    },
  }

  useKeyboardShortcuts(toolbarProps)

  const handleCardSave = (cardData: Partial<Card>) => {
    if (!editingCard) return

    const newCard: Card = {
      id: editingCard.card?.id || `card-${Date.now()}`,
      title: cardData.title || "Untitled",
      description: cardData.description,
      labels: cardData.labels || [],
      attachments: editingCard.card?.attachments || [],
      priority: cardData.priority,
      dueDate: cardData.dueDate,
      isArchived: false,
    }

    setColumns(prev => prev.map(column => {
      if (column.id === editingCard.columnId) {
        if (editingCard.card) {
          addActivity({
            cardId: newCard.id,
            type: 'update',
            description: `Updated "${newCard.title}"`,
          })
          return {
            ...column,
            cards: column.cards.map(card => 
              card.id === editingCard.card?.id ? newCard : card
            )
          }
        } else {
          addActivity({
            cardId: newCard.id,
            type: 'create',
            description: `Created "${newCard.title}"`,
          })
          return {
            ...column,
            cards: [...column.cards, newCard]
          }
        }
      }
      return column
    }))
  }

  const handleDeleteCard = (cardId: string) => {
    const card = columns.flatMap(col => col.cards).find(c => c.id === cardId)
    if (card) {
      addActivity({
        cardId,
        type: 'delete',
        description: `Deleted "${card.title}"`,
      })
    }
    setConfirmDialog({
      show: true,
      cardId,
      action: 'delete'
    })
  }

  const handleArchiveCard = (cardId: string) => {
    const card = columns.flatMap(col => col.cards).find(c => c.id === cardId)
    if (card) {
      addActivity({
        cardId,
        type: 'archive',
        description: `Archived "${card.title}"`,
      })
      setColumns(prev => prev.map(column => ({
        ...column,
        cards: column.cards.map(card => 
          card.id === cardId
            ? { ...card, isArchived: true }
            : card
        )
      })))
    }
  }

  const handleRestoreCard = (cardId: string) => {
    const card = columns.flatMap(col => col.cards).find(c => c.id === cardId)
    if (card) {
      addActivity({
        cardId,
        type: 'update',
        description: `Restored "${card.title}" from archive`,
      })
      setColumns(prev => prev.map(column => ({
        ...column,
        cards: column.cards.map(card => 
          card.id === cardId
            ? { ...card, isArchived: false }
            : card
        )
      })))
    }
  }

  const handleUseTemplate = (template: Partial<Card>) => {
    setEditingCard({
      columnId: columns[0].id,
      card: {
        id: `card-${Date.now()}`,
        title: template.title || "",
        description: template.description,
        labels: template.labels || [],
        checklist: template.checklist || [],
        attachments: [],
        comments: [],
      } as Card
    })
  }

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortConfig({ field, direction })
  }

  const filteredAndSortedColumns = columns.map(column => {
    let processedCards = column.cards.filter(card => {
      if (card.isArchived) return false

      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        card.title.toLowerCase().includes(searchLower) ||
        card.description?.toLowerCase().includes(searchLower)

      const matchesLabels = 
        selectedLabels.length === 0 ||
        card.labels.some(label => selectedLabels.includes(label.id))

      const matchesPriorities =
        selectedPriorities.length === 0 ||
        (card.priority && selectedPriorities.includes(card.priority))

      return matchesSearch && matchesLabels && matchesPriorities
    })

    if (sortConfig) {
      processedCards = sortCards(processedCards, sortConfig.field as 'title' | 'priority' | 'dueDate', sortConfig.direction as 'asc' | 'desc')
    }

    return {
      ...column,
      cards: processedCards
    }
  })

  return (
    <div className="flex-1 overflow-x-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Project Board</h1>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1.5 bg-white/10 rounded hover:bg-white/20">
                <LayoutGrid size={16} />
                <span>Board View</span>
              </button>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-white/10 rounded hover:bg-white/20"
              >
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <SortMenu onSort={handleSort} />
              <button 
                onClick={() => setShowArchived(true)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-white/10 rounded hover:bg-white/20"
              >
                <Archive size={16} />
                <span>Archived</span>
              </button>
            </div>
          </div>
          <button 
            onClick={() => setShowTemplates(true)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-[#579DFF] rounded hover:bg-[#579DFF]/90"
          >
            <FileText size={16} />
            <span>Templates</span>
          </button>
        </div>

        {showFilters && (
          <FilterSystem 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedLabels={selectedLabels}
            onLabelChange={setSelectedLabels}
            selectedPriorities={selectedPriorities}
            onPriorityChange={setSelectedPriorities}
            availableLabels={availableLabels}
            onClearFilters={clearFilters}
          />
        )}
        
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {filteredAndSortedColumns.map((column) => (
              <Column 
                key={column.id} 
                column={column}
                onAddCard={() => setEditingCard({ columnId: column.id })}
                onEditCard={(card) => setEditingCard({ card, columnId: column.id })}
                onDeleteCard={handleDeleteCard}
                onArchiveCard={handleArchiveCard}
              />
            ))}
          </div>
        </DragDropContext>

        {editingCard && (
          <CardModal
            card={editingCard.card}
            onClose={() => setEditingCard(null)}
            onSave={handleCardSave}
            onDelete={handleDeleteCard}
            availableLabels={availableLabels}
          />
        )}

        {confirmDialog.show && (
          <ConfirmDialog
            title="Delete Card"
            message="Are you sure you want to delete this card? This action cannot be undone."
            confirmLabel="Delete"
            onConfirm={() => {
              if (confirmDialog.cardId) {
                handleDeleteCard(confirmDialog.cardId)
              }
              setConfirmDialog({ show: false, action: 'delete' })
            }}
            onCancel={() => setConfirmDialog({ show: false, action: 'delete' })}
            isDestructive
          />
        )}

        {showArchived && (
          <ArchivedCards
            cards={columns.flatMap(col => col.cards)}
            onClose={() => setShowArchived(false)}
            onRestore={handleRestoreCard}
          />
        )}

        {showTemplates && (
          <CardTemplates
            onClose={() => setShowTemplates(false)}
            onUseTemplate={handleUseTemplate}
          />
        )}
      </div>

      <div className="flex">
        <div className="flex-1">
          {/* ... existing board content ... */}
        </div>
        
        {showActivityLog && (
          <div className="w-80 border-l border-gray-700 p-4 overflow-y-auto">
            <ActivityLog activities={activities} />
          </div>
        )}
      </div>
    </div>
  )
} 
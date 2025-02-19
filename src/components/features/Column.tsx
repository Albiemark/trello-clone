"use client"

import { Plus } from "lucide-react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import Card from "./Card"
import { type Column as ColumnType, type Card as CardType } from "@/types/board"

interface ColumnProps {
  column: {
    id: string
    title: string
    cards: Array<{
      id: string
      title: string
      description?: string
      labels?: Array<{ id: string; name: string; color: string }>
      priority?: 'low' | 'medium' | 'high'
      dueDate?: string
      attachments?: string[]
      isArchived?: boolean
    }>
  }
  onAddCard: () => void
  onEditCard: (card: any) => void
  onDeleteCard: (cardId: string) => void
  onArchiveCard: (cardId: string) => void
}

export default function Column({ column, onAddCard, onEditCard, onDeleteCard, onArchiveCard }: ColumnProps) {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-[#101204] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">{column.title}</h3>
          <button
            onClick={() => onAddCard()}
            className="p-1 hover:bg-white/10 rounded"
          >
            <Plus size={16} />
          </button>
        </div>

        <Droppable droppableId={column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3 min-h-[200px]"
            >
              {column.cards.length === 0 ? (
                <div className="text-sm text-gray-400 text-center py-4">
                  No cards yet
                </div>
              ) : (
                column.cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={snapshot.isDragging ? 'opacity-50' : ''}
                        onClick={() => onEditCard(card)}
                      >
                        <Card 
                          card={card}
                          onDelete={onDeleteCard}
                          onArchive={onArchiveCard}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
} 
"use client"

import { Plus } from "lucide-react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import Card from "./Card"
import { type Column as ColumnType } from "@/types/board"

interface ColumnProps {
  column: ColumnType
  onAddCard: () => void
  onEditCard: (card: Card) => void
  onDeleteCard: (cardId: string) => void
  onArchiveCard: (cardId: string) => void
}

export default function Column({ column, onAddCard, onEditCard, onDeleteCard, onArchiveCard }: ColumnProps) {
  return (
    <div className="flex-shrink-0 w-[300px] bg-black/30 rounded-lg">
      <div className="p-3 flex items-center justify-between">
        <h3 className="font-medium">{column.title}</h3>
        <span className="text-sm text-gray-400">{column.cards.length}</span>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2 space-y-2 min-h-[200px] ${
              snapshot.isDraggingOver ? 'bg-white/5' : ''
            }`}
          >
            {column.cards.map((card, index) => (
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
            ))}
            {provided.placeholder}
            
            <button 
              onClick={onAddCard}
              className="w-full p-2 flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-white/10 rounded"
            >
              <Plus size={16} />
              <span>Add a card</span>
            </button>
          </div>
        )}
      </Droppable>
    </div>
  )
} 
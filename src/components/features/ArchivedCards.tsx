"use client"

import { Archive, X, RefreshCw } from "lucide-react"
import { type Card } from "@/types/board"
import { formatDistanceToNow } from "date-fns"

interface ArchivedCardsProps {
  cards: Card[]
  onClose: () => void
  onRestore: (cardId: string) => void
}

export default function ArchivedCards({ cards, onClose, onRestore }: ArchivedCardsProps) {
  const archivedCards = cards.filter(card => card.isArchived)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1D2125] rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Archive size={20} />
            <h2 className="text-xl font-semibold">Archived Cards</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <X size={20} />
          </button>
        </div>

        {archivedCards.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No archived cards</p>
        ) : (
          <div className="space-y-3">
            {archivedCards.map(card => (
              <div
                key={card.id}
                className="flex items-center justify-between p-3 bg-black/30 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{card.title}</h3>
                  {card.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {card.labels.map(label => (
                        <span
                          key={label.id}
                          className={`px-2 py-0.5 text-xs rounded ${label.color}`}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onRestore(card.id)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded flex items-center space-x-1"
                >
                  <RefreshCw size={16} />
                  <span>Restore</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 
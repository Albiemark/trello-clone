"use client"

import { CheckSquare, Square, Trash2 } from "lucide-react"
import { useState } from "react"
import { type ChecklistItem } from "@/types/board"

interface ChecklistProps {
  items: ChecklistItem[]
  onChange: (items: ChecklistItem[]) => void
}

export default function Checklist({ items, onChange }: ChecklistProps) {
  const [newItemText, setNewItemText] = useState("")

  const addItem = () => {
    if (!newItemText.trim()) return
    
    onChange([
      ...items,
      {
        id: `item-${Date.now()}`,
        text: newItemText.trim(),
        isComplete: false,
      }
    ])
    setNewItemText("")
  }

  const toggleItem = (itemId: string) => {
    onChange(
      items.map(item =>
        item.id === itemId
          ? { ...item, isComplete: !item.isComplete }
          : item
      )
    )
  }

  const deleteItem = (itemId: string) => {
    onChange(items.filter(item => item.id !== itemId))
  }

  const progress = items.length
    ? Math.round((items.filter(item => item.isComplete).length / items.length) * 100)
    : 0

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center">
          <CheckSquare size={16} className="mr-2" />
          Checklist
        </h3>
        <span className="text-sm text-gray-400">{progress}%</span>
      </div>

      <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#579DFF] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-start group">
            <button
              onClick={() => toggleItem(item.id)}
              className="p-1 hover:bg-white/10 rounded"
            >
              {item.isComplete ? (
                <CheckSquare size={16} className="text-[#579DFF]" />
              ) : (
                <Square size={16} />
              )}
            </button>
            <span className={`flex-1 text-sm px-2 ${
              item.isComplete ? 'line-through text-gray-400' : ''
            }`}>
              {item.text}
            </span>
            <button
              onClick={() => deleteItem(item.id)}
              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          placeholder="Add an item..."
          className="flex-1 bg-black/30 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#579DFF]"
        />
        <button
          onClick={addItem}
          disabled={!newItemText.trim()}
          className="px-3 py-1.5 bg-[#579DFF] rounded hover:bg-[#579DFF]/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Add
        </button>
      </div>
    </div>
  )
} 
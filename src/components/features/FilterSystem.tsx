"use client"

import { Search, X, Tag, Calendar, Flag } from "lucide-react"
import { type Label, type Card } from "@/types/board"

interface FilterSystemProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedLabels: string[]
  onLabelChange: (labelIds: string[]) => void
  selectedPriorities: Card['priority'][]
  onPriorityChange: (priorities: Card['priority'][]) => void
  availableLabels: Label[]
  onClearFilters: () => void
}

const priorityColors = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
}

export default function FilterSystem({ 
  searchTerm, 
  onSearchChange,
  selectedLabels,
  onLabelChange,
  selectedPriorities,
  onPriorityChange,
  availableLabels,
  onClearFilters
}: FilterSystemProps) {
  const toggleLabel = (labelId: string) => {
    onLabelChange(
      selectedLabels.includes(labelId)
        ? selectedLabels.filter(id => id !== labelId)
        : [...selectedLabels, labelId]
    )
  }

  const togglePriority = (priority: Card['priority']) => {
    if (!priority) return
    onPriorityChange(
      selectedPriorities.includes(priority)
        ? selectedPriorities.filter(p => p !== priority)
        : [...selectedPriorities, priority]
    )
  }

  return (
    <div className="p-4 bg-[#1D2125] border-b border-gray-700">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter cards..."
              className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#579DFF]"
            />
          </div>
          <button 
            className="flex items-center space-x-1 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20"
            onClick={onClearFilters}
          >
            <X size={16} />
            <span>Clear All</span>
          </button>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Tag size={16} className="mr-2" />
              Filter by Labels
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableLabels.map(label => (
                <button
                  key={label.id}
                  onClick={() => toggleLabel(label.id)}
                  className={`px-3 py-1 rounded-full text-sm ${label.color} ${
                    selectedLabels.includes(label.id)
                      ? 'ring-2 ring-white'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {label.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Flag size={16} className="mr-2" />
              Filter by Priority
            </h3>
            <div className="flex space-x-2">
              {(['low', 'medium', 'high'] as const).map((priority) => (
                <button
                  key={priority}
                  onClick={() => togglePriority(priority)}
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    selectedPriorities.includes(priority)
                      ? `${priorityColors[priority]} ring-2 ring-current`
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
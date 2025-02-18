"use client"

import { ArrowDownAZ, ArrowUpAZ, Calendar, Flag } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface SortMenuProps {
  onSort: (field: string, direction: 'asc' | 'desc') => void
}

export default function SortMenu({ onSort }: SortMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    onSort(field, direction)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-1.5 bg-white/10 rounded hover:bg-white/20"
      >
        <ArrowDownAZ size={16} />
        <span>Sort</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-[#1D2125] rounded-lg shadow-lg border border-gray-700 py-1 z-10">
          <div className="px-3 py-2 text-xs text-gray-400 font-medium">Sort by</div>
          
          <button
            onClick={() => handleSort('priority', 'desc')}
            className="w-full px-3 py-2 text-sm text-left hover:bg-white/10 flex items-center"
          >
            <Flag size={16} className="mr-2" />
            Priority (High to Low)
          </button>
          
          <button
            onClick={() => handleSort('dueDate', 'asc')}
            className="w-full px-3 py-2 text-sm text-left hover:bg-white/10 flex items-center"
          >
            <Calendar size={16} className="mr-2" />
            Due Date (Earliest first)
          </button>
          
          <button
            onClick={() => handleSort('title', 'asc')}
            className="w-full px-3 py-2 text-sm text-left hover:bg-white/10 flex items-center"
          >
            <ArrowUpAZ size={16} className="mr-2" />
            Title (A to Z)
          </button>
          
          <button
            onClick={() => handleSort('title', 'desc')}
            className="w-full px-3 py-2 text-sm text-left hover:bg-white/10 flex items-center"
          >
            <ArrowDownAZ size={16} className="mr-2" />
            Title (Z to A)
          </button>
        </div>
      )}
    </div>
  )
} 
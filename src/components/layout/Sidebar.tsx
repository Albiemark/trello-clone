"use client"

import { Trello, Users, Settings, Table, Calendar } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-[260px] min-h-screen bg-[#1D2125] border-r border-gray-700 p-4">
      <nav className="space-y-2">
        <button className="w-full flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded text-left">
          <Trello size={16} />
          <span>Boards</span>
        </button>
        <button className="w-full flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded text-left">
          <Users size={16} />
          <span>Members</span>
        </button>
        <button className="w-full flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded text-left">
          <Settings size={16} />
          <span>Workspace settings</span>
        </button>
        <button className="w-full flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded text-left">
          <Table size={16} />
          <span>Table</span>
        </button>
        <button className="w-full flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded text-left">
          <Calendar size={16} />
          <span>Calendar</span>
        </button>
      </nav>
    </aside>
  )
} 
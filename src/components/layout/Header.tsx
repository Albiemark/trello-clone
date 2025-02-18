"use client"

import { Search, Star, Clock, Layout, Plus } from "lucide-react"

export default function Header() {
  return (
    <header className="h-11 bg-[#1D2125] border-b border-gray-700 flex items-center px-4">
      <nav className="flex items-center space-x-4 text-sm">
        <button className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded">
          <Layout size={16} />
          <span>Workspaces</span>
        </button>
        <button className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded">
          <Clock size={16} />
          <span>Recent</span>
        </button>
        <button className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded">
          <Star size={16} />
          <span>Starred</span>
        </button>
        <button className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded">
          <Layout size={16} />
          <span>Templates</span>
        </button>
        <button className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded">
          <Plus size={16} />
          <span>Create</span>
        </button>
      </nav>
      <div className="ml-auto flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search"
            className="bg-white/10 rounded pl-8 pr-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#579DFF]"
          />
        </div>
      </div>
    </header>
  )
} 
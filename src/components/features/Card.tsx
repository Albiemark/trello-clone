"use client"

import React from 'react'
import { MoreHorizontal, Paperclip, Trash2, Copy, Archive, Flag, Calendar } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { formatDistanceToNow } from 'date-fns'
import { type Card as CardType } from "@/types/board"
import ChartAttachment from "./ChartAttachment"
import Image from 'next/image'

interface CardProps {
  card: CardType
  onDelete?: (cardId: string) => void
  onDuplicate?: (cardId: string) => void
  onArchive?: (cardId: string) => void
}

const priorityColors = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
}

export default function Card({ card, onDelete, onDuplicate, onArchive }: CardProps) {
  if (card.isArchived) return null

  return (
    <div className="bg-[#1D2125] p-3 rounded shadow-sm hover:bg-[#1D2125]/80">
      <div className="flex items-start justify-between">
        <h4 className="text-sm font-medium">{card.title}</h4>
        <div className="flex items-center space-x-1">
          {onDuplicate && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onDuplicate(card.id)
              }}
              className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
            >
              <Copy size={16} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onDelete(card.id)
              }}
              className="p-1 hover:bg-white/10 rounded text-red-400 hover:text-red-300"
            >
              <Trash2 size={16} />
            </button>
          )}
          {onArchive && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onArchive(card.id)
              }}
              className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
            >
              <Archive size={16} />
            </button>
          )}
          <button className="p-1 hover:bg-white/10 rounded">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      
      {card.description && (
        <div className="mt-2 text-sm text-gray-300 prose-sm prose-invert">
          <ReactMarkdown>
            {card.description.length > 100 
              ? card.description.slice(0, 100) + '...'
              : card.description
            }
          </ReactMarkdown>
        </div>
      )}
      
      {card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {card.labels.map((label) => (
            <span
              key={label.id}
              className={`px-2 py-0.5 text-xs rounded ${label.color}`}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-2 flex items-center space-x-3 text-sm">
        {card.priority && (
          <div className={`flex items-center ${priorityColors[card.priority]}`}>
            <Flag size={14} className="mr-1" />
            <span className="capitalize">{card.priority}</span>
          </div>
        )}
        
        {card.dueDate && (
          <div className={`flex items-center ${
            new Date(card.dueDate) < new Date() ? 'text-red-400' : 'text-gray-400'
          }`}>
            <Calendar size={14} className="mr-1" />
            <span>{formatDistanceToNow(new Date(card.dueDate), { addSuffix: true })}</span>
          </div>
        )}
      </div>
      
      {card.attachments?.map((attachment) => (
        <div key={attachment.id} className="mt-2">
          {attachment.type === 'chart' && <ChartAttachment />}
          {attachment.type === 'image' && (
            <Image 
              src={attachment.url}
              alt="Attachment"
              width={320}
              height={240}
              layout="responsive"
              className="w-full h-32 object-cover rounded-lg"
            />
          )}
        </div>
      ))}
      
      {card.attachments && card.attachments.length > 0 && (
        <div className="mt-2 flex items-center text-gray-400 text-sm">
          <Paperclip size={14} className="mr-1" />
          <span>{card.attachments.length}</span>
        </div>
      )}
    </div>
  )
} 
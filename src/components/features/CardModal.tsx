"use client"

import { X, Paperclip, Tag, Eye, EyeOff, Calendar, Flag } from "lucide-react"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { type Card, type Label, type ChecklistItem, type Comment } from "@/types/board"
import Checklist from "./Checklist"
import Comments from "./Comments"

interface CardModalProps {
  card?: Card
  onClose: () => void
  onSave: (card: Partial<Card>) => void
  onDelete?: (cardId: string) => void
  availableLabels: Label[]
}

const priorityColors = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
}

export default function CardModal({ 
  card, 
  onClose, 
  onSave, 
  onDelete,
  availableLabels 
}: CardModalProps) {
  const [title, setTitle] = useState(card?.title || "")
  const [description, setDescription] = useState(card?.description || "")
  const [selectedLabels, setSelectedLabels] = useState<Label[]>(card?.labels || [])
  const [showPreview, setShowPreview] = useState(false)
  const [priority, setPriority] = useState<Card['priority']>(card?.priority)
  const [dueDate, setDueDate] = useState(card?.dueDate || "")
  const [checklist, setChecklist] = useState<ChecklistItem[]>(card?.checklist || [])
  const [comments, setComments] = useState<Comment[]>(card?.comments || [])

  const handleSave = () => {
    onSave({
      title,
      description,
      labels: selectedLabels,
      priority,
      dueDate: dueDate || undefined,
      checklist,
      comments,
    })
    onClose()
  }

  const toggleLabel = (label: Label) => {
    setSelectedLabels(prev => 
      prev.find(l => l.id === label.id)
        ? prev.filter(l => l.id !== label.id)
        : [...prev, label]
    )
  }

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      text,
      userId: "current-user", // In a real app, get from auth
      userName: "Current User", // In a real app, get from auth
      createdAt: new Date().toISOString(),
    }
    setComments([...comments, newComment])
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1D2125] rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card title"
            className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#579DFF] rounded px-2 py-1 w-full"
          />
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Description</h3>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white"
              >
                {showPreview ? (
                  <>
                    <EyeOff size={16} />
                    <span>Hide Preview</span>
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    <span>Show Preview</span>
                  </>
                )}
              </button>
            </div>
            {showPreview ? (
              <div className="w-full min-h-[8rem] bg-black/30 rounded-lg p-3 prose prose-invert">
                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description... (Markdown supported)"
                className="w-full h-32 bg-black/30 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#579DFF]"
              />
            )}
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Flag size={16} className="mr-2" />
                Priority
              </h3>
              <div className="flex space-x-2">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`px-3 py-1 rounded-full text-sm capitalize ${
                      priority === p
                        ? `${priorityColors[p]} ring-2 ring-current`
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Calendar size={16} className="mr-2" />
                Due Date
              </h3>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-black/30 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#579DFF]"
                min={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Tag size={16} className="mr-2" />
              Labels
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableLabels.map(label => (
                <button
                  key={label.id}
                  onClick={() => toggleLabel(label)}
                  className={`px-3 py-1 rounded-full text-sm ${label.color} ${
                    selectedLabels.find(l => l.id === label.id)
                      ? 'ring-2 ring-white'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {label.name}
                </button>
              ))}
            </div>
          </div>

          <Checklist
            items={checklist}
            onChange={setChecklist}
          />

          <Comments
            comments={comments}
            onAddComment={handleAddComment}
          />
        </div>

        <div className="mt-6 flex justify-between">
          {onDelete && card && (
            <button
              onClick={() => {
                onDelete(card.id)
                onClose()
              }}
              className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded"
            >
              Delete Card
            </button>
          )}
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#579DFF] rounded hover:bg-[#579DFF]/90"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 
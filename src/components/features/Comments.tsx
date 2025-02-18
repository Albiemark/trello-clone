"use client"

import { MessageSquare, Send } from "lucide-react"
import { useState } from "react"
import { type Comment } from "@/types/board"
import { formatDistanceToNow } from "date-fns"

interface CommentsProps {
  comments: Comment[]
  onAddComment: (text: string) => void
}

export default function Comments({ comments, onAddComment }: CommentsProps) {
  const [newComment, setNewComment] = useState("")

  const handleSubmit = () => {
    if (!newComment.trim()) return
    onAddComment(newComment.trim())
    setNewComment("")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center">
        <MessageSquare size={16} className="mr-2" />
        Comments
      </h3>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#579DFF] flex items-center justify-center">
              <span className="text-sm font-medium">
                {comment.userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline space-x-2">
                <span className="font-medium text-sm">{comment.userName}</span>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-gray-300 mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Write a comment..."
          className="flex-1 bg-black/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#579DFF]"
        />
        <button
          onClick={handleSubmit}
          disabled={!newComment.trim()}
          className="p-2 text-[#579DFF] hover:bg-[#579DFF]/10 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
} 
"use client"

import { FileText, Plus, X } from "lucide-react"
import { useState } from "react"
import { type Card } from "@/types/board"

interface CardTemplatesProps {
  onClose: () => void
  onUseTemplate: (template: Partial<Card>) => void
}

const templates: Partial<Card>[] = [
  {
    title: "Bug Report",
    description: "## Description\n\n## Steps to Reproduce\n\n## Expected Behavior\n\n## Actual Behavior",
    labels: [
      { id: "bug", name: "Bug", color: "bg-red-500" }
    ],
    checklist: [
      { id: "1", text: "Reproduce issue", isComplete: false },
      { id: "2", text: "Document environment", isComplete: false },
      { id: "3", text: "Add screenshots", isComplete: false }
    ]
  },
  {
    title: "Feature Request",
    description: "## Overview\n\n## User Story\nAs a [type of user], I want [goal] so that [benefit]\n\n## Acceptance Criteria",
    labels: [
      { id: "feature", name: "Feature", color: "bg-green-500" }
    ],
    checklist: [
      { id: "1", text: "Design review", isComplete: false },
      { id: "2", text: "Technical spec", isComplete: false },
      { id: "3", text: "Implementation", isComplete: false },
      { id: "4", text: "Testing", isComplete: false }
    ]
  }
]

export default function CardTemplates({ onClose, onUseTemplate }: CardTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const handleUseTemplate = () => {
    if (selectedTemplate === null) return
    onUseTemplate(templates[selectedTemplate])
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1D2125] rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <FileText size={20} />
            <h2 className="text-xl font-semibold">Card Templates</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {templates.map((template, index) => (
            <button
              key={index}
              onClick={() => setSelectedTemplate(index)}
              className={`p-4 rounded-lg text-left border ${
                selectedTemplate === index
                  ? 'border-[#579DFF] bg-[#579DFF]/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <h3 className="font-medium mb-2">{template.title}</h3>
              <div className="text-sm text-gray-400">
                {template.description?.split('\n')[0]}
              </div>
              {template.labels && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.labels.map(label => (
                    <span
                      key={label.id}
                      className={`px-2 py-0.5 text-xs rounded ${label.color}`}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleUseTemplate}
            disabled={selectedTemplate === null}
            className="px-4 py-2 bg-[#579DFF] rounded hover:bg-[#579DFF]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
          >
            <Plus size={16} />
            <span>Use Template</span>
          </button>
        </div>
      </div>
    </div>
  )
} 
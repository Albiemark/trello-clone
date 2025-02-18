"use client"

import { AlertTriangle } from "lucide-react"

interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  isDestructive?: boolean
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = false,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1D2125] rounded-lg w-full max-w-md p-6">
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-full ${isDestructive ? 'bg-red-500/10' : 'bg-orange-500/10'}`}>
            <AlertTriangle size={24} className={isDestructive ? 'text-red-500' : 'text-orange-500'} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-300 mb-6">{message}</p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded hover:bg-white/10"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 rounded ${
                  isDestructive 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-[#579DFF] hover:bg-[#579DFF]/90'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
"use client"

import { Clock, Archive, Edit, Trash2, MoveRight } from 'lucide-react'
import { type Activity } from '@/types/board'
import { formatDistanceToNow } from 'date-fns'

interface ActivityLogProps {
  activities: Activity[]
}

const activityIcons = {
  create: Edit,
  update: Edit,
  delete: Trash2,
  move: MoveRight,
  archive: Archive,
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center">
        <Clock size={16} className="mr-2" />
        Activity
      </h3>
      
      <div className="space-y-2">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type]
          
          return (
            <div 
              key={activity.id}
              className="flex items-start space-x-3 text-sm"
            >
              <div className="p-1.5 rounded-full bg-white/10">
                <Icon size={14} />
              </div>
              <div>
                <p className="text-gray-300">{activity.description}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 
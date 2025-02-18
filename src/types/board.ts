export interface Card {
  id: string
  title: string
  description?: string
  labels: Label[]
  attachments?: Attachment[]
  priority?: 'low' | 'medium' | 'high'
  dueDate?: string
  isArchived?: boolean
  checklist?: ChecklistItem[]
  comments?: Comment[]
}

export interface Column {
  id: string
  title: string
  cards: Card[]
}

export interface Label {
  id: string
  name: string
  color: string
}

export interface Attachment {
  id: string
  type: 'image' | 'chart'
  url: string
}

export interface Activity {
  id: string
  cardId: string
  type: 'create' | 'update' | 'delete' | 'move' | 'archive'
  description: string
  timestamp: string
}

export interface ChecklistItem {
  id: string
  text: string
  isComplete: boolean
}

export interface Comment {
  id: string
  text: string
  userId: string
  userName: string
  createdAt: string
} 
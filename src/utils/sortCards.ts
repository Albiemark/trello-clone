import { type Card } from "@/types/board"

type SortField = 'priority' | 'dueDate' | 'title' | 'created'
type SortDirection = 'asc' | 'desc'

const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2,
}

export function sortCards(
  cards: Card[],
  field: SortField,
  direction: SortDirection = 'asc'
): Card[] {
  const sortedCards = [...cards].sort((a, b) => {
    switch (field) {
      case 'priority':
        const aPriority = a.priority ? priorityOrder[a.priority] : 3
        const bPriority = b.priority ? priorityOrder[b.priority] : 3
        return aPriority - bPriority

      case 'dueDate':
        const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
        const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
        return aDate - bDate

      case 'title':
        return a.title.localeCompare(b.title)

      case 'created':
        return parseInt(a.id.split('-')[1]) - parseInt(b.id.split('-')[1])

      default:
        return 0
    }
  })

  return direction === 'desc' ? sortedCards.reverse() : sortedCards
} 
import { useEffect } from 'react'

interface ShortcutHandlers {
  onAddCard?: () => void
  onSearch?: () => void
  onClearFilters?: () => void
  onEscape?: () => void
}

export function useKeyboardShortcuts({
  onAddCard,
  onSearch,
  onClearFilters,
  onEscape,
}: ShortcutHandlers) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Check if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Ctrl/Cmd + K for search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        onSearch?.()
      }

      // Ctrl/Cmd + N for new card
      if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault()
        onAddCard?.()
      }

      // Escape key
      if (event.key === 'Escape') {
        onEscape?.()
      }

      // Ctrl/Cmd + / to clear filters
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault()
        onClearFilters?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onAddCard, onSearch, onClearFilters, onEscape])
} 
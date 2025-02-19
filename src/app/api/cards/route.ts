import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

// Custom error class for validation errors
class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Add these utility functions at the top
function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime())
}

function parseAndValidateDate(dateString: string): Date {
  // First validate the year format
  if (dateString.match(/\d{5,}/)) {
    throw new ValidationError('Year must be 4 digits or less')
  }

  // Try parsing the date
  const parsedDate = new Date(dateString)
  if (!isValidDate(parsedDate)) {
    throw new ValidationError('Invalid date format. Please use YYYY-MM-DD or ISO format')
  }

  // Get the year and validate it's not more than 4 digits
  const year = parsedDate.getFullYear()
  if (year.toString().length > 4) {
    throw new ValidationError('Year must be 4 digits or less')
  }

  // Validate date is not in the past
  if (parsedDate < new Date(new Date().setHours(0, 0, 0, 0))) {
    throw new ValidationError('Due date cannot be in the past')
  }

  // Validate date is not too far in the future (e.g., 5 years)
  const maxFutureDate = new Date()
  maxFutureDate.setFullYear(maxFutureDate.getFullYear() + 5)
  if (parsedDate > maxFutureDate) {
    throw new ValidationError('Due date cannot be more than 5 years in the future')
  }

  // Validate year is reasonable (e.g., between 2000 and 2100)
  if (year < 2000 || year > 2100) {
    throw new ValidationError('Year must be between 2000 and 2100')
  }

  return parsedDate
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Creating card with data:', data)
    
    // Validate input data
    validateCardData(data)

    // Get and validate column
    const column = await getAndValidateColumn(data.columnId)

    // Get next order number
    const nextOrder = await getNextOrderNumber(data.columnId)

    // Create initial card
    const card = await createInitialCard(data, nextOrder, column.id)

    // Update card with additional data
    const updatedCard = await updateCardWithAdditionalData(card.id, data)

    console.log('Created card:', updatedCard)
    return NextResponse.json(updatedCard)

  } catch (error) {
    return handleCardError(error)
  }
}

// Validation functions
function validateCardData(data: any) {
  if (!data.title?.trim()) {
    throw new ValidationError('Card title is required')
  }
  if (!data.columnId) {
    throw new ValidationError('Column ID is required')
  }

  // Enhanced date validation
  if (data.dueDate) {
    try {
      parseAndValidateDate(data.dueDate)
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
      throw new ValidationError('Invalid due date format')
    }
  }

  if (data.labels && !Array.isArray(data.labels)) {
    throw new ValidationError('Labels must be an array')
  }
  if (data.labels?.some((label: any) => !label.name || !label.color)) {
    throw new ValidationError('All labels must have name and color')
  }
}

async function getAndValidateColumn(columnId: string) {
  const column = await prisma.column.findUnique({
    where: { id: columnId }
  })
  if (!column) {
    throw new ValidationError('Column not found')
  }
  return column
}

async function getNextOrderNumber(columnId: string) {
  const lastCard = await prisma.card.findFirst({
    where: { columnId },
    orderBy: { order: 'desc' }
  })
  return (lastCard?.order ?? -1) + 1
}

async function createInitialCard(data: any, order: number, columnId: string) {
  try {
    return await prisma.card.create({
      data: {
        title: data.title.trim(),
        description: data.description?.trim() || null,
        priority: data.priority || null,
        isArchived: false,
        order,
        column: {
          connect: { id: columnId }
        }
      },
      include: {
        labels: true,
        column: true
      }
    })
  } catch (error) {
    console.error('Failed to create initial card:', error)
    throw new Error('Failed to create card')
  }
}

async function updateCardWithAdditionalData(cardId: string, data: any) {
  try {
    let card = await prisma.card.findUnique({
      where: { id: cardId },
      include: { labels: true, column: true }
    })

    if (!card) {
      throw new Error('Card not found after creation')
    }

    // Update due date if provided with enhanced validation
    if (data.dueDate) {
      try {
        const validatedDate = parseAndValidateDate(data.dueDate)
        card = await prisma.card.update({
          where: { id: cardId },
          data: { 
            dueDate: validatedDate
          },
          include: { labels: true, column: true }
        })
      } catch (error) {
        if (error instanceof ValidationError) {
          throw error
        }
        console.error('Error updating due date:', error)
        throw new Error('Failed to update due date')
      }
    }

    // Update labels if provided
    if (data.labels?.length > 0) {
      try {
        card = await prisma.card.update({
          where: { id: cardId },
          data: {
            labels: {
              connectOrCreate: data.labels.map((label: any) => ({
                where: { id: label.id || '' },
                create: {
                  name: label.name.trim(),
                  color: label.color
                }
              }))
            }
          },
          include: { labels: true, column: true }
        })
      } catch (error) {
        console.error('Error updating labels:', error)
        throw new Error('Failed to update card labels')
      }
    }

    return card
  } catch (error) {
    console.error('Failed to update card with additional data:', error)
    if (error instanceof ValidationError) {
      throw error
    }
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to update card with additional data'
    )
  }
}

function handleCardError(error: unknown): NextResponse {
  console.error('Card creation error:', error)

  if (error instanceof ValidationError) {
    // Check for specific date-related validation errors
    if (error.message.includes('date')) {
      return NextResponse.json(
        { 
          error: error.message,
          type: 'date_validation'
        },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return NextResponse.json(
          { error: 'A card with this title already exists' },
          { status: 409 }
        )
      case 'P2003':
        return NextResponse.json(
          { error: 'Referenced column or label does not exist' },
          { status: 404 }
        )
      case 'P2025':
        return NextResponse.json(
          { error: 'Card not found' },
          { status: 404 }
        )
      default:
        return NextResponse.json(
          { error: 'Database error', code: error.code },
          { status: 500 }
        )
    }
  }

  return NextResponse.json(
    { 
      error: 'An unexpected error occurred',
      details: error instanceof Error ? error.message : 'Unknown error'
    },
    { status: 500 }
  )
} 
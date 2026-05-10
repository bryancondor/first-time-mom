import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import JourneySection from './JourneySection'

vi.mock('./PhotoGallery', () => ({
  default: ({ srcs }) => <div data-testid="gallery">{srcs.length} photos</div>
}))
vi.mock('../utils/resolvePhoto', () => ({
  resolvePhoto: (filename) => `/photos/${filename}`,
}))
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, className }) => <section className={className}>{children}</section>,
  },
}))

const mockSection = {
  id: 's1',
  timeTag: 'El embarazo',
  title: '✨ La espera más larga y más dulce',
  phrase: 'Lo cargaste dentro tuyo antes de poder cargarlo en brazos.',
  accentColor: '#fda4af',
  photos: ['s1-silhouette-belly.jpg'],
}

describe('JourneySection', () => {
  it('renders the time tag', () => {
    render(<JourneySection section={mockSection} />)
    expect(screen.getByText('El embarazo')).toBeInTheDocument()
  })

  it('renders the chapter title', () => {
    render(<JourneySection section={mockSection} />)
    expect(screen.getByText(/La espera más larga/)).toBeInTheDocument()
  })

  it('renders the phrase', () => {
    render(<JourneySection section={mockSection} />)
    expect(screen.getByText(/Lo cargaste dentro tuyo/)).toBeInTheDocument()
  })

  it('renders the PhotoGallery with photos', () => {
    render(<JourneySection section={mockSection} />)
    expect(screen.getByTestId('gallery')).toBeInTheDocument()
  })
})

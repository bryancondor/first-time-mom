import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

vi.mock('framer-motion', () => ({
  motion: {
    h1:  ({ children, className, 'aria-label': ariaLabel }) => <h1 className={className} aria-label={ariaLabel}>{children}</h1>,
    p:   ({ children, className }) => <p className={className}>{children}</p>,
    div: ({ children, className }) => <div className={className}>{children}</div>,
    span:({ children, className }) => <span className={className}>{children}</span>,
  },
}))

describe('Hero', () => {
  it('renders the title Para Lilian', () => {
    render(<Hero />)
    expect(screen.getByLabelText(/Para Lilian/i)).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero />)
    expect(screen.getByText(/El año que todo cambió/i)).toBeInTheDocument()
  })

  it('renders the scroll arrow', () => {
    render(<Hero />)
    expect(screen.getByRole('img', { name: /scroll/i })).toBeInTheDocument()
  })
})

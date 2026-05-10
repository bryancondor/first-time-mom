import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the title Para Lilian', () => {
    render(<Hero />)
    expect(screen.getByText(/Para Lilian/i)).toBeInTheDocument()
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

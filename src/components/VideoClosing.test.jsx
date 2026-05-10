import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import VideoClosing from './VideoClosing'

vi.mock('../assets/video/s6-carcajada.mp4', () => ({ default: '/mock-video.mp4' }))
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, className }) => <section className={className}>{children}</section>,
    span:    ({ children, style, className }) => <span style={style} className={className}>{children}</span>,
    p:       ({ children, className }) => <p className={className}>{children}</p>,
  },
}))

beforeEach(() => {
  window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
})

describe('VideoClosing', () => {
  it('renders the final phrase', () => {
    render(<VideoClosing />)
    expect(screen.getByText(/Feliz día, mamá/i)).toBeInTheDocument()
  })

  it('renders a video element', () => {
    render(<VideoClosing />)
    expect(screen.getByTestId('closing-video')).toBeInTheDocument()
  })

  it('renders Te amamos, Adrián', () => {
    render(<VideoClosing />)
    expect(screen.getByText(/Te amamos, Adrián/i)).toBeInTheDocument()
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MusicPlayer from './MusicPlayer'

vi.mock('../assets/music/perfect-ed-sheeran.mp3', () => ({ default: '/mock-music.mp3' }))
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, 'aria-label': ariaLabel, className }) => (
      <button onClick={onClick} aria-label={ariaLabel} className={className}>{children}</button>
    ),
  },
}))

beforeEach(() => {
  window.HTMLMediaElement.prototype.play  = vi.fn().mockResolvedValue(undefined)
  window.HTMLMediaElement.prototype.pause = vi.fn()
})

describe('MusicPlayer', () => {
  it('renders the play button initially', () => {
    render(<MusicPlayer />)
    expect(screen.getByRole('button', { name: /reproducir música/i })).toBeInTheDocument()
  })

  it('shows pause label after clicking play', async () => {
    render(<MusicPlayer />)
    fireEvent.click(screen.getByRole('button', { name: /reproducir música/i }))
    expect(await screen.findByRole('button', { name: /pausar música/i })).toBeInTheDocument()
  })

  it('returns to play label after pausing', async () => {
    render(<MusicPlayer />)
    fireEvent.click(screen.getByRole('button', { name: /reproducir música/i }))
    fireEvent.click(await screen.findByRole('button', { name: /pausar música/i }))
    expect(await screen.findByRole('button', { name: /reproducir música/i })).toBeInTheDocument()
  })
})

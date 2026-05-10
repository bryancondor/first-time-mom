import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PhotoGallery from './PhotoGallery'

vi.mock('framer-motion', () => ({
  motion: {
    img: ({ src, alt, className }) => <img src={src} alt={alt} className={className} />,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('PhotoGallery', () => {
  it('renders a single photo without navigation buttons', () => {
    render(<PhotoGallery srcs={['/photo1.jpg']} alt="test" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /prev/i })).not.toBeInTheDocument()
  })

  it('shows next button when multiple photos', () => {
    render(<PhotoGallery srcs={['/a.jpg', '/b.jpg']} alt="test" />)
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('advances to next photo on next click', () => {
    render(<PhotoGallery srcs={['/a.jpg', '/b.jpg', '/c.jpg']} alt="test" />)
    expect(screen.getByRole('img').src).toContain('a.jpg')
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByRole('img').src).toContain('b.jpg')
  })

  it('wraps around from last to first photo', () => {
    render(<PhotoGallery srcs={['/a.jpg', '/b.jpg']} alt="test" />)
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByRole('img').src).toContain('a.jpg')
  })
})

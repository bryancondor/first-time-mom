import { describe, it, expect } from 'vitest'
import { sections } from './journey'

describe('journey data', () => {
  it('exports 6 sections', () => {
    expect(sections).toHaveLength(6)
  })

  it('each section has required fields', () => {
    sections.forEach((s, i) => {
      expect(s.id,          `section ${i} id`).toBeTruthy()
      expect(s.timeTag,     `section ${i} timeTag`).toBeTruthy()
      expect(s.title,       `section ${i} title`).toBeTruthy()
      expect(s.phrase,      `section ${i} phrase`).toBeTruthy()
      expect(s.photos,      `section ${i} photos`).toBeInstanceOf(Array)
      expect(s.photos.length, `section ${i} photos length`).toBeGreaterThan(0)
      expect(s.accentColor, `section ${i} accentColor`).toMatch(/^#/)
    })
  })

  it('all photo filenames are strings ending in .jpg or .png', () => {
    sections.forEach(s => {
      s.photos.forEach(p => {
        expect(p).toMatch(/\.(jpg|png)$/)
      })
    })
  })
})

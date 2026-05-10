const photoModules = import.meta.glob('../assets/photos/*', { query: '?url', eager: true, import: 'default' })

export function resolvePhoto(filename) {
  const key = Object.keys(photoModules).find(k => k.endsWith(filename))
  return key ? photoModules[key] : filename
}

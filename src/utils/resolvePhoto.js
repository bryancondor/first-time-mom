const photoModules = import.meta.glob('../assets/photos/*', { eager: true, as: 'url' })

export function resolvePhoto(filename) {
  const key = Object.keys(photoModules).find(k => k.endsWith(filename))
  return key ? photoModules[key] : filename
}

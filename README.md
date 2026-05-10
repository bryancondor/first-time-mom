# Para Lilian — Primera vez mamá 🌸

Página web sorpresa para Lilian, contando el journey desde el embarazo hasta los 5 meses de Adrián.

## Agregar fotos, video y música

Antes de hacer el build, coloca tus archivos en las carpetas correctas:

**Fotos** → `src/assets/photos/`

| Archivo | Descripción |
|---------|-------------|
| `s1-silhouette-belly.jpg` | Silueta barriga 8 meses |
| `s1-silhouette-kiss.jpg` | Bryan besando la barriga |
| `s2-shower-main.jpg` | Baby shower abriendo regalos |
| `s2-shower-clown.jpg` | Con la payasita |
| `s2-shower-magician.jpg` | Con el mago |
| `s2-shower-niece.jpg` | Con su sobrina |
| `s2-tree-hug.jpg` | Árbol navidad, Bryan abrazando barriga |
| `s3-monitoring.jpg` | Lilian siendo monitoreada 15 dic |
| `s3-first-sight.jpg` | Lilian viendo a Adrián por primera vez |
| `s3-newborn-doctor.jpg` | Adrián recién nacido con la doctora |
| `s4-suit-9days.jpg` | Adrián 9 días con ropa tipo terno |
| `s4-nursing-christmas.jpg` | Lilian dando de lactar en Navidad |
| `s4-one-month-cake.jpg` | Tortita de 1 mes |
| `s5-first-smile.jpg` | Primera sonrisa (1.5 meses) |
| `s5-cozy-3months.jpg` | Adrián cómodo con Lilian (3m) |
| `s5-family-laughing.jpg` | Los 3 riéndonos en la cama |
| `s6-looking-together.jpg` | Lilian y Adrián mirándose (4.5m) |
| `s6-big-smile.jpg` | Adrián sonriendo grande (4.5m) |
| `s6-cafe-family.jpg` | Los 3 en la cafetería |

> Formatos soportados: `.jpg` y `.png`. Convierte HEIC → JPG antes de agregar.

**Video** → `src/assets/video/s6-carcajada.mp4`
> Convierte MOV → MP4 si es necesario (QuickTime: Archivo → Exportar como → 1080p)

**Música** → `src/assets/music/perfect-ed-sheeran.mp3`

---

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

---

## Tests

```bash
npm run test
```

---

## Build y deploy a GitHub Pages

```bash
# 1. Agrega tus fotos, video y música (ver tabla arriba)
# 2. Build
npm run build

# 3. Deploy
npm run deploy
```

La página queda disponible en: https://bryancondor.github.io/first-time-mom/

---

## Stack

- React 18 + Vite
- React Three Fiber (elementos 3D flotantes)
- Framer Motion (animaciones de scroll)
- Tailwind CSS (paleta pastel dreamy)

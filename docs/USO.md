# docs/USO.md — Ejecutar darasa en local

Guía operativa para desarrollar, construir y previsualizar el sitio.

## Requisitos

- **Node.js ≥ 22.12** (el `package.json` declara `engines.node`). Instalado: `node --version`.
- **npm** (incluido con Node).
- **Laravel Herd** *(opcional, para preview del build en `http://darasa.test`)*. Alternativa: `npm run preview` levanta un servidor local.

## Flujo diario de desarrollo

```bash
cd ~/SitesWeb/ibrahim/darasa
npm install        # sólo la primera vez o tras cambios en package.json
npm run dev        # dev server con hot reload en http://localhost:4321
```

El dev server de Astro recarga al guardar cambios en `src/**`. Soporta cambios en `.astro`, `.ts`, `.md`, `.yaml`, `.css`. Los cambios en `public/**` requieren recargar el navegador manualmente.

Para parar el dev server: `q` + `Enter` en la terminal, o `Ctrl+C`.

## Generar build estático

```bash
npm run build
```

Output en `dist/`. Contenido: HTML pre-renderizado por cada ruta, CSS minimizado en `dist/_astro/`, assets estáticos (retratos, scripts legacy) copiados desde `public/`.

Si algún campo obligatorio falta en el frontmatter de un soberano o entidad, el build falla con mensaje claro como:

```
ZodError: soberanos → visigodos/<slug>.md
  fuentes: Array must contain at least 1 element(s)
```

Corregir el fichero y reintentar.

## Preview del build

### Opción A — servidor local de Astro

```bash
npm run preview    # sirve dist/ en http://localhost:4321
```

Rápido, sin configurar nada. Ideal para verificar un build concreto.

### Opción B — Herd (`http://darasa.test`)

Una vez configurado, sirve siempre el último `dist/` sin necesidad de ejecutar ningún comando:

```bash
# Setup (una sola vez)
npm run build
cd dist && herd link darasa

# Después de cada build:
npm run build       # Herd sirve automáticamente el nuevo dist/
```

Para revertir: `cd dist && herd unlink darasa` o (si ya no estás en el directorio) usa el Herd GUI.

## Estructura de directorios clave

```
darasa/
├── src/
│   ├── content.config.ts           # schemas Zod
│   ├── content/hispania/
│   │   ├── entidades/*.yaml        # visigodos, al-andalus, …
│   │   └── soberanos/<entidad>/*.md
│   ├── layouts/Layout.astro        # header + footer + fonts
│   ├── pages/
│   │   ├── index.astro             # timeline maestro
│   │   └── hispania/
│   │       ├── [entidad].astro     # grid por entidad
│   │       └── soberanos/[slug].astro  # ficha individual
│   └── styles/                     # tokens, base, components
├── public/
│   ├── portraits/*.webp            # imágenes + ATTRIBUTIONS.md
│   ├── scripts/                    # theme.js, emblemas.js (legacy IIFE)
│   └── favicon.svg
├── scripts/
│   ├── migrate-data-js.mjs         # migración desde data.js legacy
│   └── legacy-data.cjs             # data.js convertido a CJS
├── docs/                           # esta documentación
├── DESIGN.md                       # sistema de diseño
├── CLAUDE.md                       # convenciones y workflow
└── BACKLOG.md                      # hallazgos pendientes
```

## Troubleshooting

### El dev server no arranca

- Verificar que Node ≥ 22.12: `node --version`. Si es menor, instalar versión nueva (con Herd Node isolate, `nvm`, `fnm` o `asdf`).
- Borrar caché: `rm -rf node_modules .astro dist && npm install && npm run dev`.

### Imagen de retrato no aparece

- Revisar que el fichero existe en `public/portraits/<slug>.webp`.
- Revisar que el frontmatter del soberano referencia `/portraits/<slug>.webp` exactamente (slash inicial, `public/` se omite en la URL).
- Ver log de consola del navegador; si hay 404, el nombre del fichero no coincide.
- Si `img: null`, el grid/ficha pinta un placeholder con la inicial. Es el comportamiento esperado para reyes sin retrato documentado.

### `herd link` falla con "already in use"

Si ya existe un link llamado `darasa`, primero deshacerlo:

```bash
cd dist && herd unlink darasa
herd link darasa
```

### Build lento o "Error: ENOSPC"

Astro usa Vite con watchers. macOS limita los file watchers; si hay miles de archivos (p.ej. tras añadir 500 soberanos), ajustar `maxFiles` del sistema o excluir `dist/` en `.gitignore` y `node_modules` del watch.

### El timeline se ve mal / bloques muy cortos

El eje temporal en `src/pages/index.astro` va de 400 a 2030. Con una sola entidad (`visigodos`, 418-711) el bloque queda en el tercio izquierdo. Cuando se añadan más entidades, el mapa se rellena. Si se añade una entidad anterior a 400 (Hispania romana), ajustar `EJE_INICIO` en `src/pages/index.astro`.

## Deploy

Por ahora no hay pipeline automatizado. Planificado: **Cloudflare Pages** conectado al repo de GitHub, build en cada push a `main`. Dominio de producción **darasa.es**.

Hasta que esté configurado, deploy manual:

```bash
npm run build
# subir dist/ al hosting elegido (Cloudflare Pages drop, Netlify CLI, rsync, …)
```

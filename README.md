# darasa

> Proyecto de historia y conocimiento. Open source, en español, bajo licencia [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

**darasa** es una plataforma educativa abierta concebida para crecer en módulos. La audiencia primaria es Ibrahim (TEA + AACC, ~10 años); la secundaria, adultos con interés en historia, con foco especial en Al-Ándalus como herencia familiar propia.

## Estado actual

Este repositorio contiene **el primer módulo** del proyecto: un atlas cronológico de los soberanos de la Península Ibérica (visigodos, Al-Ándalus, reinos cristianos, coronas, hasta la actualidad).

Cuando el portal `darasa.es` esté listo, este módulo se publicará en un **subdominio propio** (provisionalmente `reges.darasa.es`, por confirmar) y `darasa.es` quedará como punto de entrada al conjunto del proyecto.

Mientras tanto, este repo aloja todo el código del módulo de soberanos.

- Producción (futura): [darasa.es](https://darasa.es)
- Subdominio del módulo (futuro): `reges.darasa.es` *(provisional)*
- Repositorio: [github.com/abkrim/darasa](https://github.com/abkrim/darasa)
- Autor: Abdelkarim Mateos · [abdelkarim@aichadigital.es](mailto:abdelkarim@aichadigital.es) · [AichaDigital](https://aichadigital.es)

## Hoja de ruta

- [x] Migración del prototipo `reges-hispaniae` (HTML+JS plano) a Astro v6 con Content Layer API.
- [x] Sistema de diseño documentado (`DESIGN.md`).
- [ ] Completar contenido: visigodos (1/31 portados), Al-Ándalus, reinos cristianos, coronas.
- [ ] Separar el portal `darasa.es` del módulo de soberanos (mover este código a su subdominio).
- [ ] Próximos módulos del proyecto (sin fecha definida).

## Stack

- **Framework:** Astro v6 con Content Layer API · TypeScript strict
- **Contenido:** YAML (entidades) + Markdown con frontmatter (soberanos), validado con Zod
- **Estilos:** CSS plano con design tokens — ver `DESIGN.md`
- **Runtime:** build estático, sin servidor, sin base de datos

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # genera dist/
npm run preview      # sirve dist/ localmente
```

Con [Laravel Herd](https://herd.laravel.com/) instalado:

```bash
npm run build
cd dist && herd link darasa     # http://darasa.test sirve el build
```

## Documentación

- **[`DESIGN.md`](./DESIGN.md)** — sistema de diseño completo (paleta, tipografía, spacing, motion, accesibilidad). **Fuente de verdad visual.**
- **[`CLAUDE.md`](./CLAUDE.md)** — convenciones del proyecto, workflow de contenido, cómo añadir soberanos o entidades.
- **[`BACKLOG.md`](./BACKLOG.md)** — hallazgos pendientes del audit 2026-04-24.
- **[`docs/USO.md`](./docs/USO.md)** — uso en local, build, preview, troubleshooting.
- **[`docs/ACTUALIZACIONES.md`](./docs/ACTUALIZACIONES.md)** — actualización de dependencias y versionado.
- **[`docs/METODOLOGIA.md`](./docs/METODOLOGIA.md)** — principios y proceso de colaboración.
- **[`docs/PLAN-AL-ANDALUS.md`](./docs/PLAN-AL-ANDALUS.md)** — plan de investigación del contenido de Al-Ándalus.
- **[`docs/FUENTES-AL-ANDALUS.md`](./docs/FUENTES-AL-ANDALUS.md)** — bibliografía y fuentes de referencia.

## Contribuir

Historiadores, docentes o aficionados informados pueden aportar fichas de soberanos. Ver `CLAUDE.md` § *Content workflow* para el proceso completo. Se aceptan dos vías:

- Pull Requests en GitHub con el Markdown ya rellenado.
- Markdown enviado por email a [abdelkarim@aichadigital.es](mailto:abdelkarim@aichadigital.es).

Fuentes aceptables: Real Academia de la Historia (DBE), Dialnet, monografías académicas, Wikimedia Commons (imágenes CC o dominio público). Wikipedia solo como puerta de entrada, nunca como fuente primaria.

## Atribución de imágenes

Los retratos en `public/portraits/` provienen mayoritariamente de la **serie cronológica de los Reyes de España del Museo del Prado (1854)**, dominio público vía Wikimedia Commons. Detalle en [`public/portraits/ATTRIBUTIONS.md`](./public/portraits/ATTRIBUTIONS.md).

## Relación con el prototipo

El módulo de soberanos evoluciona el prototipo HTML+JS puro de `~/SitesWeb/ibrahim/reges-hispaniae/`, que se conserva como referencia visual y de contenido durante la migración. Cuando el contenido completo esté portado, ese prototipo se archiva.

## Licencia

[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)

# docs/ACTUALIZACIONES.md — Mantener darasa al día

Cómo actualizar Astro, Node, y el resto de dependencias sin romper nada.

## Política general

- **Minoría primero:** probar cada update en local antes de pushear. Build + navegación manual al menos por el timeline, un grid y una ficha.
- **Un cambio grande a la vez:** no subir Astro, Node y CSS utility lib en el mismo commit. Si algo rompe queremos saber qué fue.
- **Minor/patch automatizable:** los bumps patch (6.1.x → 6.1.y) y minor (6.1.x → 6.2.x) son seguros en general; correr build + test visual basta.
- **Major siempre requiere lectura de changelog** y posibles cambios en el código.

## Cadencia sugerida

| Componente | Cadencia | Comprobación |
|------------|----------|--------------|
| Astro (patch/minor) | Mensual | `npm outdated astro`; luego `npm update astro`; build + preview visual |
| Astro (major) | Ad-hoc tras changelog | Leer release notes, migrar breaking changes, build + test exhaustivo |
| Node.js | Cuando salga una LTS nueva | Ajustar `engines.node` en `package.json`, actualizar Herd Node isolate si aplica |
| Paquetes de contenido (Zod, etc.) | Trimestral | Solo si Astro lo requiere; suelen ir atados a la versión de Astro |

## Astro: patch y minor

```bash
npm outdated                       # ver qué hay por actualizar
npm update astro                   # aplica la última compatible con el semver en package.json
npm run build                      # verificar que sigue compilando
npm run dev                        # probar visualmente index, grid, ficha
```

Si el build pasa pero la UI se ve rota, mirar:

- `astro.config.mjs` — ¿el formato cambió?
- `src/content.config.ts` — ¿la API de `defineCollection` cambió?
- Posibles deprecation warnings en el build.

Commit claro: `chore(deps): bump astro to x.y.z`.

## Astro: major (p.ej. v6 → v7)

1. Leer el changelog completo: [github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md).
2. Consultar la guía de migración oficial si existe.
3. Especialmente revisar cambios en:
   - **Content Layer API** (`defineCollection`, `glob`, `file`, `getCollection`, `render`).
   - **`getStaticPaths`** y cómo se derivan los slugs.
   - **Tipos TypeScript** generados en `.astro/` (regenerar con `npx astro sync`).
4. Aplicar cambios en:
   - `src/content.config.ts`
   - Pages que usen `getCollection` o `render` (`[slug].astro`, `[entidad].astro`, `index.astro`).
5. Probar un build completo y toda la navegación visible antes de commit.

## Node.js

`package.json` declara `"engines": { "node": ">=22.12.0" }`. Cuando salga una LTS más nueva:

```bash
# Comprobar versión local
node --version

# Con Herd Node isolate:
cd ~/SitesWeb/ibrahim/darasa
herd isolate-node 22    # o la versión LTS nueva

# Con fnm/nvm/asdf: el comando equivalente
```

Ajustar `engines.node` si se exige una versión mayor. Usar siempre **LTS**, no Current.

## Otras dependencias

Actualmente solo `astro` es dependencia directa. Si el proyecto añade:

- **UI libs** (React/Vue/Svelte integrations): deben ir atados a la versión de Astro compatible. Mirar tabla de compatibilidad de cada integración.
- **Herramientas de build** (Vite, Rollup, PostCSS): no deberían añadirse directamente; Astro las gestiona.
- **Lint/format** (ESLint, Prettier, Biome): añadir **dev dependencies**, no runtime. Configurar en `package.json` y CI.

Antes de añadir cualquier dep:

1. ¿Qué problema concreto resuelve?
2. Licencia compatible con CC BY-SA 4.0 del proyecto (MIT, Apache-2.0, BSD-3 son OK).
3. Último commit < 12 meses, issues abiertos proporcionales al tamaño.
4. ¿El stack actual ya permite lo mismo? (Astro + vanilla CSS suele bastar.)

## Versionado del proyecto

El proyecto no sigue semver estricto (es contenido, no librería). Pero sí mantenemos:

- **`package.json version`:** bumpeado en hitos visibles (`0.1.0` cuando haya 3+ entidades, `0.2.0` cuando se abra a colaboraciones, etc.).
- **CHANGELOG.md** *(pendiente crear)*: cada bump deja una entrada con qué cambió a ojos del usuario final.

## Lockfile

`package-lock.json` se committea. Al actualizar:

```bash
npm install                # respeta package.json, actualiza package-lock.json
# o, para forzar resolución limpia:
rm package-lock.json node_modules && npm install
```

Si el lockfile genera conflictos de merge en una PR, regenerar en local y pushear la versión nueva; no resolver manualmente a mano (riesgo alto de lockfile corrupto).

## Checklist pre-merge tras actualizar deps

- [ ] `npm run build` pasa sin errores ni warnings relevantes.
- [ ] `npm run dev` arranca y el home (`/`) renderiza el timeline.
- [ ] `/hispania/visigodos/` muestra el grid completo.
- [ ] Al menos una ficha (`/hispania/soberanos/recaredo-i/`) carga con retrato y facts.
- [ ] Toggle light/dark sigue funcionando.
- [ ] Consola del navegador sin errores rojos.
- [ ] Lighthouse (opcional): score accesibilidad ≥ 95.

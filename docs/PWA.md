# AgroCalc como PWA

AgroCalc ya esta preparada como PWA instalable usando `vite-plugin-pwa`.

## Archivos importantes

- `vite.config.js`: configura el manifest, el service worker y el cache de produccion.
- `dist/manifest.json`: se genera al ejecutar `npm run build`.
- `public/brand/agrocalc-logo.png`: logo principal original.
- `public/brand/agrocalc-wordmark.png`: version recortada usada en la cabecera.
- `public/brand/agrocalc-logo-pack.png`: pack de iconos/logos para futuras secciones.
- `public/favicon.svg`: favicon vectorial de respaldo.
- `public/icons/icon-192.png`: icono para Android/Chrome.
- `public/icons/icon-512.png`: icono grande para Android/Chrome.
- `public/icons/maskable-512.png`: icono adaptable para Android.
- `public/icons/apple-touch-icon.png`: icono usado por iOS al anadir a pantalla de inicio.

Los iconos de `public/icons/` se han generado desde el logo principal. Si mas adelante ajustas la identidad visual, sustituye esos archivos manteniendo los nombres y tamanos.

## Probar en local

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Genera la build de produccion:

   ```bash
   npm run build
   ```

3. Sirve la build:

   ```bash
   npm run preview -- --host 0.0.0.0
   ```

   Tambien puedes usar:

   ```bash
   npm run preview:mobile
   ```

4. Abre la URL local desde Chrome o Edge. Para probar desde movil, el movil y el ordenador deben estar en la misma red; usa la IP local del ordenador con el puerto que indique Vite.

5. En Chrome DevTools, revisa `Application > Manifest` y `Application > Service workers`. En movil Android, abre la web en Chrome y usa `Anadir a pantalla de inicio` o el aviso de instalacion si aparece.

Nota: la instalacion PWA fiable requiere HTTPS, excepto en `localhost`. En un movil real normalmente conviene probar desde un despliegue HTTPS.

## Desplegar en Vercel

- El archivo `vercel.json` ya deja configurado el despliegue estatico.
- Framework preset: `Vite`.
- Build command: `npm run build`.
- Output directory: `dist`.
- No hace falta backend.

Despues del deploy, abre la URL HTTPS y verifica el manifest y el service worker desde DevTools o Lighthouse.

## Desplegar en Netlify

- El archivo `netlify.toml` ya deja configurado el despliegue estatico.
- Build command: `npm run build`.
- Publish directory: `dist`.
- No hace falta backend.

Puedes usar el flujo de importacion desde Git o arrastrar la carpeta `dist` en un deploy manual para una prueba rapida.

## Futuro Android

La app ya mantiene los calculos en funciones puras dentro de `src/utils`, y las calculadoras estan catalogadas en `src/data/calculators.js`. Eso facilita tres caminos futuros:

- Capacitor: reutilizar esta misma app React/Vite y envolverla como Android.
- React Native: migrar la interfaz y conservar la logica de calculo.
- Monorepo futuro: separar `src/utils` en un paquete compartido si aparecen app web y app movil nativa.

Referencias:

- Vercel para Vite: https://vercel.com/docs/frameworks/frontend/vite
- Netlify para Vite: https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/
- Vite PWA auto update: https://vite-pwa-org.netlify.app/guide/auto-update

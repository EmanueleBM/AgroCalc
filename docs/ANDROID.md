# Ruta futura para Android

AgroCalc ahora es una PWA. Para publicar mas adelante como app Android hay dos caminos razonables.

## Opcion A: Capacitor

Es el camino mas directo si quieres reutilizar esta web React/Vite casi sin reescribir la interfaz.

Estructura sugerida:

- Mantener `src/utils` para calculos puros.
- Mantener `src/data` para catalogo de calculadoras.
- Mantener componentes React en `src/components`.
- Anadir Capacitor cuando la PWA este mas madura.

Comandos futuros orientativos:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init AgroCalc com.agrocalc.app --web-dir=dist
npm run build
npx cap add android
npx cap sync android
```

## Opcion B: React Native

Conviene si quieres una interfaz movil nativa desde cero. En ese caso se puede reutilizar la logica de calculo, pero habria que reescribir la UI.

Para facilitar esa migracion, evita meter calculos dentro de componentes. Las calculadoras nuevas deberian seguir este patron:

- `src/utils/nombreCalculadora.js` para formulas y validaciones.
- `src/components/NombreCalculadora.jsx` para la interfaz.
- `src/data/calculators.js` para registrar la calculadora en el catalogo.

## Recomendacion actual

Para AgroCalc, primero seguiria con PWA y luego evaluaria Capacitor. Es el camino con menos duplicacion mientras validas calculadoras y flujo de uso real.

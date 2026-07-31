# AppPhone — App de Supermercado 🛒

App móvil (Expo / React Native) para comprar productos de supermercado desde el celular: catálogo por categorías, búsqueda, carrito, checkout y seguimiento de pedidos.

## Stack técnico

- **Framework:** Expo ~54 · React Native 0.81 · React 19
- **Lenguaje:** TypeScript (parcial) + JavaScript
- **Enrutamiento:** expo-router (rutas top-level: login, signup, index) + React Navigation anidado (tabs internas de la app)
- **Estado global:** Redux Toolkit + RTK Query
- **Persistencia de sesión:** redux-persist + AsyncStorage
- **Backend:** Firebase (Authentication + Realtime Database)
- **Validación de formularios:** Yup

## Estructura de carpetas

```
app/            rutas de expo-router (entry points: index, login, signup, layout)
Screens/        pantallas completas (Home, Cart, Products, Profile, Orders...)
components/     componentes de UI reutilizables (Counter, InputForm, HomeItem...)
shop/           estado global: slices de Redux (cart, order, recentlyViewed) + store
auth/, user/    slices de Redux para sesión y datos de usuario
services/       acceso a datos: Firebase Auth y RTK Query (ShopServices, userServices)
firebase/       configuración e inicialización de Firebase (Auth + Realtime Database)
src/navigation/ tabs internas con React Navigation (TabContainer, profileStack)
validations/    esquemas de validación de formularios (Yup)
constants/      tema visual y datos estáticos del comercio
assets/         imágenes de productos y fuentes tipográficas
```

## Requisitos previos

- Node.js LTS
- Expo CLI (`npx expo`, no requiere instalación global)
- Un proyecto de Firebase propio (Authentication + Realtime Database) si vas a correr la app contra tu propio backend

## Instalación

```bash
git clone https://github.com/sofiittaa/AppPhone.git
cd AppPhone
npm install
```

## Configuración de Firebase

La configuración vive en `firebase/fireBaseConfig.js` y `firebase/dataBase.js`. Si vas a usar tu propio proyecto de Firebase, reemplazá ahí los valores de `firebaseConfig` (apiKey, authDomain, databaseURL, projectId, etc.) por los de tu consola de Firebase.

## Cómo correr la app

```bash
npx expo start        # abre el menú de Expo (QR para dispositivo físico)
npm run android        # emulador/dispositivo Android
npm run ios            # simulador iOS (requiere macOS)
npm run web             # versión web
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo de Expo |
| `npm run android` | Corre la app en Android |
| `npm run ios` | Corre la app en iOS |
| `npm run web` | Corre la app en el navegador |
| `npm run lint` | Corre el linter (eslint-config-expo) |

## Ramas

- `master` — rama estable.
- `develop` — desarrollo activo; se mergea a `master` cuando una tanda de cambios está probada.

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para la convención de commits y el flujo de trabajo.

## Funcionalidades principales

- Registro e inicio de sesión (Firebase Authentication)
- Catálogo de productos por categoría, con búsqueda
- Detalle de producto y "vistos recientemente"
- Carrito de compras (agregar, modificar cantidad, quitar)
- Checkout en dos pasos: dirección de entrega + datos de pago
- Historial de pedidos por usuario
- Perfil de usuario con foto

## Estado del proyecto

Proyecto final académico. La persistencia local cubre la sesión del usuario (AsyncStorage); el catálogo y los pedidos se consultan en vivo contra Firebase Realtime Database. Sincronización offline (cola de operaciones + reintentos) queda como mejora futura — ver detalle técnico en la documentación de entrega del proyecto.

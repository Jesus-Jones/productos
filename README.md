
# App Productos con Google Sheets

Aplicación web simple en Node.js que permite autenticación y gestión de productos conectada a una hoja de Google Sheets.

## Requisitos

- Node.js
- Archivo `google-credentials.json` en la raíz del proyecto

## Instalación

```bash
npm install
```

## Uso

```bash
node index.js
```

Luego acceder a [http://localhost:3000](http://localhost:3000)

## Rutas

- `/login`: pantalla de login
- `/productos`: lista de productos (requiere login)

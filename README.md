# Frontend React 

Este proyecto fue creado utilizando [Create React App](https://github.com/facebook/create-react-app). Código frontend para manejar las interfaces del gestor de
Calificaciones tributarias de NUAM. Integrado en conjunto con Backend hecho con Django API Rest.

## Pre-requisitos
Antes de empezar, asegurarse que tenga las siguientes tecnologías instaladas en su sistema:

Requisito | Versión | Propósito
:------- | :------- | :-------
NodeJs | ≥10.x | Entorno de ejecución de Javascript para npm
npm | ≥6.x | Gestor de paquetes para instalar dependencias
Git | Última versión | Control de versiones

## Instalación de dependencias
El proyecto utiliza npm para gestionar las dependencias. Todos los paquetes necesarios se definen en el [package.json](https://github.com/wvvicho/frontend_nuam/blob/main/package.json)
y se bloquean en versiones específicas en package-lock.json. 

Ejecutar el siguiente comando desde la carpeta raíz del proyecto:
`npm install`

Este comando:
- Lee las dependencias desde `package.json`.
- Instala todos los paquetes listadas en la sección de dependencias.
- Crea o actualiza la carpeta `node_modules` del proyecto.
- Asegura una consistencia de las versiones usando [package-lock.json](https://github.com/wvvicho/frontend_nuam/blob/main/package-lock.json).

## Algunas dependencias clave instaladas

Paquete | Versión | Propósito
:------- | :------- | :-------
react | ^19.2.0 | Librería principal de React
react-dom | ^19.2.0 | Render para el DOM
react-scripts | 5.0.1 | Para la creación de Scripts de React Create App
papaparse | ^5.5.3 | Análisis de CSV para la carga masiva
@mui/material | ^7.3.5 | Librería de componente Material-UI
@emotion/react | ^11.14.0 | Estilo CSS-in-JS (dependencia MUI)
@emotion/styled | ^11.14.1 | Componentes con estilo (dependencia MUI)
json-server | ^1.0.0-beta.3 | Servidor API REST simulado
@testing-library/react | ^16.3.0 | Utilidades para testing de React
web-vitals | ^2.1.4 | Métricas de rendimiento

Para más información de las dependencias, consultar directamente con el archivo [package.json](https://github.com/wvvicho/frontend_nuam/blob/main/package.json).

## Estructura de directorios
Después de ejecutar la instalación de dependencias, la estructura de los directorios sería la siguiente:
```
frontend_nuam/
├── node_modules/          # Dependencias instaladas (ignoradas por git)
├── public/                # Assets estáticos
├── src/                   # Código fuente de React
├── data/                  # Mock del data, simulación del backend
│   └── calificaciones.json
├── package.json           # Configuración del proyecto
├── package-lock.json      # Archivo de bloqueo de dependencias
└── .gitignore            # Reglas para ignorar archivos para git
```

## Archivos ignorados por Git
Los siguientes directorios y archivos son ignorados por el control de versiones de Git:
- `node_modules/` - Directorio de dependencias
- `build/` - Resultado de la producción del proyecto
- `.env.local, .env.development.local` - Para las variables de entorno
- `npm-debug.log*` - logs de errores de npm

## Scripts disponibles

Dentro del directorio del proyecto se puede ejecutar:

### `npm start`

Ejecuta la aplicación en modo desarrollo.\
Abre de forma automática [http://localhost:3000](http://localhost:3000) para ver en el navegador.

La página se recarga automáticamente cada vez que realices cambios en el código.\
También verás errores de linting en la consola si los hay.

### `npm run backend`
Inicia un servidor API REST simulado para el desarrollo local. Su puerto por defecto es el 8000.
Algunas de sus funciones son:
-  Puntos finales completos de la API REST (GET, POST, PUT, DELETE).
-  Persistencia automática de datos en archivos JSON.
-  CORS habilitado de forma predeterminada.

### API Endpoints generados para esta ocasión
- GET http://localhost:8000/calificaciones - List all records
- GET http://localhost:8000/calificaciones/:id - Get single record
- POST http://localhost:8000/calificaciones - Create record
- PUT http://localhost:8000/calificaciones/:id - Update record
- DELETE http://localhost:8000/calificaciones/:id - Delete record
- GET http://localhost:8000/mercado - List markets
- GET http://localhost:8000/origen - List origins

### `npm test`

Inicia el ejecutor de pruebas en modo interactivo ("watch mode").\
Para más información, consulta la sección sobre [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Genera una versión optimizada para producción en la carpeta `build`.\
Incluye correctamente React en modo producción y optimiza la compilación para obtener el mejor rendimiento.

El build está minificado y genera nombres de archivos con hashes.
Así queda listo para ser desplegado en un servidor o hosting.

Para más información revisar la sección de [despliegue](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`
**Advertencia: este proceso es irreversible. Una vez ejecutado `eject`, no puedes deshacerlo!**

Se usa solo si deseas tener control total sobre:
- Webpack
- Babel
- ESLint
- Configuraciones internas

Al hacer `eject`, todos estos archivos pasan a tu proyecto y podrás modificarlos libremente.

No es necesario usar eject para la mayoría de los proyectos.

## Instrucciones paso a paso para el levantamiento
### 1. Instalación de los paquetes
`npm install`

### 2. En la raíz del proyecto abrir terminal
`npm start`
-  El servidor de desarrollo Webpack se inicia en el puerto 3000.
-  El navegador se abre automáticamente.
-  La consola muestra el estado de la compilación.
-  Espere el mensaje «¡Compilado correctamente!».

### 3. Abrir una segunda terminal para la simulación del backend
`npm run backend`
- json-server se inicia en el puerto 8000.
- La consola muestra los puntos finales disponibles.
- Supervisa los cambios en data/calificaciones.json.
- La API está lista cuando aparece el mensaje «✔ Recursos».

### 4. Verificar la configuración
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/calificaciones



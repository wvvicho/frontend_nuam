# Frontend React 

Este proyecto fue creado utilizando [Create React App](https://github.com/facebook/create-react-app). Código frontend para manejar las interfaces del gestor de
Calificaciones tributarias de NUAM. Integrado en conjunto con Backend hecho con Django API Rest.

## Para instalar las dependencias necesarias para el desarrollo
El siguiente comando instalará las dependencias necesarias que requiere el código para un entorno de desarrollo. Este comando instalará
las dependencias que vienen desde el [package.json](https://github.com/wvvicho/frontend_nuam/blob/main/package.json).
`npm install`

## Scripts disponibles

Dentro del directorio del proyecto se puede ejecutar:

### `npm start`

Ejecuta la aplicación en modo desarrollo.\
Abre de forma automática [http://localhost:3000](http://localhost:3000) para ver en el navegador.

La página se recarga automáticamente cada vez que realices cambios en el código.\
También verás errores de linting en la consola si los hay.

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

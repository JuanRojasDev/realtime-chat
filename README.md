# Instrucciones para el backend del chat en tiempo real

## Instalación de dependencias

1. Ve a la carpeta `backend`:
   ```sh
   cd backend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```

## Configuración de la base de datos

1. Asegúrate de tener MySQL corriendo.
2. Edita el archivo `models.js` y coloca tu usuario y contraseña de MySQL.
3. Ejecuta el script SQL para crear la base de datos y la tabla:
   ```sh
   mysql -u TU_USUARIO -p < init.sql
   ```

## Ejecución del backend

```sh
npm start
```

El backend estará disponible en http://localhost:3001

## Estructura de archivos
- `server.js`: Servidor Express + WebSocket
- `models.js`: Configuración de Sequelize y modelo de mensajes
- `init.sql`: Script para crear la base de datos y tabla
- `package.json`: Dependencias y scripts

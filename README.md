# Realtime Chat

Este proyecto es una aplicación de chat en tiempo real construida con React (frontend) y Node.js/Express + WebSocket + MySQL (backend).

![image](https://github.com/user-attachments/assets/bb503d91-30c2-41a3-aa72-f59b729f7437)

## Características
- Chat en tiempo real con WebSocket
- Selección de avatar personalizada
- Persistencia de mensajes en base de datos MySQL
- Interfaz moderna y responsive

![image](https://github.com/user-attachments/assets/ee37645e-2598-4ef4-8219-6dadb02bbb02)

![image](https://github.com/user-attachments/assets/c1fcd74f-f079-4041-90b6-97cd0cfe1ae2)

![image](https://github.com/user-attachments/assets/eab06826-bc36-47c2-856b-029474b17ff4)

---

## Requisitos
- Node.js >= 18
- npm o yarn
- MySQL (servidor local o remoto)

---

## Instalación

### 1. Clona el repositorio
```bash
# Cambia a tu carpeta de proyectos y clona
cd /ruta/a/tus/proyectos
git clone (https://github.com/JuanRojasDev/realtime-chat.git)
# (O copia los archivos si ya los tienes)
```

### 2. Configura la base de datos

#### Importante:
En el archivo model.js de la carpeta backend puedes configurar la conexion en la base de datos:
por defecto la conexión es asi:
   ```
   name: chatdb
   connection: standard (TCP/IP),
   hostname: localhost,
   port: 3306,
   username: root,
   (sin password)
   ```

![image](https://github.com/user-attachments/assets/0ea96e80-5eb5-4d4e-a64e-1c70a8f3d9b2)

![image](https://github.com/user-attachments/assets/12920432-504a-44aa-af40-657c96e251d6)

#### 1. Crea una base de datos llamada `chatdb` en tu MySQL o nombre de preferencia:
   ```sql
   CREATE DATABASE chatdb;
   ```
#### 2. Crear una tabla llamada 'Messages' y copiar:
   ```sql
   CREATE TABLE IF NOT EXISTS Messages ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, content TEXT NOT NULL, avatarSeed VARCHAR(255) NULL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
   ```

#### 3. (Opcional) Ejecuta un select si quieres ver la funcionalidad en los mensajesr:
   ```sql
   SELECT * FROM Messages;
   ```

---

## Backend (Node.js + Express + WebSocket)

### Instalación
```bash
cd backend
npm install
```

### Configuración
- Si tu usuario/contraseña de MySQL es diferente, edita `backend/models.js`:
  ```js
  const sequelize = new Sequelize('chatdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });
  ```

### Ejecución
```bash
npm start
# El backend escuchará en http://localhost:3001
```
![image](https://github.com/user-attachments/assets/000a6f04-5902-4be3-be5d-61084e48fc05)

---

## Frontend (React + Vite)

### Instalación
```bash
npm install
```

### Ejecución
```bash
npm run dev
# El frontend estará en http://localhost:5173 (por defecto)
# Importante: Tener ambas terminales abiertas una para el backend y la otra para el front
```
![image](https://github.com/user-attachments/assets/10d0b9e8-5d36-4536-935e-75caebca3bb1)

![image](https://github.com/user-attachments/assets/6da71800-97e7-4e8d-b7d2-8f2e6d735a6c)

---

## Uso
1. Abre el frontend en tu navegador.
2. Ingresa un nombre de usuario y selecciona un avatar.
3. ¡Comienza a chatear en tiempo real!

---

## Notas
- Si cambias el puerto del backend, actualiza la URL en los archivos del frontend (`useChat.ts`).
- El backend debe estar corriendo antes de abrir el frontend.
- Si tienes problemas con CORS, revisa la configuración de Express.

---

## Autor
@JuanRojasDev

// Backend principal para el chat en tiempo real
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { sequelize, Message } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para obtener historial de mensajes
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [['createdAt', 'ASC']] });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', async (data) => {
    try {
      const { username, content, avatarSeed } = JSON.parse(data);
      const message = await Message.create({ username, content, avatarSeed });
      // Websockets a todos los clientes que están conectados
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            id: message.id,
            username: message.username,
            content: message.content,
            avatarSeed: message.avatarSeed,
            createdAt: message.createdAt,
          }));
        }
      });
    } catch (err) {
      console.error('Error al procesar mensaje:', err);
    }
  });
});

// Configuración del puerto | Si viene de una variable de entorno, usarla; si no, usar 3001
const PORT = process.env.PORT || 3001;

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  });
});

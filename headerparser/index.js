const express = require('express');
const cors = require('cors');
const app = express();

// CORS para hacer requests
app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));


// Ruta principal opcional
app.get('/', (req, res) => {
  res.send('Microservicio de analizador de solicitud de encabezado');
});

// Ruta principal requerida por las pruebas
app.get('/api/whoami', (req, res) => {
  const ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({
    ipaddress: ipaddress?.split(',')[0], // solo la IP original
    language,
    software
  });
});

// Puerto de escucha
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

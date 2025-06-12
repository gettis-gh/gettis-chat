// server.js
import 'dotenv/config';
import { createHttpServer } from './httpServer.js';
import { createWebSocketServer } from './wsServer.js';

import sequelize from './database/sequelize.js';

(async () => {
  try {
      await sequelize.sync();
      console.log("✅ Database synced");
  } catch (error) {
      console.error("❌ DB sync error:", error.message);
  }
})();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const httpServer = createHttpServer();
createWebSocketServer(httpServer);

httpServer.listen(PORT, HOST, () => {
  console.log(`HTTP Server listening on http://${HOST}:${PORT}`);
  console.log(`WS Server listening on ws://${HOST}:${PORT}`);
});
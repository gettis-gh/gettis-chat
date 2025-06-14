// httpServer.js
import http from 'http';
import app from '../app.js';

export function createHttpServer() {
  return http.createServer(app);
}
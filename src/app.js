// app.js
import express from 'express';
import cookieParser from 'cookie-parser';

import apiRouter from './router/api.router.js';
import htmlRouter from './router/html.router.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', htmlRouter);      // Rutas de interfaz HTML
app.use('/api', apiRouter);    // Rutas API JSON

export default app;
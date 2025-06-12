// router/api.router.js
import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.use(express.static(path.join(__dirname, '../public')));

router.get('/', (req, res) => {
    return res.send('welcome!');
});

router.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, `../view/${page}.html`);
    res.sendFile(filePath, err => {
      if (err) {
        res.status(404).send('Page not found.');
      }
    });
});

export default router;
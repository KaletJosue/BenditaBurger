import express from 'express';
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './routes/routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4000;

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

export default app;

app.use('/', router);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

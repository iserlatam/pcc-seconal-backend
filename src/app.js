import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression'

import authRoutes from './api/routes/auth.routes.js'
import certificadosRoutes from './api/routes/certificados.routes.js'

// DOTENV
dotenv.config()

// EXPRESS
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json())
app.use(compression())

app.use('/server/v1/auth', authRoutes)
app.use('/server/v1/certificados', certificadosRoutes)

app.get((req, res) => {
    res.status(404).send({ message: 'Error 404: not found' })
})

export default app;
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './api/routes/auth.routes.js'
import usersRoutes from './api/routes/users.routes.js'
import certificadosRoutes from './api/routes/certificados.routes.js'

// DOTENV
dotenv.config()

// EXPRESS
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

app.use('/server/v1/auth', authRoutes)
app.use('/server/v1/usuarios', usersRoutes)
app.use('/server/v1/certificados', certificadosRoutes)

app.get((req, res) => {
    res.status(404).send({ message: 'Error 404 No Encontrado' })
})

export default app;
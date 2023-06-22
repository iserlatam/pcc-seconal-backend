import jwt from 'jsonwebtoken';
import connection from '../db/conn.js';

export const verifyToken = async (token) => {
  try {
    const key = process.env.MINECRAFT;
    return jwt.verify(token, key);
  } catch (e) {
    return null;
  }
};

export const generateToken =  async (user) => {
  const key = process.env.MINECRAFT;
  const newToken = jwt.sign(
    {
      id: user.id,
      alias: user.alias,
      correo: user.correo,
    },
    key,
    { expiresIn: '5D' }
  );
  return newToken;
};

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = await verifyToken(token);

    req.userId = tokenData.id;

    connection.query(
      'SELECT * FROM usuarios WHERE id = ?',
      [req.userId],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta:', err);
          res.status(500).json({ error: 'Error al auténticar el usuario' });
          return;
        }

        if (results.length === 0) {
          res.status(404).json({ error: 'El usuario no existe' });
          return;
        }

        if (tokenData.id){
          next()
        } else {
            return res.status(403).json({ message: 'No se ha provicionado el token'})
        }
      }
    );
  } catch (e) {
    return res.status(401).json({ message: 'No autorizado'})
  }
};

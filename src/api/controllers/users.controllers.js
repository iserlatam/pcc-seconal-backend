import connection from '../../db/conn.js';

export const obtenerUsuarios = (req, res) => {
  try {
    connection.query('SELECT * FROM usuarios', (err, results) => {
      if (err) throw err;

      res.send({ res: 'ok', data: results });
    });
  } catch (e) {
    console.error(e);
  }
};

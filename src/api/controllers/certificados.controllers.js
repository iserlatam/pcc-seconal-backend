import connection from '../../db/conn.js';

// OBTENER CERTIFICADOS
export const obtenerCertificados = (req, res) => {
  try {
    connection.query('SELECT * FROM certificados', (err, results) => {
      if (err) throw err;

      console.dir(results.length);

      res.json(results);
    });
  } catch (e) {
    console.error(e);
  }
};

// OBTENER CERTIFICADO POR DOCUMENTO
export const obtenerCertificadoPorDocumento = (req, res) => {
  try {
    const { documento } = req.params;

    connection.query(
      'SELECT * FROM certificados WHERE documento = ?',
      [documento],
      (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          res.send({
            message: 'No se encontraron registros con este número de documento',
          });
        } else {
          res.send({
            message: 'Datos recopilados con éxito',
            data: results,
          });
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
};

// CREAR CERTIFICADO
export const crearCertificado = (req, res) => {
  try {
    const {
      nombre_completo,
      tipo_doc,
      documento,
      fecha_creacion,
      departamento,
      ciudad,
      empresa,
      curso,
      codigo_certificado,
    } = req.body;

    const docFixed = tipo_doc.toLowerCase()

    connection.query(
      `INSERT INTO certificados (
        nombre_completo,
        tipo_doc,
        documento,
        fecha_creacion,
        departamento,
        ciudad,
        empresa,
        curso,
        codigo_certificado
       ) VALUES (
        ?,?,?,?,?,?,?,?,?
       )`,
      [
        nombre_completo,
        docFixed,
        documento,
        fecha_creacion,
        departamento,
        ciudad,
        empresa,
        curso,
        codigo_certificado,
      ],
      (err, results) => {
        if (err) throw err;
        res.send({ message: 'Registro guardado con éxito', data: results });
      }
    );
  } catch (e) {
    console.error(e);
  }
};

// ACTUALIZAR CERTIFICADO
export const actualizarCertificado = (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre_completo,
      tipo_doc,
      documento,
      departamento,
      fecha_creacion,
      ciudad,
      empresa,
      curso,
      codigo_certificado,
    } = req.body;

    if (codigo_certificado.length >= 11) {
      res
        .status(400)
        .send({
          message: "Demasiados caracteres para el campo 'codigo_certificado'",
        });
    } else {
      // TAREA PENDIENTE: VERIFICAR EL ID DEL CERTIFICADO ANTES DE HACER LA ACCION Y
      connection.query(
        'SELECT * FROM certificados WHERE id = ?',
        [id],
        (err, results) => {
          if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send({ error: 'Error al verificar el registro' });
            return;
          }

          if (results.length === 0) {
            res
              .status(404)
              .send({ error: 'Este registro no se encuentra en el sistema' });
            return;
          }

          connection.query(
            `UPDATE certificados SET
        nombre_completo = ?,
        tipo_doc = ?,
        documento = ?,
        fecha_creacion = ?,
        departamento = ?,
        ciudad = ?,
        empresa = ?,
        curso = ?,
        codigo_certificado = ?
        WHERE id = ?`,
            [
              nombre_completo,
              tipo_doc,
              documento,
              fecha_creacion,
              departamento,
              ciudad,
              empresa,
              curso,
              codigo_certificado,
              id,
            ],
            (updateErr) => {
              if (updateErr) {
                console.error('Error al ejecutar la consulta:', updateErr);
                res.status(500).send({ error: 'Error interno del servidor' });
                return;
              }

              res.json({
                message: 'El certificado ha sido actualizado correctamente',
              });
            }
          );
        }
      );
    }
  } catch (e) {
    console.error(e);
  }
};

// ELIMINAR CERTIFICADO
export const eliminarCertificado = (req, res) => {
  try {
    const { id } = req.params;
    // TAREA PENDIENTE: VERIFICAR EL DOCUMENTO ANTES DE HACER LA ACCION :: COMPLETADO
    // TAREA COMPLETADA --------------------------------------------------

    connection.query(
      'SELECT * FROM certificados WHERE id = ?',
      [id],
      (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta:', err);
          res.status(500).send({ error: 'Error al verificar el registro' });
          return;
        }

        if (results.length === 0) {
          res
            .status(400)
            .send({ error: 'Este registro no se encuentra en el sistema' });
          return;
        }

        connection.query(
          'DELETE FROM certificados WHERE id = ?',
          [id],
          (deleteErr) => {
            if (deleteErr) {
              console.error('Error al ejecutar la consulta:', deleteErr);
              res.status(500).send({ error: 'Error interno del servidor' });
              return;
            }

            res.json({
              message: 'El certificado ha sido eliminado correctamente',
            });
          }
        );
      }
    );
  } catch (e) {
    console.error(e);
  }
};

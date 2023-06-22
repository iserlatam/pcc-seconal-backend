import Router from 'express';
import * as certificadosCtrl from '../controllers/certificados.controllers.js';
import { checkAuth } from '../../auth/authJwt.js';
const router = Router();

// OBTENER CERTIFICADOS
router.route('/').get(checkAuth, certificadosCtrl.obtenerCertificados);

// OBTENER CERTIFICADO POR DOCUMENTO
router
  .route('/registro/documento/:documento')
  .get(checkAuth, certificadosCtrl.obtenerCertificadoPorDocumento);

// CREAR CERTIFICADO
router.route('/nuevo-registro').post(checkAuth, certificadosCtrl.crearCertificado);

// ACTUALIZAR CERTIFICADO
router
  .route('/actualizar-registro/id/:id')
  .put(checkAuth, certificadosCtrl.actualizarCertificado);

// ELIMINAR CERTIFICADO
router
  .route('/eliminar-registro/id/:id')
  .delete(checkAuth, certificadosCtrl.eliminarCertificado);

export default router;

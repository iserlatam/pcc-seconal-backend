import Router from 'express';
import * as authCtrl from '../controllers/auth.controllers.js';
const router = Router();

router.route('/registro').post(authCtrl.registro);

router.route('/ingreso').post(authCtrl.ingreso);

export default router;

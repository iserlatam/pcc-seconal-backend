import Router from 'express';
import * as usersCtrl from '../controllers/users.controllers.js';
const router = Router();

router.route('/').get(usersCtrl.obtenerUsuarios);

export default router;
import {Router} from 'express';
import MainController from '../controller/mainController.mjs';

const router = Router();

router.get('/', MainController.mainPage);

export default router;

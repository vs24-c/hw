import {Router} from 'express';
import ProductsController from '../controller/productsController.mjs';

const router = Router();

router.get('/', ProductsController.mainProd);

router.get('/create', ProductsController.prodForm);

router.post('/create', ProductsController.addNewProd);

router.get('/edit/:id', ProductsController.getEditProd);

router.post('/edit/:id', ProductsController.updateProd);

router.get('/:id', ProductsController.getfindAndShowByID);

router.delete('/:id', ProductsController.deleteProd);

export default router;

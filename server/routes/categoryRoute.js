import { Router } from 'express';
import indexCtrl from '../controller/indexCtrl';

const router = Router();

router.get('/', indexCtrl.categoryCtrl.findAll);
router.get('/:id', indexCtrl.categoryCtrl.findOne);
router.post('/', indexCtrl.categoryCtrl.create);

export default router;
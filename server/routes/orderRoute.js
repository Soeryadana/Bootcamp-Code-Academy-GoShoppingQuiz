import { Router } from 'express';
import indexCtrl from '../controller/indexCtrl';

const router = Router();

router.post('/add-to-cart', indexCtrl.orderCtrl.addToCart);
router.post('/create', indexCtrl.orderCtrl.createOrder);
router.put('/close/:order_id', indexCtrl.orderCtrl.closeOrder);
router.put('/cancel/:order_id', indexCtrl.orderCtrl.cancelOrder);

export default router;
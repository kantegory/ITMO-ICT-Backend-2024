import {Router} from 'express';
import WarehouseController from '../controllers/WarehouseController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/warehouses', authMiddleware, WarehouseController.createWarehouse);
router.get('/warehouses', authMiddleware, WarehouseController.getWarehouses);

export default router;

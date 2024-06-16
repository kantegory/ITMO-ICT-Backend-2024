import express from 'express';
import { OrdersController } from '../../controllers/orders/ordersController';


const router = express.Router();
const ordersController = new OrdersController();


router.post('/', async (req, res) => {
     ordersController.createOrder(req, res);
  });
  
  router.get('/:orderId', async (req, res) => {
     ordersController.getOrderById(req, res);
  });
  
  router.put('/:orderId', async (req, res) => {
     ordersController.updateOrderQuantity(req, res);
  });
  
  router.delete('/:orderId', async (req, res) => {
     ordersController.deleteOrder(req, res);
  });

  router.get('/users/:userId', async (req, res) => {
    ordersController.findOrdersByUserId(req, res);
});


export default router;
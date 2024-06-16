import express from 'express';
import { DiscountController } from '../../controllers/discounts/discountsController';

const router = express.Router();
const discountController = new DiscountController();


router.post('/', async (req, res) => {
     discountController.createDiscount(req, res);
  });
  
  router.get('/:id', async (req, res) => {
     discountController.getDiscountById(req, res);
  });
  
  router.get('/', async (req, res) => {
     discountController.getAllDiscounts(req, res);
  });
  
  router.put('/:id', async (req, res) => {
     discountController.updateDiscount(req, res);
  });
  
  router.delete('/:id', async (req, res) => {
     discountController.deleteDiscount(req, res);
  });
  
  router.post('/addProduct', async (req, res) => {
     discountController.addProductToDiscount(req, res);
  });
  
  router.post('/removeProduct', async (req, res) => {
     discountController.removeProductFromDiscount(req, res);
  });
  
export default router;
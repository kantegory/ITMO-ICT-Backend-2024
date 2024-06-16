import express from 'express';
import PromotionController from '../../controllers/promotions/promotionController';


const router = express.Router();

const promotionController = new PromotionController();

router.post('/', (req, res) => {
  promotionController.createPromotion(req, res);
});

router.post('/:promotionId/products/:productId', (req, res) => {
  promotionController.addProductToPromotion(req, res);
});

router.delete('/products/:productId', (req, res) => {
  promotionController.removeProductFromPromotion(req, res);
});

router.get('/:promotionId/products', (req, res) => {
  promotionController.getProductsByPromotion(req, res);
});

router.get('/:promotionId', (req, res) => {
  promotionController.getPromotionById(req, res);
});



export default router;

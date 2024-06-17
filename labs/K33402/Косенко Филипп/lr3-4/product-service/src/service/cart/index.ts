import Basket, {BasketAtributes}from "../../models/basket";
import Product, { ProductAtributes } from "../../models/product";
// import User, { UserAtributes } from "../../models/users";

class BasketService {

    async getAll(){
        try{
            const result = await Basket.findAll();
            return (result.length === 0 || result === undefined) ? 'no data' : result;
        }catch (err){ 
            return err;
        }
    };

    async getById(id: number){
        try{
            const item = await Basket.findByPk(id);
            return item;
        }catch(err){
            return err
        }
    };

    async getByUserId(userId: number){
        try{
            const result = await Basket.findAll({where:{userId: userId}});
            return result;
        }catch(err){
            return err
        }
    };

    
    async create(userId: number, productId: number, basketData: Omit<BasketAtributes, 'product' | 'user'>) : Promise<Basket>{
        try{
            // const user: any = await User.findOne({where: {id: userId}});
            const product: any = await Product.findOne({where: {id: productId}});
            const result = await Basket.create({...basketData, userId: userId, productId: product.id, productName: product.name});
            return result;
        }catch (err){
            throw err;
        }
    };

    async updateProduct(basketId: number, basketData: BasketAtributes){
        try{
            const result = await Basket.update(
                {productId: basketData.productId, product: basketData.product},
                {where: {id: basketId}}
            );
            return result;
        }catch (err){
            return err;
        }
    };

}

export default BasketService;
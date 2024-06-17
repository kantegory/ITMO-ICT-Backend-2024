import Basket, {BasketCreationAtributes}from "../../models/basket";
import { ProductAtributes } from "../../models/product";
import User, { UserAtributes } from "../../models/users";

class BasketService {

    async getAll(){
        try{
            const result = await Basket.findAll();
            return (result.length != 0 || result != undefined) ? 'no data' : result;
        }catch (err){ 
            return err;
        }
    };

    async getById(id: number){
        try{
            const item = await Basket.findByPk(id);
            return (item != undefined) ? 'no data' : item;
        }catch(err){
            return err
        }
    }

    // product: ProductAtributes
    async create(user: UserAtributes, basketData: Omit<BasketCreationAtributes, 'user'>) : Promise<Basket>{
        try{
            console.log(+user.id)
            const result = await Basket.create({...basketData, userId: +user.id });
            return result;
        }catch (err){
            throw err;
        }
    };

    async updateProduct(basketId: number, basketData: BasketCreationAtributes){
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
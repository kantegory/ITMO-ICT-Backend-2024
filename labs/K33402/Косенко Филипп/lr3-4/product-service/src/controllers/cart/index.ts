import BasketService from "../../service/cart";
import { Request, Response } from "express";
import ProductServic from "../../service/product";

export default class BasketController{
    private basketcontroller: BasketService;
    private products: ProductServic

    constructor(){
        this.basketcontroller = new BasketService();
        this.products = new ProductServic();
    }

    get = async (req: Request, res: Response) =>{
        try{
            const result = await this.basketcontroller.getAll();
            res.status(200).send(result);
        }catch(err){
            res.status(400).send(err);
        }
    };

    getById = async (req: Request, res: Response) => {
        try{
            const result = await this.basketcontroller.getById(Number(req.params.id));
            res.status(200).send(result);
        }catch (err){
            res.status(400).send(err);
        }
    };

    create = async (req: Request, res: Response) => {
        try{
            const result = await this.basketcontroller.create(req.body.userId, req.body.productId, req.body);
            const substr = await this.products.subQuantity(req.body.productId, req.body.count);
            console.log(substr)
            res.status(200).send({result});
        }catch (err){
            res.status(400).send(err);
        }
    };

    update = async (req: Request, res: Response) => {
        try{
            const result = await this.basketcontroller.updateProduct(Number(req.params.id), req.body.product);
            res.status(200).send(result);
        }catch (err){
            res.status(400).send(err);
        }
    };

}
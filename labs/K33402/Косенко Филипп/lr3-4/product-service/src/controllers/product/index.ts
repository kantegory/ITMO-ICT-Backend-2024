import { Request, Response } from "express";
import ProductServic from "../../service/product";

export default class ProductController {
    private productcontroller: ProductServic;

    constructor(){
        this.productcontroller = new ProductServic()
    };

    get = async (req: Request, res:Response) => { 
        try{
            const product = await this.productcontroller.getAll();
            res.status(200).send(product)
        }catch (err){
            console.log(err);
            res.status(400).send(err);
        }
    };

    getId = async (req: Request, res: Response) => {
        try{
            const id: number = Number(req.params.id)
            const result = await this.productcontroller.getById(id);
            if(result === null){
                res.status(404).send(`Not found product`);
                return
            };
            res.status(200).send(result);
        }catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    };

    create = async (req: Request, res: Response) => {
        try{
            console.log(req.body)
            // const 
            const product = await this.productcontroller.createProduct(req.body);
            res.status(200).send(product);
        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    };

    getQuantity = async (req: Request, res: Response) => {
        try{
            const id: number = Number(req.params.id)
            const result = await this.productcontroller.getQuantity(id);
            if(result === null){
                res.status(404).send(`Not found product`);
                return
            };
            const {quantity} = result;
            res.status(200).send({quantity});
        }catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    };

    update = async (req: Request, res: Response) => {
        try{
            const id = req.body.id;
            const result = await this.productcontroller.update(id, req.body);
            res.status(200).send(`update \n ${result}`);
        }catch (err) {
            res.status(400).send(err);
        }
    };

    subtraction = async (req: Request, res: Response) => {
        try{
            const product = await this.productcontroller.getQuantity(req.body.id);
            const nowQuantity = product.quantity;
            const newQuantity = nowQuantity - req.body.number;
            const result = await this.productcontroller.subQuantity(req.body.id, newQuantity);
            res.status(200).send(result);
        }catch (err){
            res.status(400).send(err);
        }
    };



}
import { Request, Response } from "express";
import CurrencyServic from "../../service/currency";

export default class CurrencyController {
    private currencycontroller: CurrencyServic;

    constructor(){
        this.currencycontroller = new CurrencyServic()
    };

    get = async (req: Request, res:Response) => { 
        try{
            const product = await this.currencycontroller.getAll();
            res.status(200).send(product)
        }catch (err){
            console.log(err);
            res.status(400).send(err);
        }
    };

    getId = async (req: Request, res: Response) => {
        try{
            const id: number = Number(req.params.id);
            const result = await this.currencycontroller.getById(id);
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
            const product = await this.currencycontroller.createCurrancy(req.body);
            res.status(200).send(product);
        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    };

    getPrice = async (req: Request, res: Response) => {
        try{
            const id: number = Number(req.params.id);
            const result = await this.currencycontroller.getById(id);
            if(result === null){
                res.status(404).send(`Not found product`);
                return
            };
            res.status(200).send(result.price);
        }catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    };

    update = async (req: Request, res: Response) => {
        try{
            const id: number = Number(req.body.id);
            const result = await this.currencycontroller.updatePrice(id, req.body.price);
            res.status(200).send(`update \n ${result}`);
        }catch (err) {
            res.status(400).send(err);
        }
    };

    // subtraction = async (req: Request, res: Response) => {
    //     try{
    //         const product = await this.currancycontroller.getQuantity(req.body.id);
    //         const nowQuantity = product.quantity;
    //         const newQuantity = nowQuantity - req.body.number;
    //         const result = await this.currancycontroller.subQuantity(req.body.id, newQuantity);
    //         res.status(200).send(result);
    //     }catch (err){
    //         res.status(400).send(err);
    //     }
    // };



};
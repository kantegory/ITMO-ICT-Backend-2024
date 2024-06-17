import BalanceService from "../../service/balance";
import { Request, Response } from "express";

export default class BalanceController{
    private balancetcontroller: BalanceService;

    constructor(){
        this.balancetcontroller = new BalanceService();
    };

    get = async (req: Request, res: Response) =>{
        try{
            const result = await this.balancetcontroller.getAll();
            res.status(200).send(result);
        }catch(err){
            res.status(400).send(err);
        }
    };

    getById = async (req: Request, res: Response) => {
        try{
            const result = await this.balancetcontroller.getById(+req.params.id);
            res.status(200).send(result);
        }catch (err){
            res.status(400).send(err);
        }
    };

    getByUserId = async (req: Request, res: Response) => {
        try{ 
            const result = await this.balancetcontroller.getByUserId(+req.params.id);
            res.status(200).send(result)
        }catch(err){
            res.status(400).send(err)
        }
    };

    create = async (req: Request, res: Response) => {
        try{
            const result = await this.balancetcontroller.create(req.body.userId, req.body.productId, req.body);
            console.log(req.body.userId)
            res.status(200).send({result});
        }catch (err){
            res.status(400).send(err);
        }
    };

    update = async (req: Request, res: Response) => {
        try{
            const result = await this.balancetcontroller.update(+req.params.id, req.body.product);
            res.status(200).send(result);
        }catch (err){
            res.status(400).send(err);
        }
    };

}
import {Request, Response} from "express";
import User from "../models";
import { error } from "console";

class BaseUrl {
    get = async (req:Request, res:Response)=>{
        return res.send("hello World");
    };
    finde = async (req: Request, res: Response) => {
        try{
            const user = req.body;
            const {id} = user;
            const result:any = User.findOne({where: {id}}).then(err => 
                console.log(err)
            );
            const {name} = result;
            console.log(result.name)
            // const resiltParseToJSON = JSON.stringify(result.name)
            
            res.status(200).json({
                responce: name
            })
            
            }
        catch{
            console.log(error)
            }
        }
};



export default BaseUrl;
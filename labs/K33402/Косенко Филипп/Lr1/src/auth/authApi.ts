import User from "../models";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";


const AuthApi = async (req:Request, res:Response) =>{
    try{
        const user = req.body;

        const {email, password} = user;
        
        const ifUserExist = await User.findOne({where:
            {email: email}
        });

        if(!ifUserExist){
            res.status(400).json({
                status: 404,
                success: false,
                message: 'Not Found'
            });
            return
        };

        const isPasswordMatched =
            ifUserExist?.password === password;
    
            // ** if not matched send response that wrong password;
        
        if (!isPasswordMatched) {
            res.status(400).json({
            status: 400,
            success: false,
            message: "wrong password",
            });
            return;
        }

        const token = jwt.sign({ id: ifUserExist?.id, email: ifUserExist?.email },
            "YOUR_SECRET",
            {
              expiresIn: "1d",
            }
          );
        
        res.status(200).json({
            status: 202,
            success:true,
            message: 'token success',
            token: token
        });

    }catch( error: any ){
        res.status(400).json({
            status: 404,
            message: error.message.toString()
        });
    };
};

export default AuthApi

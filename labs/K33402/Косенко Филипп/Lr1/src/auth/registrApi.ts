import User from '../models';
import {Request, Response} from "express";

 
const RegisterPost = async (req:Request, res:Response) => {
    try {
        // ** Get The User Data From Body ;
        const user = req.body;
        console.log(user)
        // ** destructure the information from user;
        const { name, email, password } = user;
    
        const isEmailAllReadyExist = await User.findOne({ 
            where: {email: email}
        });
    
        // ** Add a condition if the user exist we will send the response as email all ready exist
        if (isEmailAllReadyExist) {
          res.status(400).json({
            status: 400,
            message: "Email all ready in use",
          });
            return;
        }
    
        // now create the user;
        const newUser = await User.create({
          name: name,
          email: email,
          password: password
        });
    
        // Send the newUser as  response;
        res.status(200).json({
          status: 201,
          success: true,
          message: " User created Successfully",
          user: newUser,
        });
      } catch (error: any) {
        // console the error to debug
        console.log(error);
    
        // Send the error message to the client
        res.status(400).json({
          status: 400,
          message: error.message.toString(),
        });
      }
    }


export default RegisterPost
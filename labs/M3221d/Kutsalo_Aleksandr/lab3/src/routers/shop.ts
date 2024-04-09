import { Router } from "express";



const shopRouter = Router()

shopRouter.route('/')
    .get((req,res) => {
        res.render('shop/index.pug', {title: 'world'})
    })


export default shopRouter
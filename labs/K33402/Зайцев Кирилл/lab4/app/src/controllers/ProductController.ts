import { Request, Response } from 'express'
import { Product } from '../models/product.js'
import {Op} from "sequelize";

export class ProductController {
    public async create(req: Request, res: Response): Promise<void> {
        const { name, category, price, stock, discount } = req.body
        try {
            const product = await Product.create({ name, category, price, stock, discount })
            res.status(201).json(product)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const { name, category, price, stock, discount } = req.body
        try {
            const product = await Product.findByPk(id)
            if (product) {
                product.update({ name, category, price, stock, discount })
                res.json(product)
            } else {
                res.status(404).json({ error: 'Product not found' })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    public async search(req: Request, res: Response): Promise<void> {
        const { query } = req.query

        if (!query) {
            res.status(400).json({ error: 'Query parameter is required' })
            return
        }

        try {
            const products = await Product.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { category: { [Op.like]: `%${query}%` } }
                    ]
                }
            })
            res.json(products)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

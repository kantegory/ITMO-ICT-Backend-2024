import { Request, Response } from 'express'
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {
    public async register(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, email, password, isAdmin } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        try {
            const user = await User.create({ firstName, lastName, email, password: hashedPassword, isAdmin })
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'SECRET_KEY', { expiresIn: '1h' })
            res.json({ token })
        } else {
            res.status(401).json({ error: 'Invalid credentials' })
        }
    }
}

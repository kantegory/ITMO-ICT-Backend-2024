import { Request, Response } from 'express';
import axios from 'axios';

const PRODUCT_SERVICE_URL = 'http://localhost:3001';

export class ProxyController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.post(`${PRODUCT_SERVICE_URL}/products`, req.body);
            res.status(response.status).json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.put(`${PRODUCT_SERVICE_URL}/products/${req.params.id}`, req.body);
            res.status(response.status).json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    }

    public async search(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/search`, { params: req.query });
            res.status(response.status).json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    }
}

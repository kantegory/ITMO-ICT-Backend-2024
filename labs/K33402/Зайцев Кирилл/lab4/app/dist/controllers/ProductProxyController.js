import axios from 'axios';
const PRODUCT_SERVICE_URL = 'http://localhost:3001';
export class ProductProxyController {
    async create(req, res) {
        try {
            const response = await axios.post(`${PRODUCT_SERVICE_URL}/products`, req.body);
            res.status(response.status).json(response.data);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    }
    async update(req, res) {
        try {
            const response = await axios.put(`${PRODUCT_SERVICE_URL}/products/${req.params.id}`, req.body);
            res.status(response.status).json(response.data);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    }
    async search(req, res) {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/search`, { params: req.query });
            res.status(response.status).json(response.data);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    }
}
//# sourceMappingURL=ProductProxyController.js.map
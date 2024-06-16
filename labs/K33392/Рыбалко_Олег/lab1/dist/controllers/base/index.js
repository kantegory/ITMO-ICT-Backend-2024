export class BaseController {
    constructor() {
        this.get = async (req, res) => {
            try {
                const data = await this.service.findByPk(+req.params.pk);
                if (!data) {
                    res.status(404).json({ error: 'Resource not found' });
                    return;
                }
                res.status(200).json(data);
            }
            catch (error) {
                console.log('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        this.post = async (req, res) => {
            try {
                res.status(201).send(await this.service.create(req.body));
            }
            catch (error) {
                console.log('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        this.put = async (req, res) => {
            try {
                const updatedData = await this.service.updateByPk(+req.params.pk, req.body);
                res.status(200).json(updatedData);
            }
            catch (error) {
                console.log('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        this.delete = async (req, res) => {
            try {
                const deletedCount = await this.service.deleteByPk(+req.params.pk);
                if (deletedCount === 0) {
                    res.status(404).json({ error: 'Resource not found' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.log('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
    }
}
//# sourceMappingURL=index.js.map
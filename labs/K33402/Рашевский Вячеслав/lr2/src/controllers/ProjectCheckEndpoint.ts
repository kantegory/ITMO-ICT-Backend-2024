import { Request, Response } from 'express';

export class ProjectCheckEndpoint {
    static check(req: Request, res: Response): void {
        res.status(200).json({ status: 'ok' });
    }
}
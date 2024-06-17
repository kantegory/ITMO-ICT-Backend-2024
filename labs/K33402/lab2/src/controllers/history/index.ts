import HistoryService from "../../service/history";
import {Request, Response} from 'express';

class HistoryControll {
    private historycontrol : HistoryService;

    constructor(){
        this.historycontrol = new HistoryService;
    };

    get = async (req: Request, res: Response) => {
        try{
            const result = await this.historycontrol.getById(+req.params.id);
            res.status(200).send(result);
        }catch{
            res.status(400).send(Error)
        }
        
    };
}

export default HistoryControll
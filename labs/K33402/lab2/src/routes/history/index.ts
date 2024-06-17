import HistoryControll from "../../controllers/history";
import Express from 'express';

const rout: Express.Router = Express.Router();
const history = new HistoryControll()

rout.get('/:id', history.get);

export default rout
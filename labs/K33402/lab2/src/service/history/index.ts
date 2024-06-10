import History from "../../models/history";

class HistoryService {
    async getById(curId: number){
        try{
            const result = await History.findAll({where: {idCurrency: curId}});
            if(!result){
                throw new Error;
            }
            return result
        }catch(err){
            return err
        }
    };

    async delete(id: number){
        try{
            const result = await History.destroy({where: {id: id}});
            return result
        }catch (err){
            return err
        }
    };
}

export default HistoryService
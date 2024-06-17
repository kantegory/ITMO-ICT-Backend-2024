import Balance, {BalanceAtributes}from "../../models/balance";
import Currancy from "../../models/currency";
// import User, { UserAtributes } from "../../models/users";

class BalanceService {

    async getAll(){
        try{
            const result = await Balance.findAll();
            return (result.length === 0 || result === undefined) ? 'no data' : result;
            // return result
        }catch (err){ 
            return err;
        }
    };

    async getById(id: number){
        try{
            const item = await Balance.findByPk(id);
            return item;
        }catch(err){
            return err
        }
    }

    async getByUserId(userId: number){
        try{
            const item = await Balance.findAll({where: {userId: userId}});
            return item;
        }catch(err){
            return err
        }
    }

    // product: ProductAtributes
    async create(userId: number, currencyId: number, basketData: Omit<BalanceAtributes, 'currency' | 'user'>){
        try{
            // const user: any = await User.findOne({where: {id: userId}});
            const currancy: any = await Currancy.findOne({where: {id: currencyId}});
            const result = await Balance.create({...basketData, userId: userId, currencyId: currancy.id, currency: currancy.name});
            return result;
        }catch (err){
            throw err;
        }
    };

    async update(balanceId: number, balanceData: BalanceAtributes){
        try{
            const result = await Balance.update(
                {currency: balanceData.currency, currencyId: balanceData.currencyId, count: balanceData.count},
                {where: {id: balanceId}}
            );
            return result;
        }catch (err){
            return err;
        }
    };

    async delete(id: number){
        try{
            const result = await Balance.destroy({where: {id: id}});
            return result;
        }catch{
            return Error;
        }
    }

}

export default BalanceService;
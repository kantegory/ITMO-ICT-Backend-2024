import Currancy , { CurrancyCreationAttributes }  from "../../models/currency";
import History from "../../models/history";

class CurrancyServic {
    async getAll(){
        try{
            const result = Currancy.findAll();
            return result != undefined ? result : 'Sorry yuor DB is empty';
        }catch (err){
            console.log(err);
        }
    };

    async getById(id: number){
        try{
            const result : any = await Currancy.findByPk(id);
            return result;
        }catch (err){
            console.log(err);
            return err;
        }
    };

    async createCurrancy(currencyData: CurrancyCreationAttributes): Promise<Currancy>{
        try{
            const currency = await Currancy.create(currencyData);
            return currency;
        }catch (err) {
            console.log(err);
            throw err;
        }
    };

    async updatePrice(currencyId: number, newPrice: number){
        try{
            const laterPrice: any = await Currancy.findByPk(currencyId);
            const historyItem = await History.create({ ...laterPrice, idCurrency: laterPrice.id, nameCur: laterPrice.name, priceCur: laterPrice.price});
            const result: any = await Currancy.update(
                {price: newPrice},
                {where: {id: currencyId}}
            );
            console.log(historyItem);
            return result;
        }catch (err){
            console.log(err);
        }
    };

    async delete(id: number){
        try{
            const result = await Currancy.destroy({where:{id: id}});
            return result;
        }catch{
            return Error
        }
    }

}

export default CurrancyServic
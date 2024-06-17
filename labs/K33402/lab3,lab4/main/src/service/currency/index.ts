import Currency , { CurrancyCreationAttributes }  from "../../models/currency";
import History from "../../models/history";

class CurrencyServic {
    async getAll(){
        try{
            const result = Currency.findAll();
            return result != undefined ? result : 'Sorry yuor DB is empty';
        }catch (err){
            console.log(err);
        }
    };

    async getById(id: number){
        try{
            const result : any = await Currency.findByPk(id);
            return result;
        }catch (err){
            console.log(err);
            return err;
        }
    };

    async createCurrancy(currencyData: CurrancyCreationAttributes): Promise<Currency>{
        try{
            const currency = await Currency.create(currencyData);
            return currency;
        }catch (err) {
            console.log(err);
            throw err;
        }
    };

    async updatePrice(currencyId: number, newPrice: number){
        try{
            const laterPrice: any = await Currency.findByPk(currencyId);
            const historyItem = await History.create({ ...laterPrice, idCurrency: laterPrice.id, nameCur: laterPrice.name, priceCur: laterPrice.price});
            const result: any = await Currency.update(
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
            const result = await Currency.destroy({where:{id: id}});
            return result;
        }catch{
            return Error
        }
    }

}

export default CurrencyServic
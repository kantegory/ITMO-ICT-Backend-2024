import Bear from '../../models/Bear'
import BearError from '../../errors/bears/error'


class BearService {
    async getById(id: number) : Promise<Bear> {
        try {
            const bear = await Bear.findByPk(id)
            if (!bear){
                throw new BearError(`Bear ${id} not found`);
            }
            return bear
        } 
        catch (error){
            throw new BearError(`Bear error: ${(error as Error).message}`)
        }
    }

    async create(bearData: any) : Promise<Bear> {
        try {
            const bear = await Bear.create(bearData)
            return bear
        }
        catch (error){
            throw new BearError(`Bear error: ${(error as Error).message}`)
        }
    }
}

export default BearService
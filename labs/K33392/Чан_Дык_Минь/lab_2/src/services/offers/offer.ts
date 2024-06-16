import { Offer } from '../../models/offers/offer';
import { UserActivity } from '../../models/activities/activity'
import { LocationActivity } from '../../models/activities/activity'
import { Op } from 'sequelize';
class OfferService {

    async create(offerData: any): Promise<Offer> {
        try {
            const offer = await Offer.create(offerData);
            return offer;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<Offer> {
        try {
            const offer = await Offer.findByPk(id);
            if (!offer)
                throw new Error('Offer not found');
            return offer;
        } catch (error) {
            throw error;
        }
    }

    async getAll(type?: string, price?: number): Promise<Offer[]> {
        try {
            let whereCondition: any = {};
            console.log(type,price)
            if (type) {
                whereCondition.type = type;
            }
            
            if (price) {
                whereCondition.price = { [Op.lte]: price }; 
            }
            
            const offers = await Offer.findAll({
                where: whereCondition, 
            });
    
            return offers;
        } catch (error) {
            throw error;
        }
    }

    async getOfferForUser(user_id: string, type?: string, price?: number): Promise<Offer[]> {
        try {
            const activities = await UserActivity.findAll({ where: { user_id: user_id } });
          
            if (!activities || activities.length === 0) {
                return []; 
            }
            
            const activityIds = activities.map(activity => activity.activity_id);
    
            const locationSet: Set<string> = new Set();
            
            const locationPromises = activityIds.map(async activityId => {
                const locationsWithActivity = await LocationActivity.findAll({ where: { activity_id: activityId } });
                locationsWithActivity.forEach(location => {
                    locationSet.add(location.location_id);
                });
            });
    
            await Promise.all(locationPromises);
    
            const locationIds: string[] = [...locationSet];
            
            const offerPromises: Promise<Offer[]>[] = [];
            
            locationIds.forEach(locationId => {
                let whereCondition: any = { location_id: locationId };
    
                // Kiểm tra và thêm điều kiện cho type và price nếu được chỉ định
                if (type) {
                    whereCondition.type = type;
                }
    
                if (price) {
                    whereCondition.price = { [Op.lte]: price };
                }
    
                const offerPromise = Offer.findAll({ where: whereCondition });
                offerPromises.push(offerPromise);
            });
    
            const allOffers = await Promise.all(offerPromises);
    
            const flattenedOffers = allOffers.flat();
            return flattenedOffers;
        } catch (error) {
            throw error;
        }
    }
    

    async update(id: number, offerData: any): Promise<Offer> {
        try {
            const [, updatedRowsCount]: [any, any] = await Offer.update(offerData, {
                where: { id },
                returning: true,
            });

            if (updatedRowsCount === 0) {
                throw new Error('Offer not found');
            }

            const updatedOffer = await Offer.findOne({ where: { id } });
            if (!updatedOffer) {
                throw new Error('Updated offer not found');
            }
            return updatedOffer;
        } catch (error) {
            throw error;
        }
    }



    async delete(id: number): Promise<number> {
        try {
            const deletedRowsCount = await Offer.destroy({
                where: { id },
            });
            if (deletedRowsCount === 0) {
                throw new Error('Offer not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }

}

export default OfferService;

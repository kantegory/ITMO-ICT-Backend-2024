import { Offer, OfferAttributes, OfferCreationAttributes } from '../../models/offers/offer';
import { Op, WhereOptions } from 'sequelize';
import axios from 'axios';
import { request } from 'http';
class OfferService {

    async create(offerData: OfferCreationAttributes): Promise<Offer> {
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
            let whereCondition: WhereOptions = {};
           
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

    async getOfferForUser(token : string, type?: string, price?: number): Promise<Offer[]> {
        try {
            const response = await axios.get('http://localhost:8000/users-activities/v1/all-user-activity',  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const activities = response.data
            if (!activities || activities.length === 0) {
                return [];
            }
            const activityIds = activities.map((activity: { activityId: string; }) => activity.activityId);
    
            const locationSet: Set<string> = new Set();
            console.log(activityIds)
            const locationPromises = activityIds.map(async (activityId: string) => {
                try {
                    const response = await axios.post('http://localhost:8000/locations-activities/v1/activity', {
                        activityId: activityId
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const locationsWithActivity = response.data;
                    locationsWithActivity.forEach((location: { locationId: string; }) => {
                        locationSet.add(location.locationId);
                    });
                } catch (error) {
                    console.error(`Error fetching locations for activityId ${activityId}:`, error);
                }
            });
    
            await Promise.all(locationPromises);
    
            const locationIds: string[] = [...locationSet];
    
            const offerPromises: Promise<Offer[]>[] = [];
    
            locationIds.forEach(locationId => {
                let whereCondition: WhereOptions = { locationId: locationId };
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
    

    async update(id: number, offerData: Partial<OfferAttributes>): Promise<Offer> {
        try {
            const [affectedRowsCount, updatedOffers]: [number, Offer[]] = await Offer.update(offerData, {
                where: { id },
                returning: true,
            });
    
            if (affectedRowsCount === 0) {
                throw new Error('Offer not found');
            }
    
            const updatedOffer = updatedOffers[0];
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

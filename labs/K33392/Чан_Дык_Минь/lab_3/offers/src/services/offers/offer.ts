import { Offer } from '../../models/offers/offer';
import { Op } from 'sequelize';
import axios from 'axios';
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
            console.log(type, price)
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

    async getOfferForUser(userId: string, type?: string, price?: number): Promise<Offer[]> {
        try {
            const response = await axios.post('http://localhost:8000/users-activities/v1/all-user-activity', {
                userId: userId
            });
            const activities = response.data
            if (!activities || activities.length === 0) {
                return [];
            }
            const activityIds = activities.map((activity: { activityId: string; }) => activity.activityId);

            const locationSet: Set<string> = new Set();

            const locationPromises = activityIds.map(async (activityId: string) => {
                try {
                    const response = await axios.post('http://localhost:8000/locations-activities/v1/activity', {
                        activityId: activityId
                    });
                    const locationsWithActivity = response.data;
                    locationsWithActivity.forEach((location: { location_id: string; }) => {
                        locationSet.add(location.location_id);
                    });
                } catch (error) {
                    console.error(`Error fetching locations for activityId ${activityId}:`, error);
                }
            });

            await Promise.all(locationPromises);


            const locationIds: string[] = [...locationSet];

            const offerPromises: Promise<Offer[]>[] = [];

            locationIds.forEach(locationId => {
                let whereCondition: any = { locationId: locationId };
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

import Offer from '../../models/offers/offer';
import OfferService from '../../services/offers/offer'
import { getErrorMessage } from '../../utils/getErrorMessage';
export default class OfferController {
    private offerService: OfferService

    constructor() {
        this.offerService = new OfferService()
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request;
            const offer: any = await this.offerService.create(body)
            response.status(201).send(offer)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAll = async (request: any, response: any) => {
        console.log("getAll");
        try {
            const { type, max_price } = request.body;
            // console.log(type, max_price)
            const offers: any = await this.offerService.getAll(type, max_price)
            response.status(201).send(offers)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }
    getById = async (request: any, response: any) => {
        try {
            const { body } = request;
            const offerId = body.offer_id;
            const offer: any = await this.offerService.getById(offerId);
            response.status(201).send(offer);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getOfferForUser = async (request: any, response: any) => {
        try {
            const user_id = request.user.id;
            const { type, max_price } = request.body; 
  
            const offers: any = await this.offerService.getOfferForUser(user_id, type, max_price);
    
            response.status(200).send(offers);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const offerId = request.params.id;
            const deletedOffer: any = await this.offerService.delete(offerId)
            
            response.status(201).send('Offer has been successfully deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request;
        const userId = request.user.id;
        const offerId = request.params.trip_id;

        try {
            const updatedOffer: any = await this.offerService.update(offerId, { ...body, userId: userId })
            response.status(201).send(updatedOffer)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
}
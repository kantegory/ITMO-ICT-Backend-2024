import Offer from '../../models/offers/offer';
import OfferService from '../../services/offers/offer'
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Request, Response } from 'express';

export default class OfferController {
    private offerService: OfferService

    constructor() {
        this.offerService = new OfferService()
    }

    create = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const offer: Offer = await this.offerService.create(body)
            response.status(201).send(offer)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    getAll = async (request: Request, response: Response) => {
        console.log("getAll");
        try {
            const { type, max_price } = request.body;
            // console.log(type, max_price)
            const offers: Offer[] = await this.offerService.getAll(type, max_price)
            response.status(201).send(offers)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }
    getById = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const offer: Offer = await this.offerService.getById(body.id);
            response.status(201).send(offer);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    getOfferForUser = async (request: any, response: Response) => {
        try {
           
            const token = request.token
            const { type, max_price } = request.body; 
           
            const offers: Offer[] = await this.offerService.getOfferForUser(token , type, max_price);
    
            response.status(200).send(offers);
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error));
        }
    }

    delete = async (request: Request, response: Response) => {
        try {
            const { body } = request;
            const deletedOffer: number = await this.offerService.delete(body.id)
            
            response.status(201).send('Offer has been successfully deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: Response) => {
        const { body } = request;
        const userId = request.user.id;
        const offerId = request.params.trip_id;

        try {
            const updatedOffer: Offer = await this.offerService.update(offerId, { ...body, userId: userId })
            response.status(201).send(updatedOffer)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }
}
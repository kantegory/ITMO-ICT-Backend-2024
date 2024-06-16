import ExchangeRequest from '../../models/exchangeRequest/ExchangeRequest'
import ExchangeRequestError from '../../errors/exchangeRequest/ExchangeRequest'

class ExchangeRequestService {
    async getById(id: number) : Promise<ExchangeRequest | ExchangeRequestError> {
        const exchangeRequest = await ExchangeRequest.findByPk(id)

        if (exchangeRequest) return exchangeRequest.toJSON()

        throw new ExchangeRequestError('Not found!')
    }

    async getAll() : Promise<ExchangeRequest[]|ExchangeRequestError> {
        const exchangeRequests = await ExchangeRequest.findAll()

        if (exchangeRequests) return exchangeRequests

        throw new ExchangeRequestError('Not found!')
    }

    async getByApplicant(applicantId: number) : Promise<ExchangeRequest[]|ExchangeRequestError> {
        const exchangeRequest = await ExchangeRequest.findAll({ where: { "applicantId": applicantId } })

        if (exchangeRequest) return exchangeRequest

        throw new ExchangeRequestError('Not found!')
    }

    async create(exchangeRequestData: any) : Promise<ExchangeRequest|ExchangeRequestError> {
        try {
            const exchangeRequest = await ExchangeRequest.create(exchangeRequestData)

            return exchangeRequest.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new ExchangeRequestError(errors)
        }
    }

    async update(id: number, exchangeRequestData: any) : Promise<ExchangeRequest|ExchangeRequestError> {
        try {
            const exchangeRequest = await ExchangeRequest.findByPk(id)

            if (exchangeRequest) {
                const updateExchangeRequest = await exchangeRequest.update(exchangeRequestData)   

                return updateExchangeRequest.toJSON()
            }

            throw new ExchangeRequestError('Not found!')
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new ExchangeRequestError(errors)
        }
    }

    async delete(id: number) : Promise<void|ExchangeRequestError> {
        try {
            const exchangeRequest = await ExchangeRequest.findByPk(id)

            if (exchangeRequest) {
                const deletedExchangeRequest = await exchangeRequest.destroy() 

                return deletedExchangeRequest
            }

            throw new ExchangeRequestError('Not found!')
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new ExchangeRequestError(errors)
        }
    }
}

export default ExchangeRequestService
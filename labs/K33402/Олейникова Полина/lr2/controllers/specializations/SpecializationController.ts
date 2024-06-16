import SpecializationService from '../../services/specializations/SpecializationService'

export default class SpecializationController {
    private specializationService: SpecializationService

    constructor() {
        this.specializationService = new SpecializationService()
    }

    get = async (request: any, response: any) => {
        try {
            const specialization = await this.specializationService.getAll()
            response.status(200).send(specialization)
        } catch (error: any) {
            response.status(404).send({ "error": error.toString() })
        }
    }

    create = async (request: any, response: any) => {
        try {
            const specialization = await this.specializationService.create(request.body)
            response.status(200).send(specialization)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const specialization = await this.specializationService.update(request.user, request.params.id, request.body)
            response.status(200).send(specialization)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.specializationService.delete(request.user, request.params.id)
            response.status(200).send({ "message": 'Specialization have successful deleted' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }
}
import FavoriteService from '../../services/favorites/FavoriteService'

export default class FavoriteController {
    private favoriteService: FavoriteService

    constructor() {
        this.favoriteService = new FavoriteService()
    }

    get = async (request: any, response: any) => {
        try {
            const favorites = await this.favoriteService.getAll(request.user)
            response.status(200).send(favorites)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    create = async (request: any, response: any) => {
        try {
            await this.favoriteService.create(request.user, request.params.articleId)
            response.status(200).send({ "message": 'Favorite have successful created' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.favoriteService.delete(request.user, request.params.articleId)
            response.status(200).send({ "message": 'Favorite have successful deleted' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }
}
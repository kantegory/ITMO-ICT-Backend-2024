import LikeService from '../../services/likes/LikeService'

export default class LikeController {
    private likeService: LikeService

    constructor() {
        this.likeService = new LikeService()
    }

    create = async (request: any, response: any) => {
        try {
            await this.likeService.create(request.user, request.params.articleId)
            response.status(200).send({ "message": 'Like have successful created' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.likeService.delete(request.user, request.params.articleId)
            response.status(200).send({ "message": 'Like have successful deleted' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }
}
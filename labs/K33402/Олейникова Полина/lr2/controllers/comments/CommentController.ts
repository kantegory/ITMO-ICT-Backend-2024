import CommentService from '../../services/comments/CommentService'

export default class CommentController {
    private commentService: CommentService

    constructor() {
        this.commentService = new CommentService()
    }

    get = async (request: any, response: any) => {
        try {
            const comments = await this.commentService.getAll(request.params.articleId)
            response.status(200).send(comments)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    create = async (request: any, response: any) => {
        try {
            const comment = await this.commentService.create(request.user, request.body)
            response.status(200).send(comment)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const comment = await this.commentService.update(request.user, request.params.id, request.body)
            response.status(200).send(comment)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.commentService.delete(request.user, request.params.id)
            response.status(200).send({ "message": 'Comment have successful deleted' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }
}
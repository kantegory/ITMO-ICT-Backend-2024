import ArticleService from '../../services/articles/ArticleService'

export default class ArticleController {
    private articleService: ArticleService

    constructor() {
        this.articleService = new ArticleService()
    }

    get = async (request: any, response: any) => {
        try {
            const article = await this.articleService.getById(request.params.id)
            response.status(200).send(article)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const articles = await this.articleService.getAll(request.query)
            response.status(200).send(articles)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    create = async (request: any, response: any) => {
        try {
            const userId = request.headers['user-id']
            const article = await this.articleService.create(userId, request.body)
            response.status(200).send(article)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const userId = request.headers['user-id']
            const userRole = request.headers['user-role']
            const article = await this.articleService.update(userId, userRole, request.params.id, request.body)
            response.status(200).send(article)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    updateStatus = async (request: any, response: any) => {
        try {
            const userRole = request.headers['user-role']
            const article = await this.articleService.updateStatus(userRole, request.params.id, request.body)
            response.status(200).send(article)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const userId = request.headers['user-id']
            const userRole = request.headers['user-role']
            await this.articleService.delete(userId, userRole, request.params.id)
            response.status(200).send({ "message": 'Article have successful deleted' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }
}
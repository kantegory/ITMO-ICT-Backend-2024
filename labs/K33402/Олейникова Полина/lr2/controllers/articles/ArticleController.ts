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
            const article = await this.articleService.create(request.user, request.body)
            response.status(200).send(article)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const article = await this.articleService.update(request.user, request.params.id, request.body)
            response.status(200).send(article)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    updateStatus = async (request: any, response: any) => {
        try {
            const article = await this.articleService.updateStatus(request.user, request.params.id, request.body)
            response.status(200).send(article)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.articleService.delete(request.user, request.params.id)
            response.status(200).send({ "message": 'Article have successful deleted' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }
}
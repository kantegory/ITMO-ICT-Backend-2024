import UserService from "../../services/user/userService"
import { Request, Response } from "express"
import User, {} from "../../models/user/User"
import UserMapper from "../../mapper/user/userMapper"
import PasswordHandler from "../../utils/PasswordHandler"
import { RatingAdd, UserRatingAddRequest } from "../../models/rating/Rating"

class UserController {
    private readonly userService: UserService
    private readonly userMapper = new UserMapper()
    private readonly passwordHandler = new PasswordHandler()

    constructor(userService: UserService) {
        this.userService = userService
    }

    addRating = async (request: Request, response: Response) => {
        let body: UserRatingAddRequest = request.body
        const target_user = await this.userService.findByEmail(body.target_email)

        if (!target_user || body.rating > 5 || body.rating < 0) {
            return response.status(404).send()
        }

        const data: RatingAdd = {
            rating: target_user.rating+body.rating,
            amount_of_rates: target_user.amount_of_rates+1,
        }
        try {
            const updatedUser = await this.userService.addRating(target_user.id, data)
            return response.status(200).send({"message": "Updated"})

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

}

export default UserController
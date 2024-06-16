import { transform } from 'shared-core'
import UserProfileTransformer from '../transformers/userProfileTransformer'
import { ApiResponse } from 'shared-core'
import { BaseController } from "shared-core";
import express, {NextFunction} from 'express';
import { UserProfile } from "../../providers/sequelize";
import FindUserProfileUseCase from "../useCases/userProfiles/findUserProfileUseCase";
import UpdateUserProfileUseCase from "../useCases/userProfiles/updateUserProfileUseCase";
import {body} from "express-validator";

class UserProfileController extends BaseController {

    my = async (request: express.Request, response: express.Response) => {
        const userProfile: UserProfile|null = await FindUserProfileUseCase.run(request.user.id)
        ApiResponse.payload(response, transform(userProfile, new UserProfileTransformer()))
    }

    updateMy = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            await this.validate(request, [
                body('maxBudget').optional({nullable: true}).isInt(),
                body('hasChildren').optional({nullable: true}).isBoolean(),
                body('peopleCount').optional({nullable: true}).isInt(),
                body('comfortLevels').notEmpty().isArray(),
                body('difficultyLevels').notEmpty().isArray(),
                body('places').notEmpty().isArray(),
                body('tourActivities').notEmpty().isArray(),
                body('tourTypes').notEmpty().isArray(),
            ])
            // todo validate array of ids

            const userProfile = await UpdateUserProfileUseCase.run(request.user.id, request.body)
            ApiResponse.payload(response, transform(userProfile, new UserProfileTransformer()))
        } catch (e: any) {
            next(e)
        }
    }
}

export default UserProfileController
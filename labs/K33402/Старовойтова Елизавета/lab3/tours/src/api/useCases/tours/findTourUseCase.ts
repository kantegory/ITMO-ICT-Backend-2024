import { Tour } from "../../../providers/sequelize";
import { errors } from "shared-core";
import { ComfortLevel } from "../../../providers/sequelize";
import { DifficultyLevel } from "../../../providers/sequelize";
import { Place } from "../../../providers/sequelize";
import { TourActivity } from "../../../providers/sequelize";
import { TourType } from "../../../providers/sequelize";


class FindTourUseCase {
    static async run(id: number): Promise<Tour> {
        // @ts-ignore
        const tour = await Tour.findByPk(id, {
            include: [
                { model: ComfortLevel },
                { model: DifficultyLevel },
                { model: Place },
                { model: TourActivity },
                { model: TourType },
            ]
        });
        if (!tour) {
            throw new errors.NotFoundError('Tour does not exists')
        }
        return tour
    }
}

export default FindTourUseCase
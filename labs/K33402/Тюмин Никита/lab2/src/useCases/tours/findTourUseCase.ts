import Tour from "../../models/tour";
import {NotFoundError} from "../../errors";
import ComfortLevel from "../../models/dictionaries/comfortLevel";
import DifficultyLevel from "../../models/dictionaries/difficultyLevel";
import Place from "../../models/dictionaries/place";
import TourActivity from "../../models/dictionaries/tourActivity";
import TourType from "../../models/dictionaries/tourType";


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
            throw new NotFoundError('Tour does not exists')
        }
        return tour
    }
}

export default FindTourUseCase
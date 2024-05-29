import Tour from "../../models/tour";
import {NotFoundError} from "../../errors";


class DestroyTourUseCase {
    static async run(id: number): Promise<void> {
        const tour = await Tour.findByPk(id);
        if (!tour) {
            throw new NotFoundError('Tour does not exists')
        }

        await tour.destroy()
    }
}

export default DestroyTourUseCase
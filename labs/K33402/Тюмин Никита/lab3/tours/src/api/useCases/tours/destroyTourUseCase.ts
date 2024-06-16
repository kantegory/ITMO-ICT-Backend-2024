import { Tour } from "../../../providers/sequelize";
import { errors } from "shared-core";


class DestroyTourUseCase {
    static async run(id: number): Promise<void> {
        const tour = await Tour.findByPk(id);
        if (!tour) {
            throw new errors.NotFoundError('Tour does not exists')
        }

        await tour.destroy()
    }
}

export default DestroyTourUseCase
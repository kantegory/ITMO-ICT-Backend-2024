import {ModelCtor} from "sequelize-typescript";
import {Op} from "sequelize";

interface ISeedable {
    id: number
    [key: string]: any
}

class BaseSeeder {
    data: any[]
    cls: ModelCtor

    async seed(destroyOther: boolean = false): Promise<void> {
        for (let item of this.data) {
            const existing = await this.cls.findByPk(item.id)

            if (existing) {
                await existing.update(item)
            } else {
                await this.cls.create(item)
            }
        }
        if (destroyOther) {
            await this.cls.destroy({
                where: {
                    id: {
                        [Op.notIn]: this.data.map(el => el.id)
                    }
                }
            })
        }
    }
}

export default BaseSeeder
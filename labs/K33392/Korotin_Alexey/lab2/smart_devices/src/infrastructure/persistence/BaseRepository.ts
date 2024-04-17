import {Model, Repository} from "sequelize-typescript";
import {Identifier} from "sequelize";
import {Entity} from "../../domain/meta";
import {Mapper} from "./mapper";


export default abstract class BaseRepository<ID extends Identifier, E extends Entity<ID>, M extends Model> {

    protected constructor(protected repository: Repository<M>, protected mapper: Mapper<E, M>) {
    }

    public async findById(id: ID): Promise<E> {
        const model: M | null = await this.repository.findByPk(id, {include: {all: true}})
            .then(m => {
                if (m) {
                    return m.reload();
                }
                return m;
            });
        if (model) {
            return Promise.resolve(this.mapper.toEntity(model));
        }
        return Promise.reject({message: "Not found"});

    }

    public async findAll(): Promise<E[]> {
        let models: M[] = await this.repository.findAll({include: {all: true}});

        return Promise.all(models.map(async m => this.mapper.toEntity(await m.reload())));
    }

    public abstract save(entity: E): Promise<E>;

    public async deleteById(id: ID): Promise<void> {
        const whereOptions: any = {
            id: id
        };
        const result = await this.repository.destroy({
            where: whereOptions
        });
        return result > 0 ? Promise.resolve() : Promise.reject({message: "Not found"});
    }
}
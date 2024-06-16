import {Model, Repository} from "sequelize-typescript";
import {Identifier} from "sequelize";
import {Entity} from "../../../../domain/meta";


export default abstract class BaseRepository<ID extends Identifier, E extends Entity<ID>, M extends Model> {

    protected constructor(protected repository: Repository<M>) {
    }

    public async findById(id: ID): Promise<E> {
        const model: M | null = await this.repository.findByPk(id);
        if (model) {
            return Promise.resolve(this.mapToEntity(model));
        }
        return Promise.reject({message: "Not found"});

    }

    public async findAll(): Promise<E[]> {
        const models: M[] = await this.repository.findAll();
        return Promise.resolve(models.map(this.mapToEntity));
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

    protected abstract mapToEntity(model: M): E;
}
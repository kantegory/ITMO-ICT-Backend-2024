import { DogCreationError, DogNotFound } from '../../errors/dogs/Dog.js';
import { Dog } from '../../models/dogs/Dog.js';
export class DogsService {
    async create(data) {
        try {
            const dog = await Dog.create(data);
            return dog.toJSON();
        }
        catch (e) {
            const errors = e.errors.map((error) => error.message);
            throw new DogCreationError(errors);
        }
    }
    async get(id) {
        const dog = await Dog.findByPk(id);
        if (dog)
            return dog.toJSON();
        throw new DogNotFound(`Dog with id ${id} was not found`);
    }
}
//# sourceMappingURL=Dog.js.map
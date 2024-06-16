import Specialization, { SpecializationAttributes, SpecializationCreationAttributes } from '../../models/specializations/Specialization'
import { RoleType, UserAttributes } from '../../models/users/User';

class SpecializationService {
    async getAll(): Promise<Specialization[]> {
        try {
            const specializations = await Specialization.findAll()
            return specializations
        } catch (error) {
            throw error;
        }
    }

    async create(specializationData: SpecializationCreationAttributes): Promise<Specialization> {
        try {
            const specialization = await Specialization.create(specializationData)
            return specialization
        } catch (error) {
            throw error;
        }
    }

    async update(user: UserAttributes, specializationId: SpecializationAttributes, specializationData: Pick<SpecializationAttributes, 'name'>): Promise<Specialization> {
        try {
            if (user.role !== RoleType.ADMIN) {
                throw new Error('Not enough rights');
            }
            const [updatedRowsCount, updatedSpecialization] = await Specialization.update(
                { name: specializationData.name },
                {
                    where: { id: specializationId },
                    returning: true,
                });

            if (updatedRowsCount === 0) {
                throw new Error('Specialization not found');
            }
            return updatedSpecialization[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(user: UserAttributes, specializationId: string): Promise<number> {
        try {
            if (user.role !== RoleType.ADMIN) {
                throw new Error('Not enough rights');
            }
            const deletedRowsCount = await Specialization.destroy({ where: { id: specializationId } });
            if (deletedRowsCount === 0) {
                throw new Error('Specialization not found');
            }
            return deletedRowsCount;
        } catch (error) {
            throw error;
        }
    }
}

export default SpecializationService
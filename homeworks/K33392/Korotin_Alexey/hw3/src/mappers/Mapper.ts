import {Model} from "sequelize-typescript";
import Dto from "../dtos/Dto";

interface Mapper<E extends Model> {
    toDto(entity: E): Dto;
}

export default Mapper;

import { Identifier } from "sequelize";
import { Transport, TransportCreate } from "../../models/transport/Transport";
import { BasicCrudInterface } from "../CRUDService";

export interface CrudTransportInterface<USER_ID extends Identifier> extends BasicCrudInterface<number, Transport, TransportCreate>{
    findById(id: number): Promise<Transport | null>;
    create(data: TransportCreate): Promise<Transport>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: TransportCreate): Promise<Transport>;
    findAll(): Promise<Array<Transport> | null>;
    findAllByUserId(user_id: USER_ID): Promise<Array<Transport> | null>;
}
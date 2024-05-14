import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class ExchangeRequest extends Model {
  public id!: number;
  public userId!: number;
  public exchangeWithUserId!: number;
  public bookId!: number;
  public bookTitle!: string;
  public status!: string;
}

ExchangeRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exchangeWithUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'ExchangeRequest',
  }
);

export { ExchangeRequest };

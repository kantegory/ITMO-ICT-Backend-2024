import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Book } from "./Book";

class UserBook extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
}

UserBook.init(
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
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserBook",
  }
);

UserBook.belongsTo(Book, { foreignKey: "bookId", as: "book" });

export { UserBook };

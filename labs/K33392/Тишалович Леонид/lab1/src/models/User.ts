import { DataTypes, Model, Sequelize } from "sequelize";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
}

export default function (sequelize: Sequelize): typeof User {
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
}

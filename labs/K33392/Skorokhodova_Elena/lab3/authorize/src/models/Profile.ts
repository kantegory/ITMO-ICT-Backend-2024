import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Profile extends Model {
  public id!: number;
  public userId!: number;
  public location!: string;
  public bio!: string;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Profile",
  }
);

export { Profile };

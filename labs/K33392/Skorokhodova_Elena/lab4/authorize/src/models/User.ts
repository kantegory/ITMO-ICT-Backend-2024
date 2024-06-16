import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import bcrypt from "bcrypt";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  public async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user: User) => {
        await user.hashPassword();
      },

      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          await user.hashPassword();
        }
      },
    },
  }
);

export { User };

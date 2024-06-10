import bcrypt from 'bcrypt'
import {
	Column,
	DataType,
	Model,
	PrimaryKey,
	Table,
	Unique,
} from 'sequelize-typescript'

@Table
class User extends Model {
	@PrimaryKey
	@Column(DataType.INTEGER)
	declare id: number

	@Column(DataType.STRING)
	name!: string

	@Unique
	@Column(DataType.STRING)
	public email!: string

	@Unique
	@Column(DataType.STRING)
	public password!: string

	public async hashPassword() {
		if (this.password) {
			this.password = await bcrypt.hash(this.password, 10)
		}
	}

	public async checkPassword(password: string) {
		return await bcrypt.compare(password, this.password)
	}
}

export default User

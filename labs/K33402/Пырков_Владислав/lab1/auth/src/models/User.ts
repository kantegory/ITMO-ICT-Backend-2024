import bcrypt from 'bcrypt'
import { Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'

@Table
class User extends Model {
	@PrimaryKey
	@Column
	declare id: number

	@Column
	name!: string

	@Unique
	@Column
	public email!: string

	@Unique
	@Column
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

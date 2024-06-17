import bcrypt from 'bcrypt'
import {
	AutoIncrement,
	Column,
	DataType,
	Model,
	PrimaryKey,
	Table,
	Unique,
} from 'sequelize-typescript'

@Table({
	tableName: 'User',
})
class User extends Model {
	@PrimaryKey
	@AutoIncrement
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
		return bcrypt.compare(password, this.password, (err, data) => {
			if (data) {
				return true
			}
			return false
		})
	}
}

export default User

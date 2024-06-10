import {
	AutoIncrement,
	Column,
	Model,
	PrimaryKey,
	Table,
	Unique,
} from 'sequelize-typescript'

@Table
class User extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	declare id: number

	@Column
	username!: string

	@Unique
	@Column
	email!: string

	@Unique
	@Column
	password!: string
}

export default User

import { Column, Model, Table } from 'sequelize-typescript'

@Table
class User extends Model<User> {
	@Column
	username!: string

	@Column({ unique: true })
	email!: string

	@Column({ unique: true })
	password!: string
}

export default User

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
	declare name: string

	@Unique
	@Column(DataType.STRING)
	declare email: string

	@Unique
	@Column(DataType.STRING)
	declare password: string
}

export default User

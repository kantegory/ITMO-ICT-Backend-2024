import {
	AutoIncrement,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript'

import Book from './Book'
import User from './User'

@Table({
	tableName: 'UserHasBook',
})
class UserHasBook extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number

	@ForeignKey(() => User)
	@Column(DataType.INTEGER)
	userId!: string

	@ForeignKey(() => Book)
	@Column(DataType.INTEGER)
	bookId!: string
}

export default UserHasBook

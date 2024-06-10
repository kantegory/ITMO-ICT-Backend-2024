import {
	AutoIncrement,
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
	Unique,
} from 'sequelize-typescript'

import Book from './Book'
import User from './User'

@Table
class UserHasBook extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	declare id: number

	@ForeignKey(() => User)
	@Column
	userId!: string

	@ForeignKey(() => Book)
	@Column
	bookId!: string
}

export default UserHasBook

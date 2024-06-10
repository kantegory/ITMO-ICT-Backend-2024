import {
	AutoIncrement,
	Column,
	Default,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript'

import Book from './Book'
import User from './User'

@Table
class Exchange extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	declare id: number

	@ForeignKey(() => User)
	@Column
	senderId!: string

	@ForeignKey(() => User)
	@Column
	recepientId!: string

	@ForeignKey(() => Book)
	@Column
	bookId!: string

	@Column
	@Default('pending')
	status!: string
}

export default Exchange

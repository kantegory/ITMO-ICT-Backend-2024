import {
	AutoIncrement,
	Column,
	DataType,
	Default,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript'

import Book from './Book'
import User from './User'

@Table({
	tableName: 'Exchange',
})
class Exchange extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number

	@ForeignKey(() => User)
	@Column(DataType.INTEGER)
	senderId!: number

	@ForeignKey(() => User)
	@Column(DataType.INTEGER)
	recepientId!: number

	@ForeignKey(() => Book)
	@Column(DataType.INTEGER)
	bookId!: number

	@Default('pending')
	@Column(DataType.STRING)
	status!: string
}

export default Exchange

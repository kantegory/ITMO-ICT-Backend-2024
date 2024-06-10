import {
	AutoIncrement,
	Column,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript'

@Table
class Book extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	declare id: number

	@Column
	title!: string

	@Column
	author!: string
}

export default Book

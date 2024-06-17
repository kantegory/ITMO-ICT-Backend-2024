import {
	AutoIncrement,
	Column,
	DataType,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript'

@Table({
	tableName: 'Book',
})
class Book extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number

	@Column(DataType.STRING)
	title!: string

	@Column(DataType.STRING)
	author!: string
}

export default Book

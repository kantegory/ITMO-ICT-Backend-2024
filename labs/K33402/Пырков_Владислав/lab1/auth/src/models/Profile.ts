import {
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript'

import User from './User'

@Table
class Profile extends Model {
	@PrimaryKey
	@Column(DataType.INTEGER)
	declare id: number

	@ForeignKey(() => User)
	@Column(DataType.INTEGER)
	userId!: number

	@Column(DataType.STRING)
	location!: string

	@Column(DataType.STRING)
	bio!: string
}

export default Profile

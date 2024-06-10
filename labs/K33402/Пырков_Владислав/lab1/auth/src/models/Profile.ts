import {
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript'

import User from './User'

@Table
class Profile extends Model {
	@PrimaryKey
	@Column
	declare id: number

	@ForeignKey(() => User)
	@Column
	userId!: number

	@Column
	location!: string

	@Column
	bio!: string
}

export default Profile

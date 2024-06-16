import {
    Column, BelongsTo, PrimaryKey, Model, Table, ForeignKey, BelongsToMany,
} from 'sequelize-typescript'
import TourActivity from "./dictionaries/tourActivity";
import TourType from "./dictionaries/tourType";
import ComfortLevel from "./dictionaries/comfortLevel";
import DifficultyLevel from "./dictionaries/difficultyLevel";
import Place from "./dictionaries/place";
import User from "./user";

@Table({
    tableName: 'user_profiles'
})
class UserProfile extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId: number
    @Column
    maxBudget?: number
    @Column
    hasChildren?: boolean
    @Column
    peopleCount?: number

    @BelongsTo(() => User)
    user: User

    @BelongsToMany(() => ComfortLevel, {
        through: 'user_profile_has_comfort_level',
        foreignKey: 'userProfileId',
        otherKey: 'comfortLevelId',
    })
    comfortLevels: Array<ComfortLevel>
    @BelongsToMany(() => DifficultyLevel, {
        through: 'user_profile_has_difficulty_level',
        foreignKey: 'userProfileId',
        otherKey: 'difficultyLevelId',
    })
    difficultyLevels: Array<DifficultyLevel>
    @BelongsToMany(() => Place, {
        through: 'user_profile_has_place',
        foreignKey: 'userProfileId',
        otherKey: 'placeId',
    })
    places: Array<Place>
    @BelongsToMany(() => TourActivity, {
        through: 'user_profile_has_tour_activity',
        foreignKey: 'userProfileId',
        otherKey: 'tourActivityId',
    })
    tourActivities: Array<TourActivity>
    @BelongsToMany(() => TourType, {
        through: 'user_profile_has_tour_type',
        foreignKey: 'userProfileId',
        otherKey: 'tourTypeId',
    })
    tourTypes: Array<TourType>
}

export default UserProfile
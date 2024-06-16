import {
    BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey, Table,
} from 'sequelize-typescript'
import BaseModel from "./base";
import Place from "./dictionaries/place";
import DifficultyLevel from "./dictionaries/difficultyLevel";
import ComfortLevel from "./dictionaries/comfortLevel";
import TourActivity from "./dictionaries/tourActivity";
import TourType from "./dictionaries/tourType";

@Table({
    tableName: 'tours'
})
class Tour extends BaseModel {
    @Column
    name: string
    @Column
    price: number
    @Column
    canGoWithChildren: boolean
    @Column
    maxPeople: number

    @Column
    @ForeignKey(() => ComfortLevel)
    comfortLevelId: number
    @Column
    @ForeignKey(() => DifficultyLevel)
    difficultyLevelId: number
    @Column
    @ForeignKey(() => Place)
    placeId: number

    @BelongsToMany(() => TourActivity, {
        through: 'tour_has_tour_activity',
        foreignKey: 'tourId',
        otherKey: 'tourActivityId',
    })
    tourActivities: Array<TourActivity>
    @BelongsToMany(() => TourType, {
        through: 'tour_has_tour_type',
        foreignKey: 'tourId',
        otherKey: 'tourTypeId',
    })
    tourTypes: Array<TourType>

    @BelongsTo(() => ComfortLevel)
    comfortLevel: ComfortLevel
    @BelongsTo(() => DifficultyLevel)
    difficultyLevel: DifficultyLevel
    @BelongsTo(() => Place)
    place: Place
}

export default Tour
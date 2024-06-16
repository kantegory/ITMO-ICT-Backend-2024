import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AfterCreate } from 'sequelize-typescript';
import User from '../users/user';
import Location from '../locations/location';
import { Optional } from 'sequelize';

export interface ReviewAttributes {
  id: string;
  content: string;
  rating: number;
  user_id: string;
  location_id: string;
}

export type ReviewCreationAttributes = Optional<ReviewAttributes, 'id'>;

@Table
export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  content: string;

  @Column({
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  user_id: string;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.UUID,
  })
  location_id: string;

  @AfterCreate
  static async updateLocationRating(instance: Review) {
    const location = await Location.findByPk(instance.location_id);
    if (location) {
      const reviews = await Review.findAll({
        where: {
          location_id: instance.location_id,
        },
      });

      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      await location.update({ rating: averageRating });
    }
  }

}

export default Review;

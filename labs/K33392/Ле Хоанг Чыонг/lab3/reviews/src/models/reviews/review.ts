import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, AfterCreate } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import axios from 'axios';

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

  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @Column({
    type: DataType.UUID,
  })
  location_id: string;

  @AfterCreate
  static async updateLocationRating(instance: Review) {
    try {
      // Fetch location data
      const response = await axios.get(`http://localhost:8000/locations/v1/location`, {
        data: {
          id: instance.location_id,
        },
      });
      const location = response.data;

      if (location) {
        const reviews = await Review.findAll({
          where: {
            location_id: instance.location_id,
          },
        });

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        const roundedRating = Math.round(averageRating);

        // Update location rating
        await axios.put(`http://localhost:8000/locations/v1/update-location`, {
          id: instance.location_id,
          rating: roundedRating,
        });
      }
    } catch (error) {
      console.error('Error updating location rating:', error);
    }
  }
}

export default Review;

export type RatingAdd = {
    rating: number,
    amount_of_rates: number,
}

export type RatingAddRequest = {
    target_id: number,
    rating: number,
}

export type UserRatingAddRequest = {
    target_email: string,
    rating: number,
}

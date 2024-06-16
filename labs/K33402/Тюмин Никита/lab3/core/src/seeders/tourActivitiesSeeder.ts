import BaseSeeder from "./baseSeeder";
import {TourActivity} from "shared-database";


class TourActivitiesSeeder extends BaseSeeder {
    data = [
        {id: 1, name: 'Bike tours'},
        {id: 2, name: 'Helicopter tours'},
        {id: 3, name: 'Climbing'},
        {id: 4, name: 'Ski tours'},
        {id: 5, name: 'Diving and snorkeling'},
        {id: 6, name: 'Jeep tours'},
        {id: 7, name: 'Railway tours'},
        {id: 8, name: 'Canyoning'},
        {id: 9, name: 'Combined tours'},
        {id: 10, name: 'Horseback riding tours'},
        {id: 11, name: 'Ski trips'},
        {id: 12, name: 'Walking tours'},
        {id: 13, name: 'Fishing tours'},
        {id: 14, name: 'Surfing and SUP tours'},
        {id: 15, name: 'Alloys'},
        {id: 16, name: 'ATV tours'},
        {id: 17, name: 'Snowmobile Tours'},
        {id: 18, name: 'Dog Sledding Tours'},
        {id: 19, name: 'Fitness and yoga tours'},
        {id: 20, name: 'Excursion tours'},
        {id: 21, name: 'Expeditions'},
        {id: 22, name: 'Yachting'},
    ]
    cls = TourActivity
}

export default TourActivitiesSeeder
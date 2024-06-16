require('dotenv').config();
import ComfortLevelsSeeder from "./comfortLevelsSeeder";
import DifficultyLevelsSeeder from "./difficultyLevelsSeeder";
import PlacesSeeder from "./placesSeeder";
import TourActivitiesSeeder from "./tourActivitiesSeeder";
import TourTypesSeeder from "./tourTypesSeeder";
import BaseSeeder from "./baseSeeder";
import {initSequelize} from "../providers/sequelize";

class Seeder {
    static seeders: BaseSeeder[] = [
        new ComfortLevelsSeeder,
        new DifficultyLevelsSeeder,
        new PlacesSeeder,
        new TourActivitiesSeeder,
        new TourTypesSeeder,
    ]

    static async run() {
        await initSequelize()
        let promises = []
        for (let seeder of this.seeders) {
            promises.push(seeder.seed())
        }
        return Promise.all(promises)
    }
}

Seeder.run()
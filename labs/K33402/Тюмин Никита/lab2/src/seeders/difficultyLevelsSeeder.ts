import BaseSeeder from "./baseSeeder";
import DifficultyLevel from "../models/dictionaries/difficultyLevel";


class DifficultyLevelsSeeder extends BaseSeeder {
    data = [
        {id: 1, name: 'Base'},
        {id: 2, name: 'Amateur'},
        {id: 3, name: 'Advanced'},
        {id: 4, name: 'Hard'},
    ]
    cls = DifficultyLevel
}

export default DifficultyLevelsSeeder
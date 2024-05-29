import {ComfortLevel} from "shared-database";
import BaseSeeder from "./baseSeeder";


class ComfortLevelsSeeder extends BaseSeeder {
    data = [
        {id: 1, name: 'Basen'},
        {id: 2, name: 'Simple'},
        {id: 3, name: 'Average'},
        {id: 4, name: 'High'},
        {id: 5, name: 'Highest'},
    ]
    cls = ComfortLevel
}

export default ComfortLevelsSeeder
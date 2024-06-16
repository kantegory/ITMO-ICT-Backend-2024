import BaseSeeder from "./baseSeeder";
import Place from "../models/dictionaries/place";


class PlacesSeeder extends BaseSeeder {
    data = [
        {id: 1, name: 'Moscow'},
        {id: 2, name: 'SaintP'},
        {id: 3, name: 'Khabarovsk'},
        {id: 4, name: 'Vladivostok'},
        {id: 5, name: 'Irkutsk'},
    ]
    cls = Place
}

export default PlacesSeeder
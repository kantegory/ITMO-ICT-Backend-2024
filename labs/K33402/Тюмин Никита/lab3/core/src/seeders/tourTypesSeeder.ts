import BaseSeeder from "./baseSeeder";
import {TourType} from "shared-database";


class TourTypesSeeder extends BaseSeeder {
    data = [
        {id: 1, name: 'Bus tours'},
        {id: 2, name: 'Free cancellation'},
        {id: 3, name: 'Wine tours'},
        {id: 4, name: 'Gastronomic tours'},
        {id: 5, name: 'Historical tours'},
        {id: 6, name: 'Corporate tours'},
        {id: 7, name: 'Literary tours'},
        {id: 8, name: 'Mystical tours'},
        {id: 9, name: 'On rafts'},
        {id: 10, name: 'Unusual tours'},
        {id: 11, name: 'Sightseeing tours'},
        {id: 12, name: 'Health tours'},
        {id: 13, name: 'Vacation with children'},
        {id: 14, name: 'Educational tours'},
        {id: 15, name: 'Popular tours'},
        {id: 16, name: 'Glamping accommodation'},
        {id: 17, name: 'Event tours'},
        {id: 18, name: 'Spa tours'},
        {id: 19, name: 'Caving tours'},
        {id: 20, name: 'Tours for seniors'},
        {id: 21, name: 'Petroglyph Tours'},
        {id: 22, name: 'Kayak Tours'},
        {id: 23, name: 'Kayak Tours'},
        {id: 24, name: 'Thermal springs tours'},
        {id: 25, name: 'Khivus tours'},
        {id: 26, name: 'Wildlife watching tours'},
        {id: 27, name: 'Northern Lights Tours'},
        {id: 28, name: 'Dog friendly tours'},
        {id: 29, name: 'Photo tours'},
        {id: 30, name: 'Ecological tours'},
        {id: 31, name: 'Ethnotours'},
    ]
    cls = TourType
}

export default TourTypesSeeder
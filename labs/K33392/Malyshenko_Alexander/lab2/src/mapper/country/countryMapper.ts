import { Country } from "../../models/country/Country"

class CountryMapper {
    countryToDict(entity: Country) {
        return {
            id: entity.id,
            name: entity.name,
            main_language: entity.main_language,
        };
    }
}

export default CountryMapper
import SettingsModule from "../../../SettingsModule";
import axiosInstance from "../../../../../../../services/api";

/**
 * CountryModel class component
 */
class CountryModel extends SettingsModule {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.urlList = `/api/${this.getLang()}/admin/settings/countries/list`;
        this.urlAll = `/api/${this.getLang()}/admin/settings/countries/all`;
        this.urlBaseAllByContinentId = `/api/${this.getLang()}/admin/settings/countries/`;

        this.state = {
            allCountries: [],
            allCountriesByContinent: []
        }

        this.getAll = this.getAll.bind(this);
        this.getAllByContinentId = this.getAllByContinentId.bind(this);
    }

    /**
     * get all
     *
     * @param columns
     * @param conditions
     * @returns {Promise<axios.AxiosResponse<any> | boolean>}
     */
    getAll(columns, conditions) {
        return axiosInstance.post(this.urlAll, {columns, conditions}, this.config).then(response => {
            const result = response.data;

            if (result.success === true) {
                this.setState({allCountries: result.data})

                return result.data;
            }

            return false;
        }).catch(error => {
            return false;
        });
    }

    /**
     * get all by continentId
     *
     * @param columns
     * @param continentId
     * @returns {Promise<axios.AxiosResponse<any> | boolean>}
     */
    getAllByContinentId(columns, continentId) {
        const url = this.urlBaseAllByContinentId + continentId;
        return axiosInstance.post(url, {columns}, this.config).then(response => {
            const result = response.data;

            if (result.success === true) {
                this.setState({allCountriesByContinent: result.data});

                return result.data;
            }

            return false;
        }).catch(error => {
            return false;
        });
    }
}

export default CountryModel;
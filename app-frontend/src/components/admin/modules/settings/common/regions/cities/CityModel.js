import SettingsModule from "../../../SettingsModule";
import axiosInstance from "../../../../../../../services/api";

/**
 * CityModel class component
 */
class CityModel extends SettingsModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.urlList = `/api/${this.getLang()}/admin/settings/cities/list`;
        this.urlAll = `/api/${this.getLang()}/admin/settings/cities/all`;
        this.urlBaseAllByCountry = `/api/${this.getLang()}/admin/settings/cities/`;

        this.state = {
            allCities: []
        }

        this.getAll = this.getAll.bind(this);
    }

    /**
     * get all cities
     *
     * @param columns
     * @param condition
     * @returns {Promise<axios.AxiosResponse<any> | boolean>}
     */
    getAll(columns, condition) {
        return axiosInstance.post(this.urlAll, {columns, condition}, this.config).then(response => {
            const result = response.data;

            if (result.success === true) {
                this.setState({allCities: result.data});
                return result.data;
            }

            return false;
        }).catch(error => {
            return false;
        });
    }

    /**
     * get all cities by country id
     *
     * @param columns
     * @param countryId
     * @returns {Promise<axios.AxiosResponse<any> | boolean>}
     */
    getAllByCountryId(columns, countryId) {
        return axiosInstance.post(this.urlBaseAllByCountry + countryId, {columns}, this.config).then(response => {
            const result = response.data;

            if (result.success === true) {
                this.setState({allCities: result.data});
                return result.data;
            }

            return false;
        }).catch(error => {
            return false;
        });
    }
}

export default CityModel;
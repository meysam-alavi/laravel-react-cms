import SettingsModule from "../../../SettingsModule";
import axiosInstance from "../../../../../../../services/api";

class CountryModel extends SettingsModule {
    constructor(props) {
        super(props);

        this.urlList = `/api/${this.getLang()}/admin/settings/countries/list`;
        this.urlAll = `/api/${this.getLang()}/admin/settings/countries/all`;

        this.state = {
            allCountries: []
        }

        this.getAll = this.getAll.bind(this);
    }

    getAll() {
        return axiosInstance.post(this.urlAll, {}, this.config).then(response => {
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
}

export default CountryModel;
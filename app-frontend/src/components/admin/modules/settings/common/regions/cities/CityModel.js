import SettingsModule from "../../../SettingsModule";
import axiosInstance from "../../../../../../../services/api";


class CityModel extends SettingsModule {
    constructor(props) {
        super(props);

        this.urlList = `/api/${this.getLang()}/admin/user/settings/cities/list`;
        this.urlAll = `/api/${this.getLang()}/admin/user/settings/cities/all`;

        this.state = {
            allCities: []
        }

        this.getAll = this.getAll.bind(this);
    }

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
}

export default CityModel;
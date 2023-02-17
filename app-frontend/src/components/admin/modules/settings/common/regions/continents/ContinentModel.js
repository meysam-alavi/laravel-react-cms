import SettingsModule from "../../../SettingsModule";
import axiosInstance from "../../../../../../../services/api";


/**
 * ContinentModel Class Component
 */
class ContinentModel extends SettingsModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.urlList = `/api/${this.getLang()}/admin/settings/continents/list`;
        this.urlAll = `/api/${this.getLang()}/admin/settings/continents/all`;

        this.state = {
            continents: [],
            allContinents: [],
            links: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getList = this.getList.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    /**
     * get list
     *
     * @param url
     * @param parameters
     */
    getList(url, parameters) {
        axiosInstance.post(url, parameters, this.config).then(response => {
            const result = response.data;

            if (result.success === true) {
                this.setState({continents: result.data});
                this.setState((state, props) => {
                    return {links: result.data.links}
                });
            }

        }).catch(error => {

        });
    }

    /**
     * getAll
     *
     * @returns {Promise<AxiosResponse<any>|boolean>}
     */
    async getAll(columns) {
        return await axiosInstance.post(this.urlAll, {columns}, this.config).then(response => {
            const result = response.data;

            if (result.success === true) {
                this.setState({allContinents: result.data});

                return result.data;
            }

            return false;
        }).catch(error => {
            return false;
        });
    }
}

export default ContinentModel;
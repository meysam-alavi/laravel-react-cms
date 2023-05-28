import FootballModule from "./FootballModule";
import axiosInstance from "../../../../services/api";
import SWal from "sweetalert2";
import {flac} from "caniuse-lite/data/features";

class FootballTypeModel extends FootballModule {
    constructor(props) {
        super(props);

        this.urlAll = `/api/${this.getLang()}/admin/football/type/all`;
        this.allParentsUrl = `/api/${this.getLang()}/admin/football/type/all/parents`;
        this.addFootbalTypeUrl = `/api/${this.getLang()}/admin/football/type/add`;

        this.state = {
            allFootballType: []
        }
    }

    /**
     * get all FootballType
     *
     * @param columns
     * @returns {Promise<axios.AxiosResponse<any> | boolean>}
     */
    getAll(columns) {
        return axiosInstance.post(this.urlAll, {columns}, this.config).then(response => {
            const result = response.data;

            if (result.success === true) {
                this.setState({allFootballType: result.data});

                return result.data;
            }

            return false;
        }).catch(error => {
            return false;
        });
    }

    addFootballType(data) {
        let frmData = new FormData();

        frmData.append('title', data.title);
        frmData.append('description', data.description);
        frmData.append('num_Of_players', data.numOfPlayers)
        frmData.append('status', data.status);
        frmData.append('display_status', data.displayStatus);
        frmData.append('parent_id', data.parentId);
        frmData.append('imageId', data.imageId);

        return axiosInstance.post(this.addFootbalTypeUrl, frmData, this.config).then(response => {
            let endResult = false;
            const result = response.data;

            if (result.success === true) {
                SWal.fire('عملیات موفق', '', 'success');
                endResult = result;
            }

            return endResult;
        }).catch(error => {
            this.handleError(error);
        });
    }
}

export default FootballTypeModel;
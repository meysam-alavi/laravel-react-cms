import JobsModule from "./JobsModule";
import axiosInstance from "../../../../services/api";
import SWal from "sweetalert2";

class PositionModel extends JobsModule {
    constructor(props) {
        super(props);

        this.urlCreate = `/api/${this.getLang()}/admin/jobs/position/create`;

        this.create = this.create.bind(this);
    }


    create(data) {

        let config = this.config;
        config.headers['Content-Type'] = 'multipart/form-data';

        let frmData = new FormData();
        frmData.append('title', data.title);
        frmData.append('description', data.description);
        frmData.append('image', data.image);
        frmData.append('status', data.status);
        frmData.append('display_status', data.displayStatus);

        return axiosInstance.post(this.urlCreate, frmData, config).then(response => {
            let endResult = false;
            const result = response.data;

            if (result.success === true) {
                SWal.fire('','', 'success');
            }

            return endResult;
        }).catch(error => {
            this.handleError(error);
        });
    }
}

export default JobsModule;
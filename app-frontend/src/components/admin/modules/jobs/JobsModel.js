import React from "react";
import JobsModule from "./JobsModule";
import axiosInstance from "../../../../services/api";
import Swal from "sweetalert2";


/**
 * Jobs Model Class Component
 */
class JobsModel extends JobsModule {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.urlAdd = `/api/${this.getLang()}/admin/jobs/job/add`;
        this.urlPaginateList = `/api/${this.getLang()}/admin/jobs/job/paginate/list`;

        this.state = {
            messages: ''
        };

        this.add = this.add.bind(this);
        this.getPaginateList = this.getPaginateList.bind(this);
    }

    /**
     * add new job
     *
     * @param data
     * @returns {Promise<boolean>}
     */
    add(data) {

        let config = this.config;
        config.headers['Content-Type'] = 'multipart/form-data';

        let frmData = new FormData();
        frmData.append('title', data.title);
        frmData.append('description', data.description);
        frmData.append('parent_id', data.parentId);
        frmData.append('image', data.image);
        frmData.append('status', data.status);
        frmData.append('display_status', data.displayStatus);

        return axiosInstance.post(this.urlAdd, frmData, config).then(response => {
            let endResult = false
            const result = response.data;

            if (result.success === true) {
                Swal.fire(
                    'درج موفق',
                    'عملیات درج با موفقیت انجام شد',
                    'success'
                );

                endResult = true;
            }

            return endResult;
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * get paginate list
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
    getPaginateList() {
        return axiosInstance.get(this.urlPaginateList, this.config).then(response => {
            return response;
        }).catch(error => {
            this.handleError(error);
        });
    }
}

export default JobsModel;
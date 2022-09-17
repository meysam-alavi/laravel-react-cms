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
        return axiosInstance.post(this.urlAdd, data, this.config).then(response => {
            let endResult = false
            const result = response.data;

            if(result.success === true) {
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
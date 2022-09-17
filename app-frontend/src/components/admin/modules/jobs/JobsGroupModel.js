import React from "react";
import JobsModule from "./JobsModule";
import axiosInstance from "../../../../services/api";
import SWal from "sweetalert2";

/**
 * Jobs Group Model Class Component
 */
class JobsGroupModel extends JobsModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.urlCreate = `/api/${this.getLang()}/admin/jobs/group/create`;
        this.urlPaginateList = `/api/${this.getLang()}/admin/jobs/groups/paginate/list`;
        this.urlAll = `/api/${this.getLang()}/admin/jobs/groups/all`;

        this.state = {
            messages: ''
        };

        this.create = this.create.bind(this);
        this.getPaginateList = this.getPaginateList.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    /**
     * create
     *
     * @param data
     */
    create(data) {
        return axiosInstance.post(this.urlCreate, data, this.config).then(response => {
            let endResult = false;
            let result = response.data;

            if (result.success === true) {
                SWal.fire(
                    'Good Job !',
                    'Expense added successfully !',
                    'success'
                );

                endResult = true;
            }

            return endResult;
        }).catch(error => {
            this.handleError(error);
        });
    }

    getPaginateList() {
        return axiosInstance.get(this.urlPaginateList, this.config).then(response => {
            return response;
        }).catch(error => {
            this.handleError(error);
        });
    }

    getAll() {
        return axiosInstance.get(this.urlAll, this.config).then(response => {
            return response.data;
        }).catch(error => {
            this.handleError(error);
        });
    }
}

export default JobsGroupModel;
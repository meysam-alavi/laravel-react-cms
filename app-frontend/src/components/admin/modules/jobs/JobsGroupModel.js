import React from "react";
import JobsModule from "./JobsModule";
import axiosInstance from "../../../../services/api";

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
        this.urlPaginateList = `/api/${this.getLang()}/admin/jobs/group/paginate/list`;

        this.state = {
            messages: ''
        };

        this.create = this.create.bind(this);
        this.getPaginateList = this.getPaginateList.bind(this);
    }

    /**
     * create
     *
     * @param data
     */
    create(data) {
        axiosInstance.post(this.urlCreate, data, this.config).then(response => {
            return response;
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
}

export default JobsGroupModel;
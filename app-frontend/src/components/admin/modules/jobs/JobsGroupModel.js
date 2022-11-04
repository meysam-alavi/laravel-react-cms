import React from "react";
import JobsModule from "./JobsModule";
import axiosInstance from "../../../../services/api";
import SWal from "sweetalert2";
import errors from "../assisstants/Errors";

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
        this.urlToggleStatus = `/api/${this.getLang()}/admin/jobs/group/status/toggle`;
        this.urlBaseFind = `/api/${this.getLang()}/admin/jobs/group/find/`;
        this.urlBaseDelete = `/api/${this.getLang()}/admin/jobs/group/delete/`;
        this.urlBaseEdit = `/api/${this.getLang()}/admin/jobs/group/edit/`;
        this.urlBaseMainImageDelete = `/api/${this.getLang()}/admin/jobs/group/delete/image/`;

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

    /**
     * get paginate list
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
    getPaginateList(url) {
        const urlPaginate = url ? url : this.urlPaginateList;
        return axiosInstance.get(urlPaginate, this.config).then(response => {
            return response;
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * get all
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAll() {
        return axiosInstance.get(this.urlAll, this.config).then(response => {
            return response.data;
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * delete jobs group
     *
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    delete(id) {
        return axiosInstance.delete(this.urlBaseDelete + id, this.config).then(response => {
            return response.data;
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * toggle status
     *
     * @param id
     * @param statusType
     * @returns {Promise<AxiosResponse<any>>}
     */
    toggleStatus(id, statusType) {
        return axiosInstance.put(this.urlToggleStatus, {
            id: id,
            'status-type': statusType
        }, this.config).then(response => {
            return response.data;
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * find jobs group by id
     *
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    findById(id) {
        return axiosInstance.get(this.urlBaseFind + id, this.config).then(response => {
            return response.data;
        }).catch(error => {
            this.handleError(error);
        });
    }

    edit(jobsGroupId, data) {
        let config = this.config;
        config.headers['Content-Type'] = 'multipart/form-data';

        let frmData = new FormData();
        frmData.append('title', data.title);
        frmData.append('description', data.description);
        frmData.append('image', data.image);

        return axiosInstance.post(this.urlBaseEdit + jobsGroupId, frmData, config).then(response => {
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

    /**
     * delete main image
     *
     * @param jobsGroupId
     * @returns {Promise<boolean>}
     */
    deleteMainImage(jobsGroupId) {
        return axiosInstance.delete(this.urlBaseMainImageDelete + jobsGroupId, this.config).then(response => {
            let endResult = false;
            const result = response.data;

            if (result.success === true) {
                endResult = true;
            }

            return endResult;
        }).catch(error => {
            this.handleError(error);
        });
    }
}

export default JobsGroupModel;
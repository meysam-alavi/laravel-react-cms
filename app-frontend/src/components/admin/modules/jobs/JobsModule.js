import Module from "../Module";
import axiosInstance from "../../../../services/api";
import errors from "../assisstants/Errors";

/**
 * Jobs Module Class Component
 */
class JobsModule extends Module {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title: 'مدیریت مشاغل', href: null, isActive: false}
        ];

        this.urlPaginateList = `/api/${this.getLang()}/admin/jobs/paginate/list`;
        this.urlBaseToggleStatus = `/api/${this.getLang()}/admin/jobs/job/status/toggle/`;
        this.urlBaseDelete = `/api/${this.getLang()}/admin/jobs/job/delete/`;
        this.urlBaseFileDelete = `/api/${this.getLang()}/admin/jobs/delete/file/`;

        this.getPaginateList = this.getPaginateList.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
    }

    /**
     * get paginate list
     *
     * @param url
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
     * toggle status
     *
     * @param id
     * @param statusType
     * @returns {Promise<AxiosResponse<any>>}
     */
    toggleStatus(id, statusType) {
        return axiosInstance.put(
            this.urlBaseToggleStatus + id,
            {'status-type': statusType},
            this.config
        ).then(response => {
            return response.data;
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * delete job by id
     *
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    delete(id) {
        const url = this.urlBaseDelete + id;
        return axiosInstance.delete(url, this.config).then(response => {
            return response.data;
        }).catch(error => {
            this.handleError();
        });
    }

    /**
     * delete job by id
     *
     * @param id
     * @param imageId
     * @param usage
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteFile(id, imageId, usage) {
        const url = this.urlBaseFileDelete + id + '/' + imageId + '/main-image';
        return axiosInstance.delete(url, this.config).then(response => {
            return response.data;
        }).catch(error => {
            this.handleError();
        });
    }
}

export default JobsModule;
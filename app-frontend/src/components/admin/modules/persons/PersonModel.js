import React from "react";
import PersonsModule from "./PersonsModule";
import axiosInstance from "../../../../services/api";
import Errors from "../assisstants/Errors";

/**
 * Person Model Class Component
 */
class PersonModel extends PersonsModule {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.urlCreate = `/api/${this.getLang()}/admin/person/create`;
        this.urlPaginateList = `/api/${this.getLang()}/admin/person/paginate/list`;

        this.state = {
            messages: ''
        };
    }


    /**
     * create
     *
     * @param data
     */
    create(data) {
        axiosInstance.post(this.urlCreate, data, this.config).then(response => {

        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * get paginate list
     *
     * @param url
     * @returns {Promise<AxiosResponse<any>>}
     */
    getPaginateList(url) {
        let urlPaginate = url ? url : this.urlPaginateList;
        console.log(urlPaginate);
        return axiosInstance.get(urlPaginate, this.config).then(response => {
            return response;

            /*const data = response.data.data;
            const links = response.data.links;

            this.setState({persons: data});
            this.setState({links: links});*/
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {
        return super.render();
    }
}

export default PersonModel;
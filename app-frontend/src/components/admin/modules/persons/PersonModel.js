import React from "react";
import PersonsModule from "./PersonsModule";
import axiosInstance from "../../../../services/api";

//import Errors from "../assisstants/Errors";

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

        this.urlCreate = `/api/${this.getLang()}/admin/person/registration`;
        this.urlPaginateList = `/api/${this.getLang()}/admin/person/paginate/list`;
        this.urlSearch = `/api/${this.getLang()}/admin/person/paginate/search`;

        this.state = {
            messages: ''
        };

        this.searchCombo = this.searchCombo.bind(this);
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

    searchCombo(data) {
        let queryString = `?first_name=${data}`;
        const url = this.urlSearch + queryString;
        return axiosInstance.get(url, this.config).then(response => {
            const result = response.data;
            if (result.success === true) {
                return result.data.map((item, index) => {
                    return {value: item.id, label: item.first_name};
                });
            }

            return false;
        }).catch(error => {
            console.log(error);
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
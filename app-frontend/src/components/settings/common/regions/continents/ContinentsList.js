import React from "react";
import SettingsModule from "../../../SettingsModule";
import axiosInstance from "../../../../../services/api";

/**
 * Continent List component
 */
class ContinentsList extends SettingsModule {
    //private async: ;

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            continents: [],
            links: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getList = this.getList.bind(this);
        this.dataTable = this.dataTable.bind(this);
    }

    getList(url) {
         axiosInstance.get(url, this.config).then(response => {
            const result = response.data;

            if (result.success === true) {
                this.setState({continents: result.data.data});
                this.setState((state, props) => {
                    return {links: result.data.links}
                });
            }

        }).catch(error => {

        });
    }

    dataTable() {
        console.log(this.state.continents);

        return this.state.continents.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.iso2}</td>
                    <td>{item.name_fa}</td>
                    <td>{item.name_en}</td>
                    <td>{item.status}</td>
                    <td>{item.description}</td>
                    <td>1</td>
                    <td>{item.create_at}</td>
                    <td>1</td>
                    <td>{item.update_at}</td>
                </tr>
            );
        });
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {

        if (this.state.continents.length === 0) {
            return null;
        }

        return (
            <table className="table table-sm table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>شناسه</th>
                        <th>کد اختصاصی</th>
                        <th>نام فارسی</th>
                        <th>نام انگلیسی</th>
                        <th>وضعیت</th>
                        <th>توضیحات</th>
                        <th>درج توسط</th>
                        <th>تاریخ درج</th>
                        <th>بروزرسانی توسط</th>
                        <th>تاریخ بروزرسانی</th>
                    </tr>
                </thead>
                <tbody>
                {this.dataTable()}
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        this.getList('/api/user/settings/continent/list');
    }
}

export default ContinentsList;
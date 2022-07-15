import React from "react";
import ContinentModel from "./ContinentModel";

/**
 * ContinentsList Class Component
 */
class ContinentsList extends ContinentModel {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.dataTable = this.dataTable.bind(this);
    }

    /**
     * data table
     *
     * @returns {unknown[]}
     */
    dataTable() {
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

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.getList(this.urlList, {rpp: 10});
    }
}

export default ContinentsList;
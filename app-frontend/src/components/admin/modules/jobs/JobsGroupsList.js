import React from "react";
import JobsGroupModel from "./JobsGroupModel";
import {Table} from "react-bootstrap";

/**
 * Jobs Groups List Class Component
 */
class JobsGroupsList extends JobsGroupModel {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'لیست گروه های مشاغل'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            jobsGroup: [],
            links: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.dataTable = this.dataTable.bind(this);
    }

    render(): JSX.Element {
        if (this.state.jobsGroup.length) {
            return (
                <div className="table-wrapper">
                    <Table>
                        <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>توضیحات</th>
                            <th>وضعیت</th>
                            <th>والد</th>
                            <th>تاریخ ایجاد</th>
                            <th>تاریخ بروزرسانی</th>
                            <th>حذف</th>
                            <th>ویرایش</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.dataTable()}
                        </tbody>
                    </Table>
                </div>
            );
        }

        return false;
    }

    componentDidMount() {
        this.getPaginateList().then(response => {
            const data = response.data.data;
            const links = response.data.links;

            this.setState({jobsGroup: data});
            this.setState({links: links});
        });
    }

    dataTable() {
        return this.state.jobsGroup.map((jobsGroup, index) => {
            return (
                <tr key={index.toString()}>
                    <td>{jobsGroup.id}</td>
                    <td>{jobsGroup.title}</td>
                    <td>{jobsGroup.description}</td>
                    <td>{jobsGroup.status}</td>
                    <td>{jobsGroup.parent_id}</td>
                    <td>{jobsGroup.create_at}</td>
                    <td>{jobsGroup.updated_at}</td>
                    <td>delete</td>
                    <td>edit</td>
                </tr>
            );
        });
    }

    pager() {

    }
}

export default JobsGroupsList;
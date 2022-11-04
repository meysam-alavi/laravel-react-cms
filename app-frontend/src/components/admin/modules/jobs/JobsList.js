import React from "react";
import JobsModule from "./JobsModule";
import {Row, Col, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import MessagesComponent from "../assisstants/MessagesComponent";
import axiosInstance from "../../../../services/api";
import ModalGenerator from "../../generators/ModalGenerator";
import JobsGroupModel from "./JobsGroupModel";

/**
 * Jobs List Class Component
 */
class JobsList extends JobsModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'لیست مشاغل'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            jobs: [],
            links: [],
            jobsGroupsIdTitleMap: {},
            messages: ''
        };


        this.dataTable = this.dataTable.bind(this);
        this.pager = this.pager.bind(this);
    }

    render(): JSX.Element {

        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">
                        {this.pageInfo.title}
                    </span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-lg-5">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                </Col>
                <Col className="col-12">
                    <div className="table-wrapper">
                        <Table className="table-hover table-striped text-center c-l-table">
                            <thead className="table-dark">
                            <tr>
                                <th>شناسه</th>
                                <th>عکس</th>
                                <th>عنوان</th>
                                <th>توضیحات</th>
                                <th>گروه شغلی</th>
                                <th>وضعیت</th>
                                <th>نمایش</th>
                                <th>تاریخ ایجاد</th>
                                <th>تاریخ بروزرسانی</th>
                                <th>عملیات</th>
                            </tr>
                            </thead>
                            <tbody>{this.state.jobsGroupsIdTitleMap && this.dataTable()}</tbody>
                        </Table>
                        {this.pager()}
                    </div>
                </Col>
            </Row>
        );
    }

    /**
     * component did mount
     */
    componentDidMount() {
        if (typeof this.state.jobsGroupsIdTitleMap.length === 'undefined') {
            let jobsGroups = {};
            const jobGroupsModelObj = new JobsGroupModel();
            jobGroupsModelObj.getAll().then(result => {
                result.data.map((jobsGroup) => {
                    jobsGroups[jobsGroup.id] = jobsGroup.title;
                });

                this.setState({jobsGroupsIdTitleMap: jobsGroups})
            });
        }


        this.getPaginateList().then(response => {
            this.setState({jobs: response.data.data});
            this.setState({links: response.data.links});
        });
    }

    dataTable() {
        return this.state.jobs.map((job, index) => {
            const statusClass = (job.status === 'A') ? 'text-success' : 'text-danger';
            const displayStatusClass = (job.display_status === 'A') ? 'text-success' : 'text-danger';

            let image = '-';
            if (job.image) {
                const src = axiosInstance.defaults.baseURL + job.image;
                const alt = job.title;

                const imgThumbnailObject = <img src={src} alt={alt} className="img-thumbnail jobs-main-img-list"/>;
                const imgModalObject = <img src={src} alt={alt} className="img-responsive jobs-main-img"/>;

                image =
                    <div className="jobs-main-img-cover">
                        {imgThumbnailObject}
                        <a href="#" className="delete-img">
                            <i className="fa fa-trash-o text-danger"/>
                        </a>
                        {<ModalGenerator
                            title={job.title}
                            body={imgModalObject}
                            size="full-screen"
                            buttonType="a"
                            buttonValue={<i className="fa fa-search-plus text-light"/>}
                            buttonClass="zoom-in"
                        />}
                    </div>;
            }

            return (
                <tr key={index.toString()} id={job.id}>
                    <td>{job.id}</td>
                    <td>{image}</td>
                    <td>{job.title}</td>
                    <td>{job.description ? job.description : '-'}</td>
                    <td>
                        {this.state.jobsGroupsIdTitleMap[job.parent_id] ? this.state.jobsGroupsIdTitleMap[job.parent_id] : '-'}
                    </td>
                    <td>
                        <a href="#" onClick={this.toggleStatusHandler.bind(this, job.id, 'status')}>
                            <i className={'fa fa-check-circle ' + statusClass}/>
                        </a>
                    </td>
                    <td>
                        <a href="#" onClick={this.toggleStatusHandler.bind(this, job.id, 'display-status')}>
                            <i className={'fa fa-check-circle ' + displayStatusClass}/>
                        </a>
                    </td>
                    <td dir="auto">{this.reFormatDate(job.created_at)}</td>
                    <td dir="auto">{this.reFormatDate(job.updated_at)}</td>
                    <td>
                        <a href="#" className="mx-1" onClick={this.deleteHandler.bind(this, job.id)}>
                            <i className="fa fa-trash-o text-danger"/>
                        </a>
                        <Link to={`/${this.getLang()}/admin/modules/jobs/job-edit/${job.id}`} className="mx-1">
                            <i className="fa fa-pencil-square-o"/>
                        </Link>
                    </td>
                </tr>
            );
        });
    }

    pager() {
        const pager = this.state.links.map((link, index) => {
            let result = '';

            if (link.url !== '') {
                if (link.active === true) {
                    result =
                        <li key={index} className="page-item disabled">
                            <span className="page-link">{link.label}</span>
                        </li>
                } else {
                    result =
                        <li key={index} className="page-item">
                            <a href={link.url} className="page-link">
                                {link.label}
                            </a>
                        </li>
                }
            }

            return (result);
        });

        return (<ul className="pagination" dir="ltr">{pager}</ul>);
    }

    /**
     * toggle status handler
     *
     * @param id
     * @param statusType
     * @param e
     */
    toggleStatusHandler(id, statusType, e) {
        e.preventDefault();

        this.toggleStatus(id, statusType).then(result => {
            if (result.success === true) {
                const data = this.state.jobs.map((job, index) => {
                    if (job.id === result.data.id) {
                        if (statusType === 'status') {
                            job.status = this.toggleStatusMap[job.status];
                        } else {
                            job.display_status = this.toggleStatusMap[job.display_status];
                        }
                    }

                    return job;
                });

                this.setState({jobs: data});
            }
        });
    }

    /**
     * delete handler
     *
     * @param id
     * @param e
     */
    deleteHandler(id, e) {
        e.preventDefault();

        this.delete(id).then(result => {
            if (result.success === true) {
                const data = this.state.jobs.filter((job) => {
                    return (job.id !== id);
                });

                this.setState({jobs: data});
            }
        });
    }
}

export default JobsList;
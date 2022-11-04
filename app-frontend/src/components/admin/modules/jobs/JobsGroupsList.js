import React from "react";
import JobsGroupModel from "./JobsGroupModel";
import {Row, Col, Table} from "react-bootstrap";
import axiosInstance from "../../../../services/api";
import "./JobsGroupsList.css";
import {Link} from "react-router-dom";
import ModalGenerator from "../../generators/ModalGenerator";
import SWal from "sweetalert2";
import MessagesComponent from "../assisstants/MessagesComponent";

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
            jobsGroups: [],
            links: [],
            messages: ''
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.dataTable = this.dataTable.bind(this);
    }

    /**
     * render
     *
     * @returns {JSX.Element|boolean}
     */
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
                            <thead className='table-dark'>
                            <tr>
                                <th>شناسه</th>
                                <th>عکس</th>
                                <th>عنوان</th>
                                <th>توضیحات</th>
                                <th>وضعیت</th>
                                <th>نمایش</th>
                                <th>تاریخ ایجاد</th>
                                <th>تاریخ بروزرسانی</th>
                                <th>عملیات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.dataTable()}
                            </tbody>
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
        this.getPaginateList().then(response => {
            this.setState({jobsGroups: response.data.data});
            this.setState({links: response.data.links});
        });
    }

    /**
     * data table
     *
     * @returns {unknown[]}
     */
    dataTable() {
        return this.state.jobsGroups.map((jobsGroup, index) => {

            let statusClass = (jobsGroup.status === 'A') ? 'text-success' : 'text-danger';
            let displayStatusClass = (jobsGroup.display_status === 'A') ? 'text-success' : 'text-danger';

            let image = '-';
            if (jobsGroup.image) {

                const src = axiosInstance.defaults.baseURL + jobsGroup.image;
                const alt = jobsGroup.title;

                const imgThumbnailObject = <img src={src} alt={alt}
                                                className="img-thumbnail jobs-group-main-img-list"/>;
                const imgModalObject = <img src={src} alt={alt} className="img-responsive jobs-group-main-img"/>;

                image =
                    <div className="jobs-group-main-img-cover">
                        {imgThumbnailObject}
                        <a href="#" className="delete-img"
                           onClick={this.deleteMainImageHandler.bind(this, jobsGroup.id)}>
                            <i className="fa fa-trash-o text-danger"/>
                        </a>
                        {<ModalGenerator
                            title={jobsGroup.title}
                            body={imgModalObject}
                            size="full-screen"
                            buttonType="a"
                            buttonValue={<i className="fa fa-search-plus text-light"/>}
                            buttonClass="zoom-in"/>}
                    </div>;
            }


            return (
                <tr key={index.toString()} id={jobsGroup.id}>
                    <td>{jobsGroup.id}</td>
                    <td>{image}</td>
                    <td>{jobsGroup.title}</td>
                    <td>{jobsGroup.description}</td>
                    <td>
                        <a href="#" onClick={this.toggleStatusHandler.bind(this, jobsGroup.id, 'status')}>
                            <i className={'fa fa-check-circle ' + statusClass}/>
                        </a>
                    </td>
                    <td>
                        <a href="#" onClick={this.toggleStatusHandler.bind(this, jobsGroup.id, 'display-status')}>
                            <i className={'fa fa-check-circle ' + displayStatusClass}/>
                        </a>
                    </td>
                    <td dir="auto">{this.reFormatDate(jobsGroup.created_at)}</td>
                    <td dir="auto">{this.reFormatDate(jobsGroup.updated_at)}</td>
                    <td>
                        <a href="#" onClick={this.deleteHandler.bind(this, jobsGroup.id)} className="mx-1">
                            <i className="fa fa-trash-o text-danger"/>
                        </a>
                        <Link to={`/${this.getLang()}/admin/modules/jobs/jobs-group-edit/${jobsGroup.id}`}
                              className="mx-1">
                            <i className="fa fa-pencil-square-o"/>
                        </Link>
                    </td>
                </tr>
            );
        });
    }

    /**
     * pager
     */
    pager() {
        const pager = this.state.links.map((link, index) => {
            let result = '';

            if (link.url !== '') {
                if (link.active === true) {
                    result =
                        <li key={index} className="page-item disabled">
                            <span className="page-link">
                                {link.label}
                            </span>
                        </li>;
                } else {
                    result =
                        <li key={index} className="page-item">
                            <a className="page-link" href={link.url}
                               onClick={this.pageNavigationHandler.bind(this, link.url)}>
                                {link.label}
                            </a>
                        </li>;
                }
            }

            return (result);
        });

        return <ul className="pagination" dir="ltr">{pager}</ul>;
    }

    /**
     * page navigation handler
     *
     * @param url
     * @param e
     */
    pageNavigationHandler(url, e) {
        e.preventDefault();

        this.getPaginateList(url).then(result => {
            this.setState({jobsGroups: result.data.data});
            this.setState({links: result.data.links});
        });
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
                const data = this.state.jobsGroups.map((jobGroup, index) => {
                    if (jobGroup.id === result.data.id) {
                        if (statusType === 'status') {
                            jobGroup.status = this.toggleStatusMap[jobGroup.status];
                        } else {
                            jobGroup.display_status = this.toggleStatusMap[jobGroup.display_status];
                        }
                    }

                    return jobGroup;
                });

                this.setState({jobsGroups: data});
            }
        });
    }

    /**
     * delete jobs group and all child's
     *
     * @param id
     * @param e
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteHandler(id, e) {
        e.preventDefault();

        this.state.jobsGroups.map((jobsGroup, index) => {
            const trObj = document.getElementById(jobsGroup.id);
            trObj.classList.remove('tr-invalidate');
        });

        this.setState((state, props) => {
            return {messages: ''};
        });

        this.delete(id).then(result => {
            if (result.success === true) {
                SWal.fire(
                    'عملیات موفق',
                    'عملیات حذف گروه شغلی با موفقیت انجام شد.',
                    'success'
                );

                const modifiedJobsGroups = this.state.jobsGroups.filter(
                    item => item.id !== id
                );
                this.setState({jobsGroups: modifiedJobsGroups});
            } else {
                this.setState({messages: result.messages});
            }
        });
    }

    /**
     * delete main image handler
     *
     * @param jobsGroupId
     * @param e
     */
    deleteMainImageHandler(jobsGroupId, e) {
        e.preventDefault();

        this.deleteMainImage(jobsGroupId).then(result => {
            if (result === true) {
                let modifiedJobsGroups = this.state.jobsGroups.map((jobsGroup, index) => {
                    if (jobsGroup.id === jobsGroupId) {
                        jobsGroup.image = null;
                    }

                    return jobsGroup;
                });

                this.setState({jobsGroups: modifiedJobsGroups});
            }
        });
    }
}

export default JobsGroupsList;
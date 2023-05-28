import React from "react";
import PersonModel from "./PersonModel";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 * Person List Class Component
 */
class PersonsList extends PersonModel {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'لیست اشخاص'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            persons: [],
            links: []
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getPaginateList = this.getPaginateList.bind(this);
        this.dataTable = this.dataTable.bind(this);
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {

        if (this.state.persons.length === 0) {
            return false;
        }

        return (
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>نام و نام خانوادگی</th>
                        <th>تاریخ تولد</th>
                        <th>جنسیت</th>
                        <th>اطلاعات شغلی</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.dataTable()}
                    </tbody>
                </Table>
                {this.pager()}
            </div>
        );
    }

    /**
     * component did mount
     */
    componentDidMount() {
        this.getPaginateList().then(response => {
            const data = response.data.data;
            const links = response.data.links;

            this.setState({persons: data});
            this.setState({links: links});
        });
    }

    /**
     * data table
     *
     * @returns {unknown[]}
     */
    dataTable() {
        return this.state.persons.map((person, index) => {
            return (
                <tr key={index}>
                    <td>{person.id}</td>
                    <td>{person.first_name} {person.last_name}</td>
                    <td>{person.birth_date}</td>
                    <td>{person.gender}</td>
                    <td>
                        <Link to={`/${this.getLang()}/admin/modules/persons/person-jobs-add/${person.id}`}
                              className="d-flex mb-1">
                            <i className="fa fa-user-plus"/>
                        </Link>
                    </td>
                </tr>
            );
        });
    }

    /**
     * pager generator
     */
    pager() {
        const pager = this.state.links.map((item, index) => {
            let result = '';

            if (item.url !== null) {
                if (item.active === true) {
                    result =
                        <li key={index} className='page-item disabled'>
                            <span className='page-link'>
                                {item.label}
                            </span>
                        </li>;
                } else {
                    result =
                        <li key={index} className='page-item'>
                            <a className='page-link' onClick={this.pageNavigationHandler.bind(this, item.url)}
                               href={item.url}>
                                {item.label}
                            </a>
                        </li>;
                }
            }


            return (result)
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

        this.getPaginateList(url).then(response => {
            this.setState({persons: response.data.data});
            this.setState({links: response.data.links});
        });
    }
}

export default PersonsList;
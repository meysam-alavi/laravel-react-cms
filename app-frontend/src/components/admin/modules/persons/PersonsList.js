import React from "react";
import PersonModel from "./PersonModel";
import {Table} from "react-bootstrap";

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
                    </tr>
                    </thead>
                    <tbody>
                    {this.dataTable()}
                    </tbody>
                </Table>
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
                </tr>
            );
        });
    }

    /**
     * pager generator
     */
    pager() {
        /*const pager = this.state.links.map((item, index) => {
            let result = '';



            return (result)
        });

        return <ul className="pagination" dir="ltr">{pager}</ul>;*/
    }
}

export default PersonsList;
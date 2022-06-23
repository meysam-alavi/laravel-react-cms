import React from "react";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import axiosInstance from "../../../../services/api";
import AuthenticateAble from "../user/AuthenticateAble";


/**
 * Expenses listing component
 */
class ExpensesListingComponent extends AuthenticateAble {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.pager = this.pager.bind(this);

        this.state = {
            expenses: [],
            links: []
        };
    }

    /**
     * component did mount
     */
    componentDidMount() {
        super.componentDidMount();
        const url = '/api/user/expenses';
        this.getList(url);
    }

    /**
     * get list
     *
     * @param url
     */
    getList(url) {
        axiosInstance.get(url, this.config).then(response => {
            const data = response.data.data;
            const links = response.data.links;

            this.setState({expenses: data});
            this.setState({links: links});

        }).catch(error => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        this.unauthenticated();
                        break;
                    default:
                        break;
                }
            }
        });
    }

    /**
     * get paginate list
     *
     * @param url
     * @param e
     */
    getPaginateList(url, e) {
        e.preventDefault();
        this.getList(url);
    }

    /**
     * delete expense
     *
     * @param expense
     */
    deleteExpense(expense) {
        const url = '/api/user/expense/delete/' + expense.id;

        axiosInstance.delete(url, this.config).then(response => {
            let result = response.data

            if (result.success === true) {
                const data = this.state.expenses.filter(item => item.id !== expense.id);
                this.setState({expenses: data});
            }
        }).catch(error => {
            console.error(error);
        });
    }

    /**
     * data table
     *
     * @returns {unknown[]}
     */
    dataTable() {
        return this.state.expenses.map((expense, index) =>
            <tr key={index}>
                <td>{expense.id}</td>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>
                    <Link className="edit-link mx-1" to={'/edit-expense/' + expense.id}>
                        <Button size="sm" variant="info">ویرایش</Button>
                    </Link>
                    <Button className="mx-1 btn btn-sm" onClick={this.deleteExpense.bind(this, expense)}
                            variant="danger" type="button">
                        حذف
                    </Button>
                </td>
            </tr>
        );
    }

    /**
     * pager
     *
     * @returns {string[]}
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
                            <a className='page-link' onClick={this.getPaginateList.bind(this, item.url)}
                               href={item.url}>
                                {item.label}
                            </a>
                        </li>;
                }
            }

            return (result);
        });

        return <ul className="pagination" dir="ltr">{pager}</ul>;
    }

    /**
     * render expense.listing component
     *
     * @returns {JSX.Element|boolean}
     */
    render(): JSX.Element | boolean {
        if (!this.checkLogin()) {
            this.logout();
        }

        return (
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id (identification)</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{this.dataTable()}</tbody>
                </Table>
                {this.pager()}
            </div>
        );
    }
}

export default ExpensesListingComponent;

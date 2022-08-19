import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import axiosInstance from "../../../../services/api";
import {useParams} from 'react-router-dom';
import MessagesComponent from "../assisstants/MessagesComponent";
import SWal from "sweetalert2";
import ExpenseModel from "./ExpenseModel";


export function withRouter(Children) {
    return (props) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

/**
 * Expense Edit Class Component
 */
class ExpenseEdit extends ExpenseModel {

    fields: any = ['name', 'amount', 'description'];

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم ویرایش هزینه'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.getExpenseData = this.getExpenseData.bind(this);
        this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
        this.onChangeExpenseAmount = this.onChangeExpenseAmount.bind(this);
        this.onChangeExpenseDescription = this.onChangeExpenseDescription.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.setMessages = this.setMessages.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.resetForm();
    }

    getExpenseData() {
        const url = `/api/${this.getLang()}/admin/expenses/edit/${this.props.match.params.id}`;
        axiosInstance.get(url, this.config).then(response => {
            const result = response.data;
            if (result.success === true) {
                const data = result.data;
                this.setState({
                    id: data.id,
                    name: data.name,
                    amount: data.amount,
                    description: data.description
                });
            }
        }).catch(error => {
            console.error(error);
        });
    }

    /**
     * component did mount
     */
    componentDidMount() {
        this.getExpenseData();
    }

    /**
     * on change expenses name
     *
     * @param e
     */
    onChangeExpenseName(e) {
        //this.setState({name: e.target.value});
        this.setState((state, props) => {
            return {name: e.target.value};
        });
    }

    /**
     * on change expenses amount
     *
     * @param e
     */
    onChangeExpenseAmount(e) {
        this.setState((state, props) => {
            return {amount: e.target.value};
        });
    }

    /**
     * on change expenses description
     *
     * @param e
     */
    onChangeExpenseDescription(e) {
        this.setState((state, props) => {
            return {description: e.target.value};
        });
    }

    /**
     * reset state of element in form
     */
    resetForm() {
        this.state = {
            name: '',
            amount: '',
            description: '',
            messages: ''
        }
    }

    /**
     * set messages
     *
     * @param messagesList
     */
    setMessages(messagesList) {
        this.setState((state, props) => {
            return {messages: messagesList}
        });
    }

    /**
     * on submit
     *
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();

        this.setState((state, props) => {
            return {messages: ''};
        });

        this.fields.forEach(elementId => {
            const element = document.getElementById(elementId);
            element.classList.remove('input-invalidate');
        });

        const url = '/api/user/expenses/edit/' + this.props.match.params.id;
        const expenseObject = {
            id: this.state.id,
            name: this.state.name,
            amount: this.state.amount,
            description: this.state.description
        };

        axiosInstance.put(url, expenseObject, this.config).then(response => {
            const result = response.data;
            if (result.success === true) {
                SWal.fire(
                    '',
                    'ویرایش با موفقیت انجام شد !',
                    'success'
                );
            }
        }).catch(error => {
            if (error.response) {
                switch (error.response.status) {
                    case 422:
                        this.setMessages(error.response.data);
                        break;
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
     * render edit expenses component
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">{this.pageInfo.title}</span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-md-6 mx-auto">
                    <div className="form-wrapper">
                        {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                        <Form onSubmit={this.onSubmit} className="d-block mb-3">
                            <Form.Group controlId="name" className="form-group mb-2">
                                <Form.Label>نام:</Form.Label>
                                <Form.Control type="text" dir="auto" value={this.state.name}
                                              onChange={this.onChangeExpenseName}
                                              className="input-required"/>
                            </Form.Group>

                            <Form.Group controlId="amount" className="form-group mb-2">
                                <Form.Label>مبلغ:</Form.Label>
                                <Form.Control type="text" dir="ltr" value={this.state.amount}
                                              onChange={this.onChangeExpenseAmount} className="input-required-ltr"/>
                            </Form.Group>

                            <Form.Group controlId="description" className="form-group mb-2">
                                <Form.Label>توصیف:</Form.Label>
                                <Form.Control as="textarea" dir="auto" type="textarea" value={this.state.description}
                                              onChange={this.onChangeExpenseDescription}/>
                            </Form.Group>

                            <Form.Group className="form-group mb-2 d-flex flex-row-reverse">
                                <Button variant="primary" className="btn-sm" type="submit">
                                    ویرایش
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default withRouter(ExpenseEdit);
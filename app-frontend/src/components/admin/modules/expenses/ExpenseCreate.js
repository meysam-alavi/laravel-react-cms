import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import SWal from "sweetalert2";
import axiosInstance from "../../../../services/api";
import AuthenticateAble from "../user/AuthenticateAble";
import MessagesComponent from '../assisstants/MessagesComponent';

/**
 * Create expenses component
 */
class ExpenseCreate extends AuthenticateAble {

    fields: any = ['name', 'amount', 'description'];

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        // setting of functions
        this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
        this.onChangeExpenseAmount = this.onChangeExpenseAmount.bind(this);
        this.onChangeExpenseDescription = this.onChangeExpenseDescription.bind(this);
        this.setMessages = this.setMessages.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.resetForm();
    }

    /**
     * on change expenses name
     *
     * @param e
     */
    onChangeExpenseName(e) {
        this.setState((state, props) => {
            return {name: e.target.value}
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
        })
    }

    /**
     * on change expenses description
     *
     * @param e
     */
    onChangeExpenseDescription(e) {
        this.setState((state, props) => {
            return {description: e.target.value}
        });
    }

    /**
     * set messages
     *
     * @param messagesList
     */
    setMessages(messagesList) {
        this.setState((state, props) => {
            return {messages: messagesList};
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


        const url = '/api/user/expenses/create';
        const expense = {
            name: this.state.name,
            amount: this.state.amount,
            description: this.state.description
        }

        axiosInstance.post(url, expense, this.config).then(response => {
            let result = response.data;
            console.log(result);
            if (result.success === true) {
                console.info(`Expense successfully created !`);
                console.info(`Name: ${this.state.name}`);
                console.info(`Amount: ${this.state.amount}`);
                console.info(`Description: ${this.state.description}`);

                SWal.fire(
                    'Good Job !',
                    'Expense added successfully !',
                    'success'
                );

                this.resetForm();
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
     * render create expenses component
     *
     * @returns {JSX.Element|boolean}
     */
    render() {
        /*if (!this.checkLogin()) {
            return this.logout();
        }*/

        return (
            <Row>
                <Col className="col-md-6 mx-auto">
                    <div className="form-wrapper">
                        {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                        <div className="common-header">
                            <h5>فرم ایجاد هزینه ی جدید</h5>
                        </div>
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
                                <Form.Control as="textarea" type="textarea" dir="auto" value={this.state.description}
                                              onChange={this.onChangeExpenseDescription}/>
                            </Form.Group>

                            <Form.Group className="form-group mb-2 d-flex flex-row-reverse">
                                <Button variant='primary' className="btn-sm" type="submit">
                                    ایجاد
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ExpenseCreate;
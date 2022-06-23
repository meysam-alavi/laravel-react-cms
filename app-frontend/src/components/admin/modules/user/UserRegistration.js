import React from "react";
import {Button, Form} from "react-bootstrap";
import axiosInstance from "../../../../services/api";
import ParticlesBg from "particles-bg";
import PasswordStrengthBar from "react-password-strength-bar";
import MessagesComponent from "../assisstants/MessagesComponent";


/**
 * user registration component
 */
class UserRegistration extends React.Component {

    fields: any = ['name', 'email', 'password', 'password_confirmation'];

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            messages: ''
        };
    }

    /**
     * on change name
     *
     * @param e
     */
    onChangeName(e) {
        this.setState((state, props) => {
            return {name: e.target.value};
        });
    }

    /**
     * on change email
     *
     * @param e
     */
    onChangeEmail(e) {
        this.setState((state, props) => {
            return {email: e.target.value};
        });
    }

    /**
     * on change password
     *
     * @param e
     */
    onChangePassword(e) {
        this.setState((state, props) => {
            return {password: e.target.value};
        });
    }

    /**
     * on change password confirmation
     *
     * @param e
     */
    onChangePasswordConfirmation(e) {
        this.setState((state, props) => {
            return {password_confirmation: e.target.value};
        })
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


        const url = '/api/register';
        let frmData = new FormData();
        frmData.append('name', this.state.name);
        frmData.append('email', this.state.email);
        frmData.append('password', this.state.password);
        frmData.append('password_confirmation', this.state.password_confirmation)

        const config = {};

        axiosInstance.post(url, frmData, config).then(response => {
            const result = response.data;
            if (result.success === true) {
                sessionStorage.setItem('token', result.data.token);
                sessionStorage.setItem('loggedIn', 'true');
                window.location = '/expenses-listing';
            }
        }).catch(error => {
            if (error.response) {
                switch (error.response.status) {
                    case 422:
                        this.setMessages(error.response.data);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    /**
     * render user registration component
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {
        return (
            <>
                <div className="col-lg-4 mx-auto my-5">
                    <div className="form-wrapper">
                        {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                        <div className="common-header">
                            <h5>فرم ثبت نام کاربر</h5>
                        </div>
                        <Form onSubmit={this.onSubmit} className="d-block mb-3">
                            <Form.Group controlId="name" className="form-group mb-2">
                                <Form.Label>نام:</Form.Label>
                                <Form.Control type="text" dir="auto" className="input-required"
                                              onChange={this.onChangeName}/>
                            </Form.Group>
                            <Form.Group controlId="email" className="from-group mb-2">
                                <Form.Label>ایمیل:</Form.Label>
                                <Form.Control type="email" dir="ltr" className="input-required-ltr"
                                              onChange={this.onChangeEmail}/>
                            </Form.Group>
                            <Form.Group controlId="password" className="form-group mb-2">
                                <Form.Label>رمز عبور:</Form.Label>
                                <Form.Control type="password" dir="ltr" className="input-required-ltr"
                                              onChange={this.onChangePassword}/>
                                <PasswordStrengthBar password={this.state.password}/>
                            </Form.Group>
                            <Form.Group controlId="password_confirmation" className="form-group mb-2">
                                <Form.Label>تکرار رمز عبور:</Form.Label>
                                <Form.Control type="password" dir="ltr" className="input-required-ltr"
                                              onChange={this.onChangePasswordConfirmation}/>
                            </Form.Group>
                            <Form.Group className="from-group mb-2 d-flex flex-row-reverse">
                                <Button type="submit" variant="primary" className="btn-sm">ثبت</Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <ParticlesBg color="#0a58ca" type="cobweb" num={120} bg={true}/>
            </>
        );
    }
}

export default UserRegistration;
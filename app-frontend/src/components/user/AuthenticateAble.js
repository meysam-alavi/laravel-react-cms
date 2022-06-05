import React from "react";
import axiosInstance from "../../services/api";
import {Form, Button, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import MessagesComponent from '../assisstants/MessagesComponent';
import ParticlesBg from "particles-bg";

/**
 * Authenticate able component
 */
class AuthenticateAble extends React.Component {

    token: string = '';
    config: any = {};
    fields: any = ['email', 'password'];
    userInfo: any = {};

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.token = sessionStorage.getItem('token');
        let userInfo = sessionStorage.getItem('user');

        if (userInfo !== null) {
            this.userInfo = JSON.parse(userInfo);
        }

        this.config = {
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        this.checkLogin = this.checkLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.setMessages = this.setMessages.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.unauthenticated = this.unauthenticated.bind(this);

        this.state = {
            email: '',
            password: '',
            messages: ''
        }
    }

    /**
     * component did mount
     */
    componentDidMount() {

    }

    /**
     * check login
     *
     * @returns {boolean}
     */
    checkLogin() {
        let result = false;

        if (this.token !== null && this.token.length) {
            result = true;
        }

        return result;
    }

    /**
     * login
     *
     * @param frmData
     */
    login(frmData) {
        const url = '/api/login';
        axiosInstance.post(url, frmData).then(response => {
            const result = response.data;
            if (result.success === true && result.data.token.length) {
                sessionStorage.setItem('user', result.data.user);
                sessionStorage.setItem('token', result.data.token);
                sessionStorage.setItem('loggedIn', 'true');

                window.location = '/expenses-listing';
            } else {
                const messages = {
                    errors: {
                        'email': ['ایمیل یا رمز عبور اشتباه است.'],
                        'password': []
                    }
                };

                this.setMessages(messages);
            }

            //console.log('%c some text! ', 'background: #222; color: #bada55');
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
     * logout
     */
    logout() {
        const token = sessionStorage.getItem('token');

        if (token !== null && token.length) {
            const url = '/api/user/logout';
            const data = {};
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };

            axiosInstance.post(url, data, config).then(
                response => {
                    let result = response.data;
                    if (result.success === true) {
                        this.unauthenticated();
                    }
                }
            ).catch(error => {
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

        return false;
    }

    /**
     * un authenticated
     */
    unauthenticated() {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location = '/login';
    }

    /**
     * on change email
     *
     * @param e
     */
    onChangeEmail(e) {
        this.setState((state, props) => {
            return {email: e.target.value}
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

        this.setState({messages: ''});

        this.fields.forEach(elementId => {
            const element = document.getElementById(elementId);
            element.classList.remove('input-invalidate');
        });


        const sanctumCsrfUrl = '/sanctum/csrf-cookie';
        const config = {};
        axiosInstance.get(sanctumCsrfUrl, config).then(response => {
            let frmData = new FormData();
            frmData.append('email', this.state.email);
            frmData.append('password', this.state.password);

            this.login(frmData);
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
     * render AuthenticateAble component
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <>
                <div className="col-lg-6 col-md-6 mx-auto my-5">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <div className="form-wrapper d-flex">
                        <div className="common-header flex-fill mb-0 px-1">
                            <h5>فرم ورود به سیستم</h5>
                        </div>
                        <Form onSubmit={this.onSubmit} className="flex-fill px-1">
                            <Form.Group controlId="email" className="mb-2">
                                <Form.Label>ایمیل:</Form.Label>
                                <Form.Control type="email" className="input-required-ltr" dir="ltr"
                                              onChange={this.onChangeEmail}/>
                            </Form.Group>
                            <Form.Group controlId="password" className="mb-2">
                                <Form.Label>رمز عبور:</Form.Label>
                                <Form.Control type="password" className="input-required-ltr" dir="ltr"
                                              onChange={this.onChangePassword}/>
                            </Form.Group>
                            <Form.Group className="mb-2 d-flex flex-row-reverse">
                                <Button variant="success" className="btn-sm" type="submit">ورود</Button>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="d-block mt-3">
                        <Nav className="justify-content-end d-flex flex-row-reverse">
                            <Link to="/register" className="text-dark ml-2 c-link">
                                <i className="fa fa-user-plus d-inline-block m-1"/>
                                عضویت
                            </Link>
                        </Nav>
                    </div>
                </div>

                <ParticlesBg color="#0a58ca" type="cobweb" num={100} bg={true}/>
            </>
        );
    }
}

export default AuthenticateAble;
import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import AuthenticateAble from "./AuthenticateAble";

/**
 * user edit
 */
class UserEdit extends AuthenticateAble {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * on submit
     *
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {

        /*if (!this.checkLogin()) {
            this.logout();
        }*/

        return (
            <Row>
                <Col className="col-lg-12 d-flex">
                    <span className="admin-form-header">ویرایش اطلاعات کاربر</span>
                </Col>
                <Col className="col-lg-5 mx-auto">
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="first-name" className="form-group mb-2">
                            <Form.Label>نام:</Form.Label>
                            <Form.Control type="text" dir="auto" className="input-required"/>
                        </Form.Group>
                        <Form.Group controlId="last-name" className="form-group mb-2">
                            <Form.Label>نام خانوادگی:</Form.Label>
                            <Form.Control type="text" dir="auto" className="input-required"/>
                        </Form.Group>
                        <Form.Group controlId="gender" className="form-group mb-2">
                            <Form.Label>جنسیت:</Form.Label>
                            <Form.Select className="input-required">
                                <option value="M">مرد</option>
                                <option value="F">زن</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="marriage" className="form-group mb-2">
                            <Form.Label>وضعیت تاهل:</Form.Label>
                            <Form.Select className="input-required">
                                <option value="S">مجرد</option>
                                <option value="M">متاهل</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="email" className="form-group mb-2">
                            <Form.Label>ایمیل:</Form.Label>
                            <Form.Control type="email" dir="ltr" className="input-required-ltr" disabled/>
                        </Form.Group>

                        <Form.Group className="form-group mb-2 d-flex flex-row-reverse">
                            <Button type="submit" variant="primary" className="btn-sm">
                                ویرایش
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default UserEdit;
import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import SettingsModule from "../../SettingsModule";
import MessagesComponent from "../../../assisstants/MessagesComponent";

/**
 * Add Educational Grade Component
 */
class AddEducationalGrade extends SettingsModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم درج مقطع تحصیلی'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            title: '',
            alias: '',
            description: '',
            messages: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAlias = this.onChangeAlias.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
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
     * on change title
     *
     * @param e
     */
    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    /**
     * on change alias
     *
     * @param e
     */
    onChangeAlias(e) {
        this.setState({alias: e.target.value});
    }

    /**
     * on change description
     *
     * @param e
     */
    onChangeDescription(e) {
        this.setState({description: e.target.value});
    }

    /**
     * render
     *
     * @returns {JSX.Element}
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
                <Col className="col-md-6">
                    <MessagesComponent messagesBag={this.state.messages}/>
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="title" className="form-group mb-2">
                            <Form.Label>عنوان:</Form.Label>
                            <Form.Control type="text" className="input-required" onChange={this.onChangeTitle}/>
                        </Form.Group>
                        <Form.Group controlId="alias" className="form-group mb-2">
                            <Form.Label>عنوان مستعار:</Form.Label>
                            <Form.Control type="text" onChange={this.onChangeAlias}/>
                        </Form.Group>
                        <Form.Group controlId="description" className="form-group mb-2">
                            <Form.Label>توضیحات:</Form.Label>
                            <Form.Control type="textarea" as="textarea" onChange={this.onChangeDescription}/>
                        </Form.Group>
                        <Form.Group className="form-group my-2">
                            <Button type="submit" className="btn btn-primary btn-sm">ارسال</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default AddEducationalGrade;
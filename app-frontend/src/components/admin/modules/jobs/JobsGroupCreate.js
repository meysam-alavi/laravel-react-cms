import React from "react";
import {Row, Col, Form, Button} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";
import SelectOptionGenerator from "../../generators/SelectOptionGenerator";
import JobsGroupModel from "./JobsGroupModel";

/**
 * Jobs Group Create Class Component
 */
class JobsGroupCreate extends JobsGroupModel {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم ایجاد گروه مشاغل'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            title: '',
            description: '',
            status: ''
        };

        this.statusCollection = [
            {sCKey: 'A', sCValue: 'فعال'},
            {sCKey: 'D', sCValue: 'غیر فعال'},
        ];

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

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
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="title" className="form-group mb-2">
                            <Form.Label className='mb-1'>عنوان:</Form.Label>
                            <div>
                                <Form.Control type="text" dir="auto" className="input-required"
                                              onChange={this.onChangeTitle}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="description" className="form-group mb-2">
                            <Form.Label className="mb-1">توضیحات:</Form.Label>
                            <div>
                                <Form.Control as="textarea" row="3" dir="auto" onChange={this.onChangeDescription}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="status" className="form-group mb-2">
                            <Form.Label>وضعیت:</Form.Label>
                            <div>
                                <SelectOptionGenerator
                                    items={this.statusCollection}
                                    optionKey="sCKey"
                                    optionValue="sCValue"
                                    dir="auto"
                                    onChange={this.onChangeStatus}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="form-group mb-2">
                            <Button type="submit" className="btn btn-primary btn-sm">ذخیره</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }

    /**
     * on submit
     *
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();

        this.create(this.state);
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
     * on change description
     *
     * @param e
     */
    onChangeDescription(e) {
        this.setState({description: e.target.value})
    }

    /**
     * on change status
     *
     * @param e
     */
    onChangeStatus(e) {
        this.setState({status: e.target.value});
    }
}

export default JobsGroupCreate;
import React from "react";
import ExamModel from "./ExamModel";
import {Row, Col, Form} from "react-bootstrap";
import SelectOptionGenerator from "../../generators/SelectOptionGenerator";

class ExamCreate extends ExamModel {
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'ایجاد آزمون جدید'
        }

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
                {this.breadCrumbGenerator()}
                <Col className="col-md-5">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label className="mb-1">عنوان:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="auto" value={this.state.title} className="input-required" onChange={this.onChangeTitle}/>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mb-1">توضیحات:</Form.Label>
                            <div>
                                <Form.Control as="textarea" rows="4" dir="auto" value={this.state.description} onChange={this.onChangeDescription}/>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mb-1">وضعیت:</Form.Label>
                            <div>
                                <SelectOptionGenerator
                                    items={this.statusCollection}
                                    optionKey="sCKey"
                                    optionValue="sCValue"
                                    dir="auto"
                                    value={this.state.status}
                                    className="input-required"
                                    onChange={this.onChangeStatus}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    onChangeDescription(e) {
        this.setState({description: e.target.value});
    }

    onChangeStatus(e) {
        this.setState({status: e.target.value});
    }
}

export default ExamCreate;
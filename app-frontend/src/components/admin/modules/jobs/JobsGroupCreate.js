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
            image: '',
            status: '',
            displayStatus: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDisplayStatus = this.onChangeDisplayStatus.bind(this);
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
                <Col className="col-md-5">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-block mb-3" encType="multipart/form-data">
                        <Form.Group controlId="title" className="form-group mb-2">
                            <Form.Label className='mb-1'>عنوان:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="auto" value={this.state.title} className="input-required"
                                              onChange={this.onChangeTitle}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="description" className="form-group mb-2">
                            <Form.Label className="mb-1">توضیحات:</Form.Label>
                            <div>
                                <Form.Control as="textarea" row="4" dir="auto" value={this.state.description}
                                              onChange={this.onChangeDescription}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="image" className="form-group mb-2">
                            <Form.Label className="mb-1">عکس:</Form.Label>
                            <div>
                                <Form.Control type="file" onChange={this.onChangeImage}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="status" className="form-group mb-2">
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
                        <Form.Group controlId="displayStatus" className="form-group mb-2">
                            <Form.Label className="mb-1">وضعیت نمایش:</Form.Label>
                            <div>
                                <SelectOptionGenerator
                                    items={this.statusCollection}
                                    optionKey="sCKey"
                                    optionValue="sCValue"
                                    dir="auto"
                                    value={this.state.displayStatus}
                                    className="input-required"
                                    onChange={this.onChangeDisplayStatus}
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

        this.create(this.state).then(result => {
            if (result === true) {
                this.setState({title: ''});
                this.setState({description: ''});
                this.setState({status: ''});
                this.setState({displayStatus: ''});
            }
        });
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
     * on change image
     *
     * @param e
     */
    onChangeImage(e) {
        this.setState({image: e.target.files[0]});
    }

    /**
     * on change status
     *
     * @param e
     */
    onChangeStatus(e) {
        this.setState({status: e.target.value});
    }

    /**
     * on change display status
     *
     * @param e
     */
    onChangeDisplayStatus(e) {
        this.setState({displayStatus: e.target.value});
    }

    /**
     * should component update
     *
     * @param nextProps
     * @param nextState
     * @param nextContext
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return this.state !== nextState;
    }
}

export default JobsGroupCreate;
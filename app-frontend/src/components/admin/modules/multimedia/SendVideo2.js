import React from "react";
import MultimediaModule from "./MultimediaModule";
import CustomFullFileBrowser from "../assisstants/filebrowser/CustomFullFileBrowser";
import {Button, Col, Form, ProgressBar, Row} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";

import axiosInstance from "../../../../services/api";
import "./SendVideo.css";
import SWal from "sweetalert2";

class SendVideo2 extends MultimediaModule {

    fields = ['video', 'title'];

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pathInfo.push({title: 'ارسال ویدئو', href: null, isActive: true});

        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.setMessages = this.setMessages.bind(this);

        this.resetForm();
    }

    resetForm() {
        this.state = {
            title: '',
            description: '',
            video: '',
            progress: '',
            messages: ''
        };
    }

    onChangeTitle(e) {
        this.setState((state, props) => {
            return {title: e.target.value};
        });
    }

    onChangeDescription(e) {
        this.setState((state, props) => {
            return {description: e.target.value};
        });
    }

    onChangeVideo(e) {
        this.setState((state, props) => {
            return {video: e.target.files[0]};
        });
    }

    setMessages(messagesList) {
        this.setState((state, props) => {
            return {messages: messagesList};
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const selectedPath = document.getElementById('selected-path').value;

        //TODO: validation of selected path
        /*if (selectedPath === '') {

        }*/


        this.setMessages('');
        this.fields.forEach(elementId => {
            const element = document.getElementById(elementId);
            element.classList.remove(['input-invalidate', 'input-invalidate-ltr']);
        });


        const url = '/api/user/multimedia/add/video';

        let frmData = new FormData();
        frmData.append('title', this.state.title)
        frmData.append('video', this.state.video);
        frmData.append('description', this.state.description);
        frmData.append('selected-path', selectedPath);

        let config = this.config;
        config.headers['Content-Type'] = 'multipart/form-data';
        config.onUploadProgress = (data) => {
            this.setState((state, props) => {
                return {progress: Math.round((100 * data.loaded) / data.total)};
            });
        };

        axiosInstance.post(url, frmData, config).then(response => {
            const result = response.data;
            if (result.success === true) {
                SWal.fire('', 'ارسال ویدئو با موفقیت انجام شد.!', 'success');
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
                }
            }
        });
    }

    render() {

        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">فرم ارسال ویدئو</span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-12 mb-2">
                    <CustomFullFileBrowser/>
                </Col>
                <Col className="col-md-6 mx-auto">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="title" className="form-group mb-2">
                            <Form.Label>عنوان:</Form.Label>
                            <Form.Control type="text" dir="auto" className="input-required"
                                          onChange={this.onChangeTitle}/>
                        </Form.Group>
                        <Form.Group controlId="description" className="form-group mb-2">
                            <Form.Label>توصیف:</Form.Label>
                            <Form.Control as="textarea" type="textarea" dir="auto" className="input-required"
                                          onChange={this.onChangeDescription}/>
                        </Form.Group>
                        <Form.Group controlId="video" className="form-group mb-2">
                            <Form.Label>ویدئو:</Form.Label>
                            <Form.Control type="file" className="input-required-ltr" onChange={this.onChangeVideo}/>
                        </Form.Group>
                        <Form.Group className="form-group my-2">
                            <Button type="submit" className="btn btn-primary btn-sm">ارسال</Button>
                        </Form.Group>
                        {this.state.progress ?
                            <ProgressBar className="mt-2" now={this.state.progress} label={`${this.state.progress}%`}
                                         striped animated/> : ''}
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default SendVideo2;
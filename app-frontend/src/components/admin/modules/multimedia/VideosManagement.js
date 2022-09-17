import React from "react";
import MultimediaModule from "./MultimediaModule";
import {Col, Row} from "react-bootstrap";

import axiosInstance from "../../../../services/api";
import "./SendVideo.css";
import SWal from "sweetalert2";
import CFileManager from "../assisstants/CFileManager";

/**
 * videos Management Class Component
 */
class VideosManagement extends MultimediaModule {

    fields = ['video', 'title'];

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'مدیریت ویدئوها'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.setMessages = this.setMessages.bind(this);

        this.resetForm();
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">
                        {this.pageInfo.title}
                    </span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-12 mb-2 dx-viewport" dir="ltr">
                    <CFileManager module="multimedia" fileType="video" groupType="V"/>
                </Col>
            </Row>
        );
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

    /**
     * on change title
     *
     * @param e
     */
    onChangeTitle(e) {
        this.setState((state, props) => {
            return {title: e.target.value};
        });
    }

    /**
     * on change description
     *
     * @param e
     */
    onChangeDescription(e) {
        this.setState((state, props) => {
            return {description: e.target.value};
        });
    }

    /**
     * on change video
     *
     * @param e
     */
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

    /**
     * on submit
     *
     * @param e
     */
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


        const url = `/api/${this.getLang()}/admin/multimedia/add/video`;

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
                SWal.fire(
                    '',
                    'ارسال ویدئو با موفقیت انجام شد.!',
                    'success'
                ).then(r => {});
            }
        }).catch(error => {
            this.handleError(error);
        });
    }
}

export default VideosManagement;
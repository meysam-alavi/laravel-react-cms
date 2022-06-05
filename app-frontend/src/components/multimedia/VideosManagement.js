import React from "react";
import MultimediaModule from "./MultimediaModule";
import {Row, Col} from "react-bootstrap";

import axiosInstance from "../../services/api";
import "./SendVideo.css";
import SWal from "sweetalert2";
import CFileManager from "../assisstants/CFileManager";

/**
 * videos management
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
                SWal.fire('', 'ارسال ویدئو با موفقیت انجام شد.!', 'success')
                    .then(r => {
                    });
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
}

export default VideosManagement;
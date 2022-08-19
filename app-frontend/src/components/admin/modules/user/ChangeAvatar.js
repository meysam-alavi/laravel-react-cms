import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import Avatar from "react-avatar-edit";
import AuthenticateAble from "../user/AuthenticateAble";
import "./ChangeAvatar.css";
import MessagesComponent from "../assisstants/MessagesComponent";
import axiosInstance from "../../../../services/api";
import SWal from "sweetalert2";

/**
 * change avatar
 */
class ChangeAvatar extends AuthenticateAble {

    fields: any = ['avatar-org'];

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            preview: null,
            src: '',
            avatarOrg: '',
            messages: ''
        };

        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
        this.setMessages = this.setMessages.bind(this);
    }

    /**
     * on crop
     *
     * @param preview
     */
    onCrop(preview) {
        this.setState((state, props) => {
            return {preview: preview};
        });
    }

    /**
     * on close
     */
    onClose() {
        this.setState((state, props) => {
            return {preview: null};
        });
    }

    /**
     * on before file load
     *
     * @param element
     */
    onBeforeFileLoad(element) {
        this.setState((state, props) => {
            return {avatarOrg: element.target.files[0]};
        });
    }

    /**
     * set Messages
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

        this.setMessages('');

        this.fields.forEach(elementId => {
            const element = document.getElementById(elementId);
            element.classList.remove('input-invalidate');
        });

        const url = `api/${this.getLang()}/admin/user/change/avatar`;
        let avatarSlice = '';
        if (this.state.preview) {
            // expected string ~ data:image/gif;base64,R0lGODlhPQBEAPeoAJosM....
            const avatarSliceSrc = this.state.preview;
            // split the base64 string in data and contentType
            const block = avatarSliceSrc.split(';');
            // get the content type of the image ~ image/gif
            const contentType = block[0].split(':')[1];
            // get the real base64 content of the file ~ R0lGODlhPQBEAPeoAJosM....
            const realData = block[1].split(',')[1];

            avatarSlice = this.b64toBlob(realData, contentType);
        }


        const frmData = new FormData();
        frmData.append('avatar-org', this.state.avatarOrg);
        frmData.append('avatar-slice', avatarSlice);

        axiosInstance.post(url, frmData, this.config).then(response => {
            const result = response.data;

            if (result.success === true) {
                SWal.fire('', 'عملیات با موفقیت انجام شد.', 'success');
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
    render(): JSX.Element {

        //let imgObj = new Image(390, 295);
        //imgObj.src = 'http://localhost:8000/storage/users/1/images/avatar/1_org.jpg';

        //console.log(imgObj);

        return (
            <Row className="change-avatar-cover">
                {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                <div className="common-header">
                    <h5>فرم تغییر آواتار</h5>
                </div>

                <div className="col-12 d-flex flex-row-reverse">
                    <div className="avatar-org-cover">
                        <img
                            src={this.state.avatarOrgSrc ? this.state.avatarOrgSrc : 'storage/users/avatar-default-male.jpg'}
                            alt=""/>
                    </div>
                </div>

                <Form id="frm-change-avatar" onSubmit={this.onSubmit} className="d-block mb-3">
                    <Form.Group controlId="avatar" className="form-group row mb-2">
                        <Col id="org-img-cover" className="col-lg-8">
                            <Avatar
                                //img={imgObj}
                                width={390}
                                height={295}
                                onCrop={this.onCrop}
                                onClose={this.onClose}
                                onBeforeFileLoad={this.onBeforeFileLoad}
                                src={this.state.src}
                                exportSize={70}
                                labelStyle={
                                    {
                                        'cursor': 'pointer',
                                        'backgroundColor': 'transparent'
                                    }
                                }
                            />
                        </Col>
                        <Col className="col-lg-4">
                            <div className="avatar-preview-cover">
                                {this.state.preview ? <img src={this.state.preview} alt="preview"/> : ''}
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="avatar-org" className="hidden">
                        <Form.Control type="file"/>
                    </Form.Group>
                    <Form.Group controlId="avatar-slice" className="hidden">
                        <Form.Control type="file"/>
                    </Form.Group>
                    <Form.Group className="from-group mb-2 d-flex flex-row-reverse">
                        <Button variant="primary" className="btn-sm" type="submit">
                            ارسال
                        </Button>
                    </Form.Group>
                </Form>
            </Row>
        );
    }


    /**
     * Convert a base64 string in a Blob according to the data and contentType.
     *
     * @param b64Data {String} Pure base64 string without contentType
     * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
     * @param sliceSize {int} SliceSize to process the byteCharacters
     * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
     * @return Blob
     */
    b64toBlob(b64Data, contentType, sliceSize) {
        let blob = false;

        let invalidData = [null, ''];

        if (!invalidData.includes(b64Data) && !invalidData.includes(contentType)) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;


            const byteCharacters = atob(b64Data);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);

                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            blob = new Blob(byteArrays, {type: contentType});
        }

        return blob;
    }
}

export default ChangeAvatar;
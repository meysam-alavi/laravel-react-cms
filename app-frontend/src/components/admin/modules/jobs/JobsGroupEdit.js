import React from "react";
import JobsGroupModel from "./JobsGroupModel";
import withRouter from "../assisstants/withRouter";
import {Row, Col, Form, Button} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";
import axiosInstance from "../../../../services/api";
import "./JobsGroupEdit.css";
import ModalGenerator from "../../generators/ModalGenerator";

/**
 * Jobs Group Edit Class Component
 */
class JobsGroupEdit extends JobsGroupModel {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم ویرایش گروه شغلی'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            title: '',
            description: '',
            image: ''
        };

        this.jobsGroupId = this.props.params.jobsGroupId;

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {

        if (!this.state.title) {
            return false;
        }

        let image = null;
        let modal = null;
        if (this.state.image && typeof this.state.image === 'string') {

            const src = axiosInstance.defaults.baseURL + this.state.image;
            const alt = this.state.title;

            const imgThumbnailObject = <img src={src} alt={alt} className="img-thumbnail jobs-group-main-img"/>;
            const imgModalObject = <img src={src} alt={alt} className="img-responsive jobs-group-main-img"/>;

            image =
                <div className="jobs-group-main-img-cover my-1">
                    {imgThumbnailObject}
                    <a href="#" className="delete-img"
                       onClick={this.deleteMainImageHandler.bind(this, this.jobsGroupId)}>
                        <i className="fa fa-trash-o text-danger"/>
                    </a>
                    {<ModalGenerator
                        title={this.state.title}
                        body={imgModalObject}
                        size="full-screen"
                        buttonType="a"
                        buttonValue={<i className="fa fa-search-plus text-light"/>}
                        buttonClass="zoom-in"/>}
                </div>;
        }

        return (
            <Row>
                <Col className='col-12 d-flex'>
                    <span className="admin-form-header">
                        {this.pageInfo.title}
                    </span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-md-5">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="title" className="form-group mb-2">
                            <Form.Label className="mb-1">عنوان:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control value={this.state.title} dir="auto" onChange={this.onChangeTitle}
                                              className="input-required"/>
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
                                {image}
                                {modal}
                                <Form.Control type="file" onChange={this.onChangeImage}/>
                            </div>
                        </Form.Group>
                        <Form.Group className="form-group mb-2">
                            <Button type="submit" className="btn btn-primary btn-sm ">ویرایش</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }

    componentDidMount() {
        this.findById(this.jobsGroupId).then(result => {
            if (result.success === true) {
                this.setState({
                    title: result.data.title,
                    description: result.data.description,
                    image: result.data.image
                });
            }
        });
    }

    /**
     * on submit
     *
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();

        this.edit(this.jobsGroupId, this.state).then(result => {
            if (result.success === true) {
                this.setState({image: result.data.image});
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
        this.setState({description: e.target.value});
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
     * delete main image handler
     *
     * @param jobsGroupId
     * @param e
     */
    deleteMainImageHandler(jobsGroupId, e) {
        e.preventDefault();

        this.deleteMainImage(jobsGroupId).then(result => {
            if (result === true) {
                this.setState({image: null})
            }
        });
    }
}

export default withRouter(JobsGroupEdit);
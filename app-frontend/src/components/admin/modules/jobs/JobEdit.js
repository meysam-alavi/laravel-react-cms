import React from "react";
import jobsModel from "./JobsModel";
import withRouter from "../assisstants/withRouter";
import {Row, Col, Button, Form} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";
import ModalGenerator from "../../generators/ModalGenerator";
import "./job.css";
import CFileManager from "../assisstants/CFileManager";
import axiosInstance from "../../../../services/api";
import SelectOptionGenerator from "../../generators/SelectOptionGenerator";

class JobEdit extends jobsModel {
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم ویرایش شغل'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            title: '',
            description: '',
            imageId: '',
            imagePath: '',
            parentId: 0,
            jobsGroupsCollection: 0
        };

        this.jobId = this.props.params.jobId;

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeJobsGroups = this.onChangeJobsGroups.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSelectedItem = this.onSelectedItem.bind(this);
    }


    render(): JSX.Element {


        if (!(this.state.jobsGroupsCollection && this.state.jobsGroupsCollection.length)) {
            return false;
        }

        if (this.state.title === undefined) {
            return false;
        }

        let image = '';
        if (this.state.imagePath) {
            const src = axiosInstance.defaults.baseURL + this.state.imagePath;
            const alt = this.state.title;

            const imgThumbnailObject = <img src={src} alt={alt} className="img-thumbnail job-main-img"/>
            const imgModalObject = <img src={src} alt={alt} className="img-responsive job-main-img"/>

            image = <div className="jobs-main-img-cover my-1">
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


        const fileManager = (
            <div className="col-12 dx-viewport" dir="ltr">
                <CFileManager
                    module="multimedia"
                    fileType="image"
                    groupType="I"
                    onSelectedItem={this.onSelectedItem}
                    selectionMode="single"
                    create={false}
                    copy={false}
                    move={false}
                    rename={false}
                    delete={false}
                    upload={false}
                />
            </div>
        );

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
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group className="form-group mb-2">
                            <Form.Label className="mb-1">گروه شغلی:</Form.Label>
                            <SelectOptionGenerator
                                items={this.state.jobsGroupsCollection}
                                optionKey="id"
                                optionValue="title"
                                dir="auto"
                                value={this.state.parentId}
                                className="input-required"
                                onChange={this.onChangeJobsGroups}
                            />
                        </Form.Group>
                        <Form.Group controlId="title" className="form-group mb-2">
                            <Form.Label className="mb-1">عنوان:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" value={this.state.title} dir="auto"
                                              onChange={this.onChangeTitle}
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
                            </div>
                            <div>
                                <ModalGenerator
                                    title="انتخاب عکس"
                                    body={fileManager}
                                    size="full-screen"
                                    buttonType="a"
                                    buttonValue={<span><i className="fa fa-image"/> انتخاب عکس </span>}
                                    buttonClass=""
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

        this.edit(this.jobId, this.state).then(result => {
            if (result.success === true) {
                this.setState({imageId: result.data.imageId});
            }
        });
    }

    /**
     * on change jobs groups
     *
     * @param e
     */
    onChangeJobsGroups(e) {
        this.setState({parentId: e.target.value});
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
     * on selected item
     *
     * @param actionObj
     * @param e
     */
    onSelectedItem(actionObj, e) {
        if (actionObj.selectedItems[0]) {
            const selectedItem = actionObj.selectedItems[0];
            if (selectedItem.isDirectory === false) {
                this.setState({imageId: selectedItem.dataItem.id})
            }
        }
    }

    /**
     * delete main image handler
     *
     * @param jobId
     * @param e
     */
    deleteMainImageHandler(jobId, e) {
        e.preventDefault();

        this.deleteMainImage(jobId).then(result => {
            if (result === true) {
                this.setState({image: null})
            }
        });
    }

    /**
     * component did mount
     */
    componentDidMount() {
        this.findById(this.jobId).then(result => {
            if (result.success === true) {
                this.setState({
                    title: result.data.title,
                    description: result.data.description ? result.data.description : '',
                    imageId: result.data.imageId,
                    imagePath: result.data.imagePath,
                    parentId: result.data.parent_id
                });
            }
        });

        this.getJobsGroupsCollection().then(result => {
            this.setState({jobsGroupsCollection: result});
        });
    }
}

export default withRouter(JobEdit);
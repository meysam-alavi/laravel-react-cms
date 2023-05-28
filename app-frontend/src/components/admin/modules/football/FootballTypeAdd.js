import FootballTypeModel from "./FootballTypeModel";
import {Row, Col, Form, Button} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";
import SelectOptionGenerator from "../../generators/SelectOptionGenerator";
import ModalGenerator from "../../generators/ModalGenerator";
import CFileManager from "../assisstants/CFileManager";
import axiosInstance from "../../../../services/api";

class FootballTypeAdd extends FootballTypeModel {
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم افزودن انواع فوتبال'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            title: '',
            description: '',
            numOfPlayers: '',
            imageId: '',
            status: '',
            displayStatus: '',
            parentId: 0,
            parents: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeParentId = this.onChangeParentId.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeNumOfPlayers = this.onChangeNumOfPlayers.bind(this);
        this.onSelectedItem = this.onSelectedItem.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDisplayStatus = this.onChangeDisplayStatus.bind(this);
    }


    render(): JSX.Element {

        if (!this.state.parents) {
            return false;
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
                <Col className="col-sm-5">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="parentId" className="form-group mb-2">
                            <Form.Label className="mb-1">والد</Form.Label>
                            <SelectOptionGenerator
                                items={this.state.parents}
                                optionKey="id"
                                optionValue="title"
                                optional={true}
                                dir="auto"
                                value={this.state.parentId}
                                onChange={this.onChangeParentId}
                            />
                        </Form.Group>
                        <Form.Group controlId="title" className="form-group mb-2">
                            <Form.Label className="mb-1">عنوان</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="auto" className="input-required" value={this.state.title}
                                              onChange={this.onChangeTitle}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="description" className="from-group mb-2">
                            <Form.Label className="mb-1">توضیحات</Form.Label>
                            <div>
                                <Form.Control as="textarea" dir="auto" row="4" value={this.state.description}
                                              onChange={this.onChangeDescription}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="imageId" className="form-group mb-2">
                            <Form.Label className="mb-1">عکس:</Form.Label>
                            <div>
                                <ModalGenerator
                                    title="انتخاب عکس"
                                    body={fileManager}
                                    size="full-screen"
                                    buttonType="a"
                                    buttonValue={<span><i className="fa fa-image">انتخاب عکس</i></span>}
                                    buttonClass=""
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="numOfPlayers">
                            <Form.Label>تعداد بازیکنان</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="ltr" value={this.state.numOfPlayers}
                                              onChange={this.onChangeNumOfPlayers}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="status" className="form-group mb-2">
                            <Form.Label className="mb-1">وضعیت:</Form.Label>
                            <div className="col-md-7">
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
                        <Form.Group controlId="display-status" className="form-group mb-2">
                            <Form.Label className="mb-1">وضعیت نمایش:</Form.Label>
                            <div className="col-md-7">
                                <SelectOptionGenerator
                                    items={this.statusCollection}
                                    optionKey="sCKey"
                                    optionValue="sCValue"
                                    value={this.state.displayStatus}
                                    className="input-required"
                                    onChange={this.onChangeDisplayStatus}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="form-group mb-2">
                            <Button type="submit" className='btn btn-primary btn-sm'>ذخیره</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        this.addFootballType(this.state).then(r => {
            if (r === true) {
                this.state = {
                    title: '',
                    description: '',
                    numOfPlayers: '',
                    imageId: '',
                    status: '',
                    displayStatus: '',
                    parentId: 0
                }
            }
        });
    }

    onChangeParentId(e) {
        this.setState({parentId: e.target.value});
    }

    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    onChangeDescription(e) {
        this.setState({description: e.target.value});
    }

    onChangeNumOfPlayers(e) {
        this.setState({numOfPlayers: e.target.value});
    }

    onSelectedItem(actionObj, e) {
        if (actionObj.selectedItems[0]) {
            const selectedItem = actionObj.selectedItems[0];
            if (selectedItem.isDirectory === false) {
                this.setState({imageId: selectedItem.dataItem.id});
            }
        }
    }

    onChangeStatus(e) {
        this.setState({status: e.target.value});
    }

    onChangeDisplayStatus(e) {
        this.setState({displayStatus: e.target.value});
    }

    componentDidMount() {
        super.componentDidMount();

        axiosInstance.get(this.allParentsUrl, this.config).then(response => {
            const result = response.data;
            if (result.success === true) {
                this.setState({parents: result.data});
            }
        }).catch(error => {
            this.handleError(error);
        });

    }
}

export default FootballTypeAdd;
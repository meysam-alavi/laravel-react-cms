import PositionModel from "./PositionModel";
import {Row, Col, Form, Button} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";

/**
 * PositionCreate class component
 */
class PositionCreate extends PositionModel {
    constructor(props) {
        super(props);

        this.pageInfo = {
            'title': 'فرم ایجاد سمت شغلی'
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
            displayStatus: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
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
                <Col className="col-md-5">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="title" className="form-group mb-2">
                            <Form.Label className="mb-1">عنوان:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="auto" className="input-required" onChange={this.onChangeTitle}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="description" className="form-group mb-2">
                            <Form.Label className="mb-1">توضیحات:</Form.Label>
                            <Form.Control as="textarea" row="4" dir="auto" onChange={this.onChangeDescription}/>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }

    onSubmit(e) {

    }

    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    onChangeDescription(e) {
        this.setState({description: e.target.value});
    }
}

export default PositionCreate;
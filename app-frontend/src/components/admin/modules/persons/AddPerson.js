import PersonsModule from "./PersonsModule";
import {Col, Row} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";

class AddPerson extends PersonsModule {
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم افزودن شخص جدید'
        }

        this.pathInfo = {
            title: this.pageInfo,
            href: null,
            isActive: true
        }

        this.state = {
            messages: ''
        }
    }

    render() {
        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">{this.pageInfo}</span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-md-6 mx-auto">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={''} onSubmit={} className="d-block mb-3">

                    </Form>
                </Col>
            </Row>
        );
    }
}

export default AddPerson;
import React from "react";
import SemesterModel from "./SemesterModel";
import {Row, Col, Form} from "react-bootstrap";

class SemesterCreate extends SemesterModel {
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم ایجاد نیمسال (ترم)'
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    render(): JSX.Element {
        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">
                        {this.pageInfo.title}
                    </span>
                </Col>
                {this.breadCrumbGenerator()}
                <Col className="col-md-5">
                    <Form onSubmit={this.onSubmit}>

                    </Form>
                </Col>
            </Row>
        );
    }

    onSubmit(e) {

    }
}

export default SemesterCreate;
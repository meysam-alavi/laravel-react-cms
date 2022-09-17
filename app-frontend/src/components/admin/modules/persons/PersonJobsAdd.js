import React from "react";
import PersonModel from "./PersonModel";
import {Row, Col} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";
import withRouter from "../assisstants/withRouter";


/**
 * Person Jobs Add Class Component
 */
class PersonJobsAdd extends PersonModel {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);


        this.pageInfo = {
            title: 'فرم درج مشاغل شخص'
        };
        
        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            jobGroupId: '',
            jobId: '',
            companyId: '',
            startOfCooperationDate: '',
            endOfCooperationDate: '',
            terminateCooperationReasons: '',
            description: ''
        }

        this.personId = this.props.params.personId;


        console.log(this.personId);
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {
        console.log('render');
        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">{this.pageInfo.title}</span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-md-6">
                    {this.state.messages ? <MessagesComponent messageBag={this.state.messages}/> : ''}
                    1212121
                </Col>
            </Row>
        );
    }
}

export default withRouter(PersonJobsAdd);
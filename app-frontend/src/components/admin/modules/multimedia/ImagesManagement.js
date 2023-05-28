import MultimediaModule from "./MultimediaModule";
import React from "react";
import {Col, Row} from "react-bootstrap";
import CFileManager from "../assisstants/CFileManager";

/**
 * Images Management Class Component
 */
class ImagesManagement extends MultimediaModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'مدیریت عکس ها'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
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
                    <CFileManager module="multimedia" fileType="image" groupType="I"/>
                </Col>
            </Row>
        );
    }
}

export default ImagesManagement;
import MultimediaModule from "./MultimediaModule";
import React from "react";
import {Col, Row} from "react-bootstrap";
import CFileManager from "../assisstants/CFileManager";

/**
 * Sound Management Class Component
 */
class SoundsManagement extends MultimediaModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'مدیریت صوت ها'
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
    render(): JSX.Element {
        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">
                        {this.pageInfo.title}
                    </span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-12 mb-2 dx-viewport" dir="ltr">
                    <CFileManager module="multimedia" fileType="sound" groupType="S"/>
                </Col>
            </Row>
        );
    }
}

export default SoundsManagement;
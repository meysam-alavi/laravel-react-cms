import React from "react";
import CategoriesModule from "./CategoriesModule";
import {Col, Row} from "react-bootstrap";


/**
 * Categories List Class Component
 */
class CategoriesList extends CategoriesModule {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'لیست دسته بندی ها'
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
                    <span className="admin-form-header">{this.pageInfo.title}</span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}

                <span>Categories List !!!</span>
            </Row>
        );
    }
}

export default CategoriesList;
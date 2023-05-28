import React from "react";
import CategoriesModule from "./CategoriesModule";
import {Col, Row} from "react-bootstrap";

/**
 * Category Create Class Component
 */
class CategoryCreate extends CategoriesModule {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'ایجاد دسته بندی'
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

                <span>Category create !!!</span>
            </Row>
        );
    }
}

export default CategoryCreate;
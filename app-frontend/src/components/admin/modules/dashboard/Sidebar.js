import React from "react";
import {Accordion, Col, Row} from "react-bootstrap";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import {Link} from "react-router-dom";

import "./Sidebar.css";
import AuthenticateAble from "../user/AuthenticateAble";

/**
 * Sidebar Class Component
 */
class Sidebar extends AuthenticateAble {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.prefixModulePath = `/${this.getLang()}/admin/modules`;

        this.state = {
            activeKey: 1,
            menu: [
                {
                    head: {icon: 'fa fa-gears', title: 'تنظیمات'},
                    items: [{
                        to: 'add-educational-grade',
                        icon: 'fa fa-save',
                        title: 'درج مقطع تحصیلی',
                        isActive: false
                    }, {
                        to: 'continents-list',
                        icon: '',
                        title: 'لیست قاره ها',
                        isActive: false
                    }]
                },
                {
                    head: {icon: 'fa fa-dollar', title: 'مدیریت هزینه ها'},
                    items: [{
                        to: 'expenses-listing',
                        icon: 'fa fa-list',
                        title: 'لیست هزینه ها',
                        isActive: false
                    }, {
                        to: 'create-expenses',
                        icon: 'fa fa-save',
                        title: 'ایجاد هزینه جدید',
                        isActive: false
                    }]
                },
                {
                    head: {icon: 'fa fa-files-o', title: 'مدیریت چند رسانه ای'},
                    items: [{
                        to: `${this.prefixModulePath}/multimedia/videos-management`,
                        icon: 'fa fa-file-video-o',
                        title: 'مدیریت ویدئوها',
                        isActive: false
                    }, {
                        to: `${this.prefixModulePath}/multimedia/images-management`,
                        icon: 'fa fa-file-image-o',
                        title: 'مدیریت عکس ها',
                        isActive: false
                    }, {
                        to: `${this.prefixModulePath}/multimedia/sounds-management`,
                        icon: 'fa fa-file-audio-o',
                        title: 'مدیریت صوت ها',
                        isActive: false
                    }]
                },
                {
                    head: {icon: 'fa fa-users', title: 'مدیریت اشخاص'},
                    items: [{
                        to: `${this.prefixModulePath}/persons/persons-list`,
                        icon: 'fa fa-users',
                        title: 'لیست اشخاص',
                        isActive: false
                    }, {
                        to: `${this.prefixModulePath}/persons/add-person`,
                        icon: 'fa fa-user-plus',
                        title: 'افزودن شخص جدید',
                        isActive: false
                    }]
                },
                {
                    head: {icon: 'fa fa-navicon', title: 'مدیریت دسته بندی ها'},
                    items: [{
                        to: `${this.prefixModulePath}/categories/list`,
                        icon: 'fa fa-list',
                        title: 'لیست دسته بندی ها',
                        isActive: false
                    }, {
                        to: `${this.prefixModulePath}/categories/create`,
                        icon: 'fa fa-user-plus',
                        title: 'ایجاد دسته بندی',
                        isActive: false
                    }]
                },
                {
                    head: {icon: 'fa fa-navicon', title: 'مدیریت مشاغل'},
                    items: [{
                        to: `${this.prefixModulePath}/jobs/jobs-group-create`,
                        icon: 'fa fa-user-plus',
                        title: 'ایجاد گروه مشاغل',
                        isActive: false
                    }, {
                        to: `${this.prefixModulePath}/jobs/jobs-group-list`,
                        icon: 'fa fa-list',
                        title: 'لیست گروه های مشاغل',
                        isActive: false
                    }, {
                        to: `${this.prefixModulePath}/jobs/job-add`,
                        icon: 'fa fa-user-plus',
                        title: 'افزودن شغل',
                        isActive: false
                    }, {
                        to: `${this.prefixModulePath}/jobs/jobs-list`,
                        icon: 'fa fa-user-plus',
                        title: 'لیست مشاغل',
                        isActive: false
                    }]
                }
            ]
        }

        this.menuGenerator = this.menuGenerator.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <Row className="sidebar-cover">
                <Col col={12}>
                    <Accordion>
                        {this.menuGenerator(this.state.menu)}
                    </Accordion>
                </Col>
            </Row>
        );
    }

    /**
     * menu generator
     *
     * @param comingMenu
     * @returns {*}
     */
    menuGenerator(comingMenu) {
        return comingMenu.map((menuGroup, groupIndex) => {

            const items = menuGroup.items.map((item, itemIndex) => {
                return (
                    <Link key={itemIndex} to={item.to} className="d-flex mb-1">
                        <i className={item.icon + ' m-1'}/>
                        <span>{item.title}</span>
                    </Link>
                );
            });

            return (
                <AccordionItem eventKey={groupIndex} key={groupIndex}>
                    <AccordionHeader>
                        <i className={menuGroup.head.icon + ' m-1'}/>
                        <span>{menuGroup.head.title}</span>
                    </AccordionHeader>
                    <AccordionBody className="p-0 mt-2">
                        {items}
                    </AccordionBody>
                </AccordionItem>
            );
        });
    }

    /**
     * component did mount
     */
    componentDidMount() {

    }

    /**
     * handle select
     *
     * @param comingActiveKey
     */
    handleSelect(comingActiveKey) {
        this.setState({activeKey: comingActiveKey});

        /*this.setState((state, props) => {
            return {activeKey: activeKey};
        });*/
    }
}

export default Sidebar;
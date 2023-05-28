import React from "react";
import AuthenticateAble from "./user/AuthenticateAble";
import {Breadcrumb} from "react-bootstrap";
import "./Module.css";

/**
 * module component
 */
class Module extends AuthenticateAble {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.statusCollection = [
            {sCKey: '', sCValue: '--'},
            {sCKey: 'A', sCValue: 'فعال'},
            {sCKey: 'D', sCValue: 'غیر فعال'},
        ];

        this.statusMap = {
            'A': 'فعال',
            'D': 'غیر فعال'
        };

        this.toggleStatusMap = {
            'A': 'D',
            'D': 'A'
        };

        this.gendersCollection = [
            {sCKey: 'M', sCValue: 'مرد'},
            {sCKey: 'F', sCValue: 'زن'}
        ];
    }

    /**
     * bread crumb generator
     *
     * @param items
     * @returns {JSX.Element|string}
     */
    breadCrumbGenerator(items) {
        if (items) {
            const breadCrumb = items.map((item, index) => {
                if (item.isActive) {
                    return (
                        <Breadcrumb.Item key={index} href={item.href} active>
                            {item.title}
                        </Breadcrumb.Item>
                    );
                }

                return (
                    <Breadcrumb.Item key={index} href={item.href}>
                        {item.title}
                    </Breadcrumb.Item>
                );
            });

            return <Breadcrumb>{breadCrumb}</Breadcrumb>;
        }

        return '';
    }
}

export default Module;
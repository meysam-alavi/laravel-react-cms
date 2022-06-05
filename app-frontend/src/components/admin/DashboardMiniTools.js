import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import AuthenticateAble from "../user/AuthenticateAble";
import "./DashboardMiniTools.css";
import axiosInstance from "../../services/api";

/**
 * Dashboard mini tools component
 */
class DashboardMiniTools extends AuthenticateAble {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            avatarSliceSrc: ''
        };

        this.onClickToggle = this.onClickToggle.bind(this);
    }

    /**
     * component did mount
     */
    componentDidMount() {
        if (this.userInfo.avatar) {
            let avatarSlice = this.userInfo.avatar.replace('_org.', '_slice.');
            this.setState((state, props) => {
                return {avatarSliceSrc: `${axiosInstance.defaults.baseURL}/storage/users/${this.userInfo.id}/images/avatar/${avatarSlice}`};
            });
        }
    }

    /**
     * on click toggle
     *
     * @param e
     */
    onClickToggle(e) {
        e.preventDefault();

        const divDMTIn = document.getElementById('dMTIn');

        //divDMTIn.classList.contains('close');
        e.target.classList.toggle('fa-angle-down');
        e.target.classList.toggle('fa-angle-up');

        divDMTIn.classList.toggle('close');
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {

        if (!this.checkLogin()) {
            this.logout();
        }

        return (
            <div className="dashboard-mini-tools d-flex">
                <div className="avatar-cover">
                    <img src={this.state.avatarSliceSrc ? this.state.avatarSliceSrc : ''} alt="avatar"/>

                    <Link to="change-avatar" id="change-avatar" className="d-flex">
                        <i className="fa fa-plus mx-auto mt-1"/>
                    </Link>
                </div>
                <span className="toggle" onClick={this.onClickToggle}>
                    <i className="fa fa-angle-down"/>
                </span>
                <div id="dMTIn" className="in trd-2s close">
                    <div className="d-flex">
                        <Link to="user-edit" className="btn btn-sm btn-info d-flex m-1">
                            <i className="fa fa-edit m-1"/>
                            <span>ویرایش اطلاعات</span>
                        </Link>
                        <Button className="btn btn-sm btn-danger d-flex m-1" onClick={this.logout}>
                            <i className="fa fa-sign-out m-1"/>
                            <span>خروج</span>
                        </Button>
                    </div>

                    <Link to="dashboard-setting">
                        <i className="fa fa-gears"/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default DashboardMiniTools;
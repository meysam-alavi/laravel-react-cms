import React from "react";
import AuthenticateAble from "../user/AuthenticateAble";

class Errors extends AuthenticateAble {

    constructor(props) {
        super(props);


        this.state = {
            messages: '',
            errorObj: this.props.errorObj
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.parsError = this.parsError.bind(this);
    }

    render(): JSX.Element {


    }

    parsError(catchErrorObj) {
        if (catchErrorObj.response) {
            switch (catchErrorObj.response.status) {
                case 422:
                    this.setMessages(catchErrorObj.response.data);
                    break;
                case 401:
                    this.unauthenticated();
                    break;
                default:
                    break;
            }
        }
    }

    componentDidMount() {

        if (this.state.errorObj) {
            this.parsError(this.state.errorObj);
        }

        /*if (this.state.errorObj.response) {
            switch (this.state.errorObj.response.status) {
                case 422:
                    this.setMessages(this.state.errorObj.response.data);
                    break;
                case 401:
                    this.unauthenticated();
                    break;
                default:
                    break;
            }
        }*/
    }
}

export default Errors;
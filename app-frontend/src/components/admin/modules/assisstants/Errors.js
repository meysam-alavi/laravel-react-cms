import React from "react";
import AuthenticateAble from "../user/AuthenticateAble";

class Errors extends AuthenticateAble {
    constructor(props) {
        super(props);
    }

    render(): JSX.Element {
        if (this.props.errorObj.response) {
            switch (this.props.errorObj.response.status) {
                case 422:
                    this.setMessages(this.props.errorObj.response.data);
                    break;
                case 401:
                    this.unauthenticated();
                    break;
                default:
                    break;
            }
        }

        return ('');
    }
}

export default Errors;
import React from "react";
import ClientBase from "./ClientBase";

/**
 * Home class component
 */
class Home extends ClientBase {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {
        return (
            <span>Welcome to Home page !!!</span>
        );
    }
}

export default Home;
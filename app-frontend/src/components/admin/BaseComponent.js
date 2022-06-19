import React from "react";
import { useParams } from "react-router-dom";
import languages from "../../data/languages.json";


/*
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class BaseComponent extends React.Component {
    constructor(props) {
        super(props);

        this.lang = this.props.params.lang;
    }

    render():JSX.Element {
        return ('');
    }

    componentDidMount() {
        const itemFound = languages.find(item => item === this.lang);

        if(itemFound === undefined) {
            console.log('test');
            return false;
        }
    }
}

export default withParams(BaseComponent);*/

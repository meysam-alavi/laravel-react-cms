import React from "react";
import languages from "../../data/languages.json";

/*function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}*/

class BaseComponent extends React.Component {
    lang: string = 'fa';

    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkLang = this.checkLang.bind(this);
        this.getLang = this.getLang.bind(this);

        this.checkLang();
    }

    checkLang() {
        const pathName = window.location.pathname;

        if (pathName !== '/404') {
            const pathNameSlice = pathName.split('/');
            this.lang = pathNameSlice[1];

            if (!languages.includes(this.lang)) {
                window.location = '/404';
            }
        }
    }

    getLang() {
        return this.lang;
    }

    render(): JSX.Element {
        return ('');
    }
}

export default BaseComponent;
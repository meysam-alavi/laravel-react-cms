import SelectOptionGenerator from "../../../../../generators/SelectOptionGenerator";
import ContinentModel from "./ContinentModel";

/**
 * ContinentSelectOptions Class Component
 */
class ContinentSelectOptions extends ContinentModel {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.setItems = this.setItems.bind(this);
    }

    /**
     * render component
     *
     * @returns {JSX.Element|boolean}
     */
    render(): JSX.Element {

        if (!this.state.items || this.state.items.length === 0) {
            return false;
        }

        return (<SelectOptionGenerator items={this.state.items}/>);
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.getAll().then(result => {
            this.setItems(result);
        });
    }

    /**
     * setItems
     *
     * @param data
     */
    setItems(data) {
        this.setState({items: data});
    }
}

export default ContinentSelectOptions;
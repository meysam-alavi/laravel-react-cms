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

        if ([undefined, 0].includes(this.state.items.length)) {
            return false;
        }

        return (
            <SelectOptionGenerator
                items={this.state.items}
                optionKey={this.props.optionKey}
                optionValue={this.props.optionValue}
                optional={this.props.optional}
                onChange={this.props.onChange}
                dir={this.props.dir}
            />
        );
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        const columns = this.props.columns ? this.props.columns : ['*'];
        this.getAll(columns).then(result => {
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
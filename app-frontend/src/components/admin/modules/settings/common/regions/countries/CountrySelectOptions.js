import CountryModel from "./CountryModel";
import SelectOptionGenerator from "../../../../../generators/SelectOptionGenerator";

class CountrySelectOptions extends CountryModel {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render(): JSX.Element {
        if (!this.state.items || this.state.items.length === 0) {
            return false;
        }

        return (<SelectOptionGenerator
            items={this.state.items}
            optionKey={this.props.optionKey}
            optionValue={this.props.optionValue}
            onChange={this.props.onChange}/>);
    }

    componentDidMount() {
        this.getAll().then(result => {
            this.setItems(result);
        });
    }

    setItems(data) {
        this.setState({items: data});
    }
}

export default CountrySelectOptions;
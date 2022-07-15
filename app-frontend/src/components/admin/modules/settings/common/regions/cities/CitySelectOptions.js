import CityModel from "./CityModel";
import SelectOptionGenerator from "../../../../../generators/SelectOptionGenerator";


class CitySelectOptions extends CityModel {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.setItems = this.setItems.bind(this);
    }

    render(): JSX.Element {
        if (!this.state.items || this.state.items.length === 0) {
            return false;
        }

        return (
            <SelectOptionGenerator
                items={this.state.items}
                optionKey={this.props.optionKey}
                optionValue={this.props.optionValue}/>
        );
    }

    componentDidMount() {
        this.getAll(['geo_name_id', 'name'], this.props.condition).then(result => {
            this.setItems(result);
        });
    }

    setItems(data) {
        this.setState({items: data});
    }
}

export default CitySelectOptions;
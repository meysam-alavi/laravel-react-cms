import React from "react";
import CityModel from "./CityModel";
import SelectOptionGenerator from "../../../../../generators/SelectOptionGenerator";

/**
 * CitySelectOptions class component
 */
class CitySelectOptions extends CityModel {

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
     * render
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
     * component did mount
     */
    componentDidMount() {
        const columns = this.props.hasOwnProperty('columns') ? this.props.columns : ['*'];
        this.getAll(columns, this.props.condition).then(result => {
            this.setItems(result);
        });
    }

    /**
     * set items
     *
     * @param data
     */
    setItems(data) {
        this.setState({items: data});
    }
}

export default CitySelectOptions;
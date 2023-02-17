import React from "react";
import CountryModel from "./CountryModel";
import SelectOptionGenerator from "../../../../../generators/SelectOptionGenerator";

/**
 * CountrySelectOptions class component
 */
class CountrySelectOptions extends CountryModel {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
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

        return (<SelectOptionGenerator
            items={this.state.items}
            optionKey={this.props.optionKey}
            optionValue={this.props.optionValue}
            optional={this.props.optional}
            onChange={this.props.onChange}
            dir={this.props.dir}/>);
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        const columns = this.props.columns ? this.props.columns : ['*'];
        const continentId = this.props.continentId;

        this.getAllByContinentId(columns, continentId).then(result => {
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

export default CountrySelectOptions;
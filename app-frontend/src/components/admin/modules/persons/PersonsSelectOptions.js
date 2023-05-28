import React from "react";
import Select from "react-select";
import PersonModel from "./PersonModel";

class PersonsSelectOptions extends PersonModel {
    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);

        this.state = {
            persons: []
        };
    }

    render(): JSX.Element {
        return (
            <Select
                value={this.props.value}
                options={this.state.persons}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
                isSearchable={this.props.isSearchable}
                onInputChange={this.onSearch}
                isMulti={this.props.isMulti}
            />
        );
    }

    onSearch(data) {
        const dataLength = data.length;
        if (dataLength >= 3) {
            this.searchCombo(data).then(result => {
                this.setState({persons: result})
            }).catch(error => {});
        }
    }
}

export default PersonsSelectOptions;
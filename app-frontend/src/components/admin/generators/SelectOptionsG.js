import React from "react";
import BaseComponent from "../BaseComponent";
import Select from "react-select";

class SelectOptionsG extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <Select
                value={this.props.value}
                options={this.props.options}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
                isSearchable={this.props.isSearchable}
                onInputChange={this.props.onInputChange}
                isMulti={this.props.isMulti}
            />
        );
    }
}

export default SelectOptionsG;
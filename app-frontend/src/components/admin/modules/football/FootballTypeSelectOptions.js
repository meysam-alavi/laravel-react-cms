import React from "react"
import FootballTypeModel from "./FootballTypeModel";
import SelectOptionGenerator from "../../generators/SelectOptionGenerator";

/**
 * FootballTypeSelectOptions class component
 */
class FootballTypeSelectOptions extends FootballTypeModel {
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

    componentDidMount() {
        const columns = this.props.hasOwnProperty('columns') ? this.props.columns : ['*'];
        this.getAll(columns).then(result => {
            this.setItems(result);
        });
    }


    setItems(data) {
        this.setState({items: data});
    }
}

export default FootballTypeSelectOptions;
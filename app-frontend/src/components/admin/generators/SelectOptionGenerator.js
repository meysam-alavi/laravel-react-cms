import BaseComponent from "../BaseComponent";
import {Form} from "react-bootstrap";

/**
 * SelectOptionGenerator Class Component
 */
class SelectOptionGenerator extends BaseComponent {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.hasOwnProperty('items') ? this.props.items : ''
        }
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {

        let options = this.state.items.map((item, index) => {
            return (<option value={item[this.props.optionKey]} key={index}>{item[this.props.optionValue]}</option>);
        });


        return (
            <Form.Select aria-label="" name="" id="" onChange={this.props.onChange}>
                <option value="">--</option>
                {options}
            </Form.Select>
        );
    }
}

export default SelectOptionGenerator;
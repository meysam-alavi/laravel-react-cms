import React from "react";
import {Form} from "react-bootstrap";
import BaseComponent from "../BaseComponent";


class InputGenerator extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            controlId: this.props.hasOwnProperty('controlId') ? this.props.controlId : '',
            formGroupClass: this.props.hasOwnProperty('formGroupClass') ? this.props.formGroupClass : '',
            labelClass: this.props.hasOwnProperty('labelClass') ? this.props.labelClass : '',
            labelText: this.props.hasOwnProperty('labelText') ? this.props.labelText : '',
            controlType: this.props.hasOwnProperty('controlType') ? this.props.controlType : '',
            controlValue: this.props.hasOwnProperty('controlValue') ? this.props.controlValue : '',
            controlDir: this.props.hasOwnProperty('controlDir') ? this.props.controlDir : '',
            controlOnChange: this.props.hasOwnProperty('controlOnChange') ? this.props.controlOnChange : '',
            divClass: this.props.hasOwnProperty('divClass') ? this.props.divClass : ''
        }
    }

    render(): JSX.Element {
        return (
            <Form.Group controlId={this.state.controlId} className={this.state.formGroupClass}>
                <Form.Label className={this.state.labelClass}>
                    {this.state.labelText}
                </Form.Label>
                <div className={this.state.divClass}>
                    <Form.Control
                        type={this.state.controlType}
                        value={this.state.controlValue}
                        dir={this.state.controlDir}
                        onChange={this.state.controlOnChange}
                    />
                </div>
            </Form.Group>
        );
    }
}

export default InputGenerator;
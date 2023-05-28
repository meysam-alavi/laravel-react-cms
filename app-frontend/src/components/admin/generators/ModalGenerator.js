import React from "react";
import {Button, Modal} from "react-bootstrap";


class ModalGenerator extends React.Component {
    constructor(props) {
        super(props);

        this.values = [true, 'sm-down', 'md-down'];
        this.state = {
            fullScreen: false,
            show: false
        };

        this.title = this.props.title;
        this.body = this.props.body;
        this.size = this.props.size;
        this.buttonType = this.props.buttonType;
        this.buttonValue = this.props.buttonValue;
        this.buttonClass = this.props.buttonClass;

        this.handleShow = this.handleShow.bind(this);
    }

    render() {

        let buttonObject;
        if (this.buttonType === 'a') {
            buttonObject =
                <a href="#" className={this.buttonClass} onClick={this.handleShow}>
                    {this.buttonValue}
                </a>;
        } else {
            buttonObject =
                <Button className={this.buttonClass} onClick={this.handleShow}>
                    {this.buttonValue}
                </Button>;
        }

        return (
            <>
                {/*{this.values.map((v, idx) => (
                    // () => this.handleShow(this, v) equal to this.handleShow.bind(this, v)
                    <Button key={idx} className="me-2 mb-2" onClick={() => this.handleShow(v)}>
                        Full Screen
                        {typeof v === 'string' && `below ${v.split('-')[0]}`}
                    </Button>
                ))}*/}

                {buttonObject}

                <Modal show={this.state.show} fullscreen={this.state.fullScreen} onHide={() => this.setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.body}
                    </Modal.Body>
                </Modal>
            </>
        );
    }

    setFullScreen(bitWise) {
        this.setState({fullScreen: bitWise});
    }

    setShow(bitWise) {
        this.setState({show: bitWise});
    }

    handleShow(e) {
        e.preventDefault();
        if (this.size === 'full-screen') {
            this.setFullScreen(true);
        }

        this.setShow(true);
    }
}

export default ModalGenerator;
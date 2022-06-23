import React from 'react';

/**
 * messages component
 */
class MessagesComponent extends React.Component {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            messagesBag: this.props.messagesBag
        }
    }

    /**
     * parse messages
     *
     * @returns {unknown[][]}
     */
    parseMessages() {
        return Object.entries(this.state.messagesBag.errors).map(item => {
            return item.map((item, index) => {
                if (index !== 0) {
                    if (item.length) {
                        return (
                            <li key={index} className="item-list">
                                <div className="alert alert-danger" role="alert">
                                    {item}
                                </div>
                            </li>
                        );
                    }
                }

                const element = document.getElementById(item);
                return element.classList.add('input-invalidate');
            });
        });
    }

    /**
     * render messages component
     *
     * @returns {string}
     */
    render() {
        let messagesHtml = '';

        if (this.state.messagesBag) {
            messagesHtml =
                <ul className="list-group list-inline">
                    {this.parseMessages()}
                </ul>;
        }

        return (messagesHtml);
    }
}

export default MessagesComponent;
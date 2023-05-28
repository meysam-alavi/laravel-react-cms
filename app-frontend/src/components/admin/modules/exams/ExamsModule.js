import React from "react";
import Module from "../Module";

class ExamsModule extends Module {
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title: 'مدیریت آزمون ها', href: null, isActive: false}
        ];
    }
}

export default ExamsModule;
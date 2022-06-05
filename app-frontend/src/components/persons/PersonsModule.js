import Module from "../admin/Module";

/**
 * Persons Module
 */
class PersonsModule extends Module {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title:'', href: '', isActive: false}
        ];
    }
}

export default PersonsModule;
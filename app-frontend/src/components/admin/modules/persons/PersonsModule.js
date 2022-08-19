import Module from "../Module";

/**
 * Persons Module Class Component
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
            {title: 'مدیریت اشخاص', href: null, isActive: false}
        ];
    }
}

export default PersonsModule;
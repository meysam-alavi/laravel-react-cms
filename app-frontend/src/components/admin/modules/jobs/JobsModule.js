import Module from "../Module";

/**
 * Jobs Module Class Component
 */
class JobsModule extends Module {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title: 'مدیریت مشاغل', href: null, isActive: false}
        ];
    }
}

export default JobsModule;
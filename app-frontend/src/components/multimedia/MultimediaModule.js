import Module from "../admin/Module";

/**
 * Multimedia Module
 */
class MultimediaModule extends Module {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title: 'چند رسانه ای', href: null, isActive: false}
        ];
    }
}

export default MultimediaModule;
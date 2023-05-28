import Module from "../Module";

/**
 * Categories Module Class Component
 */
class CategoriesModule extends Module {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title: 'ماژول مدیریت دسته بندی ها', href: null, isActive: false}
        ];
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {
        return super.render();
    }
}

export default CategoriesModule;
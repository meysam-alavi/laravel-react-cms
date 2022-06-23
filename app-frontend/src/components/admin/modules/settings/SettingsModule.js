import Module from "../Module";

/**
 * Settings Module Component
 */
class SettingsModule extends Module {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title: 'ماژول تنظیمات', href: null, isActive: false}
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

export default SettingsModule;
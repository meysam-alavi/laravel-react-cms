import Module from "../Module";


class FootballModule extends Module {
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title: 'مدیریت فوتبال', href: null, isActive: false}
        ];

        this.teamTypes = [
            {sCKey: 'NT', sCValue: 'تیم ملی'},
            {sCKey: 'CT', sCValue: 'تیم باشگاهی'}
        ];
    }
}

export default FootballModule;
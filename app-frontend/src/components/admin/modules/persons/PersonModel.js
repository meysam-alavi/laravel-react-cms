import PersonsModule from "./PersonsModule";
import axiosInstance from "../../../../services/api";
import Errors from "../assisstants/Errors";

/**
 * Person Model Class Component
 */
class PersonModel extends PersonsModule {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.urlCreate = `/api/${this.getLang()}/admin/user/person/create`;

        this.state = {
            messages: ''
        };
    }


    create(data) {
        axiosInstance.post(this.urlCreate, data, this.config).then(response => {

        }).catch(error => {
            return <Errors errorObj={error}/>;
        });
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

export default PersonModel;
import FootballModule from "./FootballModule";
import axiosInstance from "../../../../services/api";


/**
 * ClubModel Class Component
 */
class ClubModel extends FootballModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.createClubUrl = `/api/${this.getLang()}/admin/football/club/create`;
    }

    /**
     * create
     *
     * @param data
     * @returns {Promise<boolean>}
     */
    create(data) {
        let frmData = new FormData();
        frmData.append('name', data.name);
        frmData.append('surname', data.surname);
        frmData.append('description', data.description);
        frmData.append('continent_id', data.continentId);
        frmData.append('country_id', data.countryId);
        frmData.append('city_id', data.cityId);
        frmData.append('company_id', data.companyId);
        frmData.append('date_establishment', data.dateEstablishment);

        return axiosInstance.post(this.createClubUrl, data, this.config).then(response => {
            let endResult = false;
            const result = response.data;

            if (result.success === true) {
                endResult = true;
            }

            return endResult;
        }).catch(error => {
            return false;
        });
    }
}

export default ClubModel;
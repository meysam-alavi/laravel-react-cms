import CompaniesModule from "./CompaniesModule";

/**
 * CompanyModel Class Component
 */
class CompanyModel extends CompaniesModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.urlCreateCompany = `/api/${this.getLang()}/admin/companies/company/create`;
    }
}

export default CompanyModel;
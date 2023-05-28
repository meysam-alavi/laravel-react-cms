import Module from "../Module";

/**
 * CompaniesModule Class Component
 */
class CompaniesModule extends Module
{
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title: 'مدیریت شرکت ها', href: null, isActive: false}
        ];

        this.companyTypes = {
            PuJSC: 'شرکت سهامی عام', // Public joint stock company
            PrJSC: 'شرکت سهامی خاص', // Private joint stock company
            LimLC: 'شرکت با مسئولیت محدود', // Limited liability company
            CWUnL: 'شرکت با مسئولیت نامحدود', // Company with unlimited liability
            CoopC: 'شرکت تعاونی', // Cooperative company
            GoveC: 'شرکت دولتی', // government company
            PrivC: 'شرکت خصوصی', // Private Company
            ForeC: 'شرکت خارجی', // foreign company
            CommC: 'شرکت تجاری', // Commercial company
            InduC: 'شرکت صنعتی', // Industrial company
            TechC: 'شرکت فناوری', // Technology company
            FinaC: 'شرکت مالی', // Finance company
            InsuC: 'شرکت بیمه', // Insurance Company
            TranC: 'شرکت حمل و نقل', // Transportation company
            TourC: 'شرکت گردشگری', // Tourism company
            CharC: 'شرکت خیریه', // Charity company
            PartC: 'شرکت تضامنی', // Partnership company
            PACCC: 'شرکت تعاونی تولید و مصرف', // Production and consumption cooperative company
            AgrCC: 'شرکت تعاونی کشاورزی', // Agricultural cooperative company
            HouCC: 'شرکت تعاونی مسکن', // Housing cooperative company
            ServC: 'شرکت خدماتی', // service company
        };

        this.companyTypesSelectOptions = [
            {gKey: 'PuJSC', gValue: 'شرکت سهامی عام'},
            {gKey: 'PrJSC', gValue: 'شرکت سهامی خاص'},
            {gKey: 'LimLC', gValue: 'شرکت با مسئولیت محدود'},
            {gKey: 'CWUnL', gValue: 'شرکت با مسئولیت نامحدود'},
            {gKey: 'CoopC', gValue: 'شرکت تعاونی'},
            {gKey: 'GoveC', gValue: 'شرکت دولتی'},
            {gKey: 'PrivC', gValue: 'شرکت خصوصی'},
            {gKey: 'ForeC', gValue: 'شرکت خارجی'},
            {gKey: 'CommC', gValue: 'شرکت تجاری'},
            {gKey: 'InduC', gValue: 'شرکت صنعتی'},
            {gKey: 'TechC', gValue: 'شرکت فناوری'},
            {gKey: 'FinaC', gValue: 'شرکت مالی'},
            {gKey: 'InsuC', gValue: 'شرکت بیمه'},
            {gKey: 'TranC', gValue: 'شرکت حمل و نقل'},
            {gKey: 'TourC', gValue: 'شرکت گردشگری'},
            {gKey: 'CharC', gValue: 'شرکت خیریه'},
            {gKey: 'PartC', gValue: 'شرکت تضامنی'},
            {gKey: 'PACCC', gValue: 'شرکت تعاونی تولید و مصرف'},
            {gKey: 'AgrCC', gValue: 'شرکت تعاونی کشاورزی'},
            {gKey: 'HouCC', gValue: 'شرکت تعاونی مسکن'},
            {gKey: 'ServC', gValue: 'شرکت خدماتی'}
        ];
    }
}

export default CompaniesModule;
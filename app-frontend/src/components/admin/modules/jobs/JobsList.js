import JobsModule from "./JobsModule";


/**
 * Jobs List Class Component
 */
class JobsList extends JobsModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'لیست مشاغل'
        };

        this.pageInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });
    }
}

export default JobsList;
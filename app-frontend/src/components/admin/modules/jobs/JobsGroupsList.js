import JobsModule from "./JobsModule";

/**
 * Jobs Groups List Class Component
 */
class JobsGroupsList extends JobsModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'لیست گروه های مشاغل'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });
    }
}

export default JobsGroupsList;
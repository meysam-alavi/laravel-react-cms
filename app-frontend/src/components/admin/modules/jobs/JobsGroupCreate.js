import JobsModule from "./JobsModule";

/**
 * Jobs Group Create Class Component
 */
class JobsGroupCreate extends JobsModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم ایجاد گروه مشاغل'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });
    }
}

export default JobsGroupCreate;
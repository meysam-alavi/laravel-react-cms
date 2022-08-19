import JobsModule from "./JobsModule";

/**
 * Job Add Class Component
 */
class JobAdd extends JobsModule {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم افزودن شغل جدید'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });
    }
}

export default JobAdd;
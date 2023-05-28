import Module from "../Module";

/**
 * Expenses Module Class Component
 */
class ExpensesModule extends Module {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pathInfo = [
            {title: 'مدیریت هزینه ها', href: null, isActive: false}
        ];
    }
}

export default ExpensesModule;
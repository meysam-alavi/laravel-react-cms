//import logo from './logo.svg';
import React from "react";
import {Col, Container, Navbar, Row} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ExpenseCreate from "./components/admin/modules/expenses/ExpenseCreate";
import EditExpenseComponent from "./components/admin/modules/expenses/ExpenseEdit";
import ExpensesList from "./components/admin/modules/expenses/ExpensesList";
import AuthenticateAble from "./components/admin/modules/user/AuthenticateAble";
import Sidebar from "./components/admin/modules/dashboard/Sidebar";
import DashboardMiniTools from "./components/admin/modules/dashboard/DashboardMiniTools";
import UserEdit from "./components/admin/modules/user/UserEdit";
import ChangeAvatar from "./components/admin/modules/user/ChangeAvatar";
import VideosManagement from "./components/admin/modules/multimedia/VideosManagement";
import ImagesManagement from "./components/admin/modules/multimedia/ImagesManagement";
import SoundsManagement from "./components/admin/modules/multimedia/SoundsManagement";
import AddEducationalGrade from "./components/admin/modules/settings/common/educationalGrades/AddEducationalGrade";
import ContinentsList from "./components/admin/modules/settings/common/regions/continents/ContinentsList";
import BaseComponent from "./components/admin/BaseComponent";
import PersonAdd from "./components/admin/modules/persons/PersonAdd";
import CategoriesList from "./components/admin/modules/categories/CategoriesList";
import CategoryCreate from "./components/admin/modules/categories/CategoryCreate";
import PersonsList from "./components/admin/modules/persons/PersonsList";
import JobsGroupCreate from "./components/admin/modules/jobs/JobsGroupCreate";
import JobsGroupsList from "./components/admin/modules/jobs/JobsGroupsList";
import JobAdd from "./components/admin/modules/jobs/JobAdd";
import JobsList from "./components/admin/modules/jobs/JobsList";
import PersonJobsAdd from "./components/admin/modules/persons/PersonJobsAdd";
import JobsGroupEdit from "./components/admin/modules/jobs/JobsGroupEdit";
import JobEdit from "./components/admin/modules/jobs/JobEdit";

/**
 * App Class Component
 */
class App extends BaseComponent {
    loggedIn: boolean = true;
    authenticateAbleObj: Object = null;

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.authenticateAbleObj = new AuthenticateAble();

        this.state = {
            shouldUpdate: true
        };

        this.setShouldUpdate = this.setShouldUpdate.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }

    /**
     * set should update
     *
     * @param turn
     * @param e
     */
    setShouldUpdate(turn, e) {
        this.setState({shouldUpdate: turn});
    }

    /**
     * render App component
     *
     * @returns {JSX.Element}
     */
    render() {
        let header;
        let content;

        if (this.loggedIn) {
            header = (
                <Container>
                    <DashboardMiniTools/>

                    {/*<Navbar.Brand>
                        <Link to={"create-expenses"} className="nav-link">
                            مدیریت هزینه
                        </Link>
                    </Navbar.Brand>*/}

                    {/*<Nav className="justify-content-end">
                        <Nav>
                            <Link to={"create-expenses"} className="nav-link">
                                ایجاد هزینه
                            </Link>
                            <Link to={"expenses-listing"} className="nav-link">
                                لیست هزینه
                            </Link>
                            {
                                this.loggedIn ?
                                    <Button variant="danger" size="sm" onClick={this.authenticateAbleObj.logout}>
                                        خروج
                                    </Button> :
                                    <Link to="/login" className="nav-link">
                                        ورود
                                    </Link>
                            }
                        </Nav>
                    </Nav>*/}
                </Container>
            );

            content = (
                <Row>
                    <Col lg={2}><Sidebar/></Col>
                    <Col lg={10} className="py-2">
                        <Routes>
                            <Route path="/" element={<ExpenseCreate/>}/>

                            {/*Settings Module*/}
                            <Route path="add-educational-grade" element={<AddEducationalGrade/>}/>
                            <Route path="continents-list" element={<ContinentsList/>}/>


                            <Route path="/create-expense" element={<ExpenseCreate/>}/>
                            <Route path="/edit-expense/:id" element={<EditExpenseComponent/>}/>
                            <Route path="/:lang/admin/module/expenses-manager/expenses-listing"
                                   element={<ExpensesList/>}/>
                            <Route path='/user-edit' element={<UserEdit/>}/>
                            <Route path="/:lang/admin/modules/user/change-avatar" element={<ChangeAvatar/>}/>

                            {/*Multimedia Module*/}
                            <Route path="/:lang/admin/modules/multimedia/videos-management" element={<VideosManagement/>}/>
                            <Route path="/:lang/admin/modules/multimedia/images-management" element={<ImagesManagement/>}/>
                            <Route path="/:lang/admin/modules/multimedia/sounds-management" element={<SoundsManagement/>}/>


                            {/*Persons Module*/}
                            <Route path="/:lang/admin/modules/persons/add-person" element={<PersonAdd/>}/>
                            <Route path="/:lang/admin/modules/persons/persons-list" element={<PersonsList/>}/>
                            {/*<Route path="/:lang/admin/modules/persons/jobs/person-jobs-add/:personId" element={<PersonJobsAdd/>}/>*/}
                            <Route path="/:lang/admin/modules/persons/jobs/person-jobs-add/:personId" element={<PersonJobsAdd/>}/>


                            {/*Jobs Module*/}
                            <Route path="/:lang/admin/modules/jobs/jobs-group-create" element={<JobsGroupCreate/>}/>
                            <Route path="/:lang/admin/modules/jobs/jobs-group-list" element={<JobsGroupsList/>}/>
                            <Route path="/:lang/admin/modules/jobs/jobs-group-edit/:jobsGroupId" element={<JobsGroupEdit/>}/>

                            <Route path="/:lang/admin/modules/jobs/job-add" element={<JobAdd/>}/>
                            <Route path="/:lang/admin/modules/jobs/jobs-list" element={<JobsList/>}/>
                            <Route path="/:lang/admin/modules/jobs/job-edit/:jobId" element={<JobEdit/>}/>



                            {/*Categories Module*/}
                            <Route path="/:lang/admin/modules/categories/list" element={<CategoriesList/>}/>
                            <Route path="/:lang/admin/modules/categories/create" element={<CategoryCreate/>}/>

                        </Routes>
                    </Col>
                </Row>
            );
        } else {
            content = (
                <Row>
                    <Col lg={12}>
                        <Routes>
                            <Route path="/:lang/admin/">
                                <Route path="login" element={<AuthenticateAble/>}/>
                            </Route>

                            {/*<Route path="/:lang(fa|en)/admin/login" exact component={AuthenticateAble}/>*/}
                        </Routes>
                    </Col>
                </Row>
            );
        }


        return (
            <div className="app">
                <header className="app-header">
                    <Navbar variant="success" className="bg-dark text-white">
                        {header}
                    </Navbar>
                </header>

                <Container fluid>
                    {content}
                </Container>
            </div>
            /*<Router>
                <div className="app">
                    <header className="app-header">
                        <Navbar variant="success" className="bg-dark text-white">
                            {header}
                        </Navbar>
                    </header>

                    <Container fluid>
                        {content}
                    </Container>
                </div>
            </Router>*/
        );
    }

    /**
     * component will mount
     */
    componentWillMount() {

    }

    /**
     * component did mount
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        this.loggedIn = await this.authenticateAbleObj.checkLogin().then(result => {
            return result;
        });

        this.setShouldUpdate(!this.loggedIn);
    }

    /**
     * should component update
     *
     * @param nextProps
     * @param nextState
     * @param nextContext
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        let shouldUpdate = this.state.shouldUpdate;

        if (shouldUpdate) {
            console.log('should update');
            this.setShouldUpdate(false);
        } else {
            console.log('not require update');
        }

        return shouldUpdate;
    }
}

export default App;
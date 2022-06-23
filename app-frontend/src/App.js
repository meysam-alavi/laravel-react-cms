//import logo from './logo.svg';
import React from "react";
import {Col, Container, Navbar, Row} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
//import BaseRouteChecker from "./components/admin/BaseRouteChecker";
import CreateExpenseComponent from "./components/admin/modules/expense/CreateExpenseComponent";
import EditExpenseComponent from "./components/admin/modules/expense/EditExpenseComponent";
import ExpensesListingComponent from "./components/admin/modules/expense/ExpensesListingComponent";
import AuthenticateAble from "./components/admin/modules/user/AuthenticateAble";
import Sidebar from "./components/admin/modules/dashboard/Sidebar";
import DashboardMiniTools from "./components/admin/modules/dashboard/DashboardMiniTools";
import UserEdit from "./components/admin/modules/user/UserEdit";
import ChangeAvatar from "./components/admin/modules/user/ChangeAvatar";
import VideosManagement from "./components/admin/modules/multimedia/VideosManagement";
import ImagesManagement from "./components/admin/modules/multimedia/ImagesManagement";
import SoundsManagement from "./components/admin/modules/multimedia/soundsManagement";
import AddEducationalGrade from "./components/admin/modules/settings/common/educationalGrades/AddEducationalGrade";
import ContinentsList from "./components/admin/modules/settings/common/regions/continents/ContinentsList";
import BaseComponent from "./components/admin/BaseComponent";

/**
 * App component
 */
class App extends BaseComponent {
    loggedIn: boolean = false;
    authenticateAbleObj: Object = null;

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.authenticateAbleObj = new AuthenticateAble();
        this.loggedIn = this.authenticateAbleObj.checkLogin();
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
                        <Link to={"create-expense"} className="nav-link">
                            مدیریت هزینه
                        </Link>
                    </Navbar.Brand>*/}

                    {/*<Nav className="justify-content-end">
                        <Nav>
                            <Link to={"create-expense"} className="nav-link">
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
                    <Col lg={10} className="py-4">
                        <Routes>
                            <Route path="/" element={<CreateExpenseComponent/>}/>

                            {/*Settings Module*/}
                            <Route path="add-educational-grade" element={<AddEducationalGrade/>}/>
                            <Route path="continents-list" element={<ContinentsList/>}/>


                            <Route path="/create-expense" element={<CreateExpenseComponent/>}/>
                            <Route path="/edit-expense/:id" element={<EditExpenseComponent/>}/>
                            <Route path="/:lang/admin/module/expenses-manager/expenses-listing"
                                   element={<ExpensesListingComponent/>}/>
                            <Route path='/user-edit' element={<UserEdit/>}/>
                            <Route path="/change-avatar" element={<ChangeAvatar/>}/>
                            <Route path="/multimedia/videos-management" element={<VideosManagement/>}/>
                            <Route path="/multimedia/images-management" element={<ImagesManagement/>}/>
                            <Route path="/multimedia/sounds-management" element={<SoundsManagement/>}/>
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

    componentDidMount() {
        //BaseComponent();
    }
}

export default App;
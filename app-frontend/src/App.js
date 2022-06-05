//import logo from './logo.svg';
import React from "react";
import {/*Nav,*/ Navbar, Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Routes, Route/*, Link*/} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CreateExpenseComponent from "./components/expense/CreateExpenseComponent";
import EditExpenseComponent from "./components/expense/EditExpenseComponent";
import ExpensesListingComponent from "./components/expense/ExpensesListingComponent";
import AuthenticateAble from "./components/user/AuthenticateAble";
import UserRegistration from "./components/user/UserRegistration";
import Sidebar from "./components/admin/Sidebar";
import DashboardMiniTools from "./components/admin/DashboardMiniTools";
import UserEdit from "./components/user/UserEdit";
import ChangeAvatar from "./components/admin/ChangeAvatar";
import VideosManagement from "./components/multimedia/VideosManagement";
import ImagesManagement from "./components/multimedia/ImagesManagement";
import SoundsManagement from "./components/multimedia/soundsManagement";
import AddEducationalGrade from "./components/settings/common/educationalGrades/AddEducationalGrade";
import ContinentsList from "./components/settings/common/regions/continents/ContinentsList";


/**
 * App component
 */
class App extends React.Component {
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
                            <Route path="/expenses-listing" element={<ExpensesListingComponent/>}/>
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
                            <Route path="/login" element={<AuthenticateAble/>}/>
                            <Route path="/register" element={<UserRegistration/>}/>
                        </Routes>
                    </Col>
                </Row>
            );
        }


        return (
            <Router>
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
            </Router>
        );
    }
}

export default App;
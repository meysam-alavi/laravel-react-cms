import TeamModel from "./TeamModel";
import {Row, Col, Form} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";
import ContinentSelectOptions from "../settings/common/regions/continents/ContinentSelectOptions";
import CountrySelectOptions from "../settings/common/regions/countries/CountrySelectOptions";
import CitySelectOptions from "../settings/common/regions/cities/CitySelectOptions";
import SelectOptionGenerator from "../../generators/SelectOptionGenerator";
import FootballTypeSelectOptions from "./FootballTypeSelectOptions";

/**
 * TeamAdd class component
 */
class TeamAdd extends TeamModel {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم درج تیم جدید'
        };

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.state = {
            name: '',
            surname: '',
            description: '',
            continentId: '',
            countryId: '',
            cityId: '',
            footballTypeId: '',
            footballTypes: '',
            gender: '',
            teamType: '',
            clubId: '',
            clubs: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeContinentId = this.onChangeContinentId.bind(this);
        this.onChangeCountryId = this.onChangeCountryId.bind(this);
        this.onChangeCityId = this.onChangeCityId.bind(this);
        this.onChangeFootballTypeId = this.onChangeFootballTypeId.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeTeamType = this.onChangeTeamType.bind(this);
        this.onChangeClubId = this.onChangeClubId.bind(this);
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {

        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">
                        {this.pageInfo.title}
                    </span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-md-5">
                    {this.state.messages ? <MessagesComponent messagesBage={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="name" className="form-group mb-2">
                            <Form.Label className="mb-1">نام:</Form.Label>
                            <Form.Control type="text" dir="auto" value={this.state.name}
                                          onChange={this.onChangeName}/>
                        </Form.Group>
                        <Form.Group controlId="surname" className="form-group mb-2">
                            <Form.Label className="mb-1">نام کوتاه:</Form.Label>
                            <Form.Control type="text" dir="auto" value={this.state.surname}
                                          onChange={this.onChangeSurname}/>
                        </Form.Group>
                        <Form.Group controlId="description" className="form-group mb-2">
                            <Form.Label className="mb-1">توضیحات:</Form.Label>
                            <Form.Control as="textarea" dir="auto" rows="4" value={this.state.description}
                                          onChange={this.onChangeDescription}/>
                        </Form.Group>
                        <Form.Group controlId="continent" className="form-group mb-2">
                            <Form.Label className="mb-1">قاره:</Form.Label>
                            <ContinentSelectOptions
                                optionKey="iso2"
                                optionValue="name_en"
                                columns={['iso2', 'name_en']}
                                dir="auto"
                                optional={true}
                                onChange={this.onChangeContinentId}
                            />
                        </Form.Group>
                        {this.state.continentId &&
                            <Form.Group controlId="countryId" className="form-group mb-2">
                                <Form.Label className="mb-1">کشور:</Form.Label>
                                <CountrySelectOptions
                                    optionKey="country_id"
                                    optionValue="name_en"
                                    columns={['country_id', 'name_en']}
                                    continentId={this.state.continentId}
                                    dir="auto"
                                    optional={true}
                                    onChange={this.onChangeCountryId}
                                />
                            </Form.Group>
                        }
                        {this.state.countryId &&
                            <Form.Group controlId="cityId" className="form-group mb-2">
                                <Form.Label className="mb-1">شهر:</Form.Label>
                                <CitySelectOptions
                                    optionKey="geo_name_id"
                                    optionValue="name"
                                    dir="auto"
                                    optional={true}
                                    columns={['geo_name_id', 'name']}
                                    condition={{'country_id =': this.state.countryId}}
                                    onChange={this.onChangeCityId}
                                />
                            </Form.Group>
                        }
                        <Form.Group controlId="footballTypeId" className="form-group mb-2">
                            <Form.Label className="mb-1">نوع فوتبال:</Form.Label>
                            <FootballTypeSelectOptions
                                optionKey="id"
                                optionValue="title"
                                optional={false}
                                columns={['id', 'title']}
                                onChange={this.onChangeFootballTypeId}
                                dir="auto"
                            />
                        </Form.Group>
                        <Form.Group controlId="gender" className="form-group mb-2">
                            <Form.Label className="mb-1">جنسیت:</Form.Label>
                            <SelectOptionGenerator
                                items={this.gendersCollection}
                                optionKey="sCKey"
                                optionValue="sCValue"
                                dir="auto"
                                value={this.state.gender}
                                className="input-required"
                                onChange={this.onChangeGender}
                            />
                        </Form.Group>
                        <Form.Group controlId="teamType" className="form-group mb-2">
                            <Form.Label className="mb-1">نوع تیم:</Form.Label>
                            <SelectOptionGenerator
                                items={this.teamTypes}
                                optionKey="sCKey"
                                optionValue="sCValue"
                                dir="auto"
                                value={this.state.teamType}
                                className="input-required"
                                onChange={this.onChangeTeamType}
                            />
                        </Form.Group>
                        <Form.Group controlId="clubId" className="form-group mb-2">
                            <Form.Label className="mb-1">باشگاه:</Form.Label>
                            {/*<SelectOptionGenerator
                                items={this.state.clubs}
                                optionKey='id'
                                optionValue='name'
                                value={this.state.clubId}
                                className="input-required"
                                onChange={this.onChangeClubId}
                            />*/}
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }

    onSubmit(e) {
        e.preventDefault();
    }

    /**
     * on change name
     *
     * @param e
     */
    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    /**
     * on change surname
     *
     * @param e
     */
    onChangeSurname(e) {
        this.setState({surname: e.target.value});
    }

    /**
     * on change description
     *
     * @param e
     */
    onChangeDescription(e) {
        this.setState({description: e.target.value});
    }

    /**
     * on change continentId
     *
     * @param e
     */
    onChangeContinentId(e) {
        this.setState({continentId: e.target.value});
    }

    /**
     * on change countryId
     *
     * @param e
     */
    onChangeCountryId(e) {
        this.setState({countryId: e.target.value});
    }

    /**
     * on change cityId
     *
     * @param e
     */
    onChangeCityId(e) {
        this.setState({cityId: e.target.value});
    }

    /**
     * on change footballTypeId
     *
     * @param e
     */
    onChangeFootballTypeId(e) {
        this.setState({footballTypeId: e.target.value});
    }

    /**
     * on change gender
     *
     * @param e
     */
    onChangeGender(e) {
        this.setState({gender: e.target.value});
    }

    /**
     * on change teamType
     *
     * @param e
     */
    onChangeTeamType(e) {
        this.setState({teamType: e.target.value});
    }

    /**
     * on change clubId
     *
     * @param e
     */
    onChangeClubId(e) {
        this.setState({clubId: e.target.value});
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

    }
}

export default TeamAdd;
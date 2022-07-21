import PersonsModule from "./PersonsModule";
import {Button, Col, Form, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css"
import MessagesComponent from "../assisstants/MessagesComponent";
import ContinentSelectOptions from "../settings/common/regions/continents/ContinentSelectOptions";
import CountrySelectOptions from "../settings/common/regions/countries/CountrySelectOptions";
import CitySelectOptions from "../settings/common/regions/cities/CitySelectOptions";
import SelectOptionGenerator from "../../generators/SelectOptionGenerator";

/**
 * Add Person Class Component
 */
class AddPerson extends PersonsModule {
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم افزودن شخص جدید'
        }

        this.pathInfo.push({
            title: this.pageInfo.title,
            href: null,
            isActive: true
        });

        this.genders = [
            {gKey: 'M', gValue: 'مرد'},
            {gKey: 'F', gValue: 'زن'}
        ];

        this.skinColors = [
            {sCKey: 'White', sCValue: 'سفید'},
            {sCKey: 'Yellow', sCValue: 'زرد'},
            {sCKey: 'Black', sCValue: 'سیاه'},
            {sCKey: 'Brown', sCValue: 'قهوه ای'},
            {sCKey: 'Tawny', sCValue: 'سبزه'},
            {sCKey: 'Red', sCValue: 'قرمز'}
        ];

        this.sizes = [
            {sKey: 'XS', sValue: 'XS'},
            {sKey: 'S', sValue: 'S'},
            {sKey: 'M', sValue: 'M'},
            {sKey: 'L', sValue: 'L'},
            {sKey: 'XL', sValue: 'XL'},
            {sKey: '2XL', sValue: '2XL'},
            {sKey: '3XL', sValue: '3XL'}
        ];

        this.state = {
            firstName: '',
            lastName: '',
            birthDate: new Date(),
            countryOfBirthId: '',
            countryOfCitizenshipId: '',
            messages: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);

        this.onChangeCountryOfBirth = this.onChangeCountryOfBirth.bind(this);
        this.onChangeCountryOfCitizenship = this.onChangeCountryOfCitizenship.bind(this);
    }

    /**
     * render add person form
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {
        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">{this.pageInfo.title}</span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-md-6">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="first-name" className="form-group mb-2">
                            <Form.Label className='mb-1'>نام:</Form.Label>
                            <div className="col-lg-7">
                                <Form.Control type="text" dir="auto" className="input-required"
                                              onChange={this.onChangeFirstName}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="last-name" className="form-group mb-2">
                            <Form.Label className="mb-1">نام خانوادگی:</Form.Label>
                            <div className="col-lg-7">
                                <Form.Control type="text" dir="auto" className="input-required"/>
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group mb-2">
                            <Form.Label className="mb-1">تاریخ تولد:</Form.Label>
                            <div className="col-lg-7">
                                <DatePicker
                                    selected={this.state.birthDate}
                                    onChange={date => this.onChangeBirthDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="form-control input-required-ltr"
                                    dir="ltr"/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="gender" className="form-group mb-2">
                            <Form.Label>جنسیت:</Form.Label>
                            <div className="col-lg-7">
                                <SelectOptionGenerator
                                    items={this.genders}
                                    optionKey="gKey"
                                    optionValue="gValue"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="national-code" className="form-group mb-2">
                            <Form.Label className="mb-1">کد ملی:</Form.Label>
                            <div className="col-lg-7">
                                <Form.Control type="text" dir="ltr"/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="birth-certificate-code" className="form-group mb-2">
                            <Form.Label className="mb-1">شماره شناسنامه:</Form.Label>
                            <div className="col-lg-7">
                                <Form.Control type="text" di="ltr"/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="birth-certificate-series" className="form-group mb-2">
                            <Form.Label className="mb-1">سری شناسنامه:</Form.Label>
                            <div className="col-lg-3">
                                <Form.Control type="text" dir="ltr"/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="birth-certificate-serial" className="form-group mb-2">
                            <Form.Label className="mb-1">سریال شناسنامه:</Form.Label>
                            <div className="col-lg-3">
                                <Form.Control type="text" dir="ltr"/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="country-of-birth" className="form-group mb-2">
                            <Form.Label className="mb-1">کشور تولد:</Form.Label>
                            <div className="col-lg-7">
                                <CountrySelectOptions
                                    optionKey="country_id"
                                    optionValue="name_en"
                                    onChange={this.onChangeCountryOfBirth}/>
                            </div>
                        </Form.Group>

                        {(this.state.countryOfBirthId) &&
                            (<Form.Group controlId="city-of-birth" className="form-group mb-2">
                                <Form.Label>شهر تولد:</Form.Label>
                                <div className="col-lg-7">
                                    <CitySelectOptions
                                        optionKey="geo_name_id"
                                        optionValue="name"
                                        condition={{'country_id =': this.state.countryOfBirthId}}
                                    />
                                </div>
                            </Form.Group>)}

                        <Form.Group controlId="country-of-citizenship" className="form-group mb-2">
                            <Form.Label>کشور محل سکونت:</Form.Label>
                            <div className="col-lg-7">
                                <CountrySelectOptions
                                    optionKey="country_id"
                                    optionValue="name_en"
                                    onChange={this.onChangeCountryOfCitizenship}
                                />
                            </div>
                        </Form.Group>

                        {(this.state.countryOfCitizenshipId) &&
                            (<Form.Group controlId="city-of-citizenship" className="form-group mb-2">
                                <Form.Label>شهر محل سکونت:</Form.Label>
                                <div className="col-lg-7">
                                    <CitySelectOptions
                                        optionKey="geo_name_id"
                                        optionValue="name"
                                        condition={{'country_id=': this.state.countryOfCitizenshipId}}/>
                                </div>
                            </Form.Group>)}

                        <Form.Group controlId="address-of-citizenship" className="form-group mb-2">
                            <Form.Label>آدرس:</Form.Label>
                            <div className="col-lg-7">
                                <Form.Control as="textarea" rows="3" dir="rtl"/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="skin-color" className="form-group mb-2">
                            <Form.Label>رنگ پوست:</Form.Label>
                            <div className="col-lg-7">
                                <SelectOptionGenerator
                                    items={this.skinColors}
                                    optionKey="sCKey"
                                    optionValue="sCValue"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="Height" className="form-group mb-2">
                            <Form.Label>قد:</Form.Label>
                            <div className="col-lg-7">
                                <Form.Control type="number" min="30" max="220" dir="ltr"/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="Weight" className="form-group mb-2">
                            <Form.Label>وزن:</Form.Label>
                            <div className="col-lg-7">
                                <Form.Control type="number" min="20" max="220" dir="ltr"/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="Size" className="form-group mb-2">
                            <Form.Label>اندازه:</Form.Label>
                            <div className="col-lg-7">
                                <SelectOptionGenerator
                                    items={this.sizes}
                                    optionKey="SKey"
                                    optionValue="sValue"
                                    dir="ltr"
                                />
                            </div>
                        </Form.Group>


                        <Form.Group className="form-group mb-2">
                            <Button type="submit" className="btn btn-primary btn-sm">ذخیره</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }

    onSubmit(e) {

    }

    /**
     * on change first name
     *
     * @param e
     */
    onChangeFirstName(e) {
        this.setState({firstName: e.target.value});
    }

    /**
     * on change last name
     *
     * @param e
     */
    onChangeLastName(e) {
        this.setState({lastName: e.target.value});
    }

    /**
     * on change birthdate
     *
     * @param date
     */
    onChangeBirthDate(date) {
        this.setState({birthDate: date});
    }

    /**
     * on change country of birth
     *
     * @param e
     */
    onChangeCountryOfBirth(e) {
        this.setState({countryOfBirthId: e.target.value});
    }

    /**
     * on change country of citizenship
     *
     * @param e
     */
    onChangeCountryOfCitizenship(e) {
        this.setState({countryOfCitizenshipId: e.target.value});
    }
}

export default AddPerson;
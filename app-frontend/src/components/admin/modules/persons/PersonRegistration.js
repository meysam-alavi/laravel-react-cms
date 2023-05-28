import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css"
import MessagesComponent from "../assisstants/MessagesComponent";
import CountrySelectOptions from "../settings/common/regions/countries/CountrySelectOptions";
import CitySelectOptions from "../settings/common/regions/cities/CitySelectOptions";
import SelectOptionGenerator from "../../generators/SelectOptionGenerator";
import PersonModel from "./PersonModel";
import "./PersonRegistration.css";

/**
 * Add Person Class Component
 */
class PersonRegistration extends PersonModel {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم ثبت نام شخص'
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
            first_name: '',
            last_name: '',
            birth_date: new Date(),
            gender: '',
            national_code: '',
            birth_certificate_code: '',
            birth_certificate_series: '',
            birth_certificate_serial: '',
            country_of_birth: '',
            city_of_birth: '',
            country_of_citizenship: '',
            city_of_citizenship: '',
            address_of_citizenship: '',
            skin_color: '',
            height: '',
            weight: '',
            size: '',
            messages: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeNationalCode = this.onChangeNationalCode.bind(this);
        this.onChangeBirthCertificateCode = this.onChangeBirthCertificateCode.bind(this);
        this.onChangeBirthCertificateSeries = this.onChangeBirthCertificateSeries.bind(this);
        this.onChangeBirthCertificateSerial = this.onChangeBirthCertificateSerial.bind(this);

        this.onChangeCountryOfBirth = this.onChangeCountryOfBirth.bind(this);
        this.onChangeCityOfBirth = this.onChangeCityOfBirth.bind(this);
        this.onChangeCountryOfCitizenship = this.onChangeCountryOfCitizenship.bind(this);
        this.onChangeCityOfCitizenship = this.onChangeCityOfCitizenship.bind(this);
        this.onChangeAddressOfCitizenship = this.onChangeAddressOfCitizenship.bind(this);
        this.onChangeSkinColor = this.onChangeSkinColor.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
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
                <Col className="col-md-12">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-flex flex-wrap mb-3">
                        <Form.Group controlId="first_name" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className='mb-1'>نام:</Form.Label>
                            <div>
                                <Form.Control type="text" dir="auto" className="input-required"
                                              onChange={this.onChangeFirstName}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="last_name" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">نام خانوادگی:</Form.Label>
                            <div>
                                <Form.Control type="text" dir="auto" className="input-required"
                                              onChange={this.onChangeLastName}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="birth_date" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">تاریخ تولد:</Form.Label>
                            <div>
                                <DatePicker
                                    selected={this.state.birth_date}
                                    onChange={date => this.onChangeBirthDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="form-control input-required-ltr"
                                    dir="ltr"/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="gender" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">جنسیت:</Form.Label>
                            <div>
                                <SelectOptionGenerator
                                    items={this.genders}
                                    optionKey="gKey"
                                    optionValue="gValue"
                                    onChange={this.onChangeGender}
                                    className="input-required"
                                    dir="auto"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="national_code" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">کد ملی:</Form.Label>
                            <div>
                                <Form.Control type="text" dir="ltr" onChange={this.onChangeNationalCode}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="birth_certificate_code" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">شماره شناسنامه:</Form.Label>
                            <div>
                                <Form.Control type="text" dir="ltr" onChange={this.onChangeBirthCertificateCode}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="birth_certificate_series" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">سری شناسنامه:</Form.Label>
                            <div className="col-lg-7">
                                <Form.Control type="text" dir="auto" onChange={this.onChangeBirthCertificateSeries}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="birth_certificate_serial" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">سریال شناسنامه:</Form.Label>
                            <div className="col-lg-7">
                                <Form.Control type="text" dir="ltr" onChange={this.onChangeBirthCertificateSerial}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="country_of_birth" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">کشور تولد:</Form.Label>
                            <div>
                                <CountrySelectOptions
                                    optionKey="country_id"
                                    optionValue="name_en"
                                    onChange={this.onChangeCountryOfBirth}
                                    dir="auto"/>
                            </div>
                        </Form.Group>

                        {(this.state.country_of_birth) &&
                            (<Form.Group controlId="city_of_birth" className="form-group flex-fill mb-2 px-2">
                                <Form.Label className="mb-1">شهر تولد:</Form.Label>
                                <div>
                                    <CitySelectOptions
                                        optionKey="geo_name_id"
                                        optionValue="name"
                                        condition={{'country_id =': this.state.country_of_birth}}
                                        onChange={this.onChangeCityOfBirth}
                                    />
                                </div>
                            </Form.Group>)}

                        <Form.Group controlId="country_of_citizenship" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">کشور محل سکونت:</Form.Label>
                            <div>
                                <CountrySelectOptions
                                    optionKey="country_id"
                                    optionValue="name_en"
                                    onChange={this.onChangeCountryOfCitizenship}
                                    dir="auto"
                                />
                            </div>
                        </Form.Group>

                        {(this.state.country_of_citizenship) &&
                            (<Form.Group controlId="city_of_citizenship" className="form-group flex-fill mb-2 px-2">
                                <Form.Label className="mb-1">شهر محل سکونت:</Form.Label>
                                <div className="col-lg-7">
                                    <CitySelectOptions
                                        optionKey="geo_name_id"
                                        optionValue="name"
                                        condition={{'country_id=': this.state.country_of_citizenship}}
                                        onChange={this.onChangeCityOfCitizenship}/>
                                </div>
                            </Form.Group>)}

                        <Form.Group controlId="address_of_citizenship" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">آدرس:</Form.Label>
                            <div>
                                <Form.Control as="textarea" rows="3" dir="auto"
                                              onChange={this.onChangeAddressOfCitizenship}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="skin_color" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">رنگ پوست:</Form.Label>
                            <div>
                                <SelectOptionGenerator
                                    items={this.skinColors}
                                    optionKey="sCKey"
                                    optionValue="sCValue"
                                    dir="auto"
                                    onChange={this.onChangeSkinColor}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="height" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">قد:</Form.Label>
                            <div>
                                <Form.Control type="number" min="30" max="220" dir="ltr"
                                              onChange={this.onChangeHeight}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="weight" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">وزن:</Form.Label>
                            <div>
                                <Form.Control type="number" min="20" max="220" dir="ltr"
                                              onChange={this.onChangeWeight}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="size" className="form-group flex-fill mb-2 px-2">
                            <Form.Label className="mb-1">اندازه:</Form.Label>
                            <div className="col-lg-7">
                                <SelectOptionGenerator
                                    items={this.sizes}
                                    optionKey="SKey"
                                    optionValue="sValue"
                                    dir="ltr"
                                    onChange={this.onChangeSize}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group col-12 mb-2 px-2">
                            <Button type="submit" className="btn btn-primary btn-sm">ذخیره</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }

    /**
     * on submit
     *
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();

        this.create(this.state);
    }

    /**
     * on change first name
     *
     * @param e
     */
    onChangeFirstName(e) {
        this.setState({first_name: e.target.value});
    }

    /**
     * on change last name
     *
     * @param e
     */
    onChangeLastName(e) {
        this.setState({last_name: e.target.value});
    }

    /**
     * on change birthdate
     *
     * @param date
     */
    onChangeBirthDate(date) {
        this.setState({birth_date: date});
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
     * on change national code
     *
     * @param e
     */
    onChangeNationalCode(e) {
        this.setState({national_code: e.target.value});
    }

    /**
     * on change birth certificate code
     *
     * @param e
     */
    onChangeBirthCertificateCode(e) {
        this.setState({birth_certificate_code: e.target.value});
    }

    /**
     * on change birth certificate series
     *
     * @param e
     */
    onChangeBirthCertificateSeries(e) {
        this.setState({birth_certificate_series: e.target.value});
    }

    /**
     * on change birth certificate serial
     *
     * @param e
     */
    onChangeBirthCertificateSerial(e) {
        this.setState({birth_certificate_serial: e.target.value});
    }

    /**
     * on change country of birth
     *
     * @param e
     */
    onChangeCountryOfBirth(e) {
        this.setState({country_of_birth: e.target.value});
    }

    /**
     * on change city of birth
     *
     * @param e
     */
    onChangeCityOfBirth(e) {
        this.setState({city_of_birth: e.target.value});
    }

    /**
     * on change country of citizenship
     *
     * @param e
     */
    onChangeCountryOfCitizenship(e) {
        this.setState({country_of_citizenship: e.target.value});
    }

    /**
     * on change city of citizenship
     *
     * @param e
     */
    onChangeCityOfCitizenship(e) {
        this.setState({city_of_citizenship: e.target.value});
    }

    /**
     * on change address of citizenship
     *
     * @param e
     */
    onChangeAddressOfCitizenship(e) {
        this.setState({address_of_citizenship: e.target.value});
    }

    /**
     * on change skin color
     *
     * @param e
     */
    onChangeSkinColor(e) {
        this.setState({skin_color: e.target.value});
    }

    /**
     * on change height
     *
     * @param e
     */
    onChangeHeight(e) {
        this.setState({height: e.target.value});
    }

    /**
     * on change weight
     *
     * @param e
     */
    onChangeWeight(e) {
        this.setState({weight: e.target.value});
    }

    /**
     * on change size
     *
     * @param e
     */
    onChangeSize(e) {
        this.setState({size: e.target.value});
    }
}

export default PersonRegistration;
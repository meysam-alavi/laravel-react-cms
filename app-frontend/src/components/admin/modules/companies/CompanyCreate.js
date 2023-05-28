import CompanyModel from "./CompanyModel";
import {Row, Col, Form, Button} from "react-bootstrap";
import MessagesComponent from "../assisstants/MessagesComponent";
import InputGenerator from "../../generators/InputGenerator";
import DatePicker from "react-datepicker";
import SelectOptionGenerator from "../../generators/SelectOptionGenerator";
import PersonsSelectOptions from "../persons/PersonsSelectOptions";

/**
 * CompanyCreate Class Component
 */
class CompanyCreate extends CompanyModel {
    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم ایجاد شرکت جدید'
        }

        this.pathInfo = [
            {title: this.pageInfo.title, href: null, isActive: true}
        ];

        this.state = {
            name: '',
            mail_1: '',
            mail_2: '',
            mail_3: '',
            mailsStack: [],
            surname: '',
            abbreviated_name: '',
            registration_number: '',
            date_establishment: '',
            registered_finance: '',
            phone_1: '',
            phone_2: '',
            phone_3: '',
            phonesStack: [],
            address: '',
            website: '',
            company_types: [],
            companyOwner: '',
            /*companyOwners: [
                {value: 'chocolate', label: 'Chocolate'},
                {value: 'strawberry', label: 'Strawberry'},
                {value: 'vanilla', label: 'Vanilla'},
            ]*/
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeAbbreviatedName = this.onChangeAbbreviatedName.bind(this);
        this.onChangeRegistrationNumber = this.onChangeRegistrationNumber.bind(this);
        this.onChangeRegisteredFinance = this.onChangeRegisteredFinance.bind(this);
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onClickMailAdd = this.onClickMailAdd.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeOwner = this.onChangeOwner.bind(this);
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {
        let mailInputs = '';
        let phoneInputs = '';

        mailInputs = this.state.mailsStack.map((item, index) => {
            let mailKey = 'mail_' + item;

            return (
                <InputGenerator
                    key={index}
                    controlId={mailKey}
                    formGroupClass="form-group mb-2"
                    labelClass="mb-1"
                    labelText="ایمیل"
                    controlType="text"
                    controlValue={this.state.mailKey}
                    controlDir="ltr"
                    controlOnChange={(item) => this.onChangeMail}
                    divClass="col-md-7"
                />
            );
        });

        phoneInputs = this.state.phonesStack.map((item, index) => {

        });

        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">
                        {this.pageInfo.title}
                    </span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-md-5">
                    {this.state.messages ? <MessagesComponent messagesBag={this.state.messages}/> : ''}
                    <Form onSubmit={this.onSubmit} className="d-block mb-3">
                        <Form.Group controlId="name" className="form-group mb-2">
                            <Form.Label className="mb-1">نام شرکت:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="auto" value={this.state.name} className="input-required"
                                              onChange={this.onChangeName}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="surname" className="form-group mb-2">
                            <Form.Label className="mb-1">نام کوتاه:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="auto" value={this.state.surname}
                                              onChange={this.onChangeSurname}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="abbreviated_name" className="form-group mb-2">
                            <Form.Label className="mb-1">نام اختصاری:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="auto" value={this.state.abbreviated_name}
                                              onChange={this.onChangeAbbreviatedName}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="registration_number" className="form-group mb-2">
                            <Form.Label className="mb-1">شماره ثبت:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="ltr" value={this.state.registration_number}
                                              onChange={this.onChangeRegistrationNumber}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="date_establishment" className="form-group mb-2">
                            <Form.Label className="mb-1">تاریخ تاسیس:</Form.Label>
                            <div className="col-md-7">
                                <DatePicker
                                    selected={this.state.date_establishment}
                                    onChange={date => this.onChangeDateEstablishment(date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="form-control input-required-ltr"
                                    dir="ltr"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="registered_finance" className="form-group mb-2">
                            <Form.Label className="mb-1">دارایی ثبت شده:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="ltr" value={this.state.registered_finance}
                                              onChange={this.onChangeRegisteredFinance}/>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="phone_1" className="form-group mb-2">
                            <Form.Label className="mb-1">تلفن ثابت:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="ltr" value={this.state.phone_1}
                                              onChange={this.onChangePhone.bind(1)}/>
                            </div>
                        </Form.Group>
                        {phoneInputs}
                        {
                            this.state.phonesStack.length < 2 &&
                            <a href="#" onClick={this.onClickPhoneAdd}>
                                <i className="fa fa-plus-circle"/>
                            </a>
                        }

                        <Form.Group controlId="mail_1" className="form-group mb-2">
                            <Form.Label className="mb-1">ایمیل:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="ltr" value={this.state.mail_1}
                                              onChange={this.onChangeMail.bind(1)}/>
                            </div>
                        </Form.Group>
                        {mailInputs}
                        {
                            this.state.mailsStack.length < 2 &&
                            <a href="#" onClick={this.onClickMailAdd}>
                                <i className="fa fa-plus-circle"/>
                            </a>
                        }
                        <Form.Group controlId="website" className="form-group mb-2">
                            <Form.Label className="mb-1">وب سایت:</Form.Label>
                            <div className="col-md-7">
                                <Form.Control type="text" dir="ltr" value={this.state.website}
                                              onChange={this.onChangeWebsite}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="address" className="form-group mb-2">
                            <Form.Label className="mb-1">آدرس:</Form.Label>
                            <div>
                                <Form.Control as="textarea" row="3" dir="auto" value={this.state.address}
                                              onChange={this.onChangeAddress}/>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="company_types" className="form-group mb-2">
                            <Form.Label className="mb-1">انواع شرکت:</Form.Label>
                            <div>
                                <SelectOptionGenerator
                                    items={this.companyTypesSelectOptions}
                                    optionKey="gKey"
                                    optionValue="gValue"
                                    onChange={this.onChangeGender}
                                    className="input-required"
                                    dir="auto"
                                    isMultiple={true}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="companyOwner" className="form-group mb-2">
                            <Form.Label className="mb-1">مالکان شرکت:</Form.Label>
                            <div>
                                <PersonsSelectOptions
                                    value={this.state.companyOwner}
                                    onChange={this.onChangeOwner}
                                    placeholder='نام و نام خانوادگی مالک...'
                                    isSearchable={true}
                                    isMulti={true}
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

        console.log(this.state);
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
     * on change abbreviated name
     *
     * @param e
     */
    onChangeAbbreviatedName(e) {
        this.setState({abbreviated_name: e.target.value});
    }

    /**
     * on change registration number
     *
     * @param e
     */
    onChangeRegistrationNumber(e) {
        this.setState({registration_number: e.target.value});
    }

    /**
     * on change date establishment
     *
     * @param date
     */
    onChangeDateEstablishment(date) {
        this.setState({date_establishment: date})
    }

    /**
     * on change registered finance
     *
     * @param e
     */
    onChangeRegisteredFinance(e) {
        this.setState({registered_finance: e.target.value});
    }

    /**
     * on change phone
     *
     * @param index
     * @param e
     */
    onChangePhone(index, e) {
        switch (index) {
            case 1:
                this.setState({phone_1: e.target.value});
                break;
            case 2:
                this.setState({phone_2: e.target.value});
                break;
            case 3:
                this.setState({phone_3: e.target.value});
                break;
        }
    }

    /**
     * on click pone add
     *
     * @param e
     */
    onClickPhoneAdd(e) {
        e.preventDefault();

        let phones = this.state.phonesStack;
        const length = phones.length;

        phones.push(length + 2);
        this.setState({phonesStack: phones});
    }

    /**
     * on change mail
     *
     * @param index
     * @param e
     */
    onChangeMail(index, e) {
        switch (index) {
            case 1:
                this.setState({mail_1: e.target.value});
                break;
            case 2:
                this.setState({mail_2: e.target.value});
                break;
            case 3:
                this.setState({mail_2: e.target.value});
                break;
        }
    }

    /**
     * on click mail add
     *
     * @param e
     */
    onClickMailAdd(e) {
        e.preventDefault();

        let mails = this.state.mailsStack;
        let length = mails.length;

        mails.push(length + 2);
        this.setState({mailsStack: mails});
    }

    /**
     * on change website
     *
     * @param e
     */
    onChangeWebsite(e) {
        this.setState({website: e.target.value});
    }

    /**
     * on change address
     *
     * @param e
     */
    onChangeAddress(e) {
        this.setState({address: e.target.value});
    }

    /**
     * on change owner
     *
     * @param data
     * @param e
     */
    onChangeOwner(data, e) {
        this.setState({companyOwner: data});
    }
}

export default CompanyCreate;
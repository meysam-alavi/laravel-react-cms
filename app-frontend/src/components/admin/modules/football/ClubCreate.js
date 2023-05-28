import React from "react";
import ClubModel from "./ClubModel";
import {Row, Col, Form, Button} from "react-bootstrap";
import CFileManager from "../assisstants/CFileManager";
import DatePicker from "react-datepicker";
import ModalGenerator from "../../generators/ModalGenerator";
import ContinentSelectOptions from "../settings/common/regions/continents/ContinentSelectOptions";
import CountrySelectOptions from "../settings/common/regions/countries/CountrySelectOptions";
import CitySelectOptions from "../settings/common/regions/cities/CitySelectOptions";

/**
 * ClubCreate Class Component
 */
class ClubCreate extends ClubModel {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.pageInfo = {
            title: 'فرم ایجاد باشگاه فوتبال'
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
            companyId: '',
            companiesCollection: '',
            dateEstablishment: '',
            imageId: ''
        };

        this.onSubmit = this.onSubmit.bind();
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeContinentId = this.onChangeContinentId.bind(this);
        this.onChangeCountryId = this.onChangeCountryId.bind(this);
        this.onChangeCityId = this.onChangeCityId.bind(this);
        this.onChangeCompanyId = this.onChangeCompanyId.bind(this);
        this.onSelectedItem = this.onSelectedItem.bind(this);
        this.onChangeDateEstablishment = this.onChangeDateEstablishment.bind(this);
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element {

        const fileManager = (
            <div className="col-12 dx-viewport" dir="ltr">
                <CFileManager
                    module="multimedia"
                    fileType="image"
                    groupType="I"
                    onSelectedItem={this.onSelectedItem}
                    selectionMode="single"
                    create={false}
                    copy={false}
                    move={false}
                    rename={false}
                    delete={false}
                    upload={false}
                />
            </div>
        );

        return (
            <Row>
                <Col className="col-12 d-flex">
                    <span className="admin-form-header">
                        {this.pageInfo.title}
                    </span>
                </Col>
                {this.breadCrumbGenerator(this.pathInfo)}
                <Col className="col-md-5">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="name" className="form-group mb-2">
                            <Form.Label className="mb-1">نام:</Form.Label>
                            <Form.Control type="text" dir="auto" value={this.state.name} onChange={this.onChangeName}/>
                        </Form.Group>
                        <Form.Group controlId="surname" className="form-group mb-2">
                            <Form.Label className="mb-1">نام کوتاه:</Form.Label>
                            <Form.Control type="text" dir="auto" value={this.state.surname}
                                          onChange={this.onChangeSurname}/>
                        </Form.Group>
                        <Form.Group controlId="description" className="form-group mb-2">
                            <Form.Label className="mb-1">توضیحات:</Form.Label>
                            <Form.Control as="textarea" dir="auto" value={this.state.description}
                                          onChange={this.onChangeDescription}/>
                        </Form.Group>
                        <Form.Group controlId="continentId" className="form-group mb-2">
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
                                    columns={["country_id", "name_en"]}
                                    contitnentId={this.state.continentId}
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
                                    columns={["geo_name_id", "name"]}
                                    countryId={this.state.countryId}
                                    dir="auto"
                                    optional={true}
                                    onChange={this.onChangeCityId}
                                />
                            </Form.Group>
                        }

                        {/*<Form.Group controlId="companyId" className="form-group mb-2">
                            <Form.Label className="mb-1">شرکت:</Form.Label>
                            {this.state.companiesCollection &&
                                <SelectOptionGenerator
                                    items={this.state.companiesCollection}
                                    optionKey="id"
                                    optionValue="title"
                                    value={this.state.companyId}
                                    className="input-required"
                                    onChange={this.onChangeCompanyId}
                                />
                            }
                        </Form.Group>*/}
                        <Form.Group controlId="dateEstablishment" className="form-group mb-2">
                            <Form.Label className="mb-1">تاریخ تاسیس:</Form.Label>
                            <DatePicker
                                selected={this.state.dateEstablishment}
                                onChange={date => this.onChangeDateEstablishment(date)}
                                dateFormat="yyyy/MM/dd"
                                className="form-control input-required-ltr"
                                dir="ltr"/>
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label className="mb-1">عکس:</Form.Label>
                            <ModalGenerator
                                title="انتخاب عکس"
                                body={fileManager}
                                size="full-screen"
                                buttonType="a"
                                buttonValue={<span> <i className="fa fa-image"/> انتخاب عکس </span>}
                                buttonClass=""
                            />
                        </Form.Group>
                        <Form.Group className="form-group mb-2">
                            <Button type="submit" className="btn btn-primary btn-sm">ارسال</Button>
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
    }

    /**
     * on selected item
     *
     * @param actionObj
     * @param e
     */
    onSelectedItem(actionObj, e) {
        if (actionObj.selectedItems[0]) {
            const selectedItem = actionObj.selectedItems[0];
            if (selectedItem.isDirectory === false) {
                this.setState({imageId: selectedItem.dataItem.id});
            }
        }
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
     * on change continent id
     *
     * @param e
     */
    onChangeContinentId(e) {
        this.setState({continentId: e.target.value});
    }

    /**
     * on change country id
     *
     * @param e
     */
    onChangeCountryId(e) {
        this.setState({countryId: e.target.value});
    }

    /**
     * on change city id
     *
     * @param e
     */
    onChangeCityId(e) {
        this.setState({cityId: e.target.value});
    }

    /**
     * on change company id
     *
     * @param e
     */
    onChangeCompanyId(e) {
        this.setState({companyId: e.target.value});
    }

    /**
     * on change date establishment
     *
     * @param date
     */
    onChangeDateEstablishment(date) {
        this.setState({dateOfFormation: date});
    }
}

export default ClubCreate;
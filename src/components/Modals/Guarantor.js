import React, {Component} from 'react';
import Moment from 'react-moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import CreatableSelect from 'react-select/creatable';
import {httpPostFormData, httpDelete, httpPost} from '../../actions/data.action';
import validateImage from '../../helpers/validateImage';
import {hideLoader, showLoader} from '../../helpers/loader';
import {states, countries, countryLists} from '../Onboarding/Info';
import {slga, getLga} from '../../helpers/states';
// import CustomSelect from '../../helpers/Select2';
import {getAllDialCode, countryCodes} from '../../helpers/dailCodes';
import {stateLists2} from '../Onboarding/Info';
import { NotificationManager } from 'react-notifications';

// import { countries, countryLists, stateLists, stateLists2 } from '../Onboarding/Info';

export class GuarantorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            postBody: {},
            documents: [],
            years: [],
            months: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const all_years = [];
        const all_months = [];
        for (var i=1; i<=30; i++){
            all_years.push(i)
        }
        for (var k=6; k<=11; k++){
            all_months.push(k)
        }
        this.setState({years: [...all_years], months: [...all_months]})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    upload = async e => {
        const {fileName, postBody} = this.state;
        console.log(fileName)
        if(fileName === ''){
           return NotificationManager.warning('Select a Document type');
        }
        const imageData = e.target.files[0];
        const validFormat = validateImage(imageData);
        if (validFormat.valid) {
            //NotificationManager.success(validFormat.message,'Yippe!',3000);
            // postBody[fileName] = [...postBody[fileName], e.target.files[0]];
            postBody[fileName] = e.target.files[0];
            this.setState({postBody});
            await this.saveDoc()
        } else {
            //NotificationManager.error(validFormat.message,'Yippe!',3000);
            e.target.value = '';
        }
    };

    saveDoc = async () => {
        try {
            const id = this.props.userId;
            const {fileName, postBody} = this.state;
            showLoader();

            let formData = new FormData();
            if (fileName === 'nationalId') formData.append('nationalId', postBody.nationalId);
            if (fileName === 'votersCard') formData.append('votersCard', postBody.votersCard);
            if (fileName === 'internationalPassport') formData.append('internationalPassport', postBody.internationalPassport);
            if (fileName === 'driversLicense') formData.append('driversLicense', postBody.driversLicense);
            if (fileName === 'ecowasPassport') formData.append('ecowasPassport', postBody.ecowasPassport);
            if (fileName === 'registeredId') formData.append('registeredId', postBody.registeredId);
            if (fileName === 'businessCertificate') formData.append('businessCertificate', postBody.businessCertificate);

            const res = await httpPostFormData(`auth/onboarding_five/${id}`, formData);
            if (res.code === 201) {
                hideLoader();
                this.setState({
                    documents: [...this.state.documents, res.data.upload],
                    fileName: ''
                });
                this.refs.path.value = '';
            }
        } catch (error) {
            hideLoader();
            console.log(error)
        }
    }

    deleteDoc = async (id) => {
        try {

            const res = await httpDelete(`auth/document/${id}`);

            if (res.code === 200) {
                this.setState({documents: [...this.state.documents.filter(item => item.id !== id)]});
            }
        } catch (error) {
            console.log(error)
        }

    }


    getLga = (state) => {
        const lga = getLga(state) || [];
        return lga.map(data => (
            {value: data.name, label: data.name}
        ))
    }

    getStateOption = () => {
        if ((this.props.postData.nationality !== 'Nigeria') || !this.props.postData.nationality) {
            return (
                <input required type="text"
                       className="form-control"
                       name="state"
                       value={this.props.postData.state}
                       onChange={this.props.handleChange}
                />
            )
        } else {
            return (
                <React.Fragment>
                    {console.log("....>>>>", stateLists2.filter(item => item.value === this.props.mainCustomState.customState)[0], this.props.mainCustomState.customState)}
                    <Select
                        className="w-100 pr-0 pl-0 mr-1"
                        options={stateLists2}
                        onChange={e => this.props.handleCustomSelect(e, 'state')}
                        name="state"
                        value={this.props.mainCustomState.customState}
                        isSearchable="true"
                        placeholder='Select Your State'
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'state')}
                        autoComplete="off"
                        style={{opacity: 0, width: 0, height: 0, padding: 0, margin: 0}}
                        value={(this.props.mainCustomState.customState) ? this.props.mainCustomState.customState.value : ''}
                        required={true}
                    />
                </React.Fragment>
            )
        }
    }

    getLgaOption = () => {
        if ((this.props.postData.nationality !== 'Nigeria') || !this.props.postData.nationality) {
            return (
                <input required type="text"
                       className="form-control"
                       name="lga"
                       value={this.props.postData.lga}
                       onChange={this.props.handleChange}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <Select
                        className=" w-100 pr-0 pl-0 mr-1"
                        value={this.props.mainCustomState.customLga}
                        onChange={e => this.props.handleCustomSelect(e, 'lga')}
                        options={this.getLga(this.props.postData.state)}
                        isSearchable='true'
                        name="lga"
                        placeholder="Select Your Lga"
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'lga')}
                        autoComplete="off"
                        style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                        value={(this.props.mainCustomState.customLga) ? this.props.mainCustomState.customLga.value : ''}
                        required={true}
                    />
                </React.Fragment>
            )
        }
    }

    getResidentialStateOption = () => {
        const newSelect = stateLists2
        if ((this.props.postData.residentialCountry !== 'Nigeria') || !this.props.postData.residentialCountry) {
            return (
                <input required type="text"
                       className="form-control col-md-3 mr-1"
                       name="residentialState"
                       value={this.props.postData.residentialState}
                       onChange={this.props.handleChange}/>
            )
        } else {
            return (
                <React.Fragment>
                    <Select
                        className="w-100 col-md-3 pr-0 pl-0 mr-1"
                        options={stateLists2}
                        onChange={e => this.props.handleCustomSelect(e, 'residentialState')}
                        name="residentialState"
                        value={this.props.mainCustomState.customResidentialState}
                        isSearchable="true"
                        placeholder='State'
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'residentialState')}
                        autoComplete="off"
                        style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                        value={(this.props.mainCustomState.customResidentialState) ? this.props.mainCustomState.customResidentialState.value : ''}
                        required={true}
                    />
                </React.Fragment>
            )
        }
    }

    getResidentialLgaOption = () => {
        if ((this.props.postData.residentialCountry !== 'Nigeria') || !this.props.postData.residentialCountry) {
            return (
                <input required type="text"
                       className="form-control col-md-3 mr-1"
                       name="residentialLga"
                       value={this.props.postData.residentialLga}
                       onChange={this.props.handleChange}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <Select
                        className="w-100 col-md-3 pr-0 pl-0 mr-1"
                        value={this.props.mainCustomState.customResidentialLga}
                        onChange={e => this.props.handleCustomSelect(e, 'residentialLga')}
                        options={this.getLga(this.props.postData.residentialState)}
                        isSearchable='true'
                        name="residentialLga"
                        placeholder="Lga"
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'residentialLga')}
                        autoComplete="off"
                        style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                        value={(this.props.mainCustomState.customResidentialLga) ? this.props.mainCustomState.customResidentialLga.value : ''}
                        required={true}
                    />
                </React.Fragment>
            )
        }
    }

    getPermanentStateOption = () => {
        if ((this.props.postData.permanentCountry !== 'Nigeria') || !this.props.postData.permanentCountry) {
            return (
                <input required type="text"
                       className="form-control col-md-3 mr-1"
                       name="permanentState"
                       value={this.props.postData.permanentState}
                       onChange={this.props.handleChange}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <Select
                        className="w-100 col-md-3 pr-0 pl-0 mr-1"
                        options={stateLists2}
                        onChange={e => this.props.handleCustomSelect(e, 'permanentState')}
                        name="permanentState"
                        value={this.props.mainCustomState.customPermanentState}
                        isSearchable="true"
                        placeholder='State'
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'permanentState')}
                        value={(this.props.mainCustomState.customPermanentState) ? this.props.mainCustomState.customPermanentState.value : ''}
                        autoComplete="off"
                        style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                        required={true}
                    />
                </React.Fragment>
            )
        }
    }

    getPermanentLgaOption = () => {
        if ((this.props.postData.permanentCountry !== 'Nigeria') || !this.props.postData.permanentCountry) {
            return (
                <input required type="text"
                       className="form-control col-md-3 mr-1"
                       name="permanentLga"
                       value={this.props.postData.permanentLga}
                       onChange={this.props.handleChange}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <Select
                        className="w-100 col-md-3 pr-0 pl-0 mr-1"
                        value={this.props.mainCustomState.customPermanentLga}
                        onChange={e => this.props.handleCustomSelect(e, 'permanentLga')}
                        options={this.getLga(this.props.postData.permanentState)}
                        isSearchable='true'
                        name="permanentLga"
                        placeholder="Lga"
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'permanentLga')}
                        value={(this.props.mainCustomState.customPermanentLga) ? this.props.mainCustomState.customPermanentLga.value : ''}
                        autoComplete="off"
                        style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                        required={true}
                    />
                </React.Fragment>
            )
        }
    }

    getLandedPropertyStateOption = () => {
        if ((this.props.postData.landedPropertyCountry !== 'Nigeria') || !this.props.postData.landedPropertyCountry) {
            return (
                <input type="text"
                       className="form-control col-md-3 mr-1"
                       name="landedPropertyState"
                       value={this.props.postData.landedPropertyState}
                       onChange={this.props.handleChange}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <Select
                        className="w-100 col-md-3 pr-0 pl-0 mr-1"
                        options={stateLists2}
                        onChange={e => this.props.handleCustomSelect(e, 'landedPropertyState')}
                        name="state"
                        value={this.props.mainCustomState.customLandedPropertyState}
                        isSearchable="true"
                        placeholder='State'
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'landedPropertyState')}
                        value={(this.props.mainCustomState.customLandedPropertyState) ? this.props.mainCustomState.customLandedPropertyState.value : ''}
                        autoComplete="off"
                        style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                        required={false}
                    />
                </React.Fragment>
            )
        }
    }

    getLandedPropertyLgaOption = () => {
        if ((this.props.postData.landedPropertyCountry !== 'Nigeria') || !this.props.postData.landedPropertyCountry) {
            return (
                <input type="text"
                       className="form-control col-md-3 mr-1"
                       name="landedPropertyLga"
                       value={this.props.postData.landedPropertyLga}
                       onChange={this.props.handleChange}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <Select
                        className="w-100 col-md-3 pr-0 pl-0 mr-1"
                        value={this.props.mainCustomState.customLandedPropertyLga}
                        onChange={e => this.props.handleCustomSelect(e, 'landedPropertyLga')}
                        options={this.getLga(this.props.postData.landedPropertyState)}
                        isSearchable='true'
                        name="landedPropertyLga"
                        placeholder="Lga"
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'landedPropertyLga')}
                        value={(this.props.mainCustomState.customLandedPropertyLga) ? this.props.mainCustomState.customLandedPropertyLga.value : ''}
                        autoComplete="off"
                        style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                        required={false}
                    />
                </React.Fragment>
            )
        }
    }

    getBusinessStateOption = () => {
        if ((this.props.postData.businessCountry !== 'Nigeria') || !this.props.postData.businessCountry) {
            return (
                <input required type="text"
                       className="form-control col-md-3 mr-1"
                       name="businessState"
                       value={this.props.postData.businessState}
                       onChange={this.props.handleChange}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <Select
                        className="w-100 col-md-3 pr-0 pl-0 mr-1"
                        options={stateLists2}
                        onChange={e => this.props.handleCustomSelect(e, 'businessState')}
                        name="businessState"
                        value={this.props.mainCustomState.customBusinessState}
                        isSearchable="true"
                        placeholder='State'
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'businessState')}
                        value={(this.props.mainCustomState.customBusinessState) ? this.props.mainCustomState.customBusinessState.value : ''}
                        autoComplete="off"
                        style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                        required={true}
                    />
                </React.Fragment>
            )
        }
    }

    getBusinessLgaOption = () => {
        if ((this.props.postData.businessCountry !== 'Nigeria') || !this.props.postData.businessCountry) {
            return (
                <input required type="text"
                       className="form-control col-md-3 mr-1"
                       name="businessLga"
                       value={this.props.postData.businessLga}
                       onChange={this.props.handleChange}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <Select
                        className="w-100 col-md-3 pr-0 pl-0 mr-1"
                        value={this.props.mainCustomState.customBusinessLga}
                        onChange={e => this.props.handleCustomSelect(e, 'businessLga')}
                        options={this.getLga(this.props.postData.businessState)}
                        isSearchable='true'
                        name="businessLga"
                        placeholder="Lga"
                    />
                    <input
                        tabIndex={-1}
                        onChange={e => this.props.handleCustomSelect(e, 'businessLga')}
                        value={(this.props.mainCustomState.customBusinessLga) ? this.props.mainCustomState.customBusinessLga.value : ''}
                        autoComplete="off"
                        style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                        required={true}
                    />
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div>
                <div class="modal fade" id="guarantorModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
                     role="dialog" aria-hidden="true" aria-labelledby="exampleModalLongTitle"
                     style={{overflowY: 'scroll'}}>
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"
                                    id="example-Modal3">{this.props.modalMode === 'create' ? 'ADD A GUARANTOR' : 'EDIT GUARANTOR DETAILS'}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                        onClick={this.props.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={event => this.props.addMore(event)}>
                                <div class="modal-body">
                                    <div className="col col-md-12">
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">First Name <span
                                                className="impt">*</span></label>
                                            <div className="col-md-3">
                                                <input required type="text"
                                                       className="form-control"
                                                       name="firstName"
                                                       onChange={this.props.handleChange}
                                                       value={this.props.postData.firstName}
                                                />
                                                <span
                                                    className="text-danger">{this.props.errorMessage1 !== null ? this.props.errorMessage1 : ''}</span>
                                            </div>
                                            <label for="inputName" className="col-md-2 col-form-label">Home
                                                Phone</label>
                                            <div className="col-md-4">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend select2-padding">
                                                        <Select
                                                            className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                                                            // defaultValue={this.props.postData.homePhoneCode}
                                                            value={this.props.customSelect2}
                                                            onChange={e => this.props.handleCustomSelect(e, 'homePhoneCode')}
                                                            options={countryCodes}
                                                            isSearchable="true"
                                                            name="homePhoneCode"
                                                        />
                                                        <input
                                                            tabIndex={-1}
                                                            value={this.props.customSelect2}
                                                            onChange={e => this.props.handleCustomSelect(e, 'homePhoneCode')}
                                                            autoComplete="off"
                                                            style={{
                                                                opacity: 0,
                                                                height: 0,
                                                                width: 0,
                                                                padding: 0,
                                                                margin: 0
                                                            }}
                                                            required={false}
                                                        />
                                                    </div>
                                                    <input 
                                                           type="text"
                                                           class="form-control"
                                                           aria-describedby="basic-addon3"
                                                           name="homePhone"
                                                           onChange={this.props.handleChange}
                                                           value={this.props.postData.homePhone}
                                                    />
                                                </div>
                                                <span
                                                    className="text-danger">{this.props.errorMessage5 !== null ? this.props.errorMessage5 : ''}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Middle
                                                Name</label>
                                            <div className="col-md-3">
                                                <input type="text"
                                                       className="form-control"
                                                       name="middleName"
                                                       onChange={this.props.handleChange}
                                                       value={this.props.postData.middleName}
                                                />
                                                <span
                                                    className="text-danger">{this.props.errorMessage3 !== null ? this.props.errorMessage3 : ''}</span>
                                            </div>
                                            <label for="inputName" className="col-md-2 col-form-label">Mobile
                                                Phone <span className="impt">*</span></label>
                                            <div className="col-md-4">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend select2-padding">
                                                        <Select
                                                            className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                                                            // defaultValue={this.props.postData.mobilePhoneCode}
                                                            value={this.props.customSelect1}
                                                            onChange={e => this.props.handleCustomSelect(e, 'mobilePhoneCode')}
                                                            options={countryCodes}
                                                            isSearchable="true"
                                                            name="mobilePhoneCode"
                                                        />
                                                        <input
                                                            tabIndex={-1}
                                                            value={this.props.customSelect1}
                                                            onChange={e => this.props.handleCustomSelect(e, 'mobilePhoneCode')}
                                                            autoComplete="off"
                                                            style={{
                                                                opacity: 0,
                                                                height: 0,
                                                                width: 0,
                                                                padding: 0,
                                                                margin: 0
                                                            }}
                                                            required={true}
                                                        />
                                                    </div>
                                                    <input required
                                                           type="text"
                                                           class="form-control"
                                                           aria-describedby="basic-addon3"
                                                           name="mobilePhone"
                                                           onChange={this.props.handleChange}
                                                           value={this.props.postData.mobilePhone}
                                                    />
                                                </div>
                                                <span
                                                    className="text-danger">{this.props.errorMessage4 !== null ? this.props.errorMessage4 : ''}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Surname <span
                                                className="impt">*</span></label>
                                            <div className="col-md-3">
                                                <input required type="text"
                                                       className="form-control"
                                                       name="lastName"
                                                       onChange={this.props.handleChange}
                                                       value={this.props.postData.lastName}
                                                />
                                                <span
                                                    className="text-danger">{this.props.errorMessage2 !== null ? this.props.errorMessage2 : ''}</span>
                                            </div>
                                            <label for="inputName" className="col-md-2 col-form-label">Business
                                                Phone</label>
                                            <div className="col-md-4">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend select2-padding">
                                                        <Select
                                                            // isClearable
                                                            className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                                                            // defaultValue={this.props.postData.businessPhoneCode}
                                                            value={this.props.customSelect3}
                                                            onChange={e => this.props.handleCustomSelect(e, 'businessPhoneCode')}
                                                            options={countryCodes}
                                                            isSearchable="true"
                                                            name="businessPhoneCode"
                                                        />
                                                        <input
                                                            tabIndex={-1}
                                                            value={this.props.customSelect3}
                                                            onChange={e => this.props.handleCustomSelect(e, 'businessPhoneCode')}
                                                            autoComplete="off"
                                                            style={{
                                                                opacity: 0,
                                                                height: 0,
                                                                width: 0,
                                                                padding: 0,
                                                                margin: 0
                                                            }}
                                                            required={false}
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        aria-describedby="basic-addon3"
                                                        name="businessPhone"
                                                        onChange={this.props.handleChange}
                                                        value={this.props.postData.businessPhone}
                                                    />
                                                </div>
                                                <span
                                                    className="text-danger">{this.props.errorMessage6 !== null ? this.props.errorMessage6 : ''}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName"
                                                   className="col-md-3 col-form-label">Relationship <span
                                                className="impt">*</span></label>
                                            <div className="col-md-3">
                                                <CreatableSelect
                                                    // isClearable
                                                    // defaultValue={this.props.postData.relationship}
                                                    value={this.props.customSelect4}
                                                    onChange={e => this.props.handleCustomSelect(e, 'relationship')}
                                                    options={[
                                                        {value: 'Family Friend', label: 'Family Friend'},
                                                        // { value: 'Pastor', label: 'Pastor' },
                                                        {value: 'Spiritual Head', label: 'Spiritual Head'},
                                                        {value: 'Relative', label: 'Relative'},
                                                        // { value: 'Friend', label: 'Friend' },
                                                    ]}
                                                    name="relationship"
                                                />

                                            </div>
                                            <label for="inputName" className="col-md-2 col-form-label">Occupation <span
                                                className="impt">*</span></label>
                                            <div className="col-md-4">
                                                <CreatableSelect
                                                    // isClearable
                                                    // defaultValue={this.props.postData.occupation}
                                                    value={this.props.customSelect5}
                                                    onChange={e => this.props.handleCustomSelect(e, 'occupation')}
                                                    options={this.props.customSelect5Values}
                                                    name="occupation"
                                                />
                                                <input
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                    style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                                                    value={this.props.customSelect5}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Nationality <span
                                                className="impt">*</span></label>
                                            <div className="col-md-3">
                                                <Select required
                                                        className=" pt-0 pb-0 pr-0 pl-0 border-0"
                                                        value={this.props.customNationality}
                                                        onChange={e => this.props.handleCustomSelect(e, 'nationality')}
                                                        options={countryLists}
                                                        isSearchable="true"
                                                        name="nationality"
                                                />
                                                <input
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                    style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
                                                    value={this.props.customNationality}
                                                    required={true}
                                                />
                                                <span
                                                    className="text-danger">{this.props.nationalityErrorMessage !== null ? this.props.nationalityErrorMessage : ''}</span>
                                            </div>
                                            <label for="inputName" className="col-md-2 col-form-label">State of
                                                Origin <span className="impt">*</span></label>
                                            <div className="col-md-4">
                                                {this.getStateOption()}
                                                <span
                                                    className="text-danger">{this.props.stateErrorMessage !== null ? this.props.stateErrorMessage : ''}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Local
                                                Government <span className="impt">*</span></label>
                                            <div className="col-md-3">
                                                {this.getLgaOption()}
                                                <span
                                                    className="text-danger">{this.props.lgaErrorMessage !== null ? this.props.lgaErrorMessage : ''}</span>
                                            </div>
                                            <label for="inputName" className="col-md-2 col-form-label">Bvn</label>
                                            <div className="col-md-4">
                                                <input type="text"
                                                       className="form-control"
                                                       name="bvn"
                                                       value={this.props.postData.bvn}
                                                       onChange={this.props.handleChange}
                                                />
                                                <span
                                                    className="text-danger">{this.props.bvnErrorMessage !== null ? this.props.bvnErrorMessage : ''}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Residential
                                                Address <span className="impt">*</span></label>
                                            <div className="col-md-3">
                                                <input required type="text"
                                                       className="form-control"
                                                       name="residentialAddress"
                                                       onChange={this.props.handleChange}
                                                       value={this.props.postData.residentialAddress}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    {/* <select
                        name="residentialCountry"
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={this.props.handleChange}
                        value={this.props.postData.residentialCountry}
                      >
                        {
                          countries('Country')
                        }
                      </select> */}
                                                    <Select
                                                        className="w-100 pr-0 pl-0 col-md-3 mr-1"
                                                        // defaultValue={this.props.postData.residentialCountry}
                                                        value={this.props.customSelect6}
                                                        onChange={e => this.props.handleCustomSelect(e, 'residentialCountry')}
                                                        options={countryLists}
                                                        isSearchable="true"
                                                        name="country"
                                                        placeholder="Country"
                                                    />
                                                    <input
                                                        tabIndex={-1}
                                                        value={this.props.customSelect6}
                                                        autoComplete="off"
                                                        style={{
                                                            opacity: 0,
                                                            height: 0,
                                                            width: 0,
                                                            padding: 0,
                                                            margin: 0
                                                        }}
                                                        required={true}
                                                    />
                                                    {this.getResidentialStateOption()}
                                                    {this.getResidentialLgaOption()}
                                                    <input required
                                                           type="text"
                                                           name="residentialCity"
                                                           className="form-control w-100 col-md-2"
                                                           onChange={this.props.handleChange}
                                                           value={this.props.postData.residentialCity}
                                                           placeholder="City"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Permanent
                                                Address <span className="impt">*</span></label>
                                            <div className="col-md-3">
                                                <input required type="text"
                                                       className="form-control"
                                                       name="permanentAddress"
                                                       onChange={this.props.handleChange}
                                                       value={this.props.postData.permanentAddress}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <Select
                                                        className="w-100 pr-0 pl-0 col-md-3 mr-1"
                                                        // defaultValue={this.props.postData.landedPropertyCountry}
                                                        value={this.props.customPermanentCountry}
                                                        onChange={e => this.props.handleCustomSelect(e, 'permanentCountry')}
                                                        options={countryLists}
                                                        isSearchable="true"
                                                        name="permanentCountry"
                                                        placeholder="Country"

                                                    />
                                                    <input
                                                        tabIndex={-1}
                                                        value={this.props.customPermanentCountry}
                                                        autoComplete="off"
                                                        style={{
                                                            opacity: 0,
                                                            height: 0,
                                                            width: 0,
                                                            padding: 0,
                                                            margin: 0
                                                        }}
                                                        required={true}
                                                    />
                                                    {this.getPermanentStateOption()}
                                                    {this.getPermanentLgaOption()}
                                                    <input required
                                                           type="text"
                                                           name="permanentCity"
                                                           className="form-control w-100 col-md-2"
                                                           onChange={this.props.handleChange}
                                                           value={this.props.postData.permanentCity}
                                                           placeholder="City"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Landed Property
                                                Address</label>
                                            <div className="col-md-3">
                                                <input type="text"
                                                       className="form-control"
                                                       name="landedPropertyAddress"
                                                       onChange={this.props.handleChange}
                                                       value={this.props.postData.landedPropertyAddress}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <Select
                                                        className="w-100 pr-0 pl-0 col-md-3 mr-1"
                                                        value={this.props.customSelect7}
                                                        onChange={e => this.props.handleCustomSelect(e, 'landedPropertyCountry')}
                                                        options={countryLists}
                                                        isSearchable="true"
                                                        name="landedPropertyCountry"
                                                        placeholder="Country"

                                                    />
                                                    <input
                                                        tabIndex={-1}
                                                        value={this.props.customSelect7}
                                                        autoComplete="off"
                                                        style={{
                                                            opacity: 0,
                                                            height: 0,
                                                            width: 0,
                                                            padding: 0,
                                                            margin: 0
                                                        }}
                                                        required={false}
                                                    />
                                                    {this.getLandedPropertyStateOption()}
                                                    {this.getLandedPropertyLgaOption()}
                                                    <input
                                                        type="text"
                                                        name="landedPropertyCity"
                                                        className="form-control w-100 col-md-2"
                                                        onChange={this.props.handleChange}
                                                        value={this.props.postData.landedPropertyCity}
                                                        placeholder="City"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Occupation
                                                Address <span className="impt">*</span></label>
                                            <div className="col-md-3">
                                                <input required type="text"
                                                       className="form-control"
                                                       name="businessAddress"
                                                       onChange={this.props.handleChange}
                                                       value={this.props.postData.businessAddress}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    {/* <select
                        name="businessCountry"
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={this.props.handleChange}
                        value={this.props.postData.businessCountry}
                      >
                        {
                          countries('Country')
                        }
                      </select> */}
                                                    <Select
                                                        className="w-100 pr-0 pl-0 col-md-3 mr-1"
                                                        // defaultValue={this.props.postData.businessCountry}
                                                        value={this.props.customSelect8}
                                                        onChange={e => this.props.handleCustomSelect(e, 'businessCountry')}
                                                        options={countryLists}
                                                        isSearchable="true"
                                                        name="businessCountry"
                                                        placeholder="Country"
                                                    />
                                                    <input
                                                        tabIndex={-1}
                                                        value={this.props.customSelect8}
                                                        autoComplete="off"
                                                        style={{
                                                            opacity: 0,
                                                            height: 0,
                                                            width: 0,
                                                            padding: 0,
                                                            margin: 0
                                                        }}
                                                        required={true}
                                                    />
                                                    {this.getBusinessStateOption()}
                                                    {this.getBusinessLgaOption()}
                                                    <input required
                                                           type="text"
                                                           name="businessCity"
                                                           className="form-control w-100 col-md-2"
                                                           onChange={this.props.handleChange}
                                                           value={this.props.postData.businessCity}
                                                           placeholder="City"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Marital
                                                Status <span className="impt">*</span></label>
                                            <div className="col-md-3">
                                                <select required
                                                        className="form-control w-100"
                                                        name="maritalStatus"
                                                        onChange={this.props.handleChange}
                                                        value={this.props.postData.maritalStatus}
                                                >
                                                    <option value="" disabled selected>Select</option>
                                                    <option value="Single">Single</option>
                                                    <option value="Married">Married</option>
                                                    <option value="Divorced">Divorced</option>
                                                    <option value="Widowed">Widowed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Duration of
                                                Relationship <span className="impt">*</span></label>
                                            <div className="col-md-3">{(!this.props.mainCustomState.employeeKnownMonth)}
                                                {/* <input type="date"
                      className="form-control"
                      name="employeeKnownDate"
                      onChange={this.props.handleChange}
                      value={this.props.postData.employeeKnownDate}
                    /> */}
                                                <select required={(!this.props.mainCustomState.postData.employeeKnownMonth)} value={this.props.mainCustomState.postData.employeeKnownYear} onChange={this.props.handleChange} className="form-control" name="employeeKnownYear" id="">
                                                    <option value="">Year</option>
                                                    {this.state.years.map(item=>(
                                                        <option value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <select required={(!this.props.mainCustomState.postData.employeeKnownYear)} value={this.props.mainCustomState.postData.employeeKnownMonth} onChange={this.props.handleChange} className="form-control" name="employeeKnownMonth" id="">
                                                    <option value="">Month</option>
                                                    {this.state.months.map(item=>(
                                                        <option value={item}>{item}</option>
                                                    ))}
                                                </select>
                                                <span
                                                    className="text-danger">{this.props.errorMessage7 !== null ? this.props.errorMessage7 : ''}</span>
                                            </div>
                                            <div className="col-md-3 p-2"
                                                 style={(!this.props.postData.employeeKnownDate || this.props.errorMessage7 !== null) ? {display: 'none'} : {}}>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Has the employee
                                                been involved in any criminal matters? <span
                                                    className="impt">*</span></label>
                                            <div className="col-md-5">
                                                <label>
                                                    <input required type="radio"
                                                           name="criminalHistory"
                                                           className="minimal mr-2"
                                                           onChange={this.props.handleChange}
                                                           value='true'
                                                           checked={this.props.postData.criminalHistory === true ? true : ''}
                                                    />
                                                    Yes
                                                </label>
                                                <label style={{paddingLeft: '10px'}}>
                                                    <input required type="radio"
                                                           name="criminalHistory"
                                                           className="minimal mr-2"
                                                           onChange={this.props.handleChange}
                                                           value='false'
                                                           checked={this.props.postData.criminalHistory === false ? true : ''}
                                                    />
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group row"
                                             style={!this.props.postData.criminalHistory ? {display: 'none'} : {display: 'flex'}}>
                                            <label for="inputName" className="col-md-3 col-form-label">Give
                                                details</label>
                                            <div className="col-md-9">
                    <textarea required={(this.props.postData.criminalHistory)} type="text"
                              className="form-control"
                              name="details"
                              onChange={this.props.handleChange}
                              value={this.props.postData.details}
                    ></textarea>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label for="inputName" className="col-md-3 col-form-label">Document
                                                Type</label>
                                            <div className="col-md-3">
                                                <select
                                                    className="form-control w-100"
                                                    name='fileName'
                                                    value={this.state.fileName}
                                                    onChange={this.handleChange}
                                                >
                                                    <option value="">Select File</option>
                                                    <option value="nationalId">National ID</option>
                                                    <option value="votersCard">Voters Card</option>
                                                    <option value="driversLicense">Driver's Licence</option>
                                                    <option value="internationalPassport">International Passport
                                                    </option>
                                                    <option value="ecowasPassport">ECOWAS Passport</option>
                                                    <option value="registeredId">Registered/Valid Work ID</option>
                                                    <option value="businessCertificate">Business Certificate</option>
                                                </select>
                                            </div>
                                            <label for="inputName" className="col-md-3 col-form-label">Upload
                                                Document</label>
                                            <div className="col-md-3">
                                                <input required type="file"
                                                       className="form-control"
                                                       name="path"
                                                       onChange={this.upload}
                                                       id="select-file"
                                                />
                                            </div>
                                        </div>

                                        <br/>

                                        <div className="col col-md-12 pr-0 pl-0"
                                             style={!this.state.documents.length ? {display: 'none'} : {}}>
                                            <div class="table-responsive">
                                                <table class="table table-bordered table-hover mb-0 text-nowrap">
                                                    <thead>
                                                    <tr>
                                                        {/* <th className="wd-15p">S/N</th> */}
                                                        <th class="wd-15p">File Name</th>
                                                        <th class="wd-15p"></th>
                                                        <th class="wd-25p"></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        this.state.documents.length ?
                                                            this.state.documents.map(data => (
                                                                <tr>
                                                                    <td>{data.fileName}</td>
                                                                    <td>{<a href={`${data.path}`} target="_blank">View
                                                                        document</a>}</td>
                                                                    <td><a className="ml-3 text-danger"
                                                                           onClick={() => this.deleteDoc(data.id)}
                                                                           style={{cursor: 'pointer'}}>Delete</a></td>
                                                                </tr>
                                                            )) : ''
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal"
                                            onClick={this.props.closeModal}>Close
                                    </button>
                                    <button type="submit"
                                            class="btn btn-primary">{this.props.modalMode === 'create' ? 'ADD' : 'UPDATE'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

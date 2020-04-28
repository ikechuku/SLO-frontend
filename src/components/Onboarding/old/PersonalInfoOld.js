import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Moment from 'react-moment'
import moment from 'moment'
 
import Select from 'react-select';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Layout from '../../layout/index';
import { httpPost, httpPatch } from '../../../actions/data.action';
import { states, countries, countryLists, stateLists, stateLists2 } from '../Info';
import { slga, getLga } from '../../../helpers/states';
import { validateData, validateD } from '../../../helpers/validations';
import { showLoader, hideLoader } from '../../../helpers/loader';
import { getDialCode, getAllDialCode, countryCodes } from '../../../helpers/dailCodes';
import {CustomSelect2} from '../../../helpers/Select2';
import CustomSelect from '../../../helpers/Select2';


class PersonalInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      dob: new Date(),
      userId: null,
      country: null,
      currentCountry: null,
      permanentCountry: null,
      errorMessage1: null,
      errorMessage2: null,
      errorMessage3: null,
      errorMessage4: null,
      errorMessage5: null,
      errorMessage6: null,
      errorMessage7: null,
      errorMessage8: null,
      errorMesage9: null,
      errorMessage10: null,
      errorMessage11: null
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const { data } = this.state;
    let details = e.target;
    if(details.name === 'noOfDependant'){
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage10: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = parseInt(details.value);
      this.setState({ data, errorMessage10: null });

    } else if(details.name === 'currentAddress'){
      data[details.name] = details.value;
      this.setState({ data });
      const isValidate = validateD(e.target.name, this.state.data.currentAddress);
      if(!isValidate.error){
        this.setState({ 
          errorMessage11: isValidate.errorMessage, 
        })
        return;
      } else {
        this.setState({ errorMessage11: null });
      }

    } else if(details.name === 'firstName') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage1: isValidate.errorMessage
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage1: null 
      });

    } else if(details.name === 'lastName') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage2: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data, 
        errorMessage2: null 
      });

    } else if(details.name === 'middleName') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage3: isValidate.errorMessage,
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage3: null 
      });

    } else if(details.name === 'email') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage4: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage4: null 
      });

    } if(details.name === 'mobilePhone') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage5: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage5: null 
      });

    } else if(details.name === 'homePhone') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage6: isValidate.errorMessage,
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage6: null 
      });
    } else if(details.name === 'gender') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage9: isValidate.errorMessage,
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage9: null 
      });
    } else {
      data[details.name] = details.value;
      this.setState({ 
        data
      });
    }
  }

  handleDobChange = (e) => {
    const { data } = this.state;
    // console.log(details.value)
    // this.setState({ 
    //   dob: date,
    // });
    // const newDate = moment(date).format('l');
    // const isValidate = validateD('dob', newDate);
    // if(!isValidate.error){
    //   this.setState({ 
    //     errorMessage8: isValidate.errorMessage,
    //   })
    //   return;
    // } else {
    //   data['dob'] = newDate;
    //   this.setState({ data, errorMessage8: null })
    // }


    data['dob'] = e;
      this.setState({ 
        data
      })
      const isValidate = validateD('dob', this.state.data.dob);
      if(!isValidate.error){
        this.setState({ 
          errorMessage8: isValidate.errorMessage,
        })
        return;
      } else {
        this.setState({ errorMessage8: null })
      }
  }

  handleCustomSelect = (result, name) => {
    const { data } = this.state;
    if(name === 'nationality'){
      const isValidate = validateD('nationality', result.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage7: isValidate.errorMessage, 
        })
        return;
      }
      data['nationality'] = result.value;
      data['mobilePhoneCode'] = getDialCode(result.value);
      data['homePhoneCode'] = getDialCode(result.value);
      this.setState({ 
        data, 
        country: result.value, 
        errorMessage7: null 
      })
    } else if(name === 'mobilePhoneCode'){
      data[name] = result.value;
      this.setState({ 
        data,
        mobilePhoneCode: result,
      });
    } else if(name === 'homePhoneCode'){
      data[name] = result.value;
      this.setState({ 
        data,
        homePhoneCode: result,
      });
    } else if(name === 'currentCountry'){
      data[name] = result.value;
      this.setState({ 
        data,
        currentCountry: result.value,
      });
    } else if(name === 'permanentCountry'){
      data[name] = result.value;
      this.setState({ 
        data,
        permanentCountry: result.value,
      });
    } else {
      data[name] = result.value;
      this.setState({ 
        data
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    showLoader();
    // const isValidate = await validateData(this.state.data);
    // if(isValidate === 'error'){
    //   return hideLoader();
    // }

    // if(this.state.errorMessage !== null){
    //   hideLoader()
    //   return NotificationManager.warning(this.state.errorMessage)
    // }
    // console.log('gets hers', this.state.data)
    const isValidate = await validateData(this.state.data);
    if(!isValidate.error){
      if(isValidate.type === 'firstName'){
        this.setState({ 
          errorMessage1: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'lastName'){
        this.setState({ 
          errorMessage2: isValidate.errorMessage,
        })
      // } else if(isValidate.type === 'middleName'){
      //   this.setState({ 
      //     errorMessage3: isValidate.errorMessage,
      //   })
      } else if(isValidate.type === 'email'){
        this.setState({ 
          errorMessage4: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'mobilePhone'){
        this.setState({ 
          errorMessage5: isValidate.errorMessage,
        })
      // } else if(isValidate.type === 'homePhone'){
      //   this.setState({ 
      //     errorMessage6: isValidate.errorMessage,
      //   })
      } else if(isValidate.type === 'nationality'){
        this.setState({ 
          errorMessage7: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'dob'){
        this.setState({ 
          errorMessage8: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'gender'){
        this.setState({ 
          errorMessage9: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'currentAddress'){
        this.setState({ 
          errorMessage11: isValidate.errorMessage,
        })
      }
    } 

    const { 
      errorMessage1, 
      errorMessage2, 
      errorMessage3, 
      errorMessage4, 
      errorMessage5, 
      errorMessage6, 
      errorMessage7, 
      errorMessage8, 
      errorMessage9,
      errorMessage10,
      errorMessage11
    } = this.state;

    console.log(errorMessage7)
    if(errorMessage1 !== null || errorMessage2 !== null || errorMessage3 !== null || errorMessage4 !== null || errorMessage5 !== null || errorMessage6 !== null || errorMessage7 !== null || errorMessage8 !== null || errorMessage9 !== null || errorMessage10 !== null || errorMessage11 !== null ){
      hideLoader()
      return NotificationManager.warning('Complete all required fields')
    }



      // showLoader();
    if(this.state.pageMode === 'edit'){
      try {
        const { userId } = this.state;
        const res = await httpPatch(`auth/edit_staff/${userId}`, this.state.data);
        if(res.code === 200){
          hideLoader();
          // setState({ userId: res.data.id });
          // return this.props.history.push(`/create_staff/four/${res.data.id}`)
          return this.props.history.push({
            pathname: `/create_staff/two/${res.data.id}`,
            backurl: `/create_staff/one`,
            savedState: this.state
          });
        }
      } catch(error){
        hideLoader();
        console.log(error)
      }
    } else {
      try{
        const res = await httpPost('auth/create_staff', this.state.data);
        if(res.code === 201){
          hideLoader();
          await this.setState({ userId: res.data.id });
          // return this.props.history.push(`/create_staff/two/${res.data.id}`)
          return this.props.history.push({
            pathname: `/create_staff/two/${res.data.id}`,
            backurl: '/create_staff/one',
            savedState: this.state,
            direction: 'forward'
          });
        }
      } catch (error){
        hideLoader();
        console.log(error)
      }
    }
  }

  handleSave = async (e) => {
    e.preventDefault();
    showLoader();
    // const isValidate = await validateData(this.state.data);
    // if(isValidate === 'error'){
    //   return hideLoader();
    // }
    const isValidate = await validateData(this.state.data);
    //console.log('gets hers', isValidate)
    if(!isValidate.error){
      if(isValidate.type === 'firstName'){
        this.setState({ 
          errorMessage1: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'lastName'){
        this.setState({ 
          errorMessage2: isValidate.errorMessage,
        })
      // } else if(isValidate.type === 'middleName'){
      //   this.setState({ 
      //     errorMessage3: isValidate.errorMessage,
      //   })
      } else if(isValidate.type === 'email'){
        this.setState({ 
          errorMessage4: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'mobilePhone'){
        this.setState({ 
          errorMessage5: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'homePhone'){
        this.setState({ 
          errorMessage6: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'nationality'){
        this.setState({ 
          errorMessage7: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'dob'){
        this.setState({ 
          errorMessage8: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'gender'){
        this.setState({ 
          errorMessage9: isValidate.errorMessage,
        })
      }
    } 

    const { 
      errorMessage1, 
      errorMessage2, 
      errorMessage3, 
      errorMessage4, 
      errorMessage5, 
      errorMessage6, 
      errorMessage7, 
      errorMessage8, 
      errorMessage9,
      errorMessage10
    } = this.state;

    if(errorMessage1 !== null || errorMessage2 !== null || errorMessage3 !== null || errorMessage4 !== null || errorMessage5 !== null || errorMessage6 !== null || errorMessage7 !== null || errorMessage8 !== null || errorMessage9 !== null || errorMessage10 !== null ){
      hideLoader()
      return NotificationManager.warning('Complete all required fields')
    }

    try{
      if(this.state.pageMode === 'edit'){
        const { userId } = this.state;
        const res = await httpPatch(`auth/edit_staff/${userId}`, this.state.data);
        if(res.code === 201){
          hideLoader();
        }
      } else {
        const res = await httpPost('auth/create_staff', this.state.data);
        if(res.code === 201){
          hideLoader();
        }
      }
    } catch (error){
      hideLoader()
      console.log(error)
    }
  }

  componentDidMount(){
    if(this.props.location.direction === 'backward'){
      this.setState({...this.props.location.savedState, pageMode: 'edit'});
    }
	}

  getLGA = (state) => {
    const lga = getLga(state) || [];
    return lga.length ? lga.map(data => (
      { value: data.name, label: data.name }
    )) : ''
    //   <option value={`${data.name}`}>{data.name}</option>
    // )) : <option value="">LGA</option>
  }

  getStateOption = () => {
    if((this.state.country !== 'Nigeria') || !this.state.country){
      return (
        <input type="text" 
        className="form-control"
        name="stateOfOrigin"
        value={this.state.data.stateOfOrigin}
        onChange={this.handleChange}
      />
      )
    } else {
      return (
        <CustomSelect2
        optionList={stateLists}
        handleChange={this.handleChange}
        name="stateOfOrigin"
        value={this.state.data.stateOfOrigin}
        placeHolder='Select Your State'
      />
      )
    }
  }

  getLgaOption = () => {
    if((this.state.country !== 'Nigeria') || !this.state.country){
      return (
        <input type="text" 
        className="form-control"
        name="lga"
        value={this.state.data.lga}
        onChange={this.handleChange}
      />
      )
    } else {
      return (
        <Select
        className=" w-100 pr-0 pl-0 mr-1"
        defaultValue={this.state.data.lga}
        onChange={e => this.handleCustomSelect(e, 'lga')}
        options={this.getLGA(this.state.data.stateOfOrigin)}
        isSearchable='true'
        name="currentState"
        placeholder="Select Your Lga"
      />
      )
    }
  }

  getCurrentState = () => {
    if((this.state.currentCountry !== 'Nigeria') || !this.state.currentCountry){
      return (
        <input type="text"
        disabled={this.state.currentCountry === null ? "disabled" : ""}  
        className="form-control col-md-3 mr-1"
        name="currentState"
        placeholder="State"
        value={this.state.data.currentState}
        onChange={this.handleChange}
      />
      )
    } else {
      return (
        <Select
          className=" w-100 col-md-3 pr-0 pl-0 mr-1"
          defaultValue={this.state.data.currentState}
          onChange={e => this.handleCustomSelect(e, 'currentState')}
          options={stateLists2}
          isSearchable="true"
          name="currentState"
        />
      )
    }
  }

  getCurrentLga = () => {
    if((this.state.currentCountry !== 'Nigeria') || !this.state.currentCountry){
      return (
        <input type="text"
        className="form-control col-md-3 mr-1"
        placeholder="Lga"
        name="currentLga" 
        value={this.state.data.currentLGA}
        onChange={this.handleChange}
        disabled={this.state.currentCountry === null ? "disabled" : ""}
      />
      )
    } else {
      return (
        <Select
          className=" w-100 col-md-3 pr-0 pl-0 mr-1"
          defaultValue={this.state.data.currentLga}
          onChange={e => this.handleCustomSelect(e, 'currentLga')}
          options={this.getLGA(this.state.data.currentState)}
          isSearchable="true"
          name="currentLga"
        />
      )
    }
  }

  getPermanentState = () => {
    if((this.state.permanentCountry !== 'Nigeria') || !this.state.permanentCountry){
      return (
        <input type="text"
        disabled={this.state.permanentCountry === null ? "disabled" : ""}  
        className="form-control col-md-3 mr-1"
        name="permanentState"
        placeholder="State"
        value={this.state.data.permanentState}
        onChange={this.handleChange}
      />
      )
    } else {
      return (
        <Select
          className=" w-100 col-md-3 pr-0 pl-0 mr-1"
          defaultValue={this.state.data.permanentState}
          onChange={e => this.handleCustomSelect(e, 'permanentState')}
          options={stateLists2}
          isSearchable="true"
          name="permanentState"
        />
      )
    }
  }

  getPermanentLga = () => {
    if((this.state.permanentCountry !== 'Nigeria') || !this.state.permanentCountry){
      return (
        <input type="text"
        className="form-control col-md-3 mr-1"
        placeholder="Lga"
        name="permanentLga" 
        value={this.state.data.permanentLGA}
        onChange={this.handleChange}
        disabled={this.state.permanentCountry === null ? "disabled" : ""}
      />
      )
    } else {
      return (
        <Select
          className=" w-100 col-md-3 pr-0 pl-0 mr-1"
          defaultValue={this.state.data.permanentLga}
          onChange={e => this.handleCustomSelect(e, 'permanentLga')}
          options={this.getLGA(this.state.data.permanentState)}
          isSearchable="true"
          name="permanentLga"
        />
      )
    }
  }

  render() {
    return (
      <Layout page="staff">
        <div className="app-content">
          <section className="section">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
              <li className="breadcrumb-item"><a href="#" className="text-muted">Staff</a></li>
              <li className="breadcrumb-item active text-" aria-current="page">New Staff</li>
            </ol>

						<div className="row">
							<div className="col-10">
								<div className="card">
									<div className="card-header">
                    <div className="col-md-12">
										  <h4>Personal Information</h4>
                    </div>
									</div>
									<div className="card-body">

                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
											<div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">First Name <span className="impt">*</span></label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="firstName"
                            defaultValue={this.state.data.firstName}
                            onChange={e => this.handleChange(e)}
                          />
                          <span className="text-danger">{this.state.errorMessage1 !== null ? this.state.errorMessage1 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Middle Name</label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="middleName"
                            defaultValue={this.state.data.middleName}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.errorMessage3 !== null ? this.state.errorMessage3 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                      <label for="inputName" className="col-md-2 col-form-label">Surname <span className="impt">*</span></label>
                      <div className="col-md-4">
                        <input type="text" 
                          className="form-control"
                          name="lastName"
                          defaultValue={this.state.data.lastName}
                          onChange={this.handleChange}
                        />
                        <span className="text-danger">{this.state.errorMessage2 !== null ? this.state.errorMessage2 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Email Address <span className="impt">*</span></label>
                        <div className="col-md-4">
                          <input type="email" 
                            className="form-control"
                            name="email"
                            defaultValue={this.state.data.email}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.errorMessage4 !== null ? this.state.errorMessage4 : ''}</span>
												</div>
                      </div> 
											<div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Gender <span className="impt">*</span></label>
												<div className="col-md-4">
                          <label>
                            <input type="radio"
                              name="gender" 
                              className="minimal mr-2"
                              value="Male"
                              onChange={this.handleChange}
                              checked={this.state.data.gender === 'Male' ? true : ''}
                            />
                            Male
													</label>
													<label style={{ paddingLeft: '10px'}}>
                            <input type="radio"
                              name="gender" 
                              className="minimal mr-2"
                              value="Female"
                              onChange={this.handleChange}
                              checked={this.state.data.gender === 'Female' ? true : ''}
                            />
														Female
													</label>
                          <br/>
                          <span className="text-danger">{this.state.errorMessage9 !== null ? this.state.errorMessage9 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Date of Birth <span className="impt">*</span></label>
                        <div className="col-md-4 c-date-picker">
                          <DatePicker
                            className="form-control"
                            selected={this.state.data.dob}
                            onChange={this.handleDobChange}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="Click to select a date"
                          />
                          <br/>
                          <span className="text-danger">{this.state.errorMessage8 !== null ? this.state.errorMessage8 : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Nationality <span className="impt">*</span></label>
                        <div className="col-md-4">
                          <Select
                            defaultValue={this.state.data.nationality}
                            onChange={e => this.handleCustomSelect(e, 'nationality')}
                            options={countryLists}
                            isSearchable="true"
                            name="country"
                            placeholder="Select"
                          />
                          <span className="text-danger">{this.state.errorMessage7 !== null ? this.state.errorMessage7 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">State of Origin</label>
												<div className="col-md-4">
                          { this.getStateOption() }
												</div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Lga <span className="impt">*</span></label>
                        <div className="col-md-4 select2-padding">
                          { this.getLgaOption() }
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Bvn</label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="bvn"
                            defaultValue={this.state.data.bvn}
                            onChange={this.handleChange}
                          />
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Mobile Phone <span className="impt">*</span></label>
												<div className="col-md-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend select2-padding">
                            {/* <select 
                              class="input-group-text" 
                              id="basic-addon"
                              name="mobilePhoneCode"
                              value={this.state.data.mobilePhoneCode}
                              onChange={this.handleChange}
                            >
                              {getAllDialCode()}
                            </select> */}
                            <Select
                              className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                              value={this.state.mobilePhoneCode}
                              onChange={e => this.handleCustomSelect(e, 'mobilePhoneCode')}
                              options={countryCodes}
                              isSearchable="true"
                              name="mobilePhoneCode"
                              placeholder="Select"
                            />
                          </div>
                          <input 
                            type="text" 
                            class="form-control" 
                            aria-describedby="basic-addon3"
                            name="mobilePhone"
                            onChange={this.handleChange}
                            defaultValue={this.state.data.mobilePhone}
                          />
                        </div>
                          <span className="text-danger">{this.state.errorMessage5 !== null ? this.state.errorMessage5 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Home Phone</label>
                        <div className="col-md-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend select2-padding">
                            {/* <select 
                              class="input-group-text" 
                              id="basic-addon3"
                              name="homePhoneCode"
                              value={this.state.data.homePhoneCode}
                              onChange={this.handleChange}
                            >
                              {getAllDialCode()}
                            </select> */}
                            <Select
                              className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                              value={this.state.homePhoneCode}
                              onChange={e => this.handleCustomSelect(e, 'homePhoneCode')}
                              options={countryCodes}
                              isSearchable="true"
                              name="homePhoneCode"
                              placeholder="Select"
                            />
                          </div>
                          <input type="text" 
                            className="form-control"
                            name="homePhone"
                            onChange={this.handleChange}
                            defaultValue={this.state.data.homePhone}
                          />
                        </div>
                          <span className="text-danger">{this.state.errorMessage6 !== null ? this.state.errorMessage6 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Marital Status</label>
												<div className="col-md-4">
                          <Select
                            className="form-control pt-0 pb-0 pr-0 pl-0 border-0 w-100"
                            value={this.state.data.maritalStatus}
                            onChange={e => this.handleCustomSelect(e, 'maritalStatus')}
                            options={[
                              { value: 'Single', label: 'Single' },
                              { value: 'Married', label: 'Married' },
                              { value: 'Divorced', label: 'Divorced' },
                              { value: 'Widowed', label: 'Widowed' },
                            ]}
                            placeholder="Select"
                            name="maritalStatus"
                          />
                          {/* <select className="form-control w-100"
                            name="maritalStatus" 
                            onChange={this.handleChange} 
                            value={this.state.data.maritalStatus}
                          >
                            <option value="" disabled selected>Select</option>
														<option value="Single">Single</option>
														<option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
													</select> */}
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Religion</label>
                        <div className="col-md-4">
                          <Select
                            className="pt-0 pb-0 pr-0 pl-0 border-0"
                            defaultValue={this.state.data.religion}
                            onChange={e => this.handleCustomSelect(e, 'religion')}
                            options={[
                              { value: 'Islam', label: 'Islam'},
                              { value: 'Christianity', label: 'Christianity'}
                            ]}
                            name="religion"
                            placeholder="Select"
                          />
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">No of Dependants</label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="noOfDependant"
                            defaultValue={this.state.data.noOfDependant === null ? this.state.data.noOfDependant : 0}
                            // value={this.state.data.noOfDependant}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.errorMessage10 !== null ? this.state.errorMessage10 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Staff Category</label>
												<div className="col-md-4">
                          <Select
                            className="pt-0 pb-0 pr-0 pl-0 border-0"
                            defaultValue={this.state.data.staffCategory}
                            onChange={e => this.handleCustomSelect(e, 'staffCategory')}
                            options={[
                              { value: 'Full time', label: 'Full time'},
                              { value: 'Contact', label: 'Contact'},
                              { value: 'Casual', label: 'Casual'},
                              { value: 'Consultant', label: 'Consultant'},
                              { value: 'Part time', label: 'Part time'},
                              { value: 'Probation', label: 'Probation'},
                              { value: 'FreeLancers', label: 'FreeLancers'}
                            ]}
                            name="staffCategory"
                            placeholder="Select"
                          />
                          <span className="text-danger">{this.state.errorMessage12 !== null ? this.state.errorMessage12 : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 pr-0 col-form-label">Current Address <span className="impt">*</span></label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="currentAddress"
                            onChange={this.handleChange}
                            value={this.state.data.currentAddress}
                          />
                          <span className="text-danger">{this.state.errorMessage11 !== null ? this.state.errorMessage11 : ''}</span>
												</div>
                        <div className="col-md-6 pr-0">
                          <div className="row">

                            <Select
                              className="w-100 pr-0 pl-0 col-md-3 mr-1"
                              defaultValue={this.state.data.currentCountry}
                              onChange={e => this.handleCustomSelect(e, 'currentCountry')}
                              options={countryLists}
                              isSearchable="true"
                              name="country"
                              placeholder="Country"
                            />
                            
                            { this.getCurrentState() }
                            { this.getCurrentLga() }
                            <input
                              type="text" 
                              name="currentCity" 
                              className="form-control w-100 col-md-2"
                              onChange={this.handleChange}
                              value={this.state.data.currentCity} 
                              placeholder="City"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Permanent Address</label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="permanentAddress"
                            onChange={this.handleChange}
                            value={this.state.data.permanentAddress}
                          />
												</div>
                        <div className="col-md-6 pr-0">
                          <div className="row">
                            <Select
                              className="w-100 pr-0 pl-0 col-md-3 mr-1"
                              defaultValue={this.state.data.permanentCountry}
                              onChange={e => this.handleCustomSelect(e, 'permanentCountry')}
                              options={countryLists}
                              isSearchable="true"
                              name="permanentCountry"
                              placeholder='Country'
                            />
                            { this.getPermanentState()}
                            { this.getPermanentLga() }
                            <input 
                              type="text"
                              name="permanentCity" 
                              className="form-control col-md-2 "
                              onChange={this.handleChange}
                              value={this.state.data.permanentCity} 
                              placeholder="City"
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Other Features</label>
												<div className="col-md-8">
                          <input type="text" 
                            className="form-control"
                            name="otherFeatures"
                            onChange={this.handleChange}
                            value={this.state.data.otherFeatures}
                          />
												</div>
                      </div> */}

                      <div className="form-group row mb-0 mt-2 text-right">
												<div className="col-md-12">
                          <button 
                            type="submit"
                            className="btn btn-info mr-5"
                            // onClick={() => this.props.history.push('/create_staff/two')}
                            onClick={this.handleSave}
                          ><span className="fa fa-save"></span> SAVE</button>
                          <button type="submit" 
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                          ><span className="fa fa-arrow-right"></span> NEXT</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>


          </section>
        </div>
      </Layout>
    )
  }
}

export default PersonalInfo;

import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Layout from '../layout/index';
import { httpPost, httpPatch } from '../../actions/data.action';
import { states, countries } from './Info';
import { slga, getLga } from '../../helpers/states';
// import validate from '../../helpers/validations';
import { validateData, validateD } from '../../helpers/validations';
import { showLoader, hideLoader } from '../../helpers/loader';

class PersonalInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
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
      errorMessage10: null
    }
  }

  handleChange = async (e) => {
    const { data } = this.state;
    let details = e.target;
    console.log(details.value)
    if(details.name === 'noOfDependant'){
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage10: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = parseInt(details.value);
      this.setState({ data, errorMessage10: null });

    } else if(details.name === 'nationality'){
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage7: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data, 
        country: details.value, 
        errorMessage7: null 
      })

    } else if(details.name === 'firstName') {
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage1: isValidate.errorMessage
        })
        return;
      }
      // console.log(details.value)
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage1: null 
      });

    } else if(details.name === 'lastName') {
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage2: isValidate.errorMessage, 
        })
        return;
      }
      // console.log(details.value)
      data[details.name] = details.value;
      this.setState({ 
        data, 
        errorMessage2: null 
      });

    } else if(details.name === 'middleName') {
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage3: isValidate.errorMessage,
        })
        return;
      }
      // console.log(details.value)
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage3: null 
      });

    } else if(details.name === 'email') {
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage4: isValidate.errorMessage, 
        })
        return;
      }
      // console.log(details.value)
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage4: null 
      });

    } if(details.name === 'mobilePhone') {
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage5: isValidate.errorMessage, 
        })
        return;
      }
      // console.log(details.value)
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage5: null 
      });

    } else if(details.name === 'homePhone') {
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage6: isValidate.errorMessage,
        })
        return;
      }
      // console.log(details.value)
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage6: null 
      });

    } else if(details.name === 'dob') {
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage8: isValidate.errorMessage,
        })
        return;
      }
      // console.log(details.value)
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage8: null 
      });
    } else if(details.name === 'gender') {
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage9: isValidate.errorMessage,
        })
        return;
      }
      // console.log(details.value)
      data[details.name] = details.value;
      this.setState({ 
        data,
        errorMessage9: null 
      });
    } else if(details.name === 'currentCountry'){
      data[details.name] = details.value;
      this.setState({ 
        data,
        currentCountry: details.value,
      });
    } else if(details.name === 'permanentCountry'){
      data[details.name] = details.value;
      this.setState({ 
        data,
        permanentCountry: details.value,
      });
    } else {
      data[details.name] = details.value;
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
      } else if(isValidate.type === 'middleName'){
        this.setState({ 
          errorMessage3: isValidate.errorMessage,
        })
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

    // console.log(errorMessage1)
    if(errorMessage1 !== null || errorMessage2 !== null || errorMessage3 !== null || errorMessage4 !== null || errorMessage5 !== null || errorMessage6 !== null || errorMessage7 !== null || errorMessage8 !== null || errorMessage9 !== null || errorMessage10 !== null ){
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
            backurl: `/`,
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
          this.setState({ userId: res.data.id });
          // return this.props.history.push(`/create_staff/two/${res.data.id}`)
          return this.props.history.push({
            pathname: `/create_staff/two/${res.data.id}`,
            backurl: '/',
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
    const isValidate = await validateData(this.state.data);
    if(isValidate === 'error'){
      return hideLoader();
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
          // setState({ userId: res.data.id });
          // return this.props.history.push(`/create_staff/two/${res.data.id}`)
        }
      }
      
      // console.log(res)
    } catch (error){
      hideLoader()
      console.log(error)
    }
  }

  // componentDidMount(){
  //   if(this.props.location.savedState){
  //     this.setState({...this.props.location.savedState});
  //   }
  // }

  componentDidMount(){
    if(this.props.location.direction === 'backward'){
      this.setState({...this.props.location.savedState, pageMode: 'edit'});
    }
	}

  getLGA = (state) => {
    const lga = getLga(state) || [];
    return lga.length ? lga.map(data => (
      <option value={`${data.name}`}>{data.name}</option>
    )) : <option value="">LGA</option>
  }

  render() {
    // console.log(!this.state.country ? 'undefined' : this.state.country)
    // console.log(this.state)
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
							<div className="col-12">
								<div className="card">
									<div className="card-header">
										<h4>Personal Information</h4>
									</div>
									<div className="card-body">

                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
											<div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">First Name <span className="impt">*</span></label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="firstName"
                            defaultValue={this.state.data.firstName}
                            onChange={e => this.handleChange(e)}
                          />
                          <span className="text-danger">{this.state.errorMessage1 !== null ? this.state.errorMessage1 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Last Name <span className="impt">*</span></label>
                        <div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="lastName"
                            defaultValue={this.state.data.lastName}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.errorMessage2 !== null ? this.state.errorMessage2 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Middle Name <span className="impt">*</span></label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="middleName"
                            defaultValue={this.state.data.middleName}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.errorMessage3 !== null ? this.state.errorMessage3 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Email Address <span className="impt">*</span></label>
                        <div className="col-md-3">
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
												<div className="col-md-3">
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
                        <div className="col-md-3">
                          <input type="date" 
                            className="form-control"
                            name="dob"
                            onChange={this.handleChange}
                            defaultValue={this.state.data.dob}
                          />
                          <span className="text-danger">{this.state.errorMessage8 !== null ? this.state.errorMessage8 : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Mobile Phone <span className="impt">*</span></label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="mobilePhone"
                            onChange={this.handleChange}
                            defaultValue={this.state.data.mobilePhone}
                          />
                          <span className="text-danger">{this.state.errorMessage5 !== null ? this.state.errorMessage5 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Home Phone <span className="impt">*</span></label>
                        <div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="homePhone"
                            onChange={this.handleChange}
                            defaultValue={this.state.data.homePhone}
                          />
                          <span className="text-danger">{this.state.errorMessage6 !== null ? this.state.errorMessage6 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Nationality <span className="impt">*</span></label>
                        <div className="col-md-3">
                          {/* <input type="text" 
                            className="form-control"
                            name="nationality"
                            onChange={this.handleChange}
                          /> */}
                          <select className="form-control w-100" name="nationality" onChange={this.handleChange} defaultValue={this.state.data.nationality} required>
                            {
                              countries('Select Your Country')
                            }
													</select>
                          <span className="text-danger">{this.state.errorMessage7 !== null ? this.state.errorMessage7 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">State of Origin</label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control custom-input-h"
                            name="stateOfOrigin"
                            value={this.state.data.stateOfOrigin}
                            onChange={this.handleChange}
                            style={ (this.state.country === 'Nigeria') || !this.state.country ? { display: 'none' } : { display: 'block' }}
                          />
                          <select 
                            className="form-control w-100"
                            name="stateOfOrigin"
                            value={this.state.data.stateOfOrigin}
                            onChange={this.handleChange}
                            style={(this.state.country !== '') && (this.state.country !== null) && (this.state.country !== 'Nigeria') ? { display: 'none'} : {} }>
														{
                              states('Select Your State')
                            }
													</select>
												</div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Marital Status</label>
												<div className="col-md-3">
                          <select className="form-control w-100"
                            name="maritalStatus" 
                            onChange={this.handleChange} 
                            value={this.state.data.maritalStatus}
                          >
                            <option value="">Select</option>
														<option value="Single">Single</option>
														<option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Religion</label>
                        <div className="col-md-3">
                        <select className="form-control w-100" 
                          name="religion" 
                          onChange={this.handleChange} 
                          value={this.state.data.religion}
                        >
                            <option value="">Select</option>
														<option value="Muslim">Muslim</option>
														<option value="Christianity">Christianity</option>
														<option value="Other">Other</option>
													</select>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">No of dependants</label>
												<div className="col-md-3">
                          <input type="number" 
                            className="form-control"
                            name="noOfDependant"
                            defaultValue={this.state.data.noOfDependant === null ? this.state.data.noOfDependant : 0}
                            // value={this.state.data.noOfDependant}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.errorMessage10 !== null ? this.state.errorMessage10 : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Current Address</label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control custom-input-h"
                            name="currentAddress"
                            onChange={this.handleChange}
                            value={this.state.data.currentAddress}
                          />
												</div>
                        <div className="col-md-5">
                          <div className="row">
                            <select 
                              name="currentCountry" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.data.currentCountry} 
                            >
                              { 
                                countries('Country')
                              }
                            </select>
                            <input type="text" 
                              className="form-control col-md-3 mr-1 custom-input-h"
                              name="currentState"
                              value={this.state.data.currentState}
                              onChange={this.handleChange}
                              style={ (this.state.currentCountry === 'Nigeria') || !this.state.currentCountry ? { display: 'none' } : { display: 'block' }}
                            />
                            <select 
                              className="form-control w-100 col-md-3 mr-1"
                              name="currentState"
                              value={this.state.data.currentState}
                              onChange={this.handleChange}
                              style={(this.state.currentCountry !== '') && (this.state.currentCountry !== null) && (this.state.currentCountry !== 'Nigeria') ? { display: 'none'} : {} }>
                              {
                                states('States')
                              }
                            </select>
                            {/* <select 
                              name="currentState" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.data.currentState}
                            >
                              {
                                states('States')
                              }
                            </select> */}
                            <input type="text" 
                              className="form-control col-md-3 mr-1 custom-input-h"
                              name="currentLga" 
                              value={this.state.data.currentLGA}
                              onChange={this.handleChange}
                              style={ (this.state.currentCountry === 'Nigeria') || !this.state.currentCountry ? { display: 'none' } : { display: 'block' }}
                            />
                            <select 
                              name="currentLga" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange} 
                              value={this.state.data.currentLGA}
                              style={(this.state.currentCountry !== '') && (this.state.currentCountry !== null) && (this.state.currentCountry !== 'Nigeria') ? { display: 'none'} : {} }>
                            >
                              <option value="">LGA</option>
                              {
                                this.getLGA(this.state.data.currentState)
                              }
                            </select>
                            <input
                              type="text" 
                              name="currentCity" 
                              className="form-control w-100 col-md-2 custom-input-h"
                              onChange={this.handleChange}
                              value={this.state.data.currentCity} 
                              placeholder="City"
                            />
                            {/* <select 
                              name="currentCity" 
                              className="form-control w-100 col-md-2"
                              onChange={this.handleChange}
                              value={this.state.data.currentCity} 
                            >
                              <option value="">City</option>
                              <option value="">Nigeria</option>
                              <option value="">Ghana</option>
                            </select> */}
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Permanent Address</label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control custom-input-h"
                            name="permanentAddress"
                            onChange={this.handleChange}
                            value={this.state.data.permanentAddress}
                          />
												</div>
                        <div className="col-md-5">
                          <div className="row">
                            <select 
                              name="permanentCountry" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.data.permanentCountry} 
                            >
                              { 
                                countries('Country')
                              }
                            </select>
                            <input type="text" 
                              className="form-control col-md-3 mr-1 custom-input-h"
                              name="permanentState"
                              value={this.state.data.permanentState}
                              onChange={this.handleChange}
                              style={ (this.state.permanentCountry === 'Nigeria') || !this.state.permanentCountry ? { display: 'none' } : { display: 'block' }}
                            />
                            <select 
                              className="form-control w-100 col-md-3 mr-1"
                              name="permanentState"
                              value={this.state.data.permanentState}
                              onChange={this.handleChange}
                              style={(this.state.permanentCountry !== '') && (this.state.permanentCountry !== null) && (this.state.permanentCountry !== 'Nigeria') ? { display: 'none'} : {} }>
                              {
                                states('States')
                              }
                            </select>
                            {/* <select 
                              name="permanentState" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.data.permanentState}
                            >
                              {
                                states('States')
                              }
                            </select> */}
                            <input type="text" 
                              name="permanentLGA" 
                              className="form-control col-md-3 mr-1 custom-input-h"
                              onChange={this.handleChange} 
                              value={this.state.data.permanentLGA}
                              style={ (this.state.permanentCountry === 'Nigeria') || !this.state.permanentCountry ? { display: 'none' } : { display: 'block' }}
                            />
                            <select 
                              name="permanentLGA" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange} 
                              value={this.state.data.permanentLGA}
                              style={(this.state.permanentCountry !== '') && (this.state.permanentCountry !== null) && (this.state.permanentCountry !== 'Nigeria') ? { display: 'none'} : {} }
                            >
                              <option value="">LGA</option>
                              {
                                this.getLGA(this.state.data.permanentState)
                              }
                            </select>
                            <input 
                              type="text"
                              name="permanentCity" 
                              className="form-control col-md-2 custom-input-h"
                              onChange={this.handleChange}
                              value={this.state.data.permanentCity} 
                              placeholder="City"
                            />
                            {/* <select 
                              name="permanentCity" 
                              className="form-control w-100 col-md-2"
                              onChange={this.handleChange}
                              value={this.state.data.permanentCity} 
                            >
                              <option value="">City</option>
                              <option value="">Nigeria</option>
                              <option value="">Ghana</option>
                            </select> */}
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Other Features</label>
												<div className="col-md-8">
                          <input type="text" 
                            className="form-control"
                            name="otherFeatures"
                            onChange={this.handleChange}
                            value={this.state.data.otherFeatures}
                          />
												</div>
                      </div>

                      <div className="form-group mb-0 mt-2 row justify-content-end">
												<div className="col-md-9">
                          <button 
                            type="submit"
                            className="btn btn-info mr-5"
                            // onClick={() => this.props.history.push('/create_staff/two')}
                            onClick={this.handleSubmit}
                          >NEXT</button>
                          <button type="submit" 
                            className="btn btn-primary"
                            onClick={this.handleSave}
                          >SAVE</button>
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

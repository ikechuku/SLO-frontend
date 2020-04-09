import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Layout from '../layout/index';
import { httpPost, httpPatch } from '../../actions/data.action';
import { states, countries } from './Info';
import { slga } from '../../helpers/states';
// import validate from '../../helpers/validations';
import validateData from '../../helpers/validations';
import { showLoader, hideLoader } from '../../helpers/loader';

class PersonalInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      userId: null,
      country: null,
    }
  }

  handleChange = (e) => {
    const { data } = this.state;
    if(e.target.name === 'noOfDependent'){
      data[e.target.name] = parseInt(e.target.value);
      this.setState({ data });
    } else if(e.target.name === 'nationality'){
      data[e.target.name] = e.target.value;
      this.setState({ data, country: e.target.value })
    } else {
      data[e.target.name] = e.target.value;
      this.setState({ data });
    }
    
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    showLoader();
    const isValidate = await validateData(this.state.data);
    if(isValidate === 'error'){
      return hideLoader();
    }

    try{
      // showLoader();
      if(this.props.location.savedState){
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
      } else {
        const res = await httpPost('auth/create_staff', this.state.data);
        if(res.code === 201){
          hideLoader();
          this.setState({ userId: res.data.id });
          // return this.props.history.push(`/create_staff/two/${res.data.id}`)
          return this.props.history.push({
            pathname: `/create_staff/two/${res.data.id}`,
            backurl: '/',
            savedState: this.state
          });
        }
      }
      
    } catch (error){
      hideLoader();
      console.log(error)
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
      if(this.props.location.savedState){
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

  componentDidMount(){
    if(this.props.location.savedState){
      this.setState({...this.props.location.savedState});
    }
  }

  // componentDidMount(){
  //   const stateName = 'Zamfara State';
  //   let lga;
  //   slga.map(data => {
  //     if(data.state.name === stateName){
  //       lga = data.state.locals;
  //     }
  //   });
  //   console.log(lga)
  // }

  render() {
    // console.log(!this.state.country ? 'undefined' : this.state.country)
    // console.log(this.state)
    return (
      <Layout>
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
                            value={this.state.data.firstName}
                            onChange={this.handleChange}
                          />
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Last Name <span className="impt">*</span></label>
                        <div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="lastName"
                            value={this.state.data.lastName}
                            onChange={this.handleChange}
                          />
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Middle Name <span className="impt">*</span></label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="middleName"
                            value={this.state.data.middleName}
                            onChange={this.handleChange}
                          />
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Email Address <span className="impt">*</span></label>
                        <div className="col-md-3">
                          <input type="email" 
                            className="form-control"
                            name="email"
                            value={this.state.data.email}
                            onChange={this.handleChange}
                          />
												</div>
                      </div> 
											<div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Gender <span className="impt">*</span></label>
												<div className="col-md-3">
                          <label>
                            <input type="radio"
                              name="gender" 
                              className="minimal"
                              value="Male"
                              onChange={this.handleChange}
                              checked={this.state.data.gender === 'Male' ? true : ''}
                            />
                            Male
													</label>
													<label style={{ paddingLeft: '10px'}}>
                            <input type="radio"
                              name="gender" 
                              className="minimal"
                              value="Female"
                              onChange={this.handleChange}
                              checked={this.state.data.gender === 'Female' ? true : ''}
                            />
														Female
													</label>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Date of Birth</label>
                        <div className="col-md-3">
                          <input type="date" 
                            className="form-control"
                            name="dob"
                            onChange={this.handleChange}
                            defaultValue={this.state.data.dob}
                          />
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Mobile Phone</label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="mobilePhone"
                            onChange={this.handleChange}
                            value={this.state.data.mobilePhone}
                          />
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Home Phone</label>
                        <div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="homePhone"
                            onChange={this.handleChange}
                            value={this.state.data.homePhone}
                          />
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
                          <select className="form-control w-100" name="nationality" onChange={this.handleChange} value={this.state.data.nationality} required>
                            {
                              countries.length ? 
                                countries.map(data => (
                                  data
                                )) :
                                <option value="">Select Your Country</option>
                            }
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">State of Origin</label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control"
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
                              states.length ? 
                                states.map(data => (
                                  data
                                )) :
                                <option value="select your state">Select your state</option>
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
                            defaultValue={0}
                            value={this.state.data.noOfDependant}
                            onChange={this.handleChange}
                          />
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Current Address</label>
												<div className="col-md-8">
                          <input type="text" 
                            className="form-control"
                            name="currentAddress"
                            onChange={this.handleChange}
                            value={this.state.data.currentAddress}
                          />
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Permanent Address</label>
												<div className="col-md-8">
                          <input type="text" 
                            className="form-control"
                            name="permanentAddress"
                            onChange={this.handleChange}
                            value={this.state.data.permanentAddress}
                          />
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

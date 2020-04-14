import React, { Component } from 'react';
import Moment from 'react-moment';
import Layout from '../layout/index';
import { httpPost, httpPatch, httpDelete } from '../../actions/data.action';
import { hideLoader, showLoader } from '../../helpers/loader';
import { NotificationManager } from 'react-notifications';
import { validateGuarantorFields } from '../../helpers/validations';
import { states, countries } from './Info';
import { slga, getLga } from '../../helpers/states';
import CustomSelect from '../../helpers/Select2';

class Guarantor extends Component {
	constructor(props){
		super(props)
		this.state = {
			postData: {
				firstName: '',
				lastName: '',
				middleName: '',
				mobilePhone: '',
				homePhone: '',
				businessPhone: '',
				relationship: '',
				occupation: '',
				residentialAddress: '',
				residentialCountry: '',
				residentialState: '',
				residentialLga: '',
				residentialCity: '',
				landedPropertyAddress: '',
				landedPropertyCountry: '',
				landedPropertyState: '',
				landedPropertyLga: '',
				landedPropertyCity: '',
				businessAddress: '',
				maritalStatus: '',
				employeeKnownDate: '',
				criminalHistory: ''
			},
			moreData: [],
			pageMode: 'create',
			errorMessage1: null,
			errorMessage2: null,
			errorMessage3: null,
			errorMessage4: null,
			errorMessage5: null,
			errorMessage6: null
		}
	}

	handleChange = async (e) => {
		const { postData } = this.state;
		let details = e.target;
		console.log(details.name, details.value)
		if(details.name === 'criminalHistory'){
			let value;
			if(details.value === "true"){
				value = true;
			} else {
				value = false;
			}
			postData[e.target.name] = value;
			this.setState({ postData });
		} else if(details.name === 'firstName'){
      const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage1: isValidate.errorMessage, 
        })
        return;
      }
      postData[details.name] = details.value;
      this.setState({ 
        postData,
        errorMessage1: null 
      })
    } else if(details.name === 'lastName'){
      const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage2: isValidate.errorMessage, 
        })
        return;
      }
      postData[details.name] = details.value;
      this.setState({ 
        postData,
        errorMessage2: null 
      })
    } else if(details.name === 'middleName'){
      const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage3: isValidate.errorMessage, 
        })
        return;
      }
      postData[details.name] = details.value;
      this.setState({ 
        postData,
        errorMessage3: null 
      })
    } else if(details.name === 'mobilePhone'){
      const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage4: isValidate.errorMessage, 
        })
        return;
      }
      postData[details.name] = details.value;
      this.setState({ 
        postData,
        errorMessage4: null 
      })
    } else if(details.name === 'homePhone'){
      const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage5: isValidate.errorMessage, 
        })
        return;
      }
      postData[details.name] = details.value;
      this.setState({ 
        postData,
        errorMessage5: null 
      })
    } else if(details.name === 'businessPhone'){
      const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage6: isValidate.errorMessage, 
        })
        return;
      }
      postData[details.name] = details.value;
      this.setState({ 
        postData,
        errorMessage6: null 
      })
    } else {
			postData[details.name] = details.value;
			this.setState({ postData });
		}
	}

	addMore = () => {
		const { 
			firstName,
			lastName,
			middleName,
			mobilePhone,
			homePhone,
			businessPhone,
			relationship,
			occupation,
			residentialAddress,
			landedPropertyAddress,
			businessAddress,
			maritalStatus,
			employeeKnownDate,
			criminalHistory
		} = this.state.postData;

		console.log(this.state.postData)

		if(firstName === '' || lastName === '' || middleName === '' || mobilePhone === '' || businessPhone === '' || relationship === '' || homePhone === '' || occupation === '' || residentialAddress === '' || landedPropertyAddress === '' || businessAddress === '' || maritalStatus === '' || employeeKnownDate === '' || criminalHistory === ''){
			return NotificationManager.warning('All fields are required');
		}

		this.setState({ 
			moreData: [...this.state.moreData, this.state.postData], 
		});
		this.setState({ 
			postData: {
				firstName: '',
				lastName: '',
				middleName: '',
				mobilePhone: '',
				homePhone: '',
				businessPhone: '',
				relationship: '',
				occupation: '',
				residentialAddress: '',
				residentialCountry: '',
				residentialState: '',
				residentialLga: '',
				residentialCity: '',
				landedPropertyAddress: '',
				landedPropertyCountry: '',
				landedPropertyState: '',
				landedPropertyLga: '',
				landedPropertyCity: '',
				businessAddress: '',
				maritalStatus: '',
				employeeKnownDate: '',
				criminalHistory: ''
			}
		});
	}

	removeMore = (value, id) => {
		if(this.state.pageMode === 'create'){
			this.setState({
				moreData: this.state.moreData.filter((interest,index) => index !== parseInt(value))
			}); 
		} else {
			this.handleDelete(id, value)
		}
	}
	
	handleDelete = async (id, indexValue) => {
		try{
			const res = await httpDelete(`auth/delete_guarantor/${id}`);
			if(res.code === 200){
				this.setState({
					moreData: this.state.moreData.filter((interest,index) => index !== parseInt(indexValue))
				})
			}
		}catch(error){
			console.log(error)
		}
	}

	handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(this.state.postData);
    try{
			const { id } = this.props.match.params;

			if(this.state.moreData.length < 3){
				return NotificationManager.warning('A minimum of 3 guarantor is required')
			}

			if(this.state.pageMode === 'edit'){
				const res = await httpPatch(`auth/edit_onboarding_four/${id}`, this.state.moreData);
				if(res.code === 201){
					this.setState({ moreData: res.data.guarantor });

					return this.props.history.push({
						pathname: `/create_staff/five/${res.data.id}`,
						backurl: `/create_staff/four/${res.data.id}`,
						savedState: this.state.moreData,
						direction: 'forward'
					});
				}
			} else {
				const res = await httpPost(`auth/onboarding_four/${id}`, this.state.moreData);
				if(res.code === 201){
					this.setState({ moreData: res.data.guarantor });
					// return this.props.history.push(`/create_staff/five/${res.data.id}`)
					return this.props.history.push({
						pathname: `/create_staff/five/${res.data.id}`,
						backurl: `/create_staff/four/${res.data.id}`,
						savedState: this.state.moreData,
						direction: 'forward'
					});
				}
				console.log(res)
			}
      
    } catch (error){
      console.log(error)
    }
	}

	handleSave = async (e) => {
		e.preventDefault()
		showLoader();
    try{
			const { id } = this.props.match.params;

      const res = await httpPost(`auth/onboarding_four/${id}`, this.state.postData);
      if(res.code === 201){
        hideLoader();
      }
      console.log(res)
    } catch (error){
			hideLoader();
      console.log(error)
    }
	}

	handleBackButton = () => {
    return this.props.history.push({
      pathname: `${this.props.location.backurl}`,
			savedState: this.props.location.savedState,
			direction: 'backward'
    })
	}
	
	componentDidMount(){
    if(this.props.location.direction === 'backward'){
			console.log(this.props.location.savedState)
      this.setState({ moreData: this.props.location.savedState, pageMode: 'edit'});
    }
	}

	getLGA = (state) => {
    const lga = getLga(state) || [];
    return lga.length ? lga.map(data => (
      <option value={`${data.name}`}>{data.name}</option>
    )) : <option value="">LGA</option>
  }

  render() {
    return (
      <Layout>
        <div class="app-content">
          <section class="section">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#" class="text-muted">Home</a></li>
              <li class="breadcrumb-item"><a href="#" class="text-muted">Staff</a></li>
              <li class="breadcrumb-item active text-" aria-current="page">New Staff</li>
            </ol>

            <div className="row">
							<div className="col-12">
								<div className="card">
									<div className="card-header">
									<div className="row">
                    <h4 className="col col-md-6">Guarantor Information</h4>
                    <div className="col col-md-6 text-right">
                      <h4 className="cursor-pointer" onClick={this.handleBackButton}><i class="fa fa-arrow-left" aria-hidden="true"></i>Back</h4>
                    </div>
                    </div>
									</div>
									<div className="card-body">

                    <form className="form-horizontal" >
										<div class="table-responsive" style={!this.state.moreData.length ? { display: "none"} : {}}>
                          <table id="example1" class="col col-md-8 offset-md-2 table table-striped table-bordered border-t0 text-nowrap w-100" >
                            <thead>
                              <tr>
                                {/* <th className="wd-15p">S/N</th> */}
                                <th class="wd-15p">Name</th>
                                <th class="wd-15p">Relationship with empoyee</th>
																<th class="wd-15p">How long have you know the employee</th>
                                <th class="wd-25p"></th>
                              </tr>
                            </thead>
                            <tbody>                                {
                                this.state.moreData.length ? this.state.moreData.map((data, index) => (
                                  <tr key={index}>
                                    {/* <td>{index + 1}</td> */}
                                    <td>{data.firstName + ' ' + data.lastName}</td>
                                    <td>{data.relationship}</td>
																		<td>{<Moment fromNow ago>{data.employeeKnownDate}</Moment>}</td>
                                    <td>
																			{/* <span className="add-more p-3" onClick={() => this.handleEdit(data.id)}>Edit</span> */}
                                      <span className="add-more" onClick={() => this.removeMore(index,data.id)}>Delete</span>
                                    </td>
                                  </tr>
                                )) : ''
                              }
                              </tbody>
                            </table>
                          </div>
											<div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">First Name</label>
												<div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="firstName"
														onChange={this.handleChange}
														defaultValue={this.state.postData.firstName}
													/>
													<span className="text-danger">{this.state.errorMessage1 !== null ? this.state.errorMessage1 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Last Name</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="lastName"
														onChange={this.handleChange}
														defaultValue={this.state.postData.lastName}
													/>
													<span className="text-danger">{this.state.errorMessage2 !== null ? this.state.errorMessage2 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Middle Name</label>
												<div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="middleName"
														onChange={this.handleChange}
														defaultValue={this.state.postData.middleName}
													/>
													<span className="text-danger">{this.state.errorMessage3 !== null ? this.state.errorMessage3 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Mobile Phone</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="mobilePhone"
														onChange={this.handleChange}
														defaultValue={this.state.postData.mobilePhone}
													/>
													<span className="text-danger">{this.state.errorMessage4 !== null ? this.state.errorMessage4 : ''}</span>
												</div>
                      </div> 
											<div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Home Phone</label>
												<div className="col-md-3">
													<input type="text" 
														name="homePhone" 
														className="form-control"
														onChange={this.handleChange}
														defaultValue={this.state.postData.homePhone}
													/>
													<span className="text-danger">{this.state.errorMessage5 !== null ? this.state.errorMessage5 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Business Phone</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="businessPhone"
														onChange={this.handleChange}
														defaultValue={this.state.postData.businessPhone}
													/>
													<span className="text-danger">{this.state.errorMessage6 !== null ? this.state.errorMessage6 : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
                      <label for="inputName" className="col-md-2 col-form-label">Relationship with employee</label>
												<div className="col-md-3">
													<CustomSelect 
														optionList={[
															{ value: 'Family Friend', text: 'Family Friend', id: 1 },
															{ value: 'Pastor', text: 'Pastor', id: 2 },
															{ value: 'Spiritual Head', text: 'Spiritual Head' , id: 3 },
															{ value: 'Relative', text: 'Relative' , id: 4 },
															{ value: 'Friend', text: 'Friend' , id: 5 }, 
														]}
														handleChange={this.handleChange}
														name={'relationship'}
														value={this.state.postData.relationship}
														placeHolder='Select'
													/>
													{/* <select 
														className="form-control w-100"
														name="relationship"
														onChange={this.handleChange}
														value={this.state.postData.relationship}
													>
														<option value="select">Select</option>
														<option value="Family Friend">Family Friend</option>
														<option value="Pastor">Pastor</option>
														<option value="Spiritual Head">Spiritual Head</option>
														<option value="Relative">Relative</option>
														<option value="Friend">Friend</option>
														<option value="Other">other [please specify]</option>
													</select> */}
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Occupation</label>
                        <div className="col-md-3">
												<CustomSelect 
													optionList={[
														{ value: 'Civil Servant', text: 'Civil Servant', id: 1 },
														{ value: 'Clergy', text: 'Clergy', id: 2 },
														{ value: 'Business person', text: 'Business person' , id: 3 } 
													]}
													handleChange={this.handleChange}
													name={'occupation'}
													value={this.state.postData.occupation}
													placeHolder='Select'
												/>
												{/* <select class="js-example-basic-single" name="state">
													<option value="AL">Alabama</option>
													<option value="WY">Wyoming</option>
												</select> */}
													{/* <select
														className="form-control js-example-basic-single"
														name="occupation"
														onChange={this.handleChange}
														value={this.state.postData.occupation}
													>
														<option value="">select</option>
														<option value="Civil Servant">Civil Servant</option>
														<option value="Clergy">Clergy</option>
														<option value="Business person">Business person</option>
														<option value="Other">other [please specify]</option>
													</select> */}
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Residential Address</label>
												<div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="residentialAddress"
														onChange={this.handleChange}
														value={this.state.postData.residentialAddress}
													/>
												</div>
												<div className="col-md-5">
                          <div className="row">
                            <select 
                              name="residentialCountry" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.postData.residentialCountry} 
                            >
                              { 
                                countries('Country')
                              }
                            </select>
                            <select 
                              name="residentialState" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.postData.residentialState}
                            >
                              {
                                states('States')
                              }
                            </select>
                            <select 
                              name="residentialLga" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange} 
                              value={this.state.postData.residentialLGA}
                            >
                              <option value="">LGA</option>
                              {
                                this.getLGA(this.state.postData.residentialState)
                              }
                            </select>
                            <select 
                              name="residentialCity" 
                              className="form-control w-100 col-md-2"
                              onChange={this.handleChange}
                              value={this.state.postData.residentialCity} 
                            >
                              <option value="">City</option>
                              <option value="">Nigeria</option>
                              <option value="">Ghana</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Landed Property Address</label>
												<div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="landedPropertyAddress"
														onChange={this.handleChange}
														value={this.state.postData.landedPropertyAddress}
													/>
												</div>
												<div className="col-md-5">
                          <div className="row">
                            <select 
                              name="landedPropertyCountry" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.postData.landedPropertyCountry} 
                            >
                              { 
                                countries('Country')
                              }
                            </select>
                            <select 
                              name="landedPropertyState" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.postData.landedPropertyState}
                            >
                              {
                                states('States')
                              }
                            </select>
                            <select 
                              name="landedPropertyLga" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange} 
                              value={this.state.postData.landedPropertyLGA}
                            >
                              <option value="">LGA</option>
                              {
                                this.getLGA(this.state.postData.landedPropertyState)
                              }
                            </select>
                            <select 
                              name="landedPropertyCity" 
                              className="form-control w-100 col-md-2"
                              onChange={this.handleChange}
                              value={this.state.postData.landedPropertyCity} 
                            >
                              <option value="">City</option>
                              <option value="">Nigeria</option>
                              <option value="">Ghana</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Business Address</label>
												<div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="businessAddress"
														onChange={this.handleChange}
														value={this.state.postData.businessAddress}
													/>
												</div>
												<div className="col-md-5">
                          <div className="row">
                            <select 
                              name="businessCountry" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.postData.businessCountry} 
                            >
                              { 
                                countries('Country')
                              }
                            </select>
                            <select 
                              name="businessState" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange}
                              value={this.state.postData.businessState}
                            >
                              {
                                states('States')
                              }
                            </select>
                            <select 
                              name="businessLga" 
                              className="form-control w-100 col-md-3 mr-1"
                              onChange={this.handleChange} 
                              value={this.state.postData.businessLGA}
                            >
                              <option value="">LGA</option>
                              {
                                this.getLGA(this.state.postData.businessState)
                              }
                            </select>
                            <select 
                              name="businessCity" 
                              className="form-control w-100 col-md-2"
                              onChange={this.handleChange}
                              value={this.state.postData.businessCity} 
                            >
                              <option value="">City</option>
                              <option value="">Nigeria</option>
                              <option value="">Ghana</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Marital Status</label>
												<div className="col-md-3">
													<select
														className="form-control w-100"
														name="maritalStatus" 
														onChange={this.handleChange}
														value={this.state.postData.maritalStatus}
													>
														<option value="">Select</option>	
														<option value="Single">Single</option>
														<option value="Married">Married</option>
														<option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
													</select>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-4 col-form-label">How long have you known the employee</label>
												<div className="col-md-3">
													<input type="date" 
														className="form-control"
														name="employeeKnownDate"
														onChange={this.handleChange}
														value={this.state.postData.employeeKnownDate}
													/>
												</div>
												<div className="col-md-3 p-2" style={!this.state.postData.employeeKnownDate ? { display: 'none'} : {}}>
													<Moment fromNow ago>{this.state.postData.employeeKnownDate}</Moment>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-5 col-form-label">Has the employee been involved in any criminal matters?</label>
                        <div className="col-md-5">
                          <label>
														<input type="radio" 
															name="criminalHistory" 
															className="minimal"
															onChange={this.handleChange}
															value='true'
															checked={this.state.postData.criminalHistory === true ? true : ''}
														/>
                            Yes
													</label>
													<label style={{ paddingLeft: '10px'}}>
														<input type="radio" 
															name="criminalHistory" 
															className="minimal"
															onChange={this.handleChange}
															value='false'
															checked={this.state.postData.criminalHistory === false ? true : ''}
														/>
														No
													</label>
												</div>
                      </div>
                      <div className="form-group row" style={!this.state.postData.criminalHistory ? {display: 'none'} : {display: 'flex'}}>
												<label for="inputName" className="col-md-2 col-form-label">Give details</label>
												<div className="col-md-8">
													<input type="text" 
														className="form-control"
														name="details"
														onChange={this.handleChange}
														value={this.state.postData.details}
													/>
												</div>
                      </div>
											<div className="form-group row">
												<label for="inputName" className="col-md-5 col-form-label"></label>
												<div className="col-md-7">
													<a className="add-more" onClick={this.addMore}>+Add More</a>
												</div>
											</div>
                      

                      <div class="form-group mb-0 mt-2 row justify-content-end">
												<div class="col-md-9">
                          <button 
                            type="submit"
                            class="btn btn-info mr-5"
														// onClick={() => this.props.history.push('/create_staff/five')}
														onClick={this.handleSubmit}
                          >NEXT</button>
													<button type="submit" class="btn btn-primary" onClick={this.handleSave}>SAVE</button>
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

export default Guarantor;

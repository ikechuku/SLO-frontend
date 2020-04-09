import React, { Component } from 'react';
import Moment from 'react-moment';
import Layout from '../layout/index';
import { httpPost } from '../../actions/data.action';
import { hideLoader, showLoader } from '../../helpers/loader';

class Guarantor extends Component {
	constructor(props){
		super(props)
		this.state = {
			postData: {},
		}
	}

	handleChange = (e) => {
		const { postData } = this.state;
		if(e.target.name === 'criminalHistory'){
			let value;
			if(e.target.value === "true"){
				value = true;
			} else {
				value = false;
			}
			postData[e.target.name] = value;
			this.setState({ postData });
		} else {
			postData[e.target.name] = e.target.value;
			this.setState({ postData });
		}
	}

	handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.postData);
    try{
			const { id } = this.props.match.params;

      const res = await httpPost(`auth/onboarding_four/${id}`, this.state.postData);
      if(res.code === 201){
        // setState({ userId: res.data.id });
				// return this.props.history.push(`/create_staff/five/${res.data.id}`)
				return this.props.history.push({
          pathname: `/create_staff/five/${res.data.id}`,
          backurl: `/create_staff/two/${res.data.id}`,
          savedState: this.state
        });
      }
      console.log(res)
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
      savedState: this.props.location.savedState
    })
	}
	
	componentDidMount(){
    if(this.props.location.savedState){
      this.setState({...this.props.location.savedState});
    }
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
											<div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">First Name</label>
												<div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="firstName"
														onChange={this.handleChange}
														value={this.state.postData.firstName}
													/>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Last Name</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="lastName"
														onChange={this.handleChange}
														value={this.state.postData.lastName}
													/>
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Middle Name</label>
												<div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="middleName"
														onChange={this.handleChange}
														value={this.state.postData.middleName}
													/>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Mobile Phone</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="mobilePhone"
														onChange={this.handleChange}
														value={this.state.postData.mobilePhone}
													/>
												</div>
                      </div> 
											<div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Home Phone</label>
												<div className="col-md-3">
														<input type="text" 
															name="homePhone" 
															className="form-control"
															onChange={this.handleChange}
															value={this.state.postData.homePhone}
														/>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Business Phone</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="businessPhone"
														onChange={this.handleChange}
														value={this.state.postData.businessPhone}
													/>
												</div>
                      </div>
                      <div className="form-group row">
                      <label for="inputName" className="col-md-2 col-form-label">Relationship with employee</label>
												<div className="col-md-3">
													<select 
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
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Occupation</label>
                        <div className="col-md-3">
													<select
														className="form-control"
														name="occupation"
														onChange={this.handleChange}
														value={this.state.postData.occupation}
													>
														<option value="">select</option>
														<option value="Civil Servant">Civil Servant</option>
														<option value="Clergy">Clergy</option>
														<option value="Business person">Business person</option>
														<option value="Other">other [please specify]</option>
													</select>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Residential Address</label>
												<div className="col-md-8">
													<input type="text" 
														className="form-control"
														name="residentialAddress"
														onChange={this.handleChange}
														value={this.state.postData.residentialAddress}
													/>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Landed Property Address</label>
												<div className="col-md-8">
													<input type="text" 
														className="form-control"
														name="landedPropertyAddress"
														onChange={this.handleChange}
														value={this.state.postData.landedPropertyAddress}
													/>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Business Address</label>
												<div className="col-md-8">
													<input type="text" 
														className="form-control"
														name="businessAddress"
														onChange={this.handleChange}
														value={this.state.postData.businessAddress}
													/>
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
															value={`${true}`}
														/>
                            Yes
													</label>
													<label style={{ paddingLeft: '10px'}}>
														<input type="radio" 
															name="criminalHistory" 
															className="minimal"
															onChange={this.handleChange}
															value={`${false}`}
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

import React, { Component } from 'react';
import Moment from 'react-moment';
import Layout from '../layout/index';
import { httpPost } from '../../actions/data.action';

class Guarantor extends Component {
	constructor(props){
		super(props)
		this.state = {
			postData: {},
		}
	}

	handleChange = (e) => {
		const { postData } = this.state;
    postData[e.target.name] = e.target.value;
    this.setState({ postData });
	}

	handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.postData);
    try{
			const { id } = this.props.match.params;

      const res = await httpPost(`auth/onboarding_four/${id}`, this.state.postData);
      if(res.code === 201){
        // setState({ userId: res.data.id });
        return this.props.history.push(`/create_staff/five/${res.data.id}`)
      }
      console.log(res)
    } catch (error){
      console.log(error)
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
										<h4>Guarantor Information</h4>
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
													/>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Last Name</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="lastName"
														onChange={this.handleChange}
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
													/>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Mobile Phone</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="mobilePhone"
														onChange={this.handleChange}
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
														/>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Business Phone</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="businessPhone"
														onChange={this.handleChange}
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
													>
														<option value="Father">Father</option>
														<option value="Mother">Mother</option>
														<option value="Brother">Brother</option>
														<option value="Sister">Sister</option>
														<option value="Cousin">Cousin</option>
														<option value="Niece">Niece</option>
														<option value="Nephew">Nephew</option>
														<option value="Friends">Friends</option>
														<option value="Other">Other</option>
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Occupation</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="occupation"
														onChange={this.handleChange}
													/>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Residential Address</label>
												<div className="col-md-8">
													<input type="text" 
														className="form-control"
														name="residentialAddress"
														onChange={this.handleChange}
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
													/>
												</div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Marital Status</label>
												<div className="col-md-3">
													<select
														className="form-control w-100"
														name="maritalStatus" 
														onChange={this.handleChange}>
														<option value="Single">Single</option>
														<option value="Married">Married</option>
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
														/>
                            Yes
													</label>
													<label style={{ paddingLeft: '10px'}}>
														<input type="radio" 
															name="criminalHistory" 
															className="minimal"
															onChange={this.handleChange}
														/>
														No
													</label>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Give details</label>
												<div className="col-md-8">
													<input type="text" 
														className="form-control"
														name="details"
														onChange={this.handleChange}
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
													<button type="submit" class="btn btn-primary">SAVE</button>
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

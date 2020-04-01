import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/index';
import { httpPost } from '../../actions/data.action';

class PersonalInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      userId: null
    }
  }

  handleChange = (e) => {
    const { data } = this.state;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.data);
    try{
      const res = await httpPost('auth/create_staff', this.state.data);
      if(res.code === 201){
        // setState({ userId: res.data.id });
        return this.props.history.push(`/create_staff/two/${res.data.id}`)
      }
      console.log(res)
    } catch (error){
      console.log(error)
    }
  }

  render() {
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
                        <label for="inputName" className="col-md-2 col-form-label">Email Address</label>
                        <div className="col-md-3">
                          <input type="email" 
                            className="form-control"
                            name="email"
                            onChange={this.handleChange}
                          />
												</div>
                      </div> 
											<div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Gender</label>
												<div className="col-md-3">
                          <label>
                            <input type="radio"
                              name="gender" 
                              className="minimal"
                              value="Male"
                              onChange={this.handleChange}
                            />
                            Male
													</label>
													<label style={{ paddingLeft: '10px'}}>
                            <input type="radio"
                              name="gender" 
                              className="minimal"
                              value="Female"
                              onChange={this.handleChange}
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
                          />
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Home Phone</label>
                        <div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="homePhone"
                            onChange={this.handleChange}
                          />
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">State of Origin</label>
												<div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="stateOfOrigin"
                            onChange={this.handleChange}
                          />
													{/* <select className="form-control select2 w-100" >
														<option selected="selected">Alabama</option>
														<option>Alaska</option>
														<option>California</option>
														<option>Delaware</option>
														<option>Tennessee</option>
														<option>Texas</option>
														<option>Washington</option>
													</select> */}
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Nationality</label>
                        <div className="col-md-3">
                          <input type="text" 
                            className="form-control"
                            name="nationality"
                            onChange={this.handleChange}
                          />
                        {/* <select className="form-control select2 w-100" >
														<option selected="selected">Alabama</option>
														<option>Alaska</option>
														<option>California</option>
														<option>Delaware</option>
														<option>Tennessee</option>
														<option>Texas</option>
														<option>Washington</option>
													</select> */}
												</div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Marital Status</label>
												<div className="col-md-3">
													<select className="form-control w-100" >
														<option value="Single">Single</option>
														<option value="Married">Married</option>
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Religion</label>
                        <div className="col-md-3">
                        <select className="form-control w-100" >
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
                          />
												</div>
                      </div>

                      <div class="form-group mb-0 mt-2 row justify-content-end">
												<div class="col-md-9">
                          <button 
                            type="submit"
                            class="btn btn-info mr-5"
                            // onClick={() => this.props.history.push('/create_staff/two')}
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

export default PersonalInfo;

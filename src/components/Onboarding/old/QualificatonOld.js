import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../layout/index'
import { httpPost } from '../../../actions/data.action';
import './style.css';

class Qualification extends Component {
  constructor(props){
    super(props);
    this.state = {
      noInstitution: 0,
      noPrevious: 0,
      institution: {},
      moreInstitution: [],
      previousEmployment: {},
      morePrevious: [],
      objectReference: '',
      reasonForLeaving: '',
      moreInfo: ''
    }
  }

  handleChange = (e) => {
    const { institution } = this.state;
    institution[e.target.name] = e.target.value;
    this.setState({ institution });
  }

  handleMoreInfo = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handlePrevious = (e) => {
    const { previousEmployment } = this.state;
    previousEmployment[e.target.name] = e.target.value;
    this.setState({ previousEmployment });
  }

  handleBackButton = () => {
    console.log(this.props.location.savedState)
    // return this.props.history.push(this.props.history.goBack())
    // return this.props.history.push(this.props.location.backurl)
    return this.props.history.push({
      pathname: `${this.props.location.backurl}`,
      savedState: this.props.location.savedState
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // (!this.state.moreInstitution.length) ? console.log(this.state.institution) : console.log([...this.state.moreInstitution, this.state.institution]);
    try{
      const { id } = this.props.match.params;
      const data = {
        institution: (!this.state.moreInstitution.length) ? this.state.institution : [...this.state.moreInstitution, this.state.institution],
        previousEmployment: (!this.state.morePrevious.length) ? this.state.previousEmployment : [...this.state.morePrevious, this.state.previousEmployment],
        objectReference: this.state.objectReference,
        reasonForLeaving: this.state.reasonForLeaving,
        moreInfo: this.state.moreInfo
      };

      console.log(data);

      const res = await httpPost(`auth/onboarding_two/${id}`, data);
      if(res.code === 201){
        // setState({ userId: res.data.id });
        return this.props.history.push(`/create_staff/three/${res.data.id}`)
      }
      console.log(res)
    } catch (error){
      console.log(error)
    }
    
  }

  addMore = () => {
    this.setState({ 
      noInstitution: this.state.noInstitution + 1,
      moreInstitution: [...this.state.moreInstitution, this.state.institution], 
    });
    this.showQualificationCard()
    this.setState({ institution: {} });
  }

  removeMore = () => {
    this.setState({
      noInstitution: this.state.noInstitution - 1,
    });
    this.showQualificationCard()
  }

  showQualificationCard = () => {
    return Array.from(Array(this.state.noInstitution), (e, i) => {
      return (
        <div className="col col-md-6" key={i}>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">Institution Name</label>
            <div className="col-md-7">
              <input type="text" 
                className="form-control"
                name="name"
                onChange={this.handleChange} 
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">Qualification/Certification</label>
            <div className="col-md-7">
              <input type="text" 
                className="form-control"
                name="qualification"
                onChange={this.handleChange}  
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">Course Studied</label>
            <div className="col-md-7">
              <input type="text" 
                className="form-control"
                name="course"
                onChange={this.handleChange} 
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">Start Date</label>
            <div className="col-md-7">
              <input type="date" 
                className="form-control"
                name="startDate"
                onChange={this.handleChange} 
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">End Date</label>
            <div className="col-md-7">
              <input type="date" 
                className="form-control"
                name="endDate"
                onChange={this.handleChange} 
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label"></label>
            <div className="col-md-4">
              <a className="add-more" onClick={this.addMore}>+Add More</a>
            </div>
            <div className="col-md-3 text-right">
              <a className="add-more text-danger" onClick={this.removeMore}>close</a>
            </div>
          </div>

        </div>
      )
    })
  }

  addMorePrevious = () => {
    this.setState({ 
      noPrevious: this.state.noPrevious + 1,
      morePrevious: [...this.state.morePrevious, this.state.previousEmployment], 
    });
    this.showPreviousCard();
    this.setState({ previousEmployment: {} });
  }

  removeMorePrevious = () => {
    this.setState({
      noPrevious: this.state.noPrevious - 1,
    });
    this.showPreviousCard()
  }

  showPreviousCard = () => {
    return Array.from(Array(this.state.noPrevious), (e, i) => {
      return (
        <div className="col col-md-6" key={i}>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">Employer Name</label>
            <div className="col-md-7">
              <input type="text" 
                className="form-control"
                name="employerName"
                onChange={this.handlePrevious}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">Employer Address</label>
            <div className="col-md-7">
              <input type="text" 
                className="form-control"
                name="address"
                onChange={this.handlePrevious} 
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">Role</label>
            <div className="col-md-7">
              <input type="text" 
                className="form-control"
                name="role"
                onChange={this.handlePrevious}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">Start Date</label>
            <div className="col-md-7">
              <input type="date" 
                className="form-control"
                name="startDate"
                onChange={this.handlePrevious}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label">End Date</label>
            <div className="col-md-7">
              <input type="date"
                className="form-control"
                name="endDate"
                onChange={this.handlePrevious}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputName" className="col-md-5 col-form-label"></label>
            <div className="col-md-4">
              <a className="add-more" onClick={this.addMorePrevious}>+Add More</a>
            </div>
            <div className="col-md-3 text-right">
              <a className="add-more text-danger" onClick={this.removeMorePrevious}>close</a>
            </div>
          </div>

        </div>
      )
    })
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
                    <div className="row">
                    <h4 className="col col-md-6">Qualification and Experience</h4>
                    <div className="col col-md-6 text-right">
                      <h4 className="cursor-pointer" onClick={this.handleBackButton}>Back</h4>
                    </div>
                    </div>
									</div>
									<div className="card-body">

                    <form className="form-horizontal" >
                      <h6 className="mb-4">Institution attended with date</h6>
                      <div className="row">
                      <div className="col col-md-6">
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">Institution Name</label>
                          <div className="col-md-7">
                            <input type="text" 
                              className="form-control"
                              name="name"
                              onChange={this.handleChange} 
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">Qualification/Certification</label>
                          <div className="col-md-7">
                            <input type="text" 
                              className="form-control"
                              name="qualification"
                              onChange={this.handleChange}  
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">Course Studied</label>
                          <div className="col-md-7">
                            <input type="text" 
                              className="form-control"
                              name="course"
                              onChange={this.handleChange} 
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">Start Date</label>
                          <div className="col-md-7">
                            <input type="date" 
                              className="form-control"
                              name="startDate"
                              onChange={this.handleChange} 
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">End Date</label>
                          <div className="col-md-7">
                            <input type="date" 
                              className="form-control"
                              name="endDate"
                              onChange={this.handleChange} 
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label"></label>
                          <div className="col-md-7">
                            <a className="add-more" onClick={this.addMore}>+Add More</a>
                          </div>
                        </div>

                      </div>
                        
                        {
                          this.showQualificationCard()
                        }

                      </div>

                      <h6 className="mb-4">Place of previous employment with date</h6>
                      <div className="row">
                      <div className="col col-md-6">
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">Employer Name</label>
                          <div className="col-md-7">
                            <input type="text" 
                              className="form-control"
                              name="employerName"
                              onChange={this.handlePrevious}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">Employer Address</label>
                          <div className="col-md-7">
                            <input type="text" 
                              className="form-control"
                              name="address"
                              onChange={this.handlePrevious} 
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">Role</label>
                          <div className="col-md-7">
                            <input type="text" 
                              className="form-control"
                              name="role"
                              onChange={this.handlePrevious}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">Start Date</label>
                          <div className="col-md-7">
                            <input type="date" 
                              className="form-control"
                              name="startDate"
                              onChange={this.handlePrevious}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">End Date</label>
                          <div className="col-md-7">
                            <input type="date"
                              className="form-control"
                              name="endDate"
                              onChange={this.handlePrevious}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label"></label>
                          <div className="col-md-7">
                            <a className="add-more" onClick={this.addMorePrevious}>+Add More</a>
                          </div>
                        </div>

                      </div>
                        
                        {
                          this.showPreviousCard()
                        }

                      </div>

                      <div className="row">
                      <div className="col col-md-10">
                      <div className="form-group row">
                        <label for="inputName" className="col-md-7 pr-0 col-form-label">Do you object to us seeking any reference from any of your previous employer</label>
												<div className="col-md-4 pt-2">
                          <label>
                            <input type="radio" 
                              name="objectReference"
                              className="minimal"
                              onChange={this.handleMoreInfo}
                              value="Yes" 
                            />
                            Yes
													</label>
													<label style={{ paddingLeft: '25px'}}>
                            <input type="radio" 
                              name="objectReference"
                              className="minimal"
                              onChange={this.handleMoreInfo}
                              value='No' 
                            />
														No
													</label>
												</div>
                      </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">Reason for leaving your last employment</label>
                          <div className="col-md-7">
    											<select className="form-control w-100" 
														name="reasonForLeaving"
														onChange={this.handleMoreInfo}
													>
														<option value="">select</option>
														<option value="select">select</option>
														<option value="select">select</option>
														<option value="select">select</option>
													</select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="inputName" className="col-md-5 col-form-label">More information on the above reason</label>
                          <div className="col-md-7">
                            <input type="text" 
                              className="form-control"
                              name="moreInfo"
                              onChange={this.handleMoreInfo} 
                            />
                          </div>
                        </div>

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
													<button type="submit" className="btn btn-primary">SAVE</button>
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

export default Qualification;

import React, { Component } from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import Layout from '../layout'
import { httpGet, httpPatch } from '../../actions/data.action';
import { showLoader, hideLoader } from '../../helpers/loader';

export default class ViewDetails extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
      educationHistory: null,
      employmentHistory: null,
      institution: [],
      guarantorInfo: []
    }
  }

  async componentDidMount() {
    await this.getDetails();
  }

  getDetails = async () => {
    try{
      const { id } = this.props.match.params;

      const res = await httpGet(`auth/staff_details/${id}`)

      if(res.code === 200){
        hideLoader();
        this.setState({
          user: res.data.user,
          educationHistory: res.data.educationHistory,
          employmentHistory: res.data.employmentHistory,
          guarantorInfo: res.data.guarantorInfo,
          institution: [...res.data.educationHistory, ...res.data.employmentHistory]
        });
      }

    }catch(error){
      hideLoader();
      console.log(error);
    }
  }

  handleStatus = async (e, value) => {
    try{
      showLoader()
      const { id } = this.props.match.params;

      const data = {
        status: value
      }

      const res = await httpPatch(`auth/staff_application_status/${id}`, data);

      if(res.code === 200){
        hideLoader();
        this.getDetails();
      }
    }catch(error){
      hideLoader();
      console.log(error)
    }
  }

  render() {
    console.log(this.state)
    const { user, employmentHistory, educationHistory, guarantorInfo } = this.state;
    const newEducationHistory = educationHistory !== null ? educationHistory : [];
    const newEmploymentHistory = employmentHistory !== null ? employmentHistory : [];

    return (
      <Layout>
        <div className="app-content">
          <section className="section">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
              <li className="breadcrumb-item"><a href="#" className="text-muted">Staff</a></li>
              <li className="breadcrumb-item active text-" aria-current="page">View Staff</li>
            </ol>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row col-12">
                      <h4 className="col col-md-6"></h4>
                      <div className="col col-md-6 text-right">
                        <h4 className="">APPLICATION STATUS: <span className="text-warning">{user.applicationStatus === 'pending' ? 'Pending' : user.applicationStatus === 'approved' ? 'Approved' : 'Rejected'}</span></h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <h4>PERSONAL INFORMATION</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <p>Full Name: {user.firstName + ' ' + user.middleName + ' ' + user.lastName}</p>
                          <p>Birth Date: {<Moment format='MMM D,  YYYY'>{user.dob}</Moment>}</p>
                          <p>Marital Status: {user.maritalStatus || ''}</p>
                          <p>Address: {user.currentAddress}</p>
                          <p>Email Address: {user.email || ''}</p>
                        </div>
                        <div className="col-md-6">
                          <p>State of origin: {user.stateOfOrigin} State</p>
                          <p>Gender: {user.gender || ''}</p>
                          <p>Nationality: {user.nationality || ''}</p>
                          <p>Phone No: <span>{user.mobilePhone}</span > <span style={!user.homePhone ? {display: 'none'} : {}}>, {user.homePhone}</span> </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <h4>QUALIFICATIONS AND EXPERIENCE</h4>
                      <p style={{ fontWeight: 'bold' }}>Institution attended with Dates</p>
                        {/* <div className="row">
                        {
                          newEducationHistory.length ? newEducationHistory.map(data => (
                              <div className="col-md-6">
                                <p>Institution: {data.name}</p>
                                <p>Qualification: {data.qualification}</p>
                                <p>Date: March 2006 - April 2011</p>
                                <a className="add-more">View More</a>
                              </div>
                          )) : ''


                        }
                        </div> */}

                        <div class="table-responsive">
                          <table id="example1" class="col col-md-8 table table-striped table-bordered border-t0 text-nowrap w-100" >
                            <thead>
                              <tr>
                                {/* <th className="wd-15p">S/N</th> */}
                                <th class="wd-15p">Name</th>
                                <th class="wd-15p">Qualification/Certification</th>
                                <th className="wd-15p">Date</th>
                              </tr>
                            </thead>
                            <tbody>                                {
                                newEducationHistory.length ? newEducationHistory.map((data, index) => (
                                  <tr key={index}>
                                    {/* <td>{index + 1}</td> */}
                                    <td>{data.name}</td>
                                    <td>{data.qualification || data.certification}</td>
                                    <td>{<Moment format='MMM, YYYY'>{data.startDate}</Moment>} - {<Moment format='MMM, YYYY'>{data.endDate}</Moment>}</td>
                                  </tr>
                                )) : ''
                              }
                            </tbody>
                          </table>
                        </div>

                      <p style={{ fontWeight: 'bold' }}>Previous place of employment with date</p>
                      {/* <div className="row">
                        <div className="col-md-6">
                          <p>Company Name: Cocacola Company</p>
                          <p>Role: Software Developer</p>
                          <p>Address: Ogba</p>
                          <p>Date: March 2006 - April 2011</p>
                          <a className="add-more">View More</a>
                        </div>
                      </div> */}
                        <div class="table-responsive">
                          <table id="example1" class="col col-md-8 table table-striped table-bordered border-t0 text-nowrap w-100" >
                            <thead>
                              <tr>
                                {/* <th className="wd-15p">S/N</th> */}
                                <th class="wd-15p">Employer Name</th>
                                <th class="wd-15p">Role</th>
                                <th className="wd-15p">Address</th>
                                <th className="wd-15p">Date</th>
                              </tr>
                            </thead>
                            <tbody>                                {
                                newEmploymentHistory.length ? newEmploymentHistory.map((data, index) => (
                                  <tr key={index}>
                                    {/* <td>{index + 1}</td> */}
                                    <td>{data.employerName}</td>
                                    <td>{data.role}</td>
                                    <td>{data.address}</td>
                                    <td>{<Moment format='MMM, YYYY'>{data.startDate}</Moment>} - {<Moment format='MMM, YYYY'>{data.endDate}</Moment>}</td>
                                  </tr>
                                )) : ''
                              }
                            </tbody>
                          </table>
                        </div>
                    </div>


                    <h4 className="mt-5">EMPLOYMENT INFORMATION</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <p>Rank at employment: {user.rankAtEmployment}</p>
                          <p>Unit at Employment: {user.unitAtEmployment}</p>
                          <p>Salary Amount: {<NumberFormat value={user.salaryAmount} displayType={'text'} thousandSeparator={true} />}</p>
                          <p>Employee Number: {user.employeeNumber}</p>
                          <p>No of dependants: {user.noOfDependant}</p>
                          <p>Religion: {user.religion}</p>
                        </div>
                        <div className="col-md-6">
                          <p>Date of resumption: {<Moment format='MMM D YYYY' value={user.dateOfResumption} />}</p>
                          <p>Branch at employment: {user.branchAtEmployment}</p>
                          <p>Job title: {user.jobTitle}</p>
                          <p>Skills: {user.skills}</p>
                          <p>Seek Reference: {!user.objectReference ? 'No' : 'YES' }</p>
                          <p>Reason for leaving last employment: {user.reasonForLeaving}</p>
                        </div>
                      </div>
                      {/* <a className="add-more">View More</a> */}


                      <h4 className="mt-5">GUARANTOR  INFORMATION</h4>
                      {/* <div className="row">
                        <div className="col-md-6">
                          <p>Name of Guarantor: Manager</p>
                          <p>Occupation: KP</p>
                          <p>Landed property address: 300,000</p>
                          <p>Phone No: 0234</p>
                          <p>Marital Status: 5</p>
                          <p>Has he been involved in any crime: No</p>
                          <p>Date: March 2006 - April 2011</p>
                        </div>
                        <div className="col-md-6">
                          <p>Relationship: Brother</p>
                          <p>House Address: Uselu</p>
                          <p>Business Address: Area Manager</p>
                          <p>Mobile No: 0802320333</p>
                          <p>How long have you known the employer: 11 years</p>
                          <p>Details: None</p>
                        </div>
                      </div>
                      <a className="add-more">View More</a> */}

                      <div class="table-responsive">
                        <table id="example1" class="col col-md-8 table table-striped table-bordered border-t0 text-nowrap w-100" >
                          <thead>
                            <tr>
                              {/* <th className="wd-15p">S/N</th> */}
                              <th class="wd-15p">Name of Guarantor</th>
                              <th class="wd-15p">Occupation</th>
                              <th className="wd-15p">Relationship</th>
                              <th className="wd-15p">Home No</th>
                              <th className="wd-15p">Mobile No</th>
                              <th className="wd-15p">Marital Status</th>
                              <th className="wd-15p">Involved in any crime</th>
                              <th className="wd-15p">How long have you known the employer</th>
                              <th className="wd-15p">Residential Address</th>
                              <th className="wd-15p">Landed Property Address</th>
                              <th className="wd-15p">Business Address</th>
                              <th className="wd-15p">Details</th>
                            </tr>
                          </thead>
                          <tbody>                                {
                              guarantorInfo.length ? guarantorInfo.map((data, index) => (
                                <tr key={index}>
                                  {/* <td>{index + 1}</td> */}
                                  <td>{data.firstName + ' ' + data.middleName + ' ' + data.lastName}</td>
                                  <td>{data.occupation}</td>
                                  <td>{data.relationship}</td>
                                  <td>{data.homePhone}</td>
                                  <td>{data.mobilePhone}</td>
                                  <td>{data.maritalStatus}</td>
                                  <td>{!data.criminalHistory ? 'No' : 'Yes'}</td>
                                  <td>{<Moment fromNow ago>{data.employeeKnownDate}</Moment>}</td>
                                  <td>{data.residentialAddress}</td>
                                  <td>{data.landedPropertyAddress}</td>
                                  <td>{data.businessAddress}</td>
                                  <td>{data.details}</td>
                                </tr>
                              )) : ''
                            }
                          </tbody>
                        </table>
                      </div>



                      

                      <div class="row mt-3">
                          <div className="col-md-6 mr-5 text-right cursor-pointer" onClick={e => this.handleStatus(e, 'approved')}>
                            <span className="fa fa-check-square-o"></span>APPROVE
                          </div>
                          <div className="cursor-pointer" onClick={e => this.handleStatus(e, 'rejected')}>
                            <span className="fa fa-ban text-danger"></span>
                            DECLINE
                          </div>
													
											</div>


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

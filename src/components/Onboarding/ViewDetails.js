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
      guarantorInfo: [],
      employmentInfo: {}
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
          qualification: res.data.qualification,
          certification: res.data.certification,
          employmentInfo: res.data.employmentInfo,
          employmentHistory: res.data.employmentHistory,
          guarantorInfo: res.data.guarantorInfo,
          institution: [...res.data.qualification, ...res.data.certification]
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
    const { user, institution, employmentInfo, employmentHistory, educationHistory, guarantorInfo } = this.state;
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
              <div className="col-10">
                <div className="card">
                  <div className="card-header">
                    <div className="row col-12">
                      <h4 className="col col-md-6"></h4>
                      <div className="col col-md-6 text-right pr-0">
                        <h4 className="">APPLICATION STATUS: <span className="text-warning">{user.applicationStatus === 'pending' ? 'Pending' : user.applicationStatus === 'approved' ? 'Approved' : 'Rejected'}</span></h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <h4>PERSONAL INFORMATION</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="row">
                            <span className="col-md-4 font-bold">Full Name:</span> <span className="col-md-8">{user.firstName + ' ' + (user.middleName || null) + ' ' + user.lastName}</span>
                          </p>
                          <p className="row">
                            <span className="col-md-4 font-bold">Birth Date:</span> <span className="col-md-8">{<Moment format='MMM D,  YYYY'>{user.dob}</Moment>}</span>
                          </p>
                          <p className="row">
                            <span className="col-md-4 font-bold">Marital Status:</span> <span className="col-md-8">{user.maritalStatus || ''}</span>
                          </p>
                          <p className="row">
                            <span className="col-md-4 font-bold">Address:</span> <span className="col-md-8">{user.currentAddress} 
                            <span style={!user.currentCity && !user.currentLga && !user.currentState && !user.currentCountry  ? {display: 'none'} : {}}>(<span style={!user.currentCity ? {display: 'none'} : {}}>{user.currentCity}, </span><span style={!user.currentLga ? {display: 'none'} : {}}>{user.currentLga}, </span><span style={!user.currentState ? {display: 'none'} : {}}>{user.currentState}, </span><span style={!user.currentCountry ? {display: 'none'} : {}}>{user.currentCountry}</span>)</span></span>
                          </p>
                          <p className="row">
                            <span className="col-md-4 font-bold">Email Address:</span> <span className="col-md-8">{user.email || ''}</span>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="row">
                            <span className="col-md-4 font-bold">State of Origin:</span> <span className="col-md-8"> {user.stateOfOrigin} State</span></p>
                          <p className="row">
                            <span className="col-md-4 font-bold">Gender:</span> <span className="col-md-8"> {user.gender || ''}</span></p>
                          <p className="row">
                            <span className="col-md-4 font-bold">Nationality:</span> <span className="col-md-8"> {user.nationality || ''}</span></p>
                          <p className="row">
                            <span className="col-md-4 font-bold">Phone No:</span> <span className="col-md-8"> <span>{user.mobilePhoneCode + user.mobilePhone}</span > <span style={!user.homePhone ? {display: 'none'} : {}}>, {user.homePhoneCode + user.homePhone}</span> </span></p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <h4>QUALIFICATIONS AND EXPERIENCE</h4>
                      <p style={{ fontWeight: 'bold' }}>Institutions attended with Dates</p>
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
                          <table id="example1" class="col col-md-12 table table-hover table-bordered border-t0 text-nowrap w-100" >
                            <thead>
                              <tr>
                                {/* <th className="wd-15p">S/N</th> */}
                                <th class="wd-15p">Name</th>
                                <th class="wd-15p">Qualification/Certification</th>
                                <th className="wd-15p">Date</th>
                              </tr>
                            </thead>
                            <tbody>                                {
                                institution.length ? institution.map((data, index) => (
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
                        </div>

                      <p style={{ fontWeight: 'bold' }}>Previous places of employment with date</p>
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
                          <table id="example1" class="col col-md-12 table table-hover table-bordered border-t0 text-nowrap w-100" >
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


                    <h4 className="mt-5">EMPLOYMENT INFORMATION</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="row">
                            <span className="col-md-5 font-bold">Rank at employment:</span> <span className="col-md-7">{employmentInfo.rank}</span></p>
                          <p className="row">
                            <span className="col-md-5 font-bold">Unit at Employment:</span> <span className="col-md-7">{employmentInfo.unit !== undefined ? employmentInfo.unit.name : ''}</span></p>
                          <p className="row">
                            <span className="col-md-5 font-bold">Salary Amount:</span> <span className="col-md-7">{<NumberFormat value={employmentInfo.salaryAmount} displayType={'text'} thousandSeparator={true} />}</span></p>
                          <p className="row">
                            <span className="col-md-5 font-bold">Employee Number:</span> <span className="col-md-7">{employmentInfo.employeeNumber || ''}</span></p>
                          <p className="row">
                            <span className="col-md-5 font-bold">No of dependants:</span> <span className="col-md-7">{user.noOfDependant}</span></p>
                          <p className="row">
                            <span className="col-md-5 font-bold">Religion:</span> <span className="col-md-7">{user.religion}</span></p>
                        </div>
                        <div className="col-md-6 pl-0">
                          <p className="row">
                            <span className="col-md-5 font-bold">Date of resumption:</span> <span className="col-md-7">{<Moment format='MMM D YYYY' value={employmentInfo.dateOfResumption} />}</span></p>
                          <p className="row">
                            <span className="col-md-5 font-bold">Branch at employment:</span> <span className="col-md-7">{employmentInfo.branch !== undefined ? employmentInfo.branch.name : ''}</span></p>
                          <p className="row">
                            <span className="col-md-5 font-bold">Job title:</span> <span className="col-md-7">{employmentInfo.role !== undefined ? employmentInfo.role.title : ''}</span>
                          </p>
                          <p className="row">
                            <span className="col-md-5 font-bold">Skills:</span> <span className="col-md-7">{user.skills}</span></p>
                          <p className="row">
                            <span className="col-md-5 font-bold">Seek Reference:</span> <span className="col-md-7">{!user.objectReference ? 'No' : 'YES' }</span></p>
                          <p className="row">
                            <span className="col-md-5 font-bold">Reason for leaving last employment:</span> <span className="col-md-7">{user.reasonForLeaving}</span></p>
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
                        <table id="example1" class="col col-md-8 table table-hover table-bordered border-t0 text-nowrap w-100" >
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
                                  <td>{data.homePhoneCode + data.homePhone}</td>
                                  <td>{data.mobilePhoneCode + data.mobilePhone}</td>
                                  <td>{data.maritalStatus}</td>
                                  <td>{!data.criminalHistory ? 'No' : 'Yes'}</td>
                                  <td>{<Moment fromNow ago>{data.employeeKnownDate}</Moment>}</td>
                                  <td>{data.residentialAddress}
                                    <span style={!data.residentialCity && !data.currentLga && !data.residentialState && !data.residentialCountry  ? {display: 'none'} : {}}>(<span style={!data.residentialCity ? {display: 'none'} : {}}>{data.residentialCity}, </span>
                                    <span style={!data.residentialLga ? {display: 'none'} : {}}>{data.residentialLga}, </span>
                                    <span style={!data.residentialState ? {display: 'none'} : {}}>{data.residentialState},</span>
                                    <span style={!data.residentialCountry ? {display: 'none'} : {}}>{user.residentialCountry}</span>)</span>
                                  </td>
                                  <td>{data.landedPropertyAddress}
                                    <span style={!data.landedPropertyCity && !data.landedPropertyLga && !data.landedPropertyState && !data.landedPropertyCountry  ? {display: 'none'} : {}}>(<span style={!data.landedPropertyCity ? {display: 'none'} : {}}>{data.landedPropertyCity}, </span>
                                    <span style={!data.landedPropertyLga ? {display: 'none'} : {}}>{data.landedPropertyLga},</span>
                                    <span style={!data.landedPropertyState ? {display: 'none'} : {}}> {data.landedPropertyState}</span>
                                    <span style={!data.landedPropertyCountry ? {display: 'none'} : {}}>, {data.landedPropertyCountry}</span>)</span>
                                  </td>
                                  <td>{data.businessAddress}
                                    <span style={!data.businessCity && !data.businessLga && !data.businessState && !data.businessCountry  ? {display: 'none'} : {}}>(<span style={!data.businessCity ? {display: 'none'} : {}}>{data.businessCity}, </span>
                                    <span style={!data.businessLga ? {display: 'none'} : {}}>{data.businessLga}</span>
                                    <span style={!data.businessState ? {display: 'none'} : {}}>, {data.businessState}</span>
                                    <span style={!data.businessCountry ? {display: 'none'} : {}}>, {data.businessCountry}</span>)</span>
                                  </td>
                                  <td>{data.details}</td>
                                </tr>
                              )) : ''
                            }
                          </tbody>
                        </table>
                      </div>



                      

                      <div class="row mt-3 text-right">
													
                          <div class="col-md-12">
                          <button 
                            type="submit"
                            class="btn btn-info mr-5"
														onClick={e => this.handleStatus(e, 'rejected')}
                          ><span className="fa fa-ban"></span> DECLINE</button>
													<button type="submit" class="btn btn-primary" onClick={e => this.handleStatus(e, 'approved')}><span className="fa fa-check-square-o"></span> APPROVE</button>
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

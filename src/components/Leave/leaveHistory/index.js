import React, { Component } from 'react'
import Layout from '../../layout/index'
import LeavehistoryTable from './leavehistoryTable'
 import './Lhistory.css'


export default class LeaveHistory extends Component {
 

    render() {
        return (
            <div>
                <Layout page="leave_history">
                 
                <div class="app-content">
          <section class="section">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#" class="text-muted">Home</a></li>
              <li class="breadcrumb-item"><a href="#" class="text-muted">Performance</a></li>
        <li class="breadcrumb-item active text-" aria-current="page">KPI</li>
            </ol>

            <div className="col-lg-12 col-xl-12 col-md-12 col-12">
									<div className="card">
										<div className="card-body remove-padding">

                                        <div className="row">
                                        <div className="flex-4">
                     

    <div className="flex4-drop">

                                  
<label for="recipient-name" class="form-control-label">Leave Type</label>
<select      class="form-control sel" id="exampleFormControlSelect1">

<option value="">Select</option>
<option value="RegionA">Region A</option>
<option value="RegionB">Region B</option>
<option value="RegionC">Region C</option>
<option value="RegionD">Region D</option>
</select>
</div>

<div className="flex4-drop">

                                  
<label for="recipient-name" class="form-control-label">Department</label>
<select      class="form-control sel" id="exampleFormControlSelect1">

<option value="">Select </option>
<option value="RegionA">Region A</option>
<option value="RegionB">Region B</option>
<option value="RegionC">Region C</option>
<option value="RegionD">Region D</option>
</select>
</div>

<div className="flex4-drop">

                                  
<label for="recipient-name" class="form-control-label">Date Applied</label>
<select      class="form-control sel" id="exampleFormControlSelect1">

<option value="">Select Region</option>
<option value="RegionA">Region A</option>
<option value="RegionB">Region B</option>
<option value="RegionC">Region C</option>
<option value="RegionD">Region D</option>
</select>
</div>

<div className="flex4-drop">

                                  
<label for="recipient-name" class="form-control-label"> Approved</label>
<select      class="form-control sel" id="exampleFormControlSelect1">

<option value="">Select</option>
<option value="RegionA">Region A</option>
<option value="RegionB">Region B</option>
<option value="RegionC">Region C</option>
<option value="RegionD">Region D</option>
</select>
</div>
                                            </div>

                                            </div>
                                            <span className="checkggp"><span className="checkggpt">Status:</span>
                                            
                                            <span className="checkgg">
                                            <label for="vehicle1">Approved</label>
                                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
 
                                                </span>

                                                <span className="checkgg">
                                          <label for="vehicle1">Rejected</label>
                                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
 
                                                </span>

                                                <span className="checkgg">
                                          <label for="vehicle1">Cancelled</label>
                                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
 
                                                </span>
                                                
                                                
                                                </span>

                                        </div>
                                        </div>
                                        </div>
                <div class="section-body">
                <div class="row">
                  
								<div class="col-lg-12">
                                    
									<div class="card">

										<div class="card-body">
                                      
                                       
                                       
									
         <LeavehistoryTable />
     
										

										</div>
									</div>
								</div>
                                </div>
                                </div>

                       
                
                    </section>
                    </div>
                   
				<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModal2" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="example-Modal2">Application Details</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-md-6">
										<p>Staff Name: Okeke Andrew</p>
										<p>Staff Branch: Aguda Branch</p>
										<p>Leave Type: Casual Leave</p>
										<p>Leave Start Date:  14th April 2020</p>
										<p>Leave End Date:  14th April 2020</p>
									</div>
									<div class="col-md-6">
									<p>Staff Position: Manager</p>
										<p>Staff Region: Benin Town</p>
										<p>Number of days for leave: 10 days</p>
										<p>Number of days applied: 6 days</p>
										<p>Number of leave days left: 4 days</p>
										</div>
								</div>
								<div class="row">
									<div class="col-md-12 checkBoxTabP">
									<div className="checkBoxTa">
									<label for="vehicle1">HR Approval</label>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>

                                                </div>

												<div className="checkBoxTa">
									<label for="vehicle1">BM Approval</label>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>

                                                </div>

												<div className="checkBoxTa">
									<label for="vehicle1">AM Approval</label>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>

                                                </div>

												<div className="checkBoxTa">
									<label for="vehicle1">RM Approval</label>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>

                                                </div>
												
												
												</div>
									
								</div>

                                      
								<div class="row">
									<div class="col-md-12 checkBoxTabP">
									<div className="checkBoxTa">
									<label for="vehicle1">HR  Rejection</label>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>

                                                </div>

												<div className="checkBoxTa">
									<label for="vehicle1">BM  Rejection</label>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>

                                                </div>

												<div className="checkBoxTa">
									<label for="vehicle1">AM  Rejection</label>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>

                                                </div>

												<div className="checkBoxTa">
									<label for="vehicle1">RM  Rejection</label>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>

                                                </div>
												
												
												</div>
									
								</div>

								<div class="row">
									<div class="col-md-12 reason">
										<h1>REASON</h1>
                                           <p>
										   rovide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles
										   </p>
										</div>
										</div>
                                  
										<div class="row">
									<div class="col-md-12 leavepay">
									<label for="vehicle1">PAID LEAVE</label>
                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>

										</div>
										</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
							
							</div>
						</div>
					</div>
				</div>
                    </Layout> 
                    
            </div>
        )
    }
}

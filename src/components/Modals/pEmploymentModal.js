import React from 'react';
import DatePicker from "react-datepicker";

export const PreviousEmploymentModal = (props) => {
  return (
    <div>
      <div class="modal fade" id="employmentModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="example-Modal3">CREATE NEW WORK EXPERIENCE</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
                <div className="col col-md-12">
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Employer Name</label>
                    <div className="col-md-7">
                      <input type="text" 
                        className="form-control"
                        name="employerName"
                        onChange={props.handlePrevious}
                        value={props.previousEmployment.employerName}
                        placeholder="eg Union Bank"
                      />
                      <span className="text-danger">{props.endDateErrorMssg4 !== null ? props.endDateErrorMssg4 : ''}</span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Employer Address</label>
                    <div className="col-md-7">
                      <input type="text" 
                        className="form-control"
                        name="address"
                        onChange={props.handlePrevious}
                        value={props.previousEmployment.address}
                        placeholder="eg Ikeja, Lagos" 
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Role</label>
                    <div className="col-md-7">
                      <input type="text" 
                        className="form-control"
                        name="role"
                        onChange={props.handlePrevious}
                        value={props.previousEmployment.role}
                        placeholder="eg Software Engineer"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Start Date</label>
                    <div className="col-md-7">
                      {/* <input type="date" 
                        className="form-control"
                        name="startDate"
                        onChange={props.handlePrevious}
                        value={props.previousEmployment.startDate}
                      /> */}
                      <DatePicker
                        className="form-control"
                        selected={props.previousEmployment.startDate}
                        onChange={(e) => props.handlePrevious(e, 'startDate')}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Click to select a date"
                      />
                      <span className="text-danger">{props.endDateErrorMssg7 !== null ? props.endDateErrorMssg7 : ''}</span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">End Date</label>
                    <div className="col-md-7">
                      {/* <input type="date"
                        className="form-control"
                        name="endDate"
                        onChange={props.handlePrevious}
                        value={props.previousEmployment.endDate}
                      /> */}
                      <DatePicker
                        className="form-control"
                        selected={props.previousEmployment.endDate}
                        onChange={(e) => props.handlePrevious(e, 'endDate')}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Click to select a date"
                      />
                      <span className="text-danger">{props.endDateErrorMssg3 !== null ? props.endDateErrorMssg3 : ''}</span>
                    </div>
                  </div>

                </div> 
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
								<button  type="button" class="btn btn-primary" onClick={props.addMorePrevious}>Add</button>
							</div>
						</div>
					</div>
				</div>

    </div>
  )
}
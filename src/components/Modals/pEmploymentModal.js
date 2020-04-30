import React from 'react';
import DatePicker from "react-datepicker";

export const PreviousEmploymentModal = (props) => {
  return (
    <div>
      <div class="modal fade" id="employmentModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style={{ overflowY: 'scroll'}}>
					<div class="modal-dialog modal-md" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="example-Modal3">{props.modalMode === 'create' ? 'ADD NEW WORK EXPERIENCE' : 'EDIT WORK EXPERIENCE'}</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}>
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
                        placeholder="Eg. Union Bank"
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
                        placeholder="Eg. Ikeja, Lagos" 
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
                        placeholder="Eg. Software Engineer"
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
                        // selected={props.previousEmployment.startDate}
                        selected={props.date5}
                        onChange={(e) => props.handlePrevious(e, 'startDate')}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Click to select a date"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                      <br/>
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
                        // selected={props.previousEmployment.endDate}
                        selected={props.date6}
                        onChange={(e) => props.handlePrevious(e, 'endDate')}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Click to select a date"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                      <br/>
                      <span className="text-danger">{props.endDateErrorMssg3 !== null ? props.endDateErrorMssg3 : ''}</span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Upload</label>
                    <div className="col-md-7">
                      <input type="file" 
                        className="form-control" 
                        name="path"
                        onChange={e => props.handleUpload(e, 'previousEmployment')}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 pr-0 col-form-label">Do you object to us seeking any reference from any of your past employer</label>
                    <div className="col-md-7 pt-2">
                      <label>
                        <input type="radio" 
                          name="objectReference"
                          className="minimal mr-2"
                          onChange={props.handlePrevious}
                          value="Yes" 
                          checked={props.previousEmployment.objectReference === 'Yes' ? true : ''}
                        />
                        Yes
                      </label>
                      <label style={{ paddingLeft: '25px'}}>
                        <input type="radio" 
                          name="objectReference"
                          className="minimal mr-2"
                          onChange={props.handlePrevious}
                          value='No'
                          checked={props.previousEmployment.objectReference === 'No' ? true : ''} 
                        />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="form-group row" style={props.previousEmployment.objectReference === 'Yes' ? {display: 'none'} : {}}>
                    <label for="inputName" className="col-md-5 col-form-label">Employer Email</label>
                    <div className="col-md-7">
                      <input type="text" 
                        className="form-control"
                        name="email"
                        onChange={props.handlePrevious}
                        value={props.previousEmployment.email}
                        placeholder="Eg. Ikeja, Lagos" 
                      />
                    </div>
                  </div>
                  <div className="form-group row" style={props.previousEmployment.objectReference === 'Yes' ? {display: 'none'} : {}}>
                    <label for="inputName" className="col-md-5 col-form-label">Employer Phone Number</label>
                    <div className="col-md-7">
                      <input type="text" 
                        className="form-control"
                        name="phoneNumber"
                        onChange={props.handlePrevious}
                        value={props.previousEmployment.phoneNumber}
                        placeholder="Eg. Ikeja, Lagos" 
                      />
                    </div>
                  </div>

                </div> 
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal" onClick={props.closeModal}>Close</button>
                <button  
                  type="button" 
                  class="btn btn-primary" 
                  onClick={props.addMorePrevious}
                >{props.modalMode === 'create' ? 'ADD' : 'UPDATE'}</button>
							</div>
						</div>
					</div>
				</div>

    </div>
  )
}
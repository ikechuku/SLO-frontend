import React from 'react'

export default function EmploymentForm(props) {
  return (
    <div className="col col-md-6">
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label">Employer Name</label>
        <div className="col-md-7">
          <input type="text" 
            className="form-control"
            name="employerName"
            onChange={props.handlePrevious}
            value={props.previousEmployment.employerName}
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
          />
        </div>
      </div>
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label">Start Date</label>
        <div className="col-md-7">
          <input type="date" 
            className="form-control"
            name="startDate"
            onChange={props.handlePrevious}
            value={props.previousEmployment.startDate}
          />
          <span className="text-danger">{props.endDateErrorMssg7 !== null ? props.endDateErrorMssg7 : ''}</span>
        </div>
      </div>
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label">End Date</label>
        <div className="col-md-7">
          <input type="date"
            className="form-control"
            name="endDate"
            onChange={props.handlePrevious}
            value={props.previousEmployment.endDate}
          />
          <span className="text-danger">{props.endDateErrorMssg3 !== null ? props.endDateErrorMssg3 : ''}</span>
        </div>
      </div>
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label"></label>
        <div className="col-md-7">
          <a className="add-more" onClick={props.addMorePrevious}>+Add More</a>
        </div>
      </div>

    </div>
  )
}

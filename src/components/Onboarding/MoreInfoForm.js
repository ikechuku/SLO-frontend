import React from 'react'

export default function MoreInfoForm(props) {
  return (
    <div className="col-md-12 pl-0">
      <div className="form-group row">
        <label for="inputName" className="col-md-5 pr-0 col-form-label">Do you object to us seeking any reference from any of your past employer</label>
        <div className="col-md-7 pt-2">
          <label>
            <input type="radio" 
              name="objectReference"
              className="minimal mr-2"
              onChange={props.handleMoreInfo}
              value="Yes" 
              checked={props.objectReference === 'Yes' ? true : ''}
            />
            Yes
          </label>
          <label style={{ paddingLeft: '25px'}}>
            <input type="radio" 
              name="objectReference"
              className="minimal mr-2"
              onChange={props.handleMoreInfo}
              value='No'
              checked={props.objectReference === 'No' ? true : ''} 
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
          onChange={props.handleMoreInfo}
          value={props.reasonForLeaving}
        >
          <option value="" disabled>Select Reason</option>
          <option value="Relocation">Relocation</option>
          <option value="Sacked">Sacked</option>
          <option value="Change in carrer path">Change in carrer path</option>
          <option value="Redundancy">Redundancy</option>
          <option value="Company downsizing">Company downsizing</option>
          <option value="Company shutdown">Company shutdown</option>
        </select>
        </div>
      </div>
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label">More information on the above reason</label>
        <div className="col-md-7">
          <input type="text" 
            className="form-control"
            name="moreInfo"
            onChange={props.handleMoreInfo}
            value={props.moreInfo} 
          />
        </div>
      </div>

    </div>
  )
}

import React from 'react'
import CustomSelect from '../../helpers/Select2';

export default function InstitutionForm(props) {
  console.log(props)
  return (
    <>
    <div className="col col-md-6">
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label">Institution Name</label>
        <div className="col-md-7">
          <input type="text" 
            className="form-control"
            name="name"
            onChange={props.handleQualification}
            value={props.qualification.name} 
          />
        </div>
      </div>
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label">Qualification</label>
        <div className="col-md-7">
          <select type="text" 
            className="form-control"
            name="qualification"
            onChange={props.handleQualification}
            value={props.qualification.qualification}  
          >
            <option value="">select</option>
            <option value="SSCE">SSCE(This covers WAEC,NECO,GCE)</option>
            <option value="OND">OND</option>
            <option value="NCE">NCE</option>
            <option value="HND">HND</option>
            <option value="PGD">PGD</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate Degree">Doctorate Degree</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label">Course Studied</label>
        <div className="col-md-7">
          <input type="text" 
            className="form-control"
            name="course"
            onChange={props.handleQualification}
            value={props.qualification.course} 
          />
        </div>
      </div>
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label">Start Date</label>
        <div className="col-md-7">
          <input type="date" 
            className="form-control"
            name="startDate"
            onChange={props.handleQualification}
            value={props.qualification.startDate} 
          />
        </div>
      </div>
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label">End Date</label>
        <div className="col-md-7">
          <input type="date" 
            className="form-control"
            name="endDate"
            onChange={props.handleQualification}
            defaultValue={props.qualification.endDate} 
          />
          <span className="text-danger">{props.endDateErrorMssg !== null ? props.endDateErrorMssg : ''}</span>
        </div>
      </div>
      <div className="form-group row">
        <label for="inputName" className="col-md-5 col-form-label"></label>
        <div className="col-md-7">
          <a className="add-more" onClick={() => props.addMore('qualification')}>+Add</a>
        </div>
      </div>

    </div>

    <div className="col col-md-6">
    <div className="form-group row">
      <label for="inputName" className="col-md-5 col-form-label">Institution Name</label>
      <div className="col-md-7">
        <input type="text" 
          className="form-control"
          name="name"
          onChange={props.handleCertification}
          value={props.certification.name} 
        />
      </div>
    </div>
    <div className="form-group row">
      <label for="inputName" className="col-md-5 col-form-label">Certification</label>
      <div className="col-md-7">
        <CustomSelect 
          optionList={[
            { value: 'Google Certification', text: 'Google Certification', id: 1 },
            { value: 'HND', text: 'HND', id: 2 },
            { value: 'OND', text: 'OND' , id: 3 },
          ]}
          handleChange={props.handleCertification}
          name={'certification'}
          value={props.certification.certification}
          placeHolder='Select'
        />

        {/* <input type="text" 
          className="form-control"
          name="certification"
          onChange={props.handleCertification}
          value={props.certification.certification}
          onClick={props.handleShowDropDown}
          tabIndex="0"  
        />
        <div className="dropdown-div" style={!props.showDropDown ? {display: 'none'} : {}}>
          <p className="dropdown-btn" onClick={() => props.handleDropDown('Google Cert')}>Google Cert</p>
          <p className="dropdown-btn" onClick={() => props.handleDropDown('HND')}>HND</p>
          <p className="dropdown-btn" onClick={() => props.handleDropDown('OND')}>OND</p>
          <p className="dropdown-btn" onClick={() => props.handleDropDown('CCNA Cert')}>CCNA Cert</p>
        </div> */}
      </div>
    </div>
    <div className="form-group row">
      <label for="inputName" className="col-md-5 col-form-label">Start Date</label>
      <div className="col-md-7">
        <input type="date" 
          className="form-control"
          name="startDate"
          onChange={props.handleCertification}
          value={props.certification.startDate} 
        />
      </div>
    </div>
    <div className="form-group row">
      <label for="inputName" className="col-md-5 col-form-label">End Date</label>
      <div className="col-md-7">
        <input type="date" 
          className="form-control"
          name="endDate"
          onChange={props.handleCertification}
          value={props.certification.endDate}
        />
        <span className="text-danger">{props.endDateErrorMssg2 !== null ? props.endDateErrorMssg2 : ''}</span>
      </div>
    </div>
    <div className="form-group row">
      <label for="inputName" className="col-md-5 col-form-label"></label>
      <div className="col-md-7">
        <a className="add-more" onClick={() => props.addMore('certification')}>+Add</a>
      </div>
    </div>

    </div>
      
      {/* // {
      //   // this.showQualificationCard()
      // } */}

    </>
  )
}

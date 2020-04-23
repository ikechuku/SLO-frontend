import React from 'react';
import DatePicker from "react-datepicker";
import CustomSelect from '../../helpers/Select2';
import CreatableSelect from 'react-select/creatable';
import moment from 'moment';

export const QualificationModal = (props) => {
  return (
    <div>
      <div class="modal fade" id="qualificationModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="example-Modal3">{props.modalMode === 'create' ? 'ADD NEW QUALIFICATION' : 'EDIT QUALIFICATION'}</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
                <div className="col col-md-12">
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Institution Name</label>
                    <div className="col-md-7">
                      <input type="text"
                        placeholder="University of Ibadan" 
                        className="form-control"
                        name="name"
                        onChange={e => props.handleQualification(e)}
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
                        <option value="" disabled selected>Select</option>
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
                        placeholder="Computer Enginering" 
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
                      {/* <input type="date" 
                        className="form-control"
                        name="startDate"
                        onChange={props.handleQualification}
                        value={props.qualification.startDate} 
                      /> */}
                      <DatePicker
                        className="form-control"
                        selected={props.date1}
                        onChange={(e) => props.handleQualification(e, 'startDate')}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Click to select a date"
                      />
                      <br/>
                      <span className="text-danger">{props.endDateErrorMssg5 !== null ? props.endDateErrorMssg5 : ''}</span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">End Date</label>
                    <div className="col-md-7">
                      {/* <input type="date" 
                        className="form-control"
                        name="endDate"
                        onChange={props.handleQualification}
                        value={props.qualification.endDate} 
                      /> */}
                      <DatePicker
                        className="form-control"
                        selected={props.date2}
                        onChange={(e) => props.handleQualification(e, 'endDate')}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Click to select a date"
                      />
                      <br/>
                      <span className="text-danger">{props.endDateErrorMssg !== null ? props.endDateErrorMssg : ''}</span>
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
                  onClick={() => props.addMore('qualification')}
                >{props.modalMode === 'create' ? 'ADD' : 'UPDATE'}</button>
							</div>
						</div>
					</div>
				</div>

    </div>
  )
};

// const testDate = moment('Tue Apr 21 2020 20:58:08 GMT+0100 (West Africa Standard Time)').toDate()
// const getCorrectDate = (date) => {
//   const isDate = date === undefined ? '' : date
//   console.log(date, isDate)
//   const testDate = moment(date).toDate();
//   return date === undefined ? undefined : testDate;
// }
// console.log(testDate)
export const CertificationModal = (props) => {
  
  console.log(props.certification.endDate)
  return (
    <div>
      <div class="modal fade" id="certificationModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="example-Modal3">{props.modalMode === 'create' ? 'ADD NEW CERTIFICATION' : 'EDIT CERTIFICATION'}</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
                <div className="col col-md-12">
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Institution Name</label>
                    <div className="col-md-7">
                      <input type="text"
                        placeholder="World Certification Institution" 
                        className="form-control"
                        name="name"
                        onChange={props.handleCertification}
                        value={props.certification.name} 
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Certification Name</label>
                    <div className="col-md-7">
                      <input type="text"
                        placeholder="CCNA" 
                        className="form-control"
                        name="certification"
                        onChange={props.handleCertification}
                        value={props.certification.certification} 
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Category of certification</label>
                    <div className="col-md-7">
                      {/* <CustomSelect 
                        optionList={[
                          { value: 'Google Certification', text: 'Google Certification', id: 1 },
                          { value: 'HND', text: 'HND', id: 2 },
                          { value: 'OND', text: 'OND' , id: 3 },
                        ]}
                        handleChange={props.handleCertification}
                        name={'categoryOfCertification'}
                        value={props.certification.categoryOfCertification}
                        placeHolder='Select'
                      /> */}
                      <CreatableSelect
                        // className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                        // defaultValue={props.certification.categoryOfCertification !== '' ? props.certification.categoryOfCertification : null}
                        // value={props.certification.categoryOfCertification}
                        value={props.customSelectDefault1}
                        onChange={e => props.handleCustomSelect(e, 'categoryOfCertification')}
                        options={[
                          { value: 'Google Certification', label: 'Google Certification' },
                          { value: 'HND', label: 'HND' },
                          { value: 'OND', label: 'OND' },
                        ]}
                        isSearchable="true"
                        name="categoryOfCertification"
                        />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">Start Date</label>
                    <div className="col-md-7 c-date-picker">
                      {/* <input type="date" 
                        className="form-control"
                        name="startDate"
                        onChange={props.handleCertification}
                        value={props.certification.startDate} 
                      /> */}
                      <DatePicker
                        className="form-control"
                        selected={props.date3}
                        // selected={getCorrectDate(props.certification.startDate)}
                        // selected={moment("2019-02-07").toDate()}
                        onChange={(e) => props.handleCertification(e, 'startDate')}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Click to select a date"
                      />
                      <span className="text-danger">{props.endDateErrorMssg6 !== null ? props.endDateErrorMssg6 : ''}</span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputName" className="col-md-5 col-form-label">End Date</label>
                    <div className="col-md-7 c-date-picker">
                      {/* <input type="date" 
                        className="form-control"
                        name="endDate"
                        onChange={props.handleCertification}
                        value={props.certification.endDate}
                      /> */}
                     <DatePicker
                        className="form-control"
                        selected={props.date4}
                        onChange={(e) => props.handleCertification(e, 'endDate')}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Click to select a date"
                      />
                      <span className="text-danger">{props.endDateErrorMssg2 !== null ? props.endDateErrorMssg2 : ''}</span>
                    </div>
                  </div>

                  </div>
 
								</form>
							</div>
							<div class="modal-footer">
                <button 
                  type="button" 
                  class="btn btn-danger" 
                  data-dismiss="modal"
                  onClick={props.closeModal}
                >Close</button>
                <button  
                  type="button" 
                  class="btn btn-primary" 
                  onClick={() => props.addMore('certification')}
                >{props.modalMode === 'create' ? 'ADD' : 'UPDATE'}</button>
							</div>
						</div>
					</div>
				</div>

    </div>
  )
}

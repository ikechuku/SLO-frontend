import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import CustomSelect from '../../helpers/Select2';
import CreatableSelect from 'react-select/creatable';
import moment from 'moment';

const date_format = 'DD/MM/YYYY';

export class QualificationModal extends Component {
  constructor(props){
    super(props)
  }

  handleDelete = (id, type) => {
    this.props.deleteDoc(id, type)
    this.refs.filepath.value = '';
  }

  handleAdd = () => {
    this.props.addMoreQualification();
    this.refs.filepath.value = '';
  }

  handleClose = () => {
    this.props.closeModal();
    this.refs.filepath.value = '';
  }

  render(){
    const CustomInput = ({ value, onClick }) => (
      <input readonly className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')"
        value={this.props.date1 === undefined ? undefined : moment(this.props.date1).format(date_format)} onClick={onClick} onKeyPress={e => e.preventDefault()}
      />
    );

    const CustomInput2 = ({ value, onClick }) => (
      <input readonly className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')" onKeyPress={e => e.preventDefault()}
      value={this.props.date2 === undefined ? undefined : moment(this.props.date2).format(date_format)} onClick={onClick}
      />
    );

    const filePath = this.props.qualification.upload !== undefined ? this.props.qualification.upload : '';

    return (
      <div>
        <div class="modal fade" id="qualificationModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="example-Modal3">{this.props.modalMode === 'create' ? 'ADD NEW QUALIFICATION' : 'EDIT QUALIFICATION'}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                  <div className="col col-md-12">
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Institution Name <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="text"
                          placeholder="Eg. University of Ibadan" 
                          className="form-control"
                          name="name"
                          onChange={e => this.props.handleQualification(e)}
                          value={this.props.qualification.name} 
                        />
                        { console.log(this.props.qualificationErrors)}
                        <span style={{ fontSize: '10px', color: 'black' }}>*should be written in full</span><br/>
                        <span className="text-danger">{this.props.qualificationErrors.name !== '' ? this.props.qualificationErrors.name : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Qualification <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <select type="text" 
                          className="form-control"
                          name="qualification"
                          onChange={this.props.handleQualification}
                          value={this.props.qualification.qualification}  
                        >
                          <option value="" disabled selected>Select</option>
                          <option value="SSCE">SSCE</option>
                          <option value="OND">OND</option>
                          <option value="NCE">NCE</option>
                          <option value="HND">HND</option>
                          <option value="PGD">PGD</option>
                          <option value="Bachelor's Degree">Bachelor's Degree</option>
                          <option value="Master's Degree">Master's Degree</option>
                          <option value="Doctorate Degree">Doctorate Degree</option>
                        </select>
                        <span className="text-danger">{this.props.qualificationErrors.qualification !== '' ? this.props.qualificationErrors.qualification : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Course Studied <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="text"
                          placeholder="Eg. Computer Enginering" 
                          className="form-control"
                          name="course"
                          onChange={this.props.handleQualification}
                          value={this.props.qualification.course} 
                        />
                        <span style={{ fontSize: '10px', color: 'black'}}>*should be written in full</span><br/>
                        <span className="text-danger">{this.props.qualificationErrors.course !== '' ? this.props.qualificationErrors.course : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Start Date <span className="impt">*</span></label>
                      <div className="col-md-7 c-date-picker">
                        {/* <input type="date" 
                          className="form-control"
                          name="startDate"
                          onChange={this.props.handleQualification}
                          value={this.props.qualification.startDate} 
                        /> */}
                        <DatePicker
                          className="form-control"
                          selected={this.props.date1}
                          onChange={(e) => this.props.handleQualification(e, 'startDate')}
                          dateFormat="yyyy/MM/dd"
                          placeholderText="Click to select a date"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          popperPlacement='right'
                          customInput={<CustomInput />}
                        />
                        <br/>
                        <span className="text-danger">{this.props.endDateErrorMssg5 !== null ? this.props.endDateErrorMssg5 : ''}</span>
                        <span className="text-danger">{this.props.qualificationErrors.startDate !== '' ? this.props.qualificationErrors.startDate : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">End Date <span className="impt">*</span></label>
                      <div className="col-md-7 c-date-picker">
                        {/* <input type="date" 
                          className="form-control"
                          name="endDate"
                          onChange={this.props.handleQualification}
                          value={this.props.qualification.endDate} 
                        /> */}
                        <DatePicker
                          className="form-control"
                          selected={this.props.date2}
                          onChange={(e) => this.props.handleQualification(e, 'endDate')}
                          dateFormat="yyyy/MM/dd"
                          placeholderText="Click to select a date"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          customInput={<CustomInput2 />}
                        />
                        <br/>
                        <span className="text-danger">{this.props.endDateErrorMssg !== null ? this.props.endDateErrorMssg : ''}</span>
                        <span className="text-danger">{this.props.qualificationErrors.endDate !== '' ? this.props.qualificationErrors.endDate : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Upload <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="file" 
                          className="form-control" 
                          name="path"
                          onChange={e => this.props.handleUpload(e, 'qualification')}
                          ref='filepath'
                        />
                        <span className="text-danger">{this.props.qualificationErrors.documentId !== '' ? this.props.qualificationErrors.documentId : ''}</span>
                        <a style={(this.props.qualification.documentId === undefined || this.props.qualification.documentId === '')  ? { display: 'none' } : {}}>{this.props.modalMode === 'create' ? <a className="add-more mr-2" href={`${this.props.qualification.path}`} target="_blank">View document</a> : <a className="add-more mr-2" href={`${filePath.path}`} target="_blank">View document</a>} <span className="add-delete" onClick={() => this.handleDelete(this.props.qualification.documentId, 'qualification')}>delete</span></a>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Highest Education</label>
                      <div className="col-md-7">
                        <label>
                          <input type="radio"
                            name="highestEducation" 
                            className="minimal mr-2"
                            value="Yes"
                            onChange={this.props.handleQualification}
                            // checked={this.state.data.gender === 'Male' ? true : ''}
                          />
                          Yes
                        </label>
                        <label style={{ paddingLeft: '10px'}}>
                          <input type="radio"
                            name="highestEducation" 
                            className="minimal mr-2"
                            value="No"
                            onChange={this.props.handleQualification}
                            // checked={this.state.data.gender === 'Female' ? true : ''}
                          />
                          No
                        </label>
                      </div>
                    </div>

                  </div>
  
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                      <button  
                        type="button" 
                        class="btn btn-primary" 
                        onClick={this.handleAdd}
                      >{this.props.modalMode === 'create' ? 'ADD' : 'UPDATE'}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

      </div>
    )
  }
};

  // const testDate = moment('Tue Apr 21 2020 20:58:08 GMT+0100 (West Africa Standard Time)').toDate()
  // const getCorrectDate = (date) => {
  //   const isDate = date === undefined ? '' : date
  //   console.log(date, isDate)
  //   const testDate = moment(date).toDate();
  //   return date === undefined ? undefined : testDate;
  // }
  // console.log(testDate)
export class CertificationModal extends Component {
  constructor(props){
    super(props)
  }

  handleDelete = (id, type) => {
    this.props.deleteDoc(id, type)
    this.refs.filepath.value = '';
  }

  handleAdd = () => {
    this.props.addMoreCertification();
    this.refs.filepath.value = '';
  }

  handleClose = () => {
    this.props.closeModal();
    this.refs.filepath.value = '';
  }
    
  render(){
    const CustomInput = ({ value, onClick }) => (
      <input readonly className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')"
        value={this.props.date3 === undefined ? undefined : moment(this.props.date3).format(date_format)} onClick={onClick} onKeyPress={e => e.preventDefault()}
      />
    );

    const CustomInput2 = ({ value, onClick }) => (
      <input readonly className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')" onKeyPress={e => e.preventDefault()}
      value={this.props.date4 === undefined ? undefined : moment(this.props.date4).format(date_format)} onClick={onClick}
      />
    );

    const filePath = this.props.certification.upload !== undefined ? this.props.certification.upload : '';
    
    return (
      <div>
        <div class="modal fade" id="certificationModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="example-Modal3">{this.props.modalMode === 'create' ? 'ADD NEW CERTIFICATION' : 'EDIT CERTIFICATION'}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                  <div className="col col-md-12">
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Institution Name <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="text"
                          placeholder="Eg. World Certification Institution" 
                          className="form-control"
                          name="name"
                          onChange={this.props.handleCertification}
                          value={this.props.certification.name} 
                        />
                        <span className="text-danger">{this.props.certificationErrors.name !== '' ? this.props.certificationErrors.name : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Certification Name <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="text"
                          placeholder="Eg. CCNA" 
                          className="form-control"
                          name="certification"
                          onChange={this.props.handleCertification}
                          value={this.props.certification.certification} 
                        />
                        <span style={{ fontSize: '10px', color: 'black' }}>*should be written in full</span><br/>
                        <span className="text-danger">{this.props.certificationErrors.certification !== '' ? this.props.certificationErrors.certification : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Certification Category</label>
                      <div className="col-md-7">
                        <CreatableSelect
                          value={this.props.customSelectDefault1}
                          onChange={e => this.props.handleCustomSelect(e, 'categoryOfCertification')}
                          options={[
                            { value: 'Legal', label: 'Legal' },
                            { value: 'Technology', label: 'Technology' },
                            { value: 'Administration', label: 'Administration' },
                            { value: 'Finance', label: 'Finance' },
                            { value: 'Engineering', label: 'Engineering' },
                            { value: 'Health', label: 'Health' },
                            { value: 'Agriculture', label: 'Agriculture' },
                            { value: 'Others', label: 'Others' },
                          ]}
                          isSearchable="true"
                          name="categoryOfCertification"
                          />
                        <span className="text-danger">{this.props.certificationErrors.categoryOfCertification !== '' ? this.props.certificationErrors.categoryOfCertification : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Start Date <span className="impt">*</span></label>
                      <div className="col-md-7 c-date-picker">
                        <DatePicker
                          className="form-control"
                          selected={this.props.date3}
                          onChange={(e) => this.props.handleCertification(e, 'startDate')}
                          dateFormat="yyyy/MM/dd"
                          placeholderText="Click to select a date"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          popperPlacement='right'
                          customInput={<CustomInput />}
                        />
                        <span className="text-danger">{this.props.endDateErrorMssg6 !== null ? this.props.endDateErrorMssg6 : ''}</span><br/>
                        <span className="text-danger">{this.props.certificationErrors.startDate !== '' ? this.props.certificationErrors.startDate : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">End Date <span className="impt">*</span></label>
                      <div className="col-md-7 c-date-picker">
                      <DatePicker
                          className="form-control"
                          selected={this.props.date4}
                          onChange={(e) => this.props.handleCertification(e, 'endDate')}
                          dateFormat="yyyy/MM/dd"
                          placeholderText="Click to select a date"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          customInput={<CustomInput2 />}
                        />
                        <span className="text-danger">{this.props.endDateErrorMssg2 !== null ? this.props.endDateErrorMssg2 : ''}</span><br/>
                        <span className="text-danger">{this.props.certificationErrors.endDate !== '' ? this.props.certificationErrors.endDate : ''}</span>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Upload <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="file" 
                          className="form-control" 
                          name="path"
                          onChange={e => this.props.handleUpload(e, 'certification')}
                          ref='filepath'
                        />
                        <span className="text-danger">{this.props.certificationErrors.documentId !== '' ? this.props.certificationErrors.documentId : ''}</span>
                        <a style={(this.props.certification.documentId === undefined || this.props.certification.documentId === '')  ? { display: 'none' } : {}}>
                        {this.props.modalMode === 'create' ? <a className="add-more mr-2" href={`${this.props.certification.path}`} target="_blank">View document</a> : <a className="add-more mr-2" href={`${filePath.path}`} target="_blank">View document</a> } <span className="add-delete" onClick={() => this.handleDelete(this.props.certification.documentId, 'certification')}>delete</span>
                        </a>
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
                    onClick={this.handleClose}
                  >Close</button>
                  <button  
                    type="button" 
                    class="btn btn-primary" 
                    onClick={this.handleAdd}
                  >{this.props.modalMode === 'create' ? 'ADD' : 'UPDATE'}</button>
                </div>
              </div>
            </div>
          </div>

      </div>
    )
  }
}

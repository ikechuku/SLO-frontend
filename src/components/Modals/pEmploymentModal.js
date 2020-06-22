import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import moment from 'moment';
import { countryCodes } from '../../helpers/dailCodes';

const date_format = 'DD/MM/YYYY';

export class PreviousEmploymentModal extends Component {
  constructor(props){
    super()
  }

  handleDelete = (id, type) => {
    this.props.deleteDoc(id, type)
    this.refs.filepath.value = '';
  }

  handleAdd = () => {
    this.props.addMorePrevious();
    this.refs.filepath.value = '';
  }

  handleClose = () => {
    this.props.closeModal();
    this.refs.filepath.value = '';
  }

  onKey = (e) => {
    // console.log('here!!!')
    return e.preventDefault();
  }

  render() {
    const CustomInput = ({ value, onClick }) => (
      <input className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')"
        value={this.props.date5 === undefined ? undefined : moment(this.props.date5).format(date_format)} onClick={onClick} onKeyPress={e => this.onKey(e)}
      />
    );

    const CustomInput2 = ({ value, onClick }) => (
      <input className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')" onKeyPress={e => this.onKey(e)}
      value={this.props.date6 === undefined ? undefined : moment(this.props.date6).format(date_format)} onClick={onClick}
      />
    );

    const filePath = this.props.previousEmployment.upload !== undefined ? this.props.previousEmployment.upload : '';

    return (
      <div>
        <div className="modal fade" id="employmentModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style={{ overflowY: 'scroll'}}>
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="example-Modal3">{this.props.modalMode === 'create' ? 'ADD NEW WORK EXPERIENCE' : 'EDIT WORK EXPERIENCE'}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                  <div className="col col-md-12">
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Employer Name <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="text" 
                          className="form-control"
                          name="employerName"
                          onChange={this.props.handlePrevious}
                          value={this.props.previousEmployment.employerName}
                          placeholder="Eg. Union Bank"
                        />
                        <span className="text-danger">{this.props.endDateErrorMssg4 !== null ? this.props.endDateErrorMssg4 : ''}</span>
                        <span className="text-danger">{this.props.previousEmploymentErrors.employerName !== '' ? this.props.previousEmploymentErrors.employerName : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Employer Address <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="text" 
                          className="form-control"
                          name="address"
                          onChange={this.props.handlePrevious}
                          value={this.props.previousEmployment.address}
                          placeholder="Eg. Ikeja, Lagos" 
                        />
                        <span className="text-danger">{this.props.previousEmploymentErrors.address !== '' ? this.props.previousEmploymentErrors.address : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Role <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="text" 
                          className="form-control"
                          name="role"
                          onChange={this.props.handlePrevious}
                          value={this.props.previousEmployment.role}
                          placeholder="Eg. Software Engineer"
                        />
                        <span className="text-danger">{this.props.previousEmploymentErrors.role !== '' ? this.props.previousEmploymentErrors.role : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Start Date <span className="impt">*</span></label>
                      <div className="col-md-7">
                        {/* <input type="date" 
                          className="form-control"
                          name="startDate"
                          onChange={this.props.handlePrevious}
                          value={this.props.previousEmployment.startDate}
                        /> */}
                        <DatePicker
                          className="form-control"
                          // selected={this.props.previousEmployment.startDate}
                          selected={this.props.date5}
                          onChange={(e) => this.props.handlePrevious(e, 'startDate')}
                          dateFormat="yyyy/MM/dd"
                          placeholderText="Click to select a date"
                          peekNextMonth
                          showMonthDropdown
                          popperPlacement='right'
                          showYearDropdown
                          dropdownMode="select"
                          customInput={<CustomInput />}
                        />
                        <br/>
                        <span className="text-danger">{this.props.endDateErrorMssg7 !== null ? this.props.endDateErrorMssg7 : ''}</span>
                        <span className="text-danger">{this.props.previousEmploymentErrors.startDate !== '' ? this.props.previousEmploymentErrors.startDate : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">End Date <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <DatePicker
                          className="form-control"
                          // selected={this.props.previousEmployment.endDate}
                          selected={this.props.date6}
                          onChange={(e) => this.props.handlePrevious(e, 'endDate')}
                          dateFormat="yyyy/MM/dd"
                          placeholderText="Click to select a date"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          popperPlacement='right'
                          customInput={<CustomInput2 />}
                        />
                        <br/>
                        <span className="text-danger">{this.props.endDateErrorMssg3 !== null ? this.props.endDateErrorMssg3 : ''}</span>
                        <span className="text-danger">{this.props.previousEmploymentErrors.endDate !== '' ? this.props.previousEmploymentErrors.endDate : ''}</span>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 col-form-label">Upload appointment letter or letter of recommendation from previous employer <span className="impt">*</span></label>
                      <div className="col-md-7">
                        <input type="file" 
                          className="form-control" 
                          name="path"
                          onChange={e => this.props.handleUpload(e, 'previousEmployment')}
                          ref='filepath'
                        />
                        <span className="text-danger">{this.props.previousEmploymentErrors.documentId !== '' ? this.props.previousEmploymentErrors.documentId : ''}</span>
                        <a style={(this.props.previousEmployment.documentId === undefined || this.props.previousEmployment.documentId === '')  ? { display: 'none' } : {}}>
                      {this.props.modalMode === 'create' ? <a className="add-more mr-2" href={`${this.props.previousEmployment.path}`} target="_blank">View document</a> : <a className="add-more mr-2" href={`${filePath.path}`} target="_blank">View document</a> } <span className="add-delete" onClick={() => this.handleDelete(this.props.previousEmployment.documentId, 'previousEmployment')}>delete</span>
                        </a>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label for="inputName" className="col-md-5 pr-0 col-form-label">Do you object to us seeking any reference from any of your past employer <span className="impt">*</span></label>
                      <div className="col-md-7 pt-2">
                        <label>
                          <input type="radio" 
                            name="objectReference"
                            className="minimal mr-2"
                            onChange={this.props.handlePrevious}
                            value="Yes" 
                            checked={this.props.previousEmployment.objectReference === 'Yes' ? true : ''}
                          />
                          Yes
                        </label>
                        <label style={{ paddingLeft: '25px'}}>
                          <input type="radio" 
                            name="objectReference"
                            className="minimal mr-2"
                            onChange={this.props.handlePrevious}
                            value='No'
                            checked={(this.props.previousEmployment.objectReference === 'No' || this.props.previousEmployment.objectReference === undefined || this.props.previousEmployment.objectReference === false) ? true : ''} 
                          />
                          No
                        </label>
                        <br/>
                        <span className="text-danger">{this.props.previousEmploymentErrors.objectReference !== '' ? this.props.previousEmploymentErrors.objectReference : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row" style={this.props.previousEmployment.objectReference === 'Yes' ? {display: 'none'} : {}}>
                      <label for="inputName" className="col-md-5 col-form-label">Employer Email</label>
                      <div className="col-md-7">
                        <input type="text" 
                          className="form-control"
                          name="email"
                          onChange={this.props.handlePrevious}
                          value={this.props.previousEmployment.email}
                          placeholder="Eg. Ikeja, Lagos" 
                        />
                        <span className="text-danger">{this.props.previousEmploymentErrors.email !== '' ? this.props.previousEmploymentErrors.email : ''}</span>
                      </div>
                    </div>
                    <div className="form-group row" style={this.props.previousEmployment.objectReference === 'Yes' ? {display: 'none'} : {}}>
                      <label for="inputName" className="col-md-5 col-form-label">Employer Phone Number</label>
                      <div className="col-md-7">
                      <div className="input-group mb-3">
                          <div className="input-group-prepend select2-padding">
                            <Select
                              className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                              value={this.props.customPhoneNumberCode}
                              onChange={e => this.props.handlePrevious(e, 'phoneNumberCode')}
                              options={countryCodes}
                              isSearchable="true"
                              name="phoneNumberCode"
                              placeholder="Select"
                            />
                            <span className="text-danger">{this.props.previousEmploymentErrors.phoneNumberCode !== '' ? this.props.previousEmploymentErrors.phoneNumberCode : ''}</span>
                          </div>
                        <input type="text" 
                          className="form-control"
                          name="phoneNumber"
                          onChange={this.props.handlePrevious}
                          value={this.props.previousEmployment.phoneNumber}
                          placeholder="Eg. Ikeja, Lagos" 
                        />
                        </div>
                        <span className="text-danger">{this.props.previousEmploymentErrors.phoneNumber !== '' ? this.props.previousEmploymentErrors.phoneNumber : ''}</span>
                      </div>
                    </div>

                  </div> 
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                  <button  
                    type="button" 
                    className="btn btn-primary" 
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
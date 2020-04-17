import React from 'react';
import Moment from 'react-moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import CreatableSelect from 'react-select/creatable';
import { states, countries, countryLists } from '../Onboarding/Info';
import { slga, getLga } from '../../helpers/states';
// import CustomSelect from '../../helpers/Select2';
import { getAllDialCode, countryCodes } from '../../helpers/dailCodes';
// import { countries, countryLists, stateLists, stateLists2 } from '../Onboarding/Info';

export const GuarantorModal = (props) => {
  return (
    <div>
      <div class="modal fade" id="guarantorModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"  aria-hidden="true" aria-labelledby="exampleModalLongTitle" style={{ overflowY: 'scroll'}}>
					<div class="modal-dialog modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="example-Modal3">CREATE NEW GUARANTOR</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
                <div className="col col-md-12">  
                <div className="form-group row">
                  <label for="inputName" className="col-md-3 col-form-label">First Name</label>
                  <div className="col-md-3">
                    <input type="text" 
                      className="form-control"
                      name="firstName"
                      onChange={props.handleChange}
                      value={props.postData.firstName}
                    />
                    <span className="text-danger">{props.errorMessage1 !== null ? props.errorMessage1 : ''}</span>
                  </div>
                  <label for="inputName" className="col-md-2 col-form-label">Home Phone</label>
                  <div className="col-md-4">
                    {/* <input type="text" 
                      name="homePhone" 
                      className="form-control"
                      onChange={props.handleChange}
                      value={props.postData.homePhone}
                    /> */}
                    <div class="input-group mb-3">
                      <div class="input-group-prepend select2-padding">
                        <Select
                            className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                            defaultValue={props.postData.homePhoneCode}
                            onChange={e => props.handleCustomSelect(e, 'homePhoneCode')}
                            options={countryCodes}
                            isSearchable="true"
                            name="homePhoneCode"
                          />
                      </div>
                      <input 
                        type="text" 
                        class="form-control" 
                        aria-describedby="basic-addon3"
                        name="homePhone"
                        onChange={props.handleChange}
                        value={props.postData.homePhone}
                      />
                    </div>
                    <span className="text-danger">{props.errorMessage5 !== null ? props.errorMessage5 : ''}</span>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="inputName" className="col-md-3 col-form-label">Middle Name</label>
                  <div className="col-md-3">
                    <input type="text" 
                      className="form-control"
                      name="middleName"
                      onChange={props.handleChange}
                      value={props.postData.middleName}
                    />
                    <span className="text-danger">{props.errorMessage3 !== null ? props.errorMessage3 : ''}</span>
                  </div>
                  <label for="inputName" className="col-md-2 col-form-label">Mobile Phone</label>
                  <div className="col-md-4">
                    {/* <input type="text" 
                      className="form-control"
                      name="mobilePhone"
                      onChange={props.handleChange}
                      value={props.postData.mobilePhone}
                    /> */}
                    <div class="input-group mb-3">
                      <div class="input-group-prepend select2-padding">
                        {/* <select 
                          class="input-group-text" 
                          id="basic-addon"
                          name="mobilePhoneCode"
                          value={props.postData.mobilePhoneCode}
                          onChange={props.handleChange}
                        >
                          {getAllDialCode()}
                        </select> */}
                        <Select
                          className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                          defaultValue={props.postData.mobilePhoneCode}
                          onChange={e => props.handleCustomSelect(e, 'mobilePhoneCode')}
                          options={countryCodes}
                          isSearchable="true"
                          name="mobilePhoneCode"
                        />
                      </div>
                      <input 
                        type="text" 
                        class="form-control" 
                        aria-describedby="basic-addon3"
                        name="mobilePhone"
                        onChange={props.handleChange}
                        value={props.postData.mobilePhone}
                      />
                    </div>
                    <span className="text-danger">{props.errorMessage4 !== null ? props.errorMessage4 : ''}</span>
                  </div>
                </div> 
                <div className="form-group row">
                  <label for="inputName" className="col-md-3 col-form-label">Surname</label>
                    <div className="col-md-3">
                      <input type="text" 
                        className="form-control"
                        name="lastName"
                        onChange={props.handleChange}
                        value={props.postData.lastName}
                      />
                      <span className="text-danger">{props.errorMessage2 !== null ? props.errorMessage2 : ''}</span>
                    </div>
                  <label for="inputName" className="col-md-2 col-form-label">Business Phone</label>
                  <div className="col-md-4">
                    {/* <input type="text" 
                      className="form-control"
                      name="businessPhone"
                      onChange={props.handleChange}
                      value={props.postData.businessPhone}
                    /> */}
                    <div class="input-group mb-3">
                      <div class="input-group-prepend select2-padding">
                        <Select
                          // isClearable
                          className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                          defaultValue={props.postData.businessPhoneCode}
                          onChange={e => props.handleCustomSelect(e, 'businessPhoneCode')}
                          options={countryCodes}
                          isSearchable="true"
                          name="businessPhoneCode"
                        />
                      </div>
                      <input 
                        type="text" 
                        class="form-control" 
                        aria-describedby="basic-addon3"
                        name="businessPhone"
                        onChange={props.handleChange}
                        value={props.postData.businessPhone}
                      />
                    </div>
                    <span className="text-danger">{props.errorMessage6 !== null ? props.errorMessage6 : ''}</span>
                  </div>
                </div>
                <div className="form-group row">
                <label for="inputName" className="col-md-3 col-form-label">Relationship with Employee</label>
                  <div className="col-md-3">
                    {/* <CustomSelect 
                      optionList={[
                        { value: 'Family Friend', text: 'Family Friend', id: 1 },
                        { value: 'Pastor', text: 'Pastor', id: 2 },
                        { value: 'Spiritual Head', text: 'Spiritual Head' , id: 3 },
                        { value: 'Relative', text: 'Relative' , id: 4 },
                        { value: 'Friend', text: 'Friend' , id: 5 }, 
                      ]}
                      handleChange={props.handleChange}
                      name={'relationship'}
                      value={props.postData.relationship}
                      placeHolder='Select'
                    /> */}
                  <CreatableSelect
                    isClearable
                    defaultValue={props.postData.relationship}
                    onChange={e => props.handleCustomSelect(e, 'relationship')}
                    options={[
                      { value: 'Family Friend', label: 'Family Friend' },
                      { value: 'Pastor', label: 'Pastor' },
                      { value: 'Spiritual Head', label: 'Spiritual Head'  },
                      { value: 'Relative', label: 'Relative'  },
                      { value: 'Friend', label: 'Friend' }, 
                    ]}
                    name="relationship"
                  />
                  </div>
                  <label for="inputName" className="col-md-2 col-form-label">Occupation</label>
                  <div className="col-md-4">
                  <CreatableSelect
                    isClearable
                    defaultValue={props.postData.occupation}
                    onChange={e => props.handleCustomSelect(e, 'occupation')}
                    options={[
                      { value: 'Civil Servant', label: 'Civil Servant' },
                      { value: 'Clergy', label: 'Clergy' },
                      { value: 'Business person', label: 'Business person'  } 
                    ]}
                    name="occupation"
                  />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="inputName" className="col-md-3 col-form-label">Residential Address</label>
                  <div className="col-md-3">
                    <input type="text" 
                      className="form-control"
                      name="residentialAddress"
                      onChange={props.handleChange}
                      value={props.postData.residentialAddress}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      {/* <select 
                        name="residentialCountry" 
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={props.handleChange}
                        value={props.postData.residentialCountry} 
                      >
                        { 
                          countries('Country')
                        }
                      </select> */}
                      <Select
                        className="w-100 pr-0 pl-0 col-md-3 mr-1"
                        defaultValue={props.postData.residentialCountry}
                        onChange={e => props.handleCustomSelect(e, 'residentialCountry')}
                        options={countryLists}
                        isSearchable="true"
                        name="country"
                        placeholder="Country"
                        />
                      <input type="text"  
                        name="residentialState" 
                        className="form-control col-md-3 mr-1"
                        onChange={props.handleChange} 
                        value={props.postData.residentialState}
                        style={ (props.postData.residentialCountry === 'Nigeria') || !props.postData.residentialCountry ? { display: 'none' } : { display: 'block' }}
                        placeholder="State"
                      />
                      <select 
                        disabled={props.postData.residentialCountry === '' ? "disabled" : ""}
                        name="residentialState" 
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={props.handleChange}
                        value={props.postData.residentialState}
                        style={(props.postData.residentialCountry !== '') && (props.postData.residentialCountry !== null) && (props.postData.residentialCountry !== 'Nigeria') ? { display: 'none'} : {} }
                      >
                        {
                          states('State')
                        }
                      </select>
                      <input type="text" 
                        name="residentialLga" 
                        className="form-control col-md-3 mr-1"
                        onChange={props.handleChange} 
                        value={props.postData.residentialLga}
                        style={ (props.postData.residentialCountry === 'Nigeria') || !props.postData.residentialCountry ? { display: 'none' } : { display: 'block' }}
                        placeholder="Lga"
                      />
                      <select 
                        disabled={props.postData.residentialCountry === '' ? "disabled" : ""}
                        name="residentialLga" 
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={props.handleChange} 
                        value={props.postData.residentialLGA}
                        style={(props.postData.residentialCountry !== '') && (props.postData.residentialCountry !== null) && (props.postData.residentialCountry !== 'Nigeria') ? { display: 'none'} : {} }
                      >
                        <option value="">LGA</option>
                        {
                          props.getLGA(props.postData.residentialState)
                        }
                      </select>
                      <input
                        type="text" 
                        name="residentialCity" 
                        className="form-control w-100 col-md-2"
                        onChange={props.handleChange}
                        value={props.postData.residentialCity} 
                        placeholder="City"
                      />
                      {/* <select 
                        name="residentialCity" 
                        className="form-control w-100 col-md-2"
                        onChange={props.handleChange}
                        value={props.postData.residentialCity} 
                      >
                        <option value="">City</option>
                        <option value="">Nigeria</option>
                        <option value="">Ghana</option>
                      </select> */}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="inputName" className="col-md-3 col-form-label">Landed Property Address</label>
                  <div className="col-md-3">
                    <input type="text" 
                      className="form-control"
                      name="landedPropertyAddress"
                      onChange={props.handleChange}
                      value={props.postData.landedPropertyAddress}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      {/* <select 
                        name="landedPropertyCountry" 
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={props.handleChange}
                        value={props.postData.landedPropertyCountry} 
                      >
                        { 
                          countries('Country')
                        }
                      </select> */}
                      <Select
                        className="w-100 pr-0 pl-0 col-md-3 mr-1"
                        defaultValue={props.postData.landedPropertyCountry}
                        onChange={e => props.handleCustomSelect(e, 'landedPropertyCountry')}
                        options={countryLists}
                        isSearchable="true"
                        name="landedPropertyCountry"
                        placeholder="Country"

                      />
                      <input type="text" 
                        name="landedPropertyState" 
                        className="form-control col-md-3 mr-1"
                        onChange={props.handleChange} 
                        value={props.postData.landedPropertyState}
                        style={ (props.postData.landedPropertyCountry === 'Nigeria') || !props.postData.landedPropertyCountry ? { display: 'none' } : { display: 'block' }}
                        placeholder="State"
                      />
                      <select
                        disabled={props.postData.landedPropertyCountry === '' ? "disabled" : ""} 
                        name="landedPropertyState" 
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={props.handleChange}
                        value={props.postData.landedPropertyState}
                        style={(props.postData.landedPropertyCountry !== '') && (props.postData.landedPropertyCountry !== null) && (props.postData.landedPropertyCountry !== 'Nigeria') ? { display: 'none'} : {} }
                      >
                        {
                          states('State')
                        }
                      </select>
                      <input type="text" 
                        name="landedPropertyLga" 
                        className="form-control col-md-3 mr-1"
                        onChange={props.handleChange} 
                        value={props.postData.landedPropertyLga}
                        style={ (props.postData.landedPropertyCountry === 'Nigeria') || !props.postData.landedPropertyCountry ? { display: 'none' } : { display: 'block' }}
                        placeholder="Lga"
                      />
                      <select
                        disabled={props.postData.landedPropertyCountry === '' ? "disabled" : ""} 
                        name="landedPropertyLga" 
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={props.handleChange} 
                        value={props.postData.landedPropertyLga}
                        style={(props.postData.landedPropertyCountry !== '') && (props.postData.landedPropertyCountry !== null) && (props.postData.landedPropertyCountry !== 'Nigeria') ? { display: 'none'} : {} }
                      >
                        <option value="">LGA</option>
                        {
                          props.getLGA(props.postData.landedPropertyState)
                        }
                      </select>
                      <input 
                        type="text"
                        name="landedPropertyCity" 
                        className="form-control w-100 col-md-2"
                        onChange={props.handleChange}
                        value={props.postData.landedPropertyCity} 
                        placeholder="City"
                      />
                      {/* <select 
                        name="landedPropertyCity" 
                        className="form-control w-100 col-md-2"
                        onChange={props.handleChange}
                        value={props.postData.landedPropertyCity} 
                      >
                        <option value="">City</option>
                        <option value="">Nigeria</option>
                        <option value="">Ghana</option>
                      </select> */}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="inputName" className="col-md-3 col-form-label">Business Address</label>
                  <div className="col-md-3">
                    <input type="text" 
                      className="form-control"
                      name="businessAddress"
                      onChange={props.handleChange}
                      value={props.postData.businessAddress}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      {/* <select 
                        name="businessCountry" 
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={props.handleChange}
                        value={props.postData.businessCountry} 
                      >
                        { 
                          countries('Country')
                        }
                      </select> */}
                      <Select
                        className="w-100 pr-0 pl-0 col-md-3 mr-1"
                        defaultValue={props.postData.businessCountry}
                        onChange={e => props.handleCustomSelect(e, 'businessCountry')}
                        options={countryLists}
                        isSearchable="true"
                        name="businessCountry"
                        placeholder="Country"
                        />
                      <input type="text" 
                        name="businessState" 
                        className="form-control col-md-3 mr-1"
                        onChange={props.handleChange} 
                        value={props.postData.businessState}
                        style={ (props.postData.businessCountry === 'Nigeria') || !props.postData.businessCountry ? { display: 'none' } : { display: 'block' }}
                        placeholder="State"
                      />
                      <select
                        disabled={props.postData.businessCountry === '' ? "disabled" : ""} 
                        name="businessState" 
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={props.handleChange}
                        value={props.postData.businessState}
                        style={(props.postData.businessCountry !== '') && (props.postData.businessCountry !== null) && (props.postData.businessCountry !== 'Nigeria') ? { display: 'none'} : {} }
                      >
                        {
                          states('State')
                        }
                      </select>
                      <input type="text" 
                        name="businessLga" 
                        className="form-control col-md-3 mr-1"
                        onChange={props.handleChange} 
                        value={props.postData.businessLga}
                        style={ (props.postData.businessCountry === 'Nigeria') || !props.postData.businessCountry ? { display: 'none' } : { display: 'block' }}
                        placeholder="Lga"
                      />
                      <select 
                        disabled={props.postData.businessCountry === '' ? "disabled" : ""}
                        name="businessLga" 
                        className="form-control w-100 col-md-3 mr-1"
                        onChange={props.handleChange} 
                        value={props.postData.businessLga}
                        style={(props.postData.businessCountry !== '') && (props.postData.businessCountry !== null) && (props.postData.businessCountry !== 'Nigeria') ? { display: 'none'} : {} }
                      >
                        <option value="">LGA</option>
                        {
                          props.getLGA(props.postData.businessState)
                        }
                      </select>
                      <input
                        type="text" 
                        name="businessCity" 
                        className="form-control w-100 col-md-2"
                        onChange={props.handleChange}
                        value={props.postData.businessCity}
                        placeholder="City" 
                      />
                      {/* <select 
                        name="businessCity" 
                        className="form-control w-100 col-md-2"
                        onChange={props.handleChange}
                        value={props.postData.businessCity} 
                      >
                        <option value="">City</option>
                        <option value="">Nigeria</option>
                        <option value="">Ghana</option>
                      </select> */}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="inputName" className="col-md-3 col-form-label">Marital Status</label>
                  <div className="col-md-3">
                    <select
                      className="form-control w-100"
                      name="maritalStatus" 
                      onChange={props.handleChange}
                      value={props.postData.maritalStatus}
                    >
                      <option value="">Select</option>	
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="inputName" className="col-md-5 col-form-label">How long have you known the employee</label>
                  <div className="col-md-3">
                    {/* <input type="date" 
                      className="form-control"
                      name="employeeKnownDate"
                      onChange={props.handleChange}
                      value={props.postData.employeeKnownDate}
                    /> */}
                    <DatePicker
                      className="form-control"
                      placeholderText="Click to select a date"
                      selected={props.postData.employeeKnownDate}
                      onChange={(e) => props.handleChange(e, 'employeeKnownDate')}
                      dateFormat="yyyy/MM/dd"
                    />
                    <span className="text-danger">{props.errorMessage7 !== null ? props.errorMessage7 : ''}</span>
                  </div>
                  <div className="col-md-3 p-2" style={(!props.postData.employeeKnownDate || props.errorMessage7 !== null) ? { display: 'none'} : {}}>
                    <Moment fromNow ago>{props.postData.employeeKnownDate}</Moment>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="inputName" className="col-md-5 col-form-label">Has the employee been involved in any criminal matters?</label>
                  <div className="col-md-5">
                    <label>
                      <input type="radio" 
                        name="criminalHistory" 
                        className="minimal"
                        onChange={props.handleChange}
                        value='true'
                        checked={props.postData.criminalHistory === true ? true : ''}
                      />
                      Yes
                    </label>
                    <label style={{ paddingLeft: '10px'}}>
                      <input type="radio" 
                        name="criminalHistory" 
                        className="minimal"
                        onChange={props.handleChange}
                        value='false'
                        checked={props.postData.criminalHistory === false ? true : ''}
                      />
                      No
                    </label>
                  </div>
                </div>
                <div className="form-group row" style={!props.postData.criminalHistory ? {display: 'none'} : {display: 'flex'}}>
                  <label for="inputName" className="col-md-2 col-form-label">Give details</label>
                  <div className="col-md-8">
                    <input type="text" 
                      className="form-control"
                      name="details"
                      onChange={props.handleChange}
                      value={props.postData.details}
                    />
                  </div>
                </div>
                
                </div> 
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
								<button  type="button" class="btn btn-primary" onClick={props.addMore}>Add</button>
							</div>
						</div>
					</div>
				</div>

    </div>
  )
}
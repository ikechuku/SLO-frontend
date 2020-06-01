import React from 'react';
import Select from 'react-select'

export default function UnitModal(props) {
  return (
    <div class="modal fade" id="createStaffModal" tabIndex="-1" role="dialog"  aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 
              class="modal-title"
              id="example-Modal3">
                {props.modalMode === 'create' ? 'CREATE NEW STAFF' : 'EDIT STAFF'}
            </h5>
            <button
              type="button" 
              class="close" 
              data-dismiss="modal" 
              aria-label="Close"
              onClick={props.closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="form-control-label">Username</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend select2-padding">
                    <Select
                      className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                      value={props.customMobile}
                      onChange={e => props.handleChange(e, 'mobilePhoneCode')}
                      options={props.countryCodes}
                      isSearchable="true"
                      name="mobilePhoneCode"
                      placeholder="Select"
                    />
                  </div>
                  <input 
                    type="text" 
                    class="form-control" 
                    value={props.staff.username} 
                    name="username"
                    placeholder="E.g 8033036225"
                    onChange={props.handleChange}
                  />
                </div>
                <span className="text-danger">{props.mobilePhoneCodeError !== null ? props.mobilePhoneCodeError : ''}</span>
                <span className="text-danger">{props.errorMessage1 !== null ? props.errorMessage1 : ''}</span>
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
            <button type="button" class="btn btn-primary" onClick={props.handleSubmit}>
              {props.modalMode === 'create' ? 'Create' : 'Update'}
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}
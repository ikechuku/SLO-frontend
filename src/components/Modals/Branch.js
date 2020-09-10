import React from 'react';

const BranchModal = (props) => {
  return (
    <div className="modal fade" id="branchModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="example-Modal3">{props.modalMode === 'create' ? 'CREATE' : 'EDIT'} NEW OFFICE</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label for="recipient-name" className="form-control-label">Office Name</label>
              <input  
                onChange={props.handleChange}
                value={props.name}
                name="name" 
                type="text" 
                className="form-control" 
                id="recipient-name"
              />
            </div> 

            <div className="form-group">
              <label for="recipient-names" classs="form-control-label">Address</label>
              <input 
                onChange={props.handleChange}
                value={props.address}
                name="address" 
                type="text" 
                className="form-control" 
                id="recipient-names"
              />
            </div>

          <div className="form-group">
            <label for="recipient-name" className="form-control-label">Region</label>
              <select 
                value={props.regionId}
                name="regionId"
                onChange={props.handleChange}    
                className="form-control sel" 
                id="exampleFormControlSelect1"
                disabled={props.modalMode === 'edit' ? true : false}
              >      
                <option value="" selected disabled>Select Region</option>
                {
                  props.regions.length ? props.regions.map(item => (
                    <option value={item.id} >{item.name}</option>
                  )) : ''
                }
              </select>
          </div>

          <div className="form-group">
            <label for="recipient-name" className="form-control-label">Area</label>
              <select 
                value={props.areaId}
                name="areaId"
                onChange={props.handleChange}    
                className="form-control sel" 
                id="exampleFormControlSelect1"
                disabled={props.modalMode === 'edit' ? true : false}
              >      
                <option value="" selected disabled>Select Area</option>
                {
                  props.areas.length ? props.areas.map(item => (
                    <option value={item.id} >{item.name}</option>
                  )) : ''
                }
              </select>
          </div>

          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.closeModal}>Close</button>
          {
            props.modalMode === 'create' ?
            <button type="button" className="btn btn-primary" onClick={props.handleSubmit}>
              CREATE
            </button> :
            <button type="button" className="btn btn-primary" onClick={props.handleEditSubmit}>
              UPDATE
            </button>
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default BranchModal;

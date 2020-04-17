import React from 'react'

export function DepartmentModal(props) {
  return (
    <div class="modal fade" id="createDepartment" tabindex="-1" role="dialog"  aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="example-Modal3">CREATE NEW DEPARTMENT</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="form-control-label">DEPARTMENT NAME</label>
                <input type="text" class="form-control" id="recipient-name"/>
              </div>
            

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Create Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export function EditDepartmentModal(props) {
  return (
    <div class="modal fade" id="editDepartment" tabindex="-1" role="dialog"  aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="example-Modal3">EDIT DEPARTMENT</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="form-control-label">DEPARTMENT NAME</label>
                <input 
                  type="text" 
                  class="form-control" 
                  defaultValue={props.department.name} 
                  name="name"
                  onChange={props.handleEdit}
                />
              </div>
            

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onClick={props.handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}

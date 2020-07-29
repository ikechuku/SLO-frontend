import React, { Component } from 'react'
import './modal.css'
export default class comfirmModal extends Component {
    render() {
        return (
            <div>
     


<div  class="modal fade" id="ComfirmModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document" style={{width:"375px"}}>
    <div class="modal-content flexModal-Delete">
     
      <div class="modal-body">
        <div className="confirmWrapper removeBlockDisplay">
            <p>Are you sure you want to delete this? 
              <br/>
              Action is not revisable
            </p>
            
        <button onClick={this.props.handleDelete}  type="button" class="btn btn-danger" data-dismiss="modal">Delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
</div>
            </div>
        )
    }
}

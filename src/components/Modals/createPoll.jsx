import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom'
import {setPoll} from '../../helpers/storePollData'

export default function AddcreatePoll(props) {

  return (
    <div>
      <div class="modal fade" id="createPoll" tabindex="-1" role="dialog" aria-labelledby="createPoll" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
       
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form className="add-investment-wrap">
        <div className="form-group">
              <label  className="form-control-label">Title</label>
              <input  
                onChange={props.handleChange}
                value={props.aboutPoll.title}
                name="title" 
                type="text" 
                className="form-control" 
               
              />
            </div> 
            
          <div className="form-group">
              <label  className="form-control-label">Description (Optional)</label>
              <textarea  
                onChange={props.handleChange}
                value={props.aboutPoll.description}
                name="description"
                type="text" 
                className="form-control"  
              />
            </div> 

        </form>
        <button onClick={props.handleSubmit}>Next</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

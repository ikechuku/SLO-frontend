import React from "react";
import Select from "react-select";

export function Confirm(props) {
	return (
		<div class="modal fade" id="confirm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content" style={{ padding: '50px'}}>
          <div className="modal-body pl-0 pr-0">
            <p>Are you sure you want to {props.modalAction}</p>
            <button className="col-12 btn btn-danger mb-3" style={{ height: '45px' }}
              onClick={props.handleAction}
            >
              {
                props.modalAction === 'delete' ? 'Delete' :
                  props.modalAction
              }
            </button>
            <button className="col-12 btn btn-primary close-btn" data-dismiss="modal"
              style={{ height: '45px' }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
	);
}

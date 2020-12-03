import React from "react";
import Select from "react-select";

export function LeaveModal(props) {
	return (
		<div
			className="modal fade"
			id="roleModal"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="example-Modal3">
							{props.modalMode === "create"
								? "CREATE USER LEAVE"
								: "EDIT USER LEAVE"}
						</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							onClick={props.reSetModal}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Leave Type
								</label>
								<input
									type="text"
									className="form-control"
									value={props.leave.type}
									name="type"
									onChange={props.handleChange}
								/>
								{/* <span className="text-danger">
									{props.errorMessage1 !== null ? props.errorMessage1 : ""}
								</span> */}
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
							Duration
								</label>
								<input
									type="number"
									className="form-control"
									value={props.leave.duration}
									name="duration"
									onChange={props.handleChange}
								/>
								{/* <span className="text-danger">
									{props.errorMessage2 !== null ? props.errorMessage2 : ""}
								</span> */}
							</div>

							
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
							onClick={props.reSetModal}
						>
							Close
						</button>
						{/* {
              props.modalMode === 'create' ?
                <button type="button" className="btn btn-primary" onClick={props.handleCreate}>Create</button> :
                <button type="button" className="btn btn-primary" onClick={props.handleUpdate}>Update</button>
            } */}
						<button
							type="button"
							className="btn btn-primary"
							onClick={props.handleSubmit}
						>
							{props.modalMode === "create" ? "Create" : "Update"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

import React from "react";
import Select from "react-select";

export function RoleModal(props) {
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
								? "CREATE NEW JOB TITLE"
								: "EDIT JOB TITLE"}
						</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							onClick={props.closeModal}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Job Title
								</label>
								<input
									type="text"
									className="form-control"
									value={props.role.title}
									name="title"
									onChange={props.handleChange}
								/>
								<span className="text-danger">
									{props.errorMessage1 !== null ? props.errorMessage1 : ""}
								</span>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Departments
								</label>
								<Select
									className="w-100 pr-0 pl-0 col-md-12 mr-1"
									// defaultValue={props.postData.businessCountry}
									value={props.customSelect1}
									onChange={(e) => props.handleChange(e, "departmentId")}
									options={props.departmentOptions}
									isSearchable="true"
									name="departmentId"
									placeholder="Select"
								/>
								<span className="text-danger">
									{props.errorMessage2 !== null ? props.errorMessage2 : ""}
								</span>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Units
								</label>
								<Select
									className="w-100 pr-0 pl-0 col-md-12 mr-1"
									// defaultValue={props.postData.businessCountry}
									value={props.customSelect2}
									onChange={(e) => props.handleChange(e, "unitId")}
									options={props.unitOptions}
									isSearchable="true"
									name="UnitId"
									placeholder="Select"
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
							onClick={props.closeModal}
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

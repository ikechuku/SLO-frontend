import React from "react";
import Select from "react-select";

export function KpiModal(props) {
	return (
		<div
			class="modal fade"
			id="kpiModal"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="example-Modal3">
							{props.modalMode === "create" ? "CREATE NEW KPI" : "EDIT KPI"}
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
								<label for="recipient-name" class="form-control-label">
									KPI Title
								</label>
								<input
									type="text"
									class="form-control"
									value={props.role.name}
									name="name"
									onChange={props.handleChange}
								/>
								<span className="text-danger">
									{props.errorMessage1 !== null ? props.errorMessage1 : ""}
								</span>
							</div>

							<div class="form-group">
								<label for="recipient-name" class="form-control-label">
									Job Type
								</label>
								<Select
									className="w-100 pr-0 pl-0 col-md-12 mr-1"
									// defaultValue={props.postData.businessCountry}
									value={props.customSelect1}
									onChange={(e) => props.handleChange(e, "responsibilityId")}
									options={props.departmentOptions}
									isSearchable="true"
									name="responsibilityId"
									placeholder="Select"
								/>
								<span className="text-danger">
									{props.errorMessage2 !== null ? props.errorMessage2 : ""}
								</span>
							</div>

							<div class="form-group">
								<label for="recipient-name" class="form-control-label">
									Responsibility
								</label>
								<Select
									className="w-100 pr-0 pl-0 col-md-12 mr-1"
									// defaultValue={props.postData.businessCountry}
									value={props.customSelect2}
									onChange={(e) => props.handleChange(e, "roleId")}
									options={props.unitOptions}
									isSearchable="true"
									name="roleId"
									placeholder="Select"
								/>
							</div>

							<div class="form-group">
								<label for="recipient-name" class="form-control-label">
									Weight Mark
								</label>
								<input
									type="number"
									class="form-control"
									value={props.role.weightMark}
									name="weightMark"
									onChange={props.handleChange}
								/>
								<span className="text-danger">
									{props.errorMessage1 !== null ? props.errorMessage1 : ""}
								</span>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-danger"
							data-dismiss="modal"
							onClick={props.closeModal}
						>
							Close
						</button>
						{/* {
              props.modalMode === 'create' ?
                <button type="button" class="btn btn-primary" onClick={props.handleCreate}>Create</button> :
                <button type="button" class="btn btn-primary" onClick={props.handleUpdate}>Update</button>
            } */}
						<button
							type="button"
							class="btn btn-primary"
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

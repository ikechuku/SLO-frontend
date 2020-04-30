import React from "react";

const BranchModal = (props) => {
	return (
		<div
			class="modal fade"
			id="branchModal"
			tabindex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="example-Modal3">
							CREATE NEW Responsibility
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
									Responsibility Name
								</label>
								<input
									onChange={props.handleChange}
									value={props.responsibility.name}
									name="name"
									type="text"
									class="form-control"
									id="recipient-name"
								/>
							</div>

							<label for="recipient-name" class="form-control-label">
								Roles
							</label>
							<select
								value={props.responsibility.role}
								name="role"
								onChange={props.handleChange}
								class="form-control sel"
								id="exampleFormControlSelect1"
							>
								<option value="">Select Role</option>
								<option value="North Central">IT DPT1</option>
								<option value="North East">IT DPT2</option>
								<option value="North West">IT DPT3</option>
								<option value="South East">IT DPT4</option>
								<option value="South West">IT DPT5</option>
							</select>
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
};

export default BranchModal;

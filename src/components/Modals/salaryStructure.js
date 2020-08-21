import React from "react";

export function SalaryStructureModal(props) {
	return (
		<div
			className="modal fade"
			id="SalaryStructure"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="example-Modal3">{
							props.modalMode==="edit"?"Edit Salary Structure":"Create Salary Structure"
						}
						
						</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							onClick={props.clearModal}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Salary Structure
								</label>
								<input
									type="text"
									className="form-control"
									value={props.salaryStructure}
									name="name"
									onChange={props.handleChange}
								/>
								<span className="text-danger">
									{props.errorMessage1 !== null ? props.errorMessage1 : ""}
								</span>
							</div>

						
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
							onClick={props.clearModal}
						>
							Close
						</button>
						{/* {
              props.modalMode === 'create' ?
                <button type="button" className="btn btn-primary" onClick={props.handleCreate}>Create</button> :
                <button type="button" className="btn btn-primary" onClick={props.handleUpdate}>Update</button>
            } */}{props.modalMode=== 'create' ?(
<button
							type="button"
							className="btn btn-primary"
							onClick={props.handleSubmit}
						>
						Create
						</button>
			):
		""
		}

{props.modalMode=== 'edit' ?(
<button
							type="button"
							className="btn btn-primary"
							onClick={props.editSalaryStructure}
						>
						Edit
						</button>
			):
		""
		}
						
					</div>
				</div>
			</div>
		</div>
	);
}

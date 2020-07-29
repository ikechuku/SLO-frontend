import React from "react";
import Select from "react-select";

export function PayRollModal(props) {
	console.log(props)
	return (
		<div
			className="modal fade"
			id="addPayroll"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="example-Modal3">
							Applicable To
						</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							// onClick={props.closeModal}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Departments
								</label>
								{/* <select
									className="w-100 pr-0 pl-0 col-md-12 mr-1"
									// defaultValue={props.postData.businessCountry}
									// value={props.customSelect1}
									// onChange={(e) => props.handleChange(e, "departmentId")}
									// options={props.departmentOptions}
								
								>
									<option value="area">area</option>
									<option value="area">area</option>
									</select> */}

<select value={props.payrolldata} name="applicableTo" onChange={props.onChangePayroll}
class="form-control" id="">
											<option>Select</option>
											<option 	 value="Area">Area</option>
											<option   value="branch">Branch</option>
										</select>

										<span className="text-danger">
									{/* {props.errorMessage2 !== null ? props.errorMessage2 : ""} */}
								</span>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Units
								</label>
								<select value={props.payrolldata} name="applicableTo"
								 onChange={props.onChangePayroll}
class="form-control" id="">
											<option>Select</option>
											<option 	 value="Area">unit a</option>
											<option   value="branch">unit b</option>
										</select>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
							// onClick={props.closeModal}
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
							// onClick={props.handleSubmit}
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

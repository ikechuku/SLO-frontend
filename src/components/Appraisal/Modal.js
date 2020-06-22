import React from 'react';
import Select from "react-select";

export function AddAppraisal(props) {
	return (
		<div
			className="modal fade"
			id="addAppraisal"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header" style={{ border: 'none'}}>
						<h5 className="modal-title col-7 text-right" id="example-Modal3">
							{props.modalMode === "create" ? "APPRAISE" : "EDIT APPRAISAL"}
						</h5>
						<button
							type="button"
							className="close col-5 text-right"
							data-dismiss="modal"
							aria-label="Close"
							onClick={props.closeModal}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body" style={{ paddingLeft: '50px', paddingRight: '50px'}}>
						<form className="col-md-10 mx-auto" onSubmit={props.handleSubmit}> 
							<div className="form-group mb-0">
								<label for="recipient-name" className="form-control-label">
									KPI Name
								</label>
								<React.Fragment>
									<Select
										className="w-100 pr-0 pl-0 col-md-12 mr-1"
										value={props.customSelect}
										onChange={(e) => props.handleChange(e, "assignedKpiId")}
										options={props.assignedKpisOption}
										isSearchable="true"
										name="assignedkpiId"
										placeholder="Select"
									/>
									<input
										tabIndex={-1}
										value={props.assignData.assignedKpiId}
										onChange={(e) => props.handleChange(e, "assignedKpiId")}
										autoComplete="off"
										style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
										required={true}
									/>
								</React.Fragment>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Target Value
								</label>
								<input
									type="number"
									className="form-control"
									value={props.assignData.targetValue}
									name="targetValue"
                  onChange={props.handleChange}
									placeholder="Target Value"
									readOnly
								/>
								<span className="text-danger">
								</span>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Appraised Value
								</label>
								<input
									type="number"
									className="form-control"
									value={props.assignData.appraisedValue}
									name="appraisedValue"
                  onChange={props.handleChange}
									placeholder="Appraised Value"
									required
								/>
								<span className="text-danger">
								</span>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Target Score
								</label>
								<input
									type="number"
									className="form-control"
									value={props.assignData.targetScore}
									name="targetScore"
                  onChange={props.handleChange}
									placeholder="Score"
									readOnly
								/>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Appraised Score
								</label>
								<input
									type="number"
									className="form-control"
									// value={props.assignData.target}
									name="target"
                  onChange={props.handleChange}
									placeholder="Target"
									readOnly
								/>
								<span className="text-danger">
								</span>
							</div>

							<div className="modal-footer justify-content-center mb-4" style={{ border: 'none'}}>
								<button
									type="button"
									className="btn btn-danger rounded-circle"
									style={{ padding: '15px 20px', fontSize: '20px'}}
									data-dismiss="modal"
									onClick={props.closeModal}
								>
									<i className="fa fa-times"></i>
								</button>
								<button
									type="submit"
									onSubmit={props.handleSubmit}
									className="btn btn-primary rounded-circle ml-5"
									style={{ padding: '15px 20px', fontSize: '20px' }}
								>
									{props.modalMode === "create" ? <i className="fa fa-check"></i> : <i className="fa fa-check"></i>}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
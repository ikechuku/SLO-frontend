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
						<div className="form-group row">
                          <label for="inputName" className="col-md-2 pr-0 col-form-label">Departments <span className="impt">*</span></label>
                          <div className="col-md-4">
                            <Select
                              name="departmentId"
                              placeholder="Select"
                              value={props.customDepartmentId}
                              options={props.departmentOptions}
                              onChange={(e) => props.handleChange(e, 'departmentId')}
                            />
                            <span className="text-danger">{props.errorMessage8 !== null ? props.errorMessage8 : ''}</span>
                          </div>
                          <label for="inputName" className="col-md-2 col-form-label">Branch <span className="impt">*</span></label>
                          <div className="col-md-4">
                          <Select
                            name="branchId"
                            placeholder="Select"
                            value={props.customBranchId}
                            options={props.branches}
                            onChange={(e) => props.handleChange(e, 'branchId')}
                          />
													<span className="text-danger">{props.errorMessage3 !== null ? props.errorMessage3 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Units <span className="impt">*</span></label>
												<div className="col-md-4">
                          <Select
                            name="unitId"
                            placeholder="Select"
                            value={props.customUnitId}
                            options={props.unitOptions}
                            onChange={(e) => props.handleChange(e, 'unitId')}
                          />
													<span className="text-danger">{props.errorMessage5 !== null ? props.errorMessage5 : ''}</span>
                          
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Region <span className="impt">*</span></label>
												<div className="col-md-4">
                          <Select
                            name="regionId"
                            placeholder="Select"
                            value={props.customRegionId}
                            options={props.regionOptions}
                            onChange={(e) => props.handleChange(e, 'regionId')}
                          />
													<span className="text-danger">{props.errorMessage5 !== null ? props.errorMessage5 : ''}</span>
                          
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Job Title <span className="impt">*</span></label>
                        <div className="col-md-4">
                          <Select
                            name="jobTitle"
                            placeholder="Select"
                            value={props.customJobTitle}
                            options={props.getRoles()}
                            onChange={(e) => props.handleChange(e, 'jobTitle')}
                          />
													<span className="text-danger">{props.errorMessage4 !== null ? props.errorMessage4 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Area <span className="impt">*</span></label>
                        <div className="col-md-4">
                          <Select
                            name="areaId"
                            placeholder="Select"
                            value={props.customAreaId}
                            options={props.areaOptions}
                            onChange={(e) => props.handleChange(e, 'areaId')}
                          />
													<span className="text-danger">{props.errorMessage4 !== null ? props.errorMessage4 : ''}</span>
												</div>
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
					
						<button
							type="button"
							className="btn btn-primary"
							data-dismiss="modal"
							onClick={props.addSelection}
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

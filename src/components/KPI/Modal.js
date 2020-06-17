import React from "react";
import Select from "react-select";

export function KpiModal(props) {
	return (
		<div
			className="modal fade"
			id="kpiModal"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header" style={{ border: 'none'}}>
						<h5 className="modal-title col-7 text-right" id="example-Modal3">
							{props.modalMode === "create" ? "KPI SETUP" : "EDIT KPI"}
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
							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									KPI Name
								</label>
								<input
									type="text"
									className="form-control"
									value={props.kpi.name}
									name="name"
                  onChange={props.handleChange}
									placeholder="Name"
									autoComplete="off"
									required
								/>
							</div>

							<div className="form-group mb-0">
								<label for="recipient-name" className="form-control-label">
									Source
								</label>
								<React.Fragment>
									<Select
										className="w-100 pr-0 pl-0 col-md-12 mr-1"
										value={props.customSelect1}
										onChange={(e) => props.handleChange(e, "source")}
										options={props.sourceOptions}
										isSearchable="true"
										name="source"
										placeholder="Select"
									/>
									<input
										tabIndex={-1}
										value={props.kpi.source}
										onChange={(e) => props.handleChange(e, "source")}
										autoComplete="off"
										style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
										required={true}
									/>
                </React.Fragment>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									API key
								</label>
								<input
									type="text"
									className="form-control"
									value={props.kpi.apiKey}
									name="apiKey"
                  onChange={props.handleChange}
									placeholder="API Key"
									disabled={props.kpi.source === 'manual' ? true : false}
									required={props.kpi.source === 'automatic' ? true : false}
								/>
							</div>

              <div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Type
								</label>
								<React.Fragment>
								<Select
									className="w-100 pr-0 pl-0 col-md-12 mr-1"
									value={props.customSelect2}
									onChange={(e) => props.handleChange(e, "type")}
									options={props.typeOptions}
									isSearchable="true"
									name="type"
									placeholder="Select"
								/>
								<input
										tabIndex={-1}
										value={props.kpi.type}
										onChange={(e) => props.handleChange(e, "type")}
										autoComplete="off"
										style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
										required={true}
									/>
								</React.Fragment>
							</div>

					<div className="modal-footer justify-content-center" style={{ border: 'none'}}>
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




export function AddKpiToUserModal(props) {
	return (
		<div
			className="modal fade"
			id="addKpiToUserModal"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header" style={{ border: 'none'}}>
						<h5 className="modal-title col-7 text-right" id="example-Modal3">
							{props.modalMode === "create" ? "KPI SETUP" : "EDIT KPI"}
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
										onChange={(e) => props.handleChange(e, "kpiId")}
										options={props.kpiOptions}
										isSearchable="true"
										name="kpiId"
										placeholder="Select"
									/>
									<input
										tabIndex={-1}
										value={props.assignedData.kpiId}
										onChange={(e) => props.handleChange(e, "kpiId")}
										autoComplete="off"
										style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0}}
										required={true}
									/>
								</React.Fragment>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Target
								</label>
								<input
									type="number"
									className="form-control"
									value={props.assignedData.target}
									name="target"
                  onChange={props.handleChange}
									placeholder="Target"
									required
								/>
								<span className="text-danger">
								</span>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Score
								</label>
								<input
									type="number"
									className="form-control"
									value={props.assignedData.score}
									name="score"
                  onChange={props.handleChange}
									placeholder="Score"
									required
								/>
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
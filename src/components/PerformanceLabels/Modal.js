import React from 'react';

export function AddLabels(props) {
	return (
		<div
			className="modal fade"
			id="addLabels"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div className="modal-content">
					<div className="modal-header" style={{ border: 'none'}}>
						<h5 className="modal-title col-7 text-right" id="example-Modal3">
							{props.modalMode === "create" ? "Add Performance Label" : "EDIT Performance Label"}
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
									Name
								</label>
								<input
									type="text"
									className="form-control"
									value={props.postData.name}
									name="name"
                  onChange={props.handleChange}
									placeholder="Name"
									required
								/>
								<span className="text-danger">
								</span>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Highest Grade
								</label>
								<input
									type="text"
									className="form-control"
									value={props.postData.highestGrade}
									name="highestGrade"
                  onChange={props.handleChange}
									placeholder="Highest Grade"
									required
								/>
							</div>

              <div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Lowest Grade
								</label>
								<input
									type="text"
									className="form-control"
									value={props.postData.lowestGrade}
									name="lowestGrade"
                  onChange={props.handleChange}
									placeholder="Lowest Grade"
									required
								/>
							</div>

              <div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Color
								</label>
								<input
									type="color"
									className="form-control"
									value={props.postData.color}
									name="color"
                  onChange={props.handleChange}
									placeholder="Color"
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
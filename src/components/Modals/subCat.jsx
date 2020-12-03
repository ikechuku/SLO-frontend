import React from "react";
import Select from "react-select";

export function CategoryModal(props) {
	return (
		<div
			className="modal fade"
			id="CategoryModal"
			tabIndex="-1"
			Category="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog" Category="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="example-Modal3">
							{props.modalMode === "create"
								? "CREATE USER Category"
								: "EDIT USER Category"}
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
									Name
								</label>
								<input
									type="text"
									className="form-control"
									value={props.Category.name}
									name="name"
                                    onChange={props.handleChange}
                                    required
								/>
								{/* <span className="text-danger">
									{props.errorMessage1 !== null ? props.errorMessage1 : ""}
								</span> */}
							</div>

                                {
                                    props.actionType === "sub" ? (
                                        <div className="form-group">
                                        <label for="recipient-name" className="form-control-label">
                                            Select Category
                                            </label>
                                            <select name="departmentId"  onChange={props.handleChange} required  className="form-control">
												<option value="">Select</option>
                                              {  props.Category.Category.map((data)=>{
            
                                                    return(
                                                    <option  value={data.id}>{data.name}</option>
                                                    )
                                                })}
                                                
                                            </select>
                                            
                                        </div>

                                    ) : (
                                        <div className="form-group">
                                        <label for="recipient-name" className="form-control-label">
                                        Select Category
                                            </label>
                                            <select name="departmentId"  onChange={props.handleChange} required  className="form-control">
                                              {  props.departments.map((data)=>{
            
                                                    return(
                                                    <option  value={data.id}>{data.name}</option>
                                                    )
                                                })}
                                                
                                            </select>
                                            
                                        </div>
                                    )
                                }
                        

							

							
								
						
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

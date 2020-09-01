import React from "react";

export function SalaryStructureItemModal(props) {
	return (
		<div
			className="modal fade"
			id="exampleModal"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="example-Modal3">
						{
							props.modalType === "create" ? "Add" : "Edit"
						} Payroll Item
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

                            <div class="form-group">
    <label for="exampleFormControlSelect1">Select</label>
		{console.log('name', props.name)}
	<select
		value={props.name}
	 	name="name"
		onChange={props.handleChange} 
		class="form-control" id="exampleFormControlSelect1">
			<option value="" selected disabled>Select</option>
		{props.payrollData.map((data)=>{
			// console.log(data.id)
			return(
			
		
			
				<option value={data.id}>{data.name}</option>
			
				
			)
		})}
    
    </select>
  </div>

								<label for="recipient-name" className="form-control-label">
									Amount
								</label>
								<input
									type="number"
									className="form-control"
									value={props.amount}
									name="amount"
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
            } */}

{
							props.modalType === "create" ? (
								<button
								type="button"
								className="btn btn-primary"
								onClick={props.handleSubmit}
							>
							Create
							</button>
							) : ""
						}

{
							props.modalType === "edit" ? (
								<button
								type="button"
								className="btn btn-primary"
								onClick={props.editSalaryStructure}
							>
							Edit
							</button>
							) : ""
						}
					
					</div>
				</div>
			</div>
		</div>
	);
}

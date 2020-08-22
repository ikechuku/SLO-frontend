import React from "react";
import Select from "react-select";

export default function addPayrollItem2(props) {
	return (
		<div
			className="modal fade"
			id="addPayroll2"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="example-Modal3">
							Add Payroll Item
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
								<label for="" className="form-control-label">
									Payroll Item
								</label>
								<select
	value={props.name}
	 name="name"
	onChange={props.handleChange} 
	class="form-control" id="exampleFormControlSelect1">
			<option value="invalidData">Select</option>
		{props.payrollData.map((data)=>{
			// console.log(data.id)
			return(
			
		
			
				<option value={data.id}>{data.name}</option>
			
				
			)
		})}
    
    </select>
							</div>

							<div className="form-group">
								<label for="" className="form-control-label">
									Amount{" "}
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
							onClick={props.handleSubmit}
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

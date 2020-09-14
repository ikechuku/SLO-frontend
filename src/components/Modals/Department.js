import React from "react";

// export function DepartmentModal(props) {
//   return (
//     <div className="modal fade" id="createDepartment" tabindex="-1" role="dialog"  aria-hidden="true">
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="example-Modal3">CREATE NEW DEPARTMENT</h5>
//             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <form>
//               <div className="form-group">
//                 <label for="recipient-name" className="form-control-label">DEPARTMENT NAME</label>
//                 <input type="text" className="form-control" id="recipient-name"/>
//               </div>

//             </form>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
//             <button type="button" className="btn btn-primary">Create Now</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export function DepartmentModal(props) {
	return (
		<div
			className="modal fade"
			id="departmentModal"
			tabindex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="example-Modal3">
							{props.modalMode === "create"
								? "CREATE DEPARTMENT"
								: "EDIT DEPARTMENT"}
						</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							onClick={props.closeModal}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									DEPARTMENT NAME
								</label>
								<input
									type="text"
									className="form-control"
									value={props.department.name}
									name="name"
									onChange={props.handleChange}
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
							onClick={props.closeModal}
						>
							Close
						</button>
						{props.modalMode === "create" ? (
							<button
								type="button"
								className="btn btn-primary"
								onClick={props.handleCreate}
							>
								Create
							</button>
						) : (
							<button
								type="button"
								className="btn btn-primary"
								onClick={props.handleUpdate}
							>
								Update
							</button>
						)}
						{/* <button
							type="button"
							className="btn btn-primary"
							onClick={props.handleSubmit}
						>
							{props.modalMode === "create" ? "Create" : "Update"}
						</button> */}
					</div>
				</div>
			</div>
		</div>
	);
}

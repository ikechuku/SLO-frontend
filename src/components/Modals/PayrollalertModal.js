import React from "react";
import Select from "react-select";

export function PayrollalertModal(props) {
	return (
		<div
			className="modal fade"
			id="payrollSubmit"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div
				style={{ width: "250px" }}
				className="modal-dialog  modal-dialog-centered"
				role="document"
			>
				<div className="modal-content">
					<div className="modal-body">
						<div className="submitPayrollAlert">
							<span style={{ fontWeight: "600" }} className="alertText">
								Are you sure you want to submit
							</span>
							<button style={{ background: "#003766", color: "white" }}>
								Submit
							</button>
							<button data-dismiss="modal">Cancel</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

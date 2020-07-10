import React, { Component } from "react";

export default class previousPayroll extends Component {
	render() {
		return (
			<div>
				<div className="previousPayRollWrap">
					<div className="previousPayRollWrap-processPayroll">
						<h1>Previous Payroll Processes</h1>
					</div>

					<div className="previousPayroll">
						<div className="payrollLocation">Lagos</div>
						<span className="icon-ellipsis-vertical add-cursor"></span>
					</div>

					<div className="previousPayroll">
						<div className="payrollLocation">Abuja</div>
						<span className="icon-ellipsis-vertical add-cursor"></span>
					</div>

					<div className="previousPayroll">
						<div className="payrollLocation">Anambra</div>
						<span className="icon-ellipsis-vertical add-cursor"></span>
					</div>

					<div className="previousPayroll">
						<div className="payrollLocation">Kano</div>
						<span className="icon-ellipsis-vertical add-cursor"></span>
					</div>

					<div className="previousPayroll">
						<div className="payrollLocation">Abia</div>
						<span className="icon-ellipsis-vertical add-cursor"></span>
					</div>
				</div>
			</div>
		);
	}
}

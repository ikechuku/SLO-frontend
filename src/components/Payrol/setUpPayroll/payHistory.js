import React, { Component } from "react";

export default class payHistory extends Component {
	render() {
		return (
			<div>
				<div className="payHistory">
					<div className="payCube">
						<div className="innercubeContent">
							<span className="innerSpan1">Staff Paid</span>
							<span className="innerSpan2">1220</span>
						</div>
					</div>
					<div className="payCube2">
						{" "}
						<div className="innercubeContent">
							<span className="innerSpan1">Amount Dashboard</span>
							<span className="innerSpan2">475,0000</span>
						</div>
					</div>

					<div className="payCube3">
						{" "}
						<div className="innercubeContent">
							<span className="innerSpan1">Staff Pending</span>
							<span className="innerSpan2">120</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

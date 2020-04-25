import React, { Component } from "react";
import Layout from "../../../layout/index";
import "./pending.css";

export default class pendingRequet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showActions: false,
		};
	}
	showActionsForMobile = () => {
		let toggleVissibility = this.state.showActions;
		this.setState({
			showActions: !toggleVissibility,
		});
	};

	hideMobileModal = () => {
		if (this.state.showActions) {
			this.setState({
				showActions: false,
			});
		}
	};
	render() {
		return (
			<div class="animation par">
				<div className="pendingHeader">
					<div className="data1">
						<h1>Saturday, 1 june 2029</h1>
						<p>3 New Requests</p>
					</div>
					<div className="data22">
						<button>Total Requests: 10</button>
					</div>
				</div>

				<div className="AddpendingDIV">
					<input
						placeholder="Add New Task"
						className="pendingInput"
						type="text"
					/>
					<button className="btn- btn-sm">Add</button>
				</div>

				<div className="pendingss">
					<input type="checkbox" />

					<div className="username">
						<span>John Doe</span>

						<span>IT Dept</span>
					</div>
					<div className="request-type">
						<span className="">Open Leave Request</span>
					</div>
					<div className="approve_div">
						<button className="btn btn-sm pend-btn-aprove">Approve</button>
					</div>

					<div className="approve_div">
						<button className="btn btn-sm pend-btn-reject">Reject</button>
					</div>

					<div>
						<span className="date-p">10-12-1909</span>
					</div>

					<div>
						<span className="">
							<i class="fa fa-trash re-trash"></i>
							<i
								onClick={this.showActionsForMobile}
								class="fa fa-caret-down re-drop"
							></i>
							{this.state.showActions ? (
								<span className="show_btns_mobile">
									<span className="clsModal">
										<span onClick={this.hideMobileModal}>X</span>
									</span>
									<span className="mobile-dropD">
										<span className="mobile-btns">
											<button className="btn btn-sm pend-btn-aprove">
												Approve
											</button>
											<button className="btn btn-sm pend-btn-reject">
												Reject
											</button>
										</span>

										<span className="delREQ">
											<p>Delect Request</p>
											<i class="fa fa-trash "></i>
										</span>
									</span>
								</span>
							) : null}
						</span>
					</div>
				</div>

				<div className="pendingss">
					<input type="checkbox" />

					<div className="username">
						<span>John Doe</span>

						<span>IT Dept</span>
					</div>
					<div className="request-type">
						<span className="">Open Leave Request</span>
					</div>
					<div className="approve_div">
						<button className="btn btn-sm pend-btn-aprove">Approve</button>
					</div>

					<div className="approve_div">
						<button className="btn btn-sm pend-btn-reject">Reject</button>
					</div>

					<div>
						<span className="date-p">10-12-1909</span>
					</div>

					<div>
						<span className="">
							<i class="fa fa-trash re-trash"></i>
							<i
								onClick={this.showActionsForMobile}
								class="fa fa-caret-down re-drop"
							></i>
							{/* {this.state.showActions ? (
								<span className="show_btns_mobile">
									<span className="clsModal">
										<span onClick={this.hideMobileModal}>X</span>
									</span>
									<span className="mobile-dropD">
										<span className="mobile-btns">
											<button className="btn btn-sm pend-btn-aprove">
												Approve
											</button>
											<button className="btn btn-sm pend-btn-reject">
												Reject
											</button>
										</span>

										<span className="delREQ">
											<p>Delect Request</p>
											<i class="fa fa-trash "></i>
										</span>
									</span>
								</span>
							) : null} */}
						</span>
					</div>
				</div>

				<div className="pendingss">
					<input type="checkbox" />

					<div className="username">
						<span>John Doe</span>

						<span>IT Dept</span>
					</div>
					<div className="request-type">
						<span className="">Open Leave Request</span>
					</div>
					<div className="approve_div">
						<button className="btn btn-sm pend-btn-aprove">Approve</button>
					</div>

					<div className="approve_div">
						<button className="btn btn-sm pend-btn-reject">Reject</button>
					</div>

					<div>
						<span className="date-p">10-12-1909</span>
					</div>

					<div>
						<span className="">
							<i class="fa fa-trash re-trash"></i>
							<i
								onClick={this.showActionsForMobile}
								class="fa fa-caret-down re-drop"
							></i>
							{/* {this.state.showActions ? (
								<span className="show_btns_mobile">
									<span className="clsModal">
										<span onClick={this.hideMobileModal}>X</span>
									</span>
									<span className="mobile-dropD">
										<span className="mobile-btns">
											<button className="btn btn-sm pend-btn-aprove">
												Approve
											</button>
											<button className="btn btn-sm pend-btn-reject">
												Reject
											</button>
										</span>

										<span className="delREQ">
											<p>Delect Request</p>
											<i class="fa fa-trash "></i>
										</span>
									</span>
								</span>
							) : null} */}
						</span>
					</div>
				</div>

				<div className="pendingss">
					<input type="checkbox" />

					<div className="username">
						<span>John Doe</span>

						<span>IT Dept</span>
					</div>
					<div className="request-type">
						<span className="">Open Leave Request</span>
					</div>
					<div className="approve_div">
						<button className="btn btn-sm pend-btn-aprove">Approve</button>
					</div>

					<div className="approve_div">
						<button className="btn btn-sm pend-btn-reject">Reject</button>
					</div>

					<div>
						<span className="date-p">10-12-1909</span>
					</div>

					<div>
						<span className="">
							<i class="fa fa-trash re-trash"></i>
							<i
								onClick={this.showActionsForMobile}
								class="fa fa-caret-down re-drop"
							></i>
							{/* {this.state.showActions ? (
								<span className="show_btns_mobile">
									<span className="clsModal">
										<span onClick={this.hideMobileModal}>X</span>
									</span>
									<span className="mobile-dropD">
										<span className="mobile-btns">
											<button className="btn btn-sm pend-btn-aprove">
												Approve
											</button>
											<button className="btn btn-sm pend-btn-reject">
												Reject
											</button>
										</span>

										<span className="delREQ">
											<p>Delect Request</p>
											<i class="fa fa-trash "></i>
										</span>
									</span>
								</span>
							) : null} */}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

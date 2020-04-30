// import React, { Component } from "react";
// import Layout from "../layout/index";
// import ResponsibilityTable from "./responsibilityTable";
// import "./responsibility.css";

// export default class responsibilty extends Component {
// 	render() {
// 		return (
// 			<Layout page="responsibility">
// 				<div class="app-content">
// 					<section class="section">
// 						<ol class="breadcrumb">
// 							<li class="breadcrumb-item">
// 								<a href="#" class="text-muted">
// 									Home
// 								</a>
// 							</li>
// 							<li class="breadcrumb-item">
// 								<a href="#" class="text-muted">
// 									Performance
// 								</a>
// 							</li>
// 							<li class="breadcrumb-item active text-" aria-current="page">
// 								Branch
// 							</li>
// 						</ol>
// 						<div class="section-body">
// 							<div class="row">
// 								<div class="col-lg-12">
// 									<div class="card department-table-card">
// 										<div class="card-body department-table">
// 											<div class="card-header custom-header">
// 												<button
// 													type="button"
// 													class="btn "
// 													data-toggle="modal"
// 													data-target="#exampleModal3"
// 												>
// 													CREATE NEW
// 												</button>
// 												{/* <div class="inputf">
// 								<input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
// 						</div> */}
// 											</div>

// 											<ResponsibilityTable />
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</section>
// 				</div>
// 				<div
// 					class="modal fade"
// 					id="exampleModal3"
// 					tabindex="-1"
// 					role="dialog"
// 					aria-hidden="true"
// 				>
// 					<div class="modal-dialog" role="document">
// 						<div class="modal-content">
// 							<div class="modal-header">
// 								<h5 class="modal-title" id="example-Modal3">
// 									CREATE NEW RESPONSIBILITY
// 								</h5>
// 								<button
// 									type="button"
// 									class="close"
// 									data-dismiss="modal"
// 									aria-label="Close"
// 								>
// 									<span aria-hidden="true">&times;</span>
// 								</button>
// 							</div>
// 							<div class="modal-body">
// 								<form>
// 									<div class="form-group">
// 										<label for="recipient-name" class="form-control-label">
// 											Responsibility Name
// 										</label>
// 										<input
// 											type="text"
// 											class="form-control"
// 											id="recipient-name"
// 										/>
// 									</div>

// 									<label for="recipient-name" class="form-control-label">
// 										Avalable Roles
// 									</label>
// 									<select
// 										class="form-control sel"
// 										id="exampleFormControlSelect1"
// 									>
// 										<option value="nonex">Select Roles</option>
// 										<option value="RegionA">Region A</option>
// 										<option value="RegionB">Region B</option>
// 										<option value="RegionC">Region C</option>
// 										<option value="RegionD">Region D</option>
// 									</select>
// 								</form>
// 							</div>
// 							<div class="modal-footer">
// 								<button
// 									type="button"
// 									class="btn btn-danger"
// 									data-dismiss="modal"
// 								>
// 									Close
// 								</button>
// 								<button type="button" class="btn btn-primary">
// 									Create Now
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</Layout>
// 		);
// 	}
// }

import React, { Component } from "react";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { modal } from "bootstrap";
import Layout from "../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
// import "./branchStyle/branch.css";
import BranchTable from "./responsibilityTable";
import BranchModal from "../Modals/responsibility";

export default class branch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			responsibility: {},
			responsibilities: [],
			modalMode: "create",
			currentEditId: null,
			errorMessage1: null,
		};
	}

	handleChange = (e) => {
		const { responsibility } = this.state;
		if (e.target.name === "name") {
			responsibility[e.target.name] = e.target.value;
			this.setState({ responsibility, errorMessage1: null });
		} else {
			responsibility[e.target.name] = e.target.value;
			this.setState({ responsibility });
		}
	};

	componentDidMount() {
		this.getBranch();
	}

	// getBranch = async () => {
	// 	try {
	// 		const res = await httpGet("responsibilities");
	// 		showLoader();
	// 		if (res.code === 200) {
	// 			console.log(res.data);
	// 			this.setState({ responsibilities: res.data.responsibilities });
	// 			hideLoader();
	// 		}
	// 	} catch (error) {
	// 		hideLoader();
	// 		console.log(error);
	// 	}
	// };

	handleEdit = async (id) => {
		// const res = await httpGet(`branch/${id}`);
		// console.log(res.data);
		// if (res.code === 200) {
		// 	this.setState({
		// 		branch: res.data.branch,
		// 		currentEditId: id,
		// 		modalMode: "edit",
		// 	});
		// }
	};

	deleteBranch = async (id) => {
		// showLoader();
		// const { responsibilities } = this.state;
		// try {
		// 	const res = await httpDelete("delete_branch/" + id);
		// 	if (res.code === 200) {
		// 		hideLoader();
		// 		this.setState({
		// 			responsibilities: responsibilities.filter((branch) => branch.id !== id),
		// 		});
		// 	}
		// } catch (error) {
		// 	hideLoader();
		// 	console.log(error);
		// }
	};

	handleSubmit = async () => {
		const {
			responsibility,
			errorMessage1,
			modalMode,
			currentEditId,
		} = this.state;
		try {
			showLoader();
			if (responsibility.name === undefined || responsibility.name === "") {
				hideLoader();
				this.setState({ errorMessage1: "Branch name is required" });
				return;
			}
			if (errorMessage1 !== null) {
				hideLoader();
				return NotificationManager.warning("Complete all required fields");
			}
			if (modalMode === "create") {
				const res = await httpPost(`create_branch`, branch);
				if (res.code === 201) {
					$(".modal").modal("hide");
					$(document.body).removeClass("modal-open");
					$(".modal-backdrop").remove();
				}
			} else {
				const res = await httpPatch(`edit_branch/${currentEditId}`, branch);
				if (res.code === 200) {
					$(".modal").modal("hide");
					$(document.body).removeClass("modal-open");
					$(".modal-backdrop").remove();
				}
			}
			this.getBranch();
			this.clearState();
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

	clearState = () => {
		this.setState({
			branch: {
				name: "",
				roles: "",
			},
			modalMode: "create",
			currentEditId: null,
			errorMessage1: null,
		});
	};

	closeModal = () => {
		this.clearState();
	};

	render() {
		const { modalMode, errorMessage1, branch } = this.state;
		return (
			<Layout page="branch">
				<div class="app-content">
					<section class="section">
						<ol class="breadcrumb">
							<li class="breadcrumb-item">
								<a href="#" class="text-muted">
									Home
								</a>
							</li>
							<li class="breadcrumb-item">
								<a href="#" class="text-muted">
									Performance
								</a>
							</li>
							<li class="breadcrumb-item active text-" aria-current="page">
								Performance
							</li>
						</ol>
						<div class="section-body">
							<div class="row">
								<div class="col-md-10">
									<div class="card">
										<div class="card-header custom-header">
											<div class="col-md-12">
												<button
													type="button"
													class="btn "
													data-toggle="modal"
													data-target="#branchModal"
												>
													CREATE NEW
												</button>
											</div>
										</div>

										<div class="card-body">
											<BranchTable
												responsibilities={this.state.responsibilities}
												handleDelete={this.deleteBranch}
												handleEdit={this.handleEdit}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
				<BranchModal
					modalMode={modalMode}
					handleSubmit={this.handleSubmit}
					closeModal={this.closeModal}
					branch={branch}
					handleChange={this.handleChange}
					errorMessage1={errorMessage1}
				/>
			</Layout>
		);
	}
}

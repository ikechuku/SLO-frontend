import React, { Component } from "react";
import Layout from "../../layout/index";
import "./leave.css";
import LeaveTable from "./leaveTable";
import axios from "axios";

export default class CreateLeave extends Component {
	render() {
		return (
			<div>
				<Layout>
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
									KPI
								</li>
							</ol>
							<div class="section-body">
								<div class="row">
									<div class="col-lg-12">
										<div class="card">
											<div class="card-body">
												<div class="card-header remove-border custom-header">
													<button
														type="button"
														class="btn "
														data-toggle="modal"
														data-target="#exampleModal3"
													>
														CREATE NEW
													</button>
													<div class="inputf">
														<input placeholder="Input a Branch Name" />
														<button className="search-bt">Search</button>
													</div>
												</div>

												<LeaveTable />
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					<div
						class="modal fade"
						id="exampleModal3"
						tabindex="-1"
						role="dialog"
						aria-hidden="true"
					>
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="example-Modal3">
										CREATE LEAVE
									</h5>
									<button
										type="button"
										class="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<form>
										<div class="form-group">
											<label for="recipient-name" class="form-control-label">
												Leave Type
											</label>
											<input
												type="text"
												class="form-control"
												id="recipient-name"
											/>
										</div>

										<div class="form-group">
											<label for="recipient-name" class="form-control-label">
												Leave Duration
											</label>
											<input
												type="text"
												class="form-control"
												id="recipient-name"
											/>
										</div>

										<div class="form-group">
											<label for="recipient-name" class="form-control-label">
												Approval Level
											</label>
											<select
												class="form-control sel"
												id="exampleFormControlSelect1"
											>
												<option value="nonex">Select</option>
												<option value="RegionA">Level</option>
												<option value="ob TypeB">Level</option>
												<option value="ob TypeC">Level</option>
												<option value="ob TypeD">Level</option>
											</select>
										</div>

										<div class="form-group leave_cheack_box">
											<div>
												<label for="recipient-name" class="form-control-label">
													Paid Leave
												</label>
												<input type="checkbox" />
											</div>

											<div>
												<label for="recipient-name" class="form-control-label">
													Active Leave
												</label>
												<input type="checkbox" />
											</div>
										</div>

										<div className="line_BREAK"></div>

										<h1 className="leave_rules_header ">Leave Rules</h1>

										<div className="Rules">
											<span>
												<label
													for="recipient-name"
													class="form-control-label rules-labels"
												>
													Allow for negative balance
												</label>
												<input type="checkbox" />
											</span>

											<span>
												<label
													for="recipient-name"
													class="form-control-label rules-labels"
												>
													Leave applicable to male or female
												</label>
												<input type="checkbox" />
											</span>

											<span>
												<label
													for="recipient-name"
													class="form-control-label rules-labels"
												>
													Leave dependent on how long staff have spent in
													organisatio
												</label>
												<input type="checkbox" />
											</span>

											<span className="leave_sel_span">
												<label
													for="recipient-name"
													class="form-control-label rules-labels"
												>
													If Yes, How many days
												</label>
												<select
													class="form-control leave_sel"
													id="exampleFormControlSelect1"
												>
													<option value="nonex">Select</option>
													<option value="RegionA">Level</option>
													<option value="ob TypeB">Level</option>
													<option value="ob TypeC">Level</option>
													<option value="ob TypeD">Level</option>
												</select>
											</span>
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<button
										type="button"
										class="btn btn-danger"
										data-dismiss="modal"
									>
										Close
									</button>
									<button type="button" class="btn btn-primary">
										Create Now
									</button>
								</div>
							</div>
						</div>
					</div>

					<div
						class="modal fade"
						id="exampleModal45"
						tabindex="-1"
						role="dialog"
						aria-hidden="true"
					>
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="example-Modal3">
										CREATE EDIT BRANCH
									</h5>
									<button
										type="button"
										class="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<form>
										<div class="form-group">
											<label class="form-control-label">Branch Name</label>
											<input
												type="text"
												class="form-control"
												id="recipient-name"
											/>
										</div>

										<div class="form-group">
											<label class="form-control-label">Address</label>
											<input
												type="text"
												class="form-control"
												id="recipient-name"
											/>
										</div>

										<label for="recipient-name" class="form-control-label">
											Region
										</label>
										<select
											class="form-control sel"
											id="exampleFormControlSelect1"
										>
											<option value="">Select Region</option>
											<option value="RegionA">Region A</option>
											<option value="RegionB">Region B</option>
											<option value="RegionC">Region C</option>
											<option value="RegionD">Region D</option>
										</select>
									</form>
								</div>
								<div class="modal-footer">
									<button
										type="button"
										class="btn btn-danger"
										data-dismiss="modal"
									>
										Close
									</button>
									<button type="button" class="btn btn-primary">
										Create Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}

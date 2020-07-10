import React, { Component } from "react";
import "./index.css";
import { Collapse } from "react-collapse";

import Layout from "../layout/index";
export default class index extends Component {
	constructor(props) {
		super(props);
		const { togge1, togge2, togge3 } = this.props;

		this.state = { togge1, togge2, togge3, hideActions: true };
	}
	toggle = (toggl) => {
		let toggle = this.state.togge1;
		let toggle2 = this.state.togge2;
		let toggle3 = this.state.togge3;
		if (toggl === "togge1") {
			this.setState({
				togge1: !toggle,
			});
		}

		if (toggl === "togge3") {
			this.setState({
				togge3: !toggle3,
			});
		}
		if (toggl === "togge2") {
			this.setState({
				togge2: !toggle2,
			});
		}
	};

	hideActions = (hideBar) => {
		if (hideBar === "hideBar1") {
			this.setState({
				hideActions: !this.state.hideActions,
			});
		}
	};
	render() {
		return (
			<Layout page="salaryStructure">
				<div className="app-content">
					<section className="section">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="#" className="text-muted">
									Home
								</a>
							</li>
							<li className="breadcrumb-item">
								<a href="#" className="text-muted">
									Pay Now
								</a>
							</li>
						</ol>
						<div class="checkBoxW salaryStructure">
							<button
								type="button"
								className="payrolBtn "
								data-toggle="modal"
								data-target="#addPayroll"
							>
								<i class="fa fa-plus" aria-hidden="true"></i>
								Add Salary Structure
							</button>
						</div>
						<div className="DropDownWrap56">
							<div>
								<div className="dropDownColum ">
									<div className="dropHeader">
										{" "}
										<div
											onClick={(e) => this.toggle("togge1")}
											className="dropHead"
										>
											<span
												className={`${
													this.state.togge1
														? "fa fa-chevron-up"
														: "fa fa-chevron-down"
												}`}
											></span>{" "}
											<h1>Entry Level</h1>
										</div>
										<div className="verticalDots">
											<i
												onClick={(e) => this.hideActions("hideBar1")}
												class="fa fa-ellipsis-v"
												aria-hidden="true"
											></i>
											{this.state.hideActions === true ? (
												""
											) : (
												<div className="actionsSS">
													<span className="actionEdit">Edit</span>
													<span className="actiondelet">Delete</span>
												</div>
											)}
										</div>
									</div>
									<Collapse
										className="ReactCollapse--collapse"
										isOpened={this.state.togge1}
										hasNestedCollapse
									>
										<div className="dropContainer">
											<div className="flex1C">
												<span className="SSbasicSalary">Basic Salary</span>
												<span className="SSbasicSalaryFEE">N1200</span>
											</div>
											<div className="flex1C">
												<span className="SSbasicSalary">Overtime</span>
												<span className="SSbasicSalaryFEE">N1200</span>
											</div>
										</div>
										<div className="dropContainer">
											<div className="flex1C">
												<span className="SSbasicSalary">Basic Salary</span>
												<span className="SSbasicSalaryFEE">N1200</span>
											</div>
											<div className="flex1C">
												<span className="SSbasicSalary">Overtime</span>
												<span className="SSbasicSalaryFEE">N1200</span>
											</div>
										</div>
									</Collapse>
								</div>
							</div>
							<div>
								<div className="dropDownColum ">
									<div className="dropHeader">
										{" "}
										<div
											onClick={(e) => this.toggle("togge2")}
											className="dropHead"
										>
											<span
												className={`${
													this.state.togge2
														? "fa fa-chevron-up"
														: "fa fa-chevron-down"
												}`}
											></span>{" "}
											<h1>Management Level</h1>
										</div>
										<div className="verticalDots">
											<i
												onClick={(e) => this.hideActions("hideBar1")}
												class="fa fa-ellipsis-v"
												aria-hidden="true"
											></i>
										</div>
									</div>
									<Collapse
										className="ReactCollapse--collapse"
										isOpened={this.state.togge2}
										hasNestedCollapse
									>
										<div className="dropContainer">
											<div className="flex1C">
												<span className="SSbasicSalary">Basic Salary</span>
												<span className="SSbasicSalaryFEE">N1200</span>
											</div>
											<div className="flex2C">
												<span className="SSbasicSalary">Overtime</span>
												<span className="SSbasicSalaryFEE">N1200</span>
											</div>
										</div>
									</Collapse>
								</div>
							</div>
							<div>
								<div className="dropDownColum ">
									<div className="dropHeader">
										{" "}
										<div
											onClick={(e) => this.toggle("togge3")}
											className="dropHead"
										>
											<span
												className={`${
													this.state.togge3
														? "fa fa-chevron-up"
														: "fa fa-chevron-down"
												}`}
											></span>{" "}
											<h1>Senior Level</h1>
										</div>
										<div className="verticalDots">
											<i
												onClick={(e) => this.hideActions("hideBar1")}
												class="fa fa-ellipsis-v"
												aria-hidden="true"
											></i>
										</div>
									</div>
									<Collapse
										className="ReactCollapse--collapse"
										isOpened={this.state.togge3}
										hasNestedCollapse
									>
										<div className="dropContainer">
											<div className="flex1C">
												<span className="SSbasicSalary">Basic Salary</span>
												<span className="SSbasicSalaryFEE">N1200</span>
											</div>
											<div className="flex2C">
												<span className="SSbasicSalary">Overtime</span>
												<span className="SSbasicSalaryFEE">N1200</span>
											</div>
										</div>
									</Collapse>
								</div>
							</div>
							{/* DROPDOWN WRAP END */}
						</div>
					</section>
				</div>
			</Layout>
		);
	}
}

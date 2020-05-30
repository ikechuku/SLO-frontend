import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import $ from "jquery";
import Layout from "../layout/index";
import RoleTable from "./kpiTable";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import { KpiModal } from "../Modals/KPImodal";
import "./kpi.css";
import { array } from "prop-types";

export default class Role extends Component {
	constructor() {
		super();
		this.state = {
			KPIS: [],
			roles: [],
			modalMode: "create",
			role: {},
			currentEditId: null,
			roleOptions: [],
			responsibilityOptions: [],
			customSelect1: null,
			customSelect2: null,
			errorMessage1: null,
			errorMessage2: null,
			roleID: null,
			weightMarkCount: [],
		};
	}

	componentDidMount() {
		this.getRoles();
		this.getKPI();
	}

	getKPI = async () => {
		try {
			const res = await httpGet("kpis/all");

			console.log(res);
			if (res.code === 200) {
				let weightMark = res.data.kpis.map((data) => {
					this.setState({
						weightMarkCount: data.weightMark,
					});
					console.log(this.state.weightMarkCount);
				});
				this.setState({
					KPIS: res.data.kpis,
				});
				hideLoader();
				console.log(this.state.KPIS);
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

	getRoles = async () => {
		try {
			const res = await httpGet("role_responsibility");

			showLoader();
			if (res.code === 200) {
				console.log(res.data);

				let optionList = [];
				await [...res.data.role].map((data) =>
					optionList.push({ value: data.id, label: data.title })
				);

				this.setState({
					roles: res.data.role,
					roleOptions: optionList,
				});
				console.log(this.state.roles);
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

	handleChange = async (e, name) => {
		const { role } = this.state;
		if (name === "responsibilityId") {
			role[name] = e.value;
			await this.setState({ role, customSelect2: e, errorMessage2: null });
		} else if (name === "roleId") {
			role[name] = e.value;
			// console.log(e.value);
			await this.setState({ role, customSelect1: e });
			this.getResponsibility();
		} else {
			role[e.target.name] = e.target.value;
			this.setState({ role, errorMessage1: null });
		}
	};

	getResponsibility = async () => {
		const { role, roles } = this.state;

		let newRole = [...roles].filter((item) => item.id === role.roleId)[0];
		console.log(newRole);
		let optionList = [];
		await newRole.responsibility.map((data) =>
			optionList.push({ value: data.id, label: data.name })
		);
		console.log(optionList);
		this.setState({ responsibilityOptions: optionList });
	};

	handleEdit = async (id) => {
		showLoader();
		const res = await httpGet(`kpi/${id}`);
		console.log(res.data);
		if (res.code === 200) {
			hideLoader();
			const customSelect1 =
				res.data.kpi.responsibilityId !== null
					? {
							value: res.data.kpi.responsibilityId,
							label: res.data.kpi.responsibility.role.title,
					  }
					: "";
			const customSelect2 =
				res.data.kpi.roleId !== null
					? {
							value: res.data.kpi.responsibility.roleId,
							label: res.data.kpi.responsibility.name,
					  }
					: null;
			this.setState({
				role: res.data.kpi,
				currentEditId: id,
				modalMode: "edit",
				customSelect1,
				customSelect2,
			});
		}
	};

	handleDelete = async (id) => {
		const { KPIS } = this.state;
		showLoader();
		const res = await httpDelete(`kpi/delete/${id}`);
		if (res.code === 200) {
			this.setState({
				KPIS: KPIS.filter((KPI) => KPI.id !== id),
			});

			hideLoader();
		}
	};

	handleSubmit = async (btnType) => {
		showLoader();
		const {
			role,
			currentEditId,
			modalMode,
			errorMessage1,
			errorMessage2,
		} = this.state;
		console.log(role);
		if (role.name === undefined || role.name === "") {
			hideLoader();
			this.setState({ errorMessage1: "Job title is required" });
			return;
		}

		if (role.responsibilityId === undefined || role.responsibilityId === "") {
			hideLoader();
			this.setState({ errorMessage2: "Department is required" });
			return;
		}

		if (errorMessage1 !== null || errorMessage2 !== null) {
			hideLoader();
			return NotificationManager.warning("Complete all required fields");
		}

		parseInt(role.weightMark);
		console.log(role.weightMark);
		console.log(role);
		if (modalMode === "create") {
			const res = await httpPost(`kpi/create`, role);
			if (res.code === 201) {
				$(".modal").modal("hide");
				$(document.body).removeClass("modal-open");
				$(".modal-backdrop").remove();
			}
		} else {
			const res = await httpPatch(`kpi/update/${currentEditId}`, role);
			if (res.code === 200) {
				$(".modal").modal("hide");
				$(document.body).removeClass("modal-open");
				$(".modal-backdrop").remove();
			}
		}
		this.getKPI();
		this.clearState();
		hideLoader();
	};

	clearState = () => {
		this.setState({
			role: {
				title: "",
				responsibilityId: "",
			},
			modalMode: "create",
			currentEditId: null,
			customSelect1: null,
			customSelect2: null,
			errorMessage1: null,
			errorMessage2: null,
		});
	};

	closeModal = () => {
		this.clearState();
	};

	render() {
		const {
			KPIS,
			modalMode,
			role,
			roleOptions,
			customSelect1,
			customSelect2,
			errorMessage1,
			errorMessage2,
		} = this.state;

		return (
			<Layout page="kpi">
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
								<div class="col-md-7">
									<div class="card">
										<div class="card-header custom-header">
											<div className="col col-md-12">
												<button
													type="button"
													data-backdrop="static"
													class="btn "
													data-toggle="modal"
													data-target="#kpiModal"
												>
													CREATE NEW
												</button>
												{/* <div class="inputf">
														<input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
												</div> */}
											</div>
										</div>

										<div class="card-body">
											<div className="base-score">
												<span>Base Score:</span>
												<span>50</span>
											</div>
											<RoleTable
												roles={KPIS}
												modalMode={modalMode}
												handleEdit={this.handleEdit}
												handleDelete={this.handleDelete}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

				<KpiModal
					role={role}
					roleOptions={roleOptions}
					responsibilityOptions={this.state.responsibilityOptions}
					customSelect1={customSelect1}
					customSelect2={customSelect2}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					closeModal={this.closeModal}
					modalMode={modalMode}
					errorMessage1={errorMessage1}
					errorMessage2={errorMessage2}
				/>
			</Layout>
		);
	}
}

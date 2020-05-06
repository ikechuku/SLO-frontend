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

export default class Role extends Component {
	constructor() {
		super();
		this.state = {
			KPIS: [],
			roles: [],
			departments: [],
			modalMode: "create",
			role: {},
			currentEditId: null,
			departmentOptions: [],
			unitOptions: [],
			customSelect1: null,
			customSelect2: null,
			errorMessage1: null,
			errorMessage2: null,
			roleID: null,
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
				this.setState({ KPIS: res.data.kpis });
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

					departments: res.data.role,
					departmentOptions: optionList,
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
			await this.setState({ role, customSelect1: e, errorMessage2: null });
			this.getResponsibility();
		} else if (name === "roleId") {
			role[name] = e.value;
			this.setState({ role, customSelect2: e });
		} else {
			role[e.target.name] = e.target.value;
			this.setState({ role, errorMessage1: null });
		}
	};

	getResponsibility = async () => {
		const { departments, role } = this.state;
		let newRole = [];
		newRole = [...departments].filter(
			(item) => item.id === role.responsibilityId
		)[0];
		console.log(role.responsibilityId);
		let optionList = [];
		await newRole.responsibility.map((data) =>
			optionList.push({ value: data.id, label: data.name })
		);
		console.log(optionList);
		this.setState({ unitOptions: optionList });
	};

	handleEdit = async (id) => {
		const res = await httpGet(`role/${id}`);
		console.log(res.data);
		if (res.code === 200) {
			const customSelect1 =
				res.data.role.responsibilityId !== null
					? {
							value: res.data.role.responsibilityId,
							label: res.data.role.department.name,
					  }
					: {
							value: res.data.role.unit.responsibilityId,
							label: res.data.role.unit.department.name,
					  };
			const customSelect2 =
				res.data.role.roleId !== null
					? { value: res.data.role.roleId, label: res.data.role.unit.name }
					: null;
			this.setState({
				role: res.data.role,
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
			const res = await httpPatch(`role/update/${currentEditId}`, role);
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
			departmentOptions,
			customSelect1,
			customSelect2,
			errorMessage1,
			errorMessage2,
		} = this.state;
		return (
			<Layout page="roles">
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
								Role
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
					departmentOptions={departmentOptions}
					unitOptions={this.state.unitOptions}
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

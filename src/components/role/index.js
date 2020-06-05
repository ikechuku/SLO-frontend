import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import $ from "jquery";
import Layout from "../layout/index";
import RoleTable from "./roleTable";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import { RoleModal } from "../Modals/Role";
// import  './departmentTable.css'

export default class Role extends Component {
	constructor() {
		super();
		this.state = {
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
		};
	}

	componentDidMount() {
		this.getRoles();
	}

	getRoles = async () => {
		try {
			const res = await httpGet("roles");
			showLoader();
			if (res.code === 200) {
				// console.log(res.data);
				// let optionList = [];
				// await [...res.data.departmentUnit].map(data => {
				// 	if(!data.units.length){
				// 		optionList.push({ value: data.id, label: data.name });
				// 	} else {
				// 		[...data.units].map(item => (
				// 			optionList.push({ value: item.id, label: data.name + '/' + item.name })
				// 		))
				// 	}
				// });
				let optionList = [];
				await [...res.data.departmentUnit].map((data) =>
					optionList.push({ value: data.id, label: data.name })
				);

				this.setState({
					roles: res.data.roles,
					departments: res.data.departmentUnit,
					departmentOptions: optionList,
				});
				console.log(this.state.departmentOptions);
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

	handleChange = async (e, name) => {
		const { role } = this.state;
		if (name === "departmentId") {
			role[name] = e.value;
			await this.setState({ role, customSelect1: e, errorMessage2: null });
			this.getUnits();
		} else if (name === "unitId") {
			role[name] = e.value;
			this.setState({ role, customSelect2: e });
		} else {
			role[e.target.name] = e.target.value;
			this.setState({ role, errorMessage1: null });
		}
	};

	getUnits = async () => {
		const { departments, role } = this.state;
		let newRole = [];
		newRole = [...departments].filter(
			(item) => item.id === role.departmentId
		)[0];
		console.log(role.departmentId);
		let optionList = [];
		await newRole.units.map((data) =>
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
				res.data.role.departmentId !== null
					? {
							value: res.data.role.departmentId,
							label: res.data.role.department.name,
					  }
					: {
							value: res.data.role.unit.departmentId,
							label: res.data.role.unit.department.name,
					  };
			const customSelect2 =
				res.data.role.unitId !== null
					? { value: res.data.role.unitId, label: res.data.role.unit.name }
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
		showLoader();
		const res = await httpDelete(`role/delete/${id}`);
		if (res.code === 200) {
			this.getRoles();
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

		if (role.title === undefined || role.title === "") {
			hideLoader();
			this.setState({ errorMessage1: "Job title is required" });
			return;
		}

		if (role.departmentId === undefined || role.departmentId === "") {
			hideLoader();
			this.setState({ errorMessage2: "Department is required" });
			return;
		}

		if (errorMessage1 !== null || errorMessage2 !== null) {
			hideLoader();
			return NotificationManager.warning("Complete all required fields");
		}

		if (modalMode === "create") {
			const res = await httpPost(`role/create`, role);
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
		this.getRoles();
		this.clearState();
		hideLoader();
	};

	clearState = () => {
		this.setState({
			role: {
				title: "",
				departmentId: "",
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
			roles,
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
									Performance
								</a>
							</li>
							<li className="breadcrumb-item active text-" aria-current="page">
								Role
							</li>
						</ol>
						<div className="section-body">
							<div className="row">
								<div className="col-md-7">
									<div className="card">
										<div className="card-header custom-header">
											<div className="col col-md-12">
												<button
													type="button"
													className="btn "
													data-toggle="modal"
													data-target="#roleModal"
												>
													CREATE NEW
												</button>
												{/* <div className="inputf">
														<input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
												</div> */}
											</div>
										</div>

										<div className="card-body">
											<RoleTable
												roles={roles}
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

				<RoleModal
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

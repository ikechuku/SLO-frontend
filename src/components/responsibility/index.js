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
// import "./branchStyle/responsibilities.css";
import ResponsibilityTable from "./responsibilityTable";
import ResponsibilityModal from "../Modals/responsibility";

export default class responsibilities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			responsibility: {},
			responsibilities: [],

			roles: [],
			modalMode: "create",
			role: {},
			currentEditId: null,
			roleOptions: [],
			customSelect1: null,

			errorMessage1: null,
			errorMessage2: null,
		};
	}
	getRoles = async () => {
		try {
			const res = await httpGet("roles");
			showLoader();
			if (res.code === 200) {
				let optionList = [];
				await [...res.data.roles].map((data) =>
					optionList.push({ value: data.id, label: data.title })
				);

				this.setState({
					roles: res.data.roles,
					roleOptions: optionList,
				});
				console.log(this.state.roleOptions);
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};
	handleChange = async (e, name) => {
		const { responsibility } = this.state;
		if (name === "roleId") {
			responsibility[name] = e.value;
			await this.setState({
				responsibility,
				customSelect1: e,
				errorMessage2: null,
			});
		} else {
			responsibility[e.target.name] = e.target.value;
			this.setState({ responsibility, errorMessage1: null });
		}
	};

	componentDidMount() {
		this.getResponsibility();
		this.getRoles();
	}

	getResponsibility = async () => {
		try {
			const res = await httpGet("responsibilities");

			console.log(res);
			if (res.code === 200) {
				this.setState({ responsibilities: res.data.responsibilities });
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

	handleEdit = async (id) => {
		showLoader();
		const res = await httpGet(`/responsibility/${id}`);
		console.log(res.data);
		hideLoader();
		if (res.code === 200) {
			const customSelect1 = {
				value: res.data.responsibility.role.title,
				label: res.data.responsibility.role.title,
			};

			this.setState({
				responsibility: res.data.responsibility,
				currentEditId: id,
				customSelect1: customSelect1,
				modalMode: "edit",
			});
			console.log(this.state.responsibility);
		}
	};

	handleDelete = async (id) => {
		showLoader();
		const { responsibilities } = this.state;
		try {
			const res = await httpDelete(`responsibility/delete/${id}`);
			if (res.code === 200) {
				hideLoader();
				this.setState({
					responsibilities: responsibilities.filter(
						(responsibility) => responsibility.id !== id
					),
				});
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

	handleSubmit = async (btnType) => {
		showLoader();
		const {
			responsibility,
			currentEditId,
			modalMode,
			errorMessage1,
			errorMessage2,
		} = this.state;

		if (responsibility.name === undefined || responsibility.name === "") {
			hideLoader();
			this.setState({ errorMessage1: "Responsibility name is required" });
			return;
		}

		if (responsibility.roleId === undefined || responsibility.roleId === "") {
			hideLoader();
			this.setState({ errorMessage2: "Role is required" });
			return;
		}

		if (errorMessage1 !== null || errorMessage2 !== null) {
			hideLoader();
			return NotificationManager.warning("Complete all required fields");
		}

		if (modalMode === "create") {
			const res = await httpPost(`responsibility/create`, responsibility);
			if (res.code === 201) {
				$(".modal").modal("hide");
				$(document.body).removeClass("modal-open");
				$(".modal-backdrop").remove();
			}
		} else {
			const res = await httpPatch(
				`responsibility/update/${currentEditId}`,
				responsibility
			);
			if (res.code === 200) {
				$(".modal").modal("hide");
				$(document.body).removeClass("modal-open");
				$(".modal-backdrop").remove();
			}
		}
		this.getResponsibility();
		this.clearState();
		hideLoader();
	};

	clearState = () => {
		this.setState({
			role: {
				title: "",
			},
			modalMode: "create",
			currentEditId: null,
			customSelect1: null,
			customSelect2: null,
			errorMessage1: null,
			errorMessage2: null,

			responsibility: null,
		});
	};

	closeModal = () => {
		this.clearState();
	};

	render() {
		const {
			responsibility,
			modalMode,
			role,
			roleOptions,
			customSelect1,
			customSelect2,
			errorMessage1,
			errorMessage2,
		} = this.state;
		return (
			<Layout page="responsibility">
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
								Responsibility
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
													data-backdrop="static"
												>
													CREATE NEW
												</button>
												{/* <div className="inputf">
														<input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
												</div> */}
											</div>
										</div>

										<div className="card-body">
											<ResponsibilityTable
												responsibilities={this.state.responsibilities}
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

				<ResponsibilityModal
					responsibility={responsibility}
					roleOptions={roleOptions}
					customSelect1={customSelect1}
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

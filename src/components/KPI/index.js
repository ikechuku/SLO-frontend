import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import $ from "jquery";
import Layout from "../layout/index";
import KpiTable from "./kpiTable";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import { KpiModal } from "./Modal";
import "./kpi.css";
import { Confirm } from "../Modals/Confirm";
import removeEmptyString from '../../helpers/removeEmptyString';

export default class Role extends Component {
	constructor() {
		super();
		this.state = {
			kpis: [],
			modalMode: "create",
			kpi: {},
			currentEditId: null,
			sourceOptions: [
				{ value: 'automatic', label: 'Automatic' },
				{ value: 'manual', label: 'Manual' }
			],
			typeOptions: [
				{ value: 'positive', label: 'Positive' },
				{ value: 'negative', label: 'Negative' }
			],
			customSelect1: null,
			customSelect2: null,
			id: null
		};
	}

	componentDidMount() {
		showLoader();
		this.getKPI();
	}

	getKPI = async () => {
		try {
			const res = await httpGet("kpis/all");

			if (res.code === 200) {
				this.setState({
					kpis: res.data.kpis,
				});
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

	handleEdit = async (id) => {
		showLoader();
		const { kpis} = this.state;
		let filteredKpi = [...kpis].filter(item => item.id === id)[0];

		hideLoader();
		const customSelect1 = filteredKpi.source !== null ? 
			{
				value: filteredKpi.source,
				label: filteredKpi.source === 'manual' ? 'Manual' : 'Automatic',
			} : null;
		const customSelect2 = filteredKpi.type !== null
				? {
						value: filteredKpi.type,
						label: filteredKpi.type,
					}
				: null;

		this.setState({
			kpi: filteredKpi,
			currentEditId: id,
			modalMode: "edit",
			customSelect1,
			customSelect2,
		});
	};

	handlePassId = (id) => {
		this.setState({ id })
	}

	handleDelete = async () => {
		const { kpis, id } = this.state;
		showLoader();
		const res = await httpDelete(`kpi/delete/${id}`);
		if (res.code === 200) {
			this.setState({
				kpis: kpis.filter((item) => item.id !== id),
				id: null
			});
			hideLoader();
			$(".modal").modal("hide");
			$(document.body).removeClass("modal-open");
			$(".modal-backdrop").remove();
		}
		this.clearState();
	};

	handleChange = async (e, name) => {
		const { kpi } = this.state;
		if (name === "source") {
			kpi[name] = e.value;
			await this.setState({ kpi, customSelect1: e });
		} else if (name === "type") {
			kpi[name] = e.value;
			await this.setState({ kpi, customSelect2: e });
		} else {
			kpi[e.target.name] = e.target.value;
			this.setState({ kpi });
		}
	};

	handleSubmit = async(e) => {
		e.preventDefault();
		try{
			showLoader();
			const { kpi, modalMode, currentEditId } = this.state;
			const kpiData = removeEmptyString(kpi)
			if (modalMode === "create") {
				const res = await httpPost(`kpi/create`, kpiData);
				if (res.code === 201) {
					$(".modal").modal("hide");
					$(document.body).removeClass("modal-open");
					$(".modal-backdrop").remove();
					hideLoader();
				}
			} else {
				const res = await httpPatch(`kpi/update/${currentEditId}`, kpiData);
				if (res.code === 200) {
					$(".modal").modal("hide");
					$(document.body).removeClass("modal-open");
					$(".modal-backdrop").remove();
					hideLoader();
				}
			}
			this.getKPI();
			this.clearState();
			hideLoader();
		}catch(error){
			hideLoader();
			console.log(error)
		}
	}

	clearState = () => {
		this.setState({
			kpi: {
				name: '',
				source: '',
				apiKey: '',
				type: ''
			},
			modalMode: "create",
			currentEditId: null,
			customSelect1: null,
			customSelect2: null,
		});
		// $(".close-btn").click();
		// console.log($(".close-btn"))
	};

	closeModal = () => {
		this.clearState();
	};

	render() {
		return (
			<Layout page="kpi">
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
								KPI
							</li>
						</ol>
						<div className="section-body animation">
							<div className="row">
								<div className="col-md-8">
									<div className="card">
                    <div className="mt-5 mb-3 text-center">
                      <h4>Manage KPI</h4>
                    </div>
										<div className="card-header custom-kpi-header" style={{ padding: '15px 30px', borderBottom: 'none'}}>
											<div className="col col-md-12 pl-0 pr-0">
                        <div className="row">
                          <div className="col-6">
                            <button
                              type="button"
                              data-backdrop="static"
                              className="btn "
                              data-toggle="modal"
                              data-target="#kpiModal"
                            >
                              CREATE NEW
                            </button>
                          </div>
                          <div className="col-6 text-right">
                            <button className="pl-5 pr-5" style={{ border: 'none', background: '#E7F5FF', borderRadius: '4px' }} onClick={() => this.props.history.push('/assign_kpi')}>Assign Kpi</button>
                          </div>
                        </div>
											</div>
										</div>

										<div className="card-body">
											<KpiTable
                        kpis={this.state.kpis || []}
												handleEdit={this.handleEdit}
												handlePassId={this.handlePassId}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

        <KpiModal
          kpi={this.state.kpi || {}}
					modalMode={'create'}
					sourceOptions={this.state.sourceOptions}
					typeOptions={this.state.typeOptions}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					customSelect1={this.state.customSelect1}
					customSelect2={this.state.customSelect2}
					closeModal={this.closeModal}
				/>

				<Confirm 
					handleAction={this.handleDelete}
          modalAction={'delete'}
        />
			</Layout>
		);
	}
}

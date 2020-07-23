import React, { Component } from 'react';
import $ from 'jquery';
import Table from "../../helpers/customTable";
import Layout from '../layout';
import {DeleteSvg} from '../../helpers/Svg'
import { Confirm } from '../Modals/Confirm';
import { AddKpiToUserModal } from './Modal';
import { hideLoader, showLoader } from '../../helpers/loader';
import { httpGet, httpPost, httpPatch, httpDelete } from '../../actions/data.action';

const test = [
	{
		name: 'Load Disbursed',
		target: 1000000,
		score: 10,
	}
]

export default class UserList extends Component {
	constructor(props){
		super(props)
		this.state = {
			assignedKpiUsers: [],
			assignedData: {},
			modalMode: 'create',
			userId: null,
			kpiOptions: [],
			customSelect: null,
			currentId: null

		}
	}

	componentDidMount = () => {
		console.log('>>>', this.props.userId)
		showLoader();
		this.getAssignedKpis();
		this.getKPI();
		hideLoader();
	}

	componentDidUpdate(prevProps){
		if(prevProps !== this.props){
			this.setState({ userId: this.props.userId });
		}
	}

	getKPI = async () => {
		try {
			const res = await httpGet("kpis/all");

			if (res.code === 200) {
				let kpiOptions = [];
				await res.data.kpis.map((data) =>
					kpiOptions.push({ value: data.id, label: data.name })
				);
				this.setState({
					kpiOptions
				});
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

	getAssignedKpis = async () => {
		const res = await httpGet(`assigned_kpi_users?userId=${this.props.userId}`);
		if(res.code === 200){
			console.log(res.data.assignedKpis)
			this.setState({ 
				assignedKpiUsers: res.data.assignedKpis
			});
		}
	}

	handleChange = (e, name) => {
		const { assignedData } = this.state;
		if(name === 'kpiId'){
			assignedData[name] = e.value;
			this.setState({ assignedData, customSelect: e });
		} else {
			assignedData[e.target.name] = e.target.value;
			this.setState({ assignedData })
		}
	}

	handleEdit = async (id) => {
		showLoader();
		const { assignedKpiUsers} = this.state;
		let filteredData = [...assignedKpiUsers].filter(item => item.id === id)[0];

		hideLoader();
		const customSelect = filteredData.kpiId !== null ? 
			{
				value: filteredData.kpiId,
				label: filteredData.kpi ? filteredData.kpi.name : '',
			} : null;

		this.setState({
			assignedData: filteredData,
			currentId: id,
			modalMode: "edit",
			customSelect,
		});
	};

	handleDelete = async () => {
		const { assignedKpiUsers, currentId } = this.state;
		showLoader();
		const res = await httpDelete(`delete_assigned_kpi/${currentId}`);
		if (res.code === 200) {
			this.setState({
				assignedKpiUsers: [...assignedKpiUsers].filter((item) => item.id !== currentId),
				currentId: null
			});
			hideLoader();
			$(".modal").modal("hide");
			$(document.body).removeClass("modal-open");
			$(".modal-backdrop").remove();
		}
		this.clearState();
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		console.log(this.state.assignedData)
		const { assignedData, modalMode, currentId } = this.state;
		const kpiData = {
			userId: this.props.userId,
			kpiId: assignedData.kpiId,
			target: parseInt(assignedData.target),
			score: parseInt(assignedData.score),
		};
		if (modalMode === "create") {
			const res = await httpPost(`assign_kpi`, kpiData);
			if (res.code === 201) {
				$(".modal").modal("hide");
				$(document.body).removeClass("modal-open");
				$(".modal-backdrop").remove();
			}
		} else {
			const res = await httpPatch(`update_assigned_kpi/${currentId}`, kpiData);
			if (res.code === 200) {
				$(".modal").modal("hide");
				$(document.body).removeClass("modal-open");
				$(".modal-backdrop").remove();
			}
		}
		this.getAssignedKpis();
		this.clearState();
		hideLoader();
	}

	clearState = () => {
		this.setState({
			assignedData: {
				kpiId: '',
				target: '',
				score: '',
			},
			modalMode: "create",
			currentId: null,
			customSelect: null,
		});
	};

	closeModal = () => {
		this.clearState();
	};
	

  bodyRow = () => {
		const body = this.state.assignedKpiUsers.map((data, index) => ({
			name: data.kpi.name,
			target: data.target,
			score: data.score,
			action: (
				<a>
					<span
						className="edit"
						data-toggle="modal"
						data-target="#addKpiToUserModal"
						data-backdrop="static"
						onClick={() => this.handleEdit(data.id)}
					>
						Edit
					</span>
					<span className="del ml-5" 
						data-toggle="modal"
						data-target="#confirm"
						onClick={() => this.setState({ currentId: data.id } )}
					>
						 <DeleteSvg />
					</span>
				</a>
			),
		}));
		return body;
	};
	header = () => {
		const header = [
			{
				title: "Name (filterable)",
				prop: "name",
				sortable: true,
				filterable: true,
			},
			{ title: "Target", prop: "target", sortable: true },
			{ title: "Score", prop: "score", sortable: true },
			{ title: " ", prop: "action" },
		];
		return header;
  };
  
  render() {
		console.log(this.state.assignedKpiUsers)
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
								<div className="col-md-9">
									<div className="card">
                    <div className="mt-5 mb-4 text-center">
                      <h4>Assign KPI</h4>
                    </div>

										<div className="card-body">
                      <div className="base-score" style={{ border: 'none'}}>
                        <span className="p">{this.props.user.lastName + ' ' + this.props.user.firstName}</span>
                        <span className="font-weight-normal pb-1 add-cursor" style={{fontSize: '12px'}} onClick={this.props.handleChangeDisplay}>change user</span>
                      </div>
											{/* <div className="base-score">
												<span>Total:</span>
												<span className="text-danger"style={{fontSize: '25px'}} >10%</span>
											</div> */}
                      <div className="table-responsive" style={{ overflow: "hidden" }}>
                        <Table
                          body={this.bodyRow}
                          head={this.header}
                          rowsPerPage={10}
                          rowsPerPageOption={[10, 15, 20, 25]}
                        />
                      </div>
                      <div className="col-12 text-center mt-5">
                        <button className="btn btn-primary rounded-circle d-inline-block" style={{ padding: '6px 12px'}} data-toggle="modal" data-target="#addKpiToUserModal">
                          <i className="fa fa-plus"></i>
                        </button>
                        <p className="ml-2 d-inline-block" data-toggle="modal" data-target="#addKpiToUserModal">Add KPI</p>
                      </div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

        <AddKpiToUserModal 
          modalMode={this.state.modalMode}
					assignedData={this.state.assignedData}
					kpiOptions={this.state.kpiOptions}
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					customSelect={this.state.customSelect}
					closeModal={this.closeModal}
        />

				<Confirm 
					handleAction={this.handleDelete}
          modalAction={'delete'}
        />
      </Layout>
    )
  }
}

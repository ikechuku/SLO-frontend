import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import $ from 'jquery';
import Layout from '../layout/index';
import DepartmentTable from './departmentTable';
import  './departmentTable.css';
import { DepartmentModal } from '../Modals/Department';
import { httpGet, httpPatch, httpPost, httpDelete } from '../../actions/data.action';
import { showLoader, hideLoader } from '../../helpers/loader';

export default class department extends Component {
	constructor(){
		super()
		this.state = {
			departments: [],
			department: {
				name: ''
			},
			currentEditId: null,
			modalMode: 'create'
		}
	}

	getDepartments = async () => {
		try{
			showLoader()
			const res = await httpGet('departments');
			if(res.code === 200){
				hideLoader();
				this.setState({ departments: res.data.departments });
			}
		} catch(error){
			console.log(error)
		}
	}

	getSingleDepartment = async (id) => {
		const res = await httpGet(`department/${id}`);
		if(res.code === 200){
			this.setState({ department: res.data.department, currentEditId: id, modalMode: 'edit' });
		}
	}

	handleChange = (e) => {
		console.log(e.target.value)
		const { department } = this.state;
		department[e.target.name] = e.target.value;
		this.setState({ department });
	}

	handleSubmit = async(btnType) => {
		showLoader();
		const { department, currentEditId, modalMode } = this.state;

		if(department.name === ''){
			hideLoader();
			return NotificationManager.warning('Fill in Department Name')
		}

		if(modalMode === 'create'){
			const res = await httpPost(`department/create`, this.state.department);
		  if(res.code === 201){
			  $('.modal').modal('hide');
			  $(document.body).removeClass('modal-open');
			  $('.modal-backdrop').remove();
		  }
		} else {
		  const res = await httpPatch(`department/update/${currentEditId}`, department);
		  if(res.code === 200){
			  $('.modal').modal('hide');
			  $(document.body).removeClass('modal-open');
			  $('.modal-backdrop').remove();
		  }
		}
		this.getDepartments();
		this.clearState();
		hideLoader();
	}

	handleDelete = async(id) => {
		showLoader();
		const res = await httpDelete(`department/delete/${id}`);
		if(res.code === 200){
			$('.modal').modal('hide');
			$(document.body).removeClass('modal-open');
			$('.modal-backdrop').remove();
			this.getDepartments();
			hideLoader();
		}
	}

	clearState = () => {
		this.setState({
			department: {
				name: ''
			},
			modalMode: 'create',
			currentEditId: null
		})
	}

	closeModal = () => {
    this.clearState()
	}

	componentDidMount(){
		this.getDepartments();
	}

	render() {
		return (
			<Layout page="departments">

				<div className="app-content">
					<section className="section">
						<ol className="breadcrumb">
							<li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
							<li className="breadcrumb-item"><a href="#" className="text-muted">Performance</a></li>
							<li className="breadcrumb-item active text-" aria-current="page">Branch</li>
						</ol>
						<div className="section-body">
							<div className="row">

								<div className="col-lg-12">
														
									<div className="card department-table-card">

									<div className="card-body department-table">
										<div className="card-header custom-header">
										<button type="button" className="btn " data-toggle="modal" data-target="#departmentModal">CREATE NEW</button>
										{/* <div className="inputf">
														<input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
												</div> */}
										</div>

										<DepartmentTable
											departments={this.state.departments}
											getSingleDepartment={this.getSingleDepartment}
											handleDelete={this.handleDelete}
										/>

									</div>
							</div>
							</div>
						</div>
					</div>

						
		
				</section>
				</div>

				<DepartmentModal
					department={this.state.department}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					closeModal={this.closeModal}
					modalMode={this.state.modalMode}
				/>								
			</Layout>
		)
	}
}

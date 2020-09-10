import React, { Component } from 'react';
import $ from 'jquery';
import { NotificationManager } from 'react-notifications';
import Layout from '../layout/index';
import UnitTable from './unitTable';
import {httpPost, httpGet, httpDelete, httpPatch } from '../../actions/data.action';
import { hideLoader, showLoader } from '../../helpers/loader';
import UnitModal from '../Modals/Unit';
import { Confirm } from '../Modals/Confirm';
// import  './departmentTable.css'

export default class unit extends Component {
	constructor(){
		super();
		this.state = {
			units: [],
			unit: {},
			modalMode: 'create',
			currentEditId: null,
			customSelect1: null,
			errorMessage1: null,
			errorMessage2: null,
			selectedId: null,
			departmentOptions: [],

		}
	}

	componentDidMount(){
    this.getUnits()
  }

  getUnits = async () => {
    try{
			showLoader()
		  const res = await httpGet('units');
		  const data = await httpGet('departments');

		  let optionList = [];
		  await [...data.data.departments].map(data => (
		  	optionList.push({ value: data.id, label: data.name })
		  ))

      if(res.code === 200){
        this.setState({ units: res.data.units, departmentOptions: optionList })
        hideLoader()
      }
    
    } catch (error){
      hideLoader()
      console.log(error)
    }
	}

	handleChange = async (e, name) => {
		const { unit } = this.state;
		if(name === 'departmentId'){
			unit[name] = e.value;
			await this.setState({ unit, customSelect1: e, errorMessage2: null });
			this.getUnits();
		} else {
			unit[e.target.name] = e.target.value;
			this.setState({ unit, errorMessage1: null });
		}
	}

	handleEdit = async (id) => {
		const res = await httpGet(`unit/${id}`);
		if(res.code === 200){
			const customSelect1 = { value: res.data.unit.departmentId, label: res.data.unit.department.name };
			this.setState({ 
				unit: res.data.unit, 
				currentEditId: id, 
				modalMode: 'edit',
				customSelect1,
			});
		}
	}

	handleDelete = async() => {
		showLoader();
		const res = await httpDelete(`unit/delete/${this.state.selectedId}`);
		if(res.code === 200){
			this.getUnits();
			this.setState({selectedId: null})
			hideLoader();
		}
	}

	handleSubmit = async(btnType) => {
		showLoader();
		const { 
			unit, 
			currentEditId, 
			modalMode,
			errorMessage1,
			errorMessage2
		} = this.state;

		if(unit.name === undefined || unit.name === ''){
			hideLoader();
			this.setState({ errorMessage1: 'Unit Name is required'});
			return;
		}

		if(unit.departmentId === undefined || unit.departmentId === ''){
			hideLoader();
			this.setState({ errorMessage2: 'Department is required'});
			return;
		}

		if(errorMessage1 !== null || errorMessage2 !== null){
			hideLoader();
			return NotificationManager.warning('Complete all required fields')
		}

		if(modalMode === 'create'){
			const res = await httpPost(`unit/create`, unit);
		  if(res.code === 201){
			  $('.modal').modal('hide');
			  $(document.body).removeClass('modal-open');
			  $('.modal-backdrop').remove();
		  }
		} else {
		  const res = await httpPatch(`unit/update/${currentEditId}`, unit);
		  if(res.code === 200){
			  $('.modal').modal('hide');
			  $(document.body).removeClass('modal-open');
			  $('.modal-backdrop').remove();
		  }
		}
		this.getUnits();
		this.clearState();
		hideLoader();
	}

	clearState = () => {
		this.setState({
			unit: {
				name: '',
				departmentId: ''
			},
			modalMode: 'create',
			currentEditId: null,
			customSelect1: null,
			errorMessage1: null,
			errorMessage2: null,
		})
	}

	closeModal = () => {
    this.clearState()
	}
	


	render() {
		const { 
			departmentOptions, 
			customSelect1, 
			errorMessage1, 
			errorMessage2,
			modalMode, 
			unit } = this.state;

		return (
			<Layout page="units">

				<div className="app-content">
					<section className="section">
					<ol className="breadcrumb">
						<li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
						<li className="breadcrumb-item"><a href="#" className="text-muted">Performance</a></li>
						<li className="breadcrumb-item active text-" aria-current="page">Branch</li>
					</ol>
						<div className="section-body">
							<div className="row">
								
							<div className="col-lg-8">
																	
								<div className="card">
								<div className="card-header custom-header">
								<div className="col col-md-12">
										<button type="button" className="btn " data-toggle="modal" data-target="#unitModal">CREATE NEW</button>
									</div>
								</div>
									<div className="card-body">
										
										<UnitTable
											units={this.state.units}
											handleEdit={this.handleEdit}
											modalMode={modalMode}
											setSelectedId={(id) => this.setState({selectedId: id })}
										/>

									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				</div>
				<UnitModal
				  unit={unit}
				  departmentOptions={departmentOptions}
				  customSelect1={customSelect1}
				  handleChange={this.handleChange}
				  handleSubmit={this.handleSubmit}
				  closeModal={this.closeModal}
				  modalMode={modalMode}
					errorMessage1={errorMessage1}
					errorMessage2={errorMessage2}
				/>			
				<Confirm
					modalAction="delete"
					handleAction={this.handleDelete}
				/>
			</Layout>				
		)
	}
}

import React, { Component } from 'react';
import $ from 'jquery';
import { NotificationManager } from 'react-notifications';
import Layout from '../../layout/index';
import StaffTable from './table';
import {httpPost, httpGet, httpDelete, httpPatch } from '../../../actions/data.action';
import { hideLoader, showLoader } from '../../../helpers/loader';
import CreateStaffModal from '../../Modals/CreateStaff';
import { countryCodes } from '../../../helpers/dailCodes';

export default class CreateStaff extends Component {
	constructor(){
		super();
		this.state = {
			staffs: [],
			staff: {},
			modalMode: 'create',
			currentEditId: null,
			errorMessage1: null,
      customMobile: null,
		}
	}

	componentDidMount(){
    this.getStaffs()
  }

  getStaffs = async () => {
    try{
			showLoader()
		  const res = await httpGet('auth/temporary_staffs');

      if(res.code === 200){
        this.setState({ staffs: res.data.users })
        hideLoader()
      }
    
    } catch (error){
      hideLoader()
      console.log(error)
    }
	}

	handleChange = async (e, name) => {
    const { staff } = this.state;
    if(name === 'mobilePhoneCode'){
      staff[name] = e.value;
      this.setState({ 
        staff,
        customMobile: e,
      });
    } else {
      staff[e.target.name] = e.target.value;
      this.setState({ staff, errorMessage1: null });
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

	handleDelete = async(id) => {
		showLoader();
		const res = await httpDelete(`unit/delete/${id}`);
		if(res.code === 200){
			this.getStaffs();
			hideLoader();
		}
	}

	handleSubmit = async(btnType) => {
		showLoader();
		const { 
			staff, 
			currentEditId, 
			modalMode,
			errorMessage1,
		} = this.state;

		if(staff.username === undefined || staff.username === ''){
			hideLoader();
			this.setState({ errorMessage1: 'Username is required'});
			return;
		}

		if(errorMessage1 !== null){
			hideLoader();
			return NotificationManager.warning('Complete all required fields')
		}

    try {
      if(modalMode === 'create'){
        const res = await httpPost(`auth/create_staff`, staff);
        if(res.code === 201){
          $('.modal').modal('hide');
          $(document.body).removeClass('modal-open');
          $('.modal-backdrop').remove();
        }
      } else {
        const res = await httpPatch(`unit/update/${currentEditId}`, staff);
        if(res.code === 200){
          $('.modal').modal('hide');
          $(document.body).removeClass('modal-open');
          $('.modal-backdrop').remove();
        }
      }
      this.getStaffs();
      this.clearState();
      hideLoader();
    }catch(error){
      console.log(error)
    }
	}

	clearState = () => {
		this.setState({
			staff: {
				username: '',
			},
			modalMode: 'create',
			currentEditId: null,
			errorMessage1: null,
		})
	}

	closeModal = () => {
    this.clearState()
	}
	


	render() {
		const { 
			errorMessage1, 
			modalMode, 
			staff } = this.state;

		return (
			<Layout page="createStaff">

				<div class="app-content">
					<section class="section">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="#" class="text-muted">Home</a></li>
						<li class="breadcrumb-item"><a href="#" class="text-muted">Performance</a></li>
						<li class="breadcrumb-item active text-" aria-current="page">Branch</li>
					</ol>
						<div class="section-body">
							<div class="row">
								
							<div class="col-lg-8">
																	
								<div class="card">
								<div class="card-header custom-header">
								<div className="col col-md-12">
										<button type="button" class="btn " data-toggle="modal" data-target="#createStaffModal">CREATE NEW</button>
									</div>
								</div>
									<div class="card-body">
										
										<StaffTable
											staffs={this.state.staffs}
											handleEdit={this.handleEdit}
											modalMode={modalMode}
											handleDelete={this.handleDelete}
										/>

									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				</div>
				<CreateStaffModal
          staff={staff}
          customMobile={this.state.customMobile}
				  handleChange={this.handleChange}
				  handleSubmit={this.handleSubmit}
				  closeModal={this.closeModal}
				  modalMode={modalMode}
          errorMessage1={errorMessage1}
          countryCodes={countryCodes}
				/>			
			</Layout>				
		)
	}
}

import React, { Component } from "react";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { datepicker } from "bootstrap";
import { object } from 'prop-types';
import Layout from "../layout/index";
import Goback from '../Payrol/goBack/index'
import { validateEmploymentInfoForm, validateEmpoymentFields } from '../../helpers/validations';
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import DatePicker from "react-datepicker";
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";

import { PayRollModal } from "../Modals/payroll";
import branch from "../branch/branch";

export default class payrollForm extends Component {
	constructor(props){
	super(props)
	this.handleChange = this.handleChange.bind(this);
 
	this.state = {
		startDate: new Date(),
		name: "",
		taxable: null,
		pensionable:null ,
		positive: null,
		periodicity: "",
		occurence: null,
		itemDescription: "",
		applicableTo: [],
		effectiveDate: "",
		datePickerText:"Select Date",
		postData: {},
		multiValue: [],
		postData: {},
		units: [],
		roles: [],
		branches: [],
		departmentOptions: [],
		departments: [],
		unitOptions: [],
		roleOptions: [],
		regionOptions: [],
		areaOptions: [],
		areas: [],
		customBranchId: null,
		customDepartmentId: null,
		customJobTitle: null,
		customUnitId: null,
		customRegionId: null,
		customAreaId: null,
	// 	userSelection:[
	// 		{
	// 			branchId:this.state.,
	// 			jobTitle:""
	// 		},
	// 	{ 
	//      regionId:"", 
	// 	jobTitle: ''
	// },
	// 	{ 
	// 		areaId:"",
	// 		jobTitle: ''
	// },
	// 	{
	// 		 branchId:""
			
	// 		},
	// 	{ branchId:"",
	// 	 departmentId: ''}
	// 	]
		
		}
	}


	componentDidMount =async()=> {
		this.getFieldDetails();
	}


	getFieldDetails  = async() => {
		try{
		  const res = await httpGet('units');
		  const data = await httpGet('roles');
		  const resData = await httpGet('all_branch');
		  const regionData = await httpGet('all_region');
		  const areaData = await httpGet('all_area');
	
		  if(res.code === 200){
			hideLoader()
	
			let branchList = resData.data.branches;
			let departmentList = data.data.departmentUnit;

			let roleOptions = [];
			[...data.data.roles].map(data => {
			  roleOptions.push({ value: data.title, label: data.title });
			});
	
			let regionList = [];
			[...regionData.data.regions].map(data => {
			  regionList.push({ value: data.id, label: data.name });
			});
	
			this.setState({ 
			  // units: unitOptions, 
			  roles: data.data.roles,
			  branches: branchList,
			  departmentOptions: departmentList,
			  departments: data.data.departmentUnit, 
			  regionOptions: regionList,
			  areas: areaData.data.areas
			});
		  }
	
		}catch(error){
		  hideLoader()
		  console.log(error)
		}
		}
		
		getDepartments = () => {
			const option = this.state.departmentOptions;
			return option.map(item => (
				{ value: item.id, label: item.name }
			))
		}
	
	  getArea  = async () => {
		const { areas, postData } = this.state;
		console.log('>>>',areas, postData.regionId)
		if(postData.regionId === undefined){
		  const areaOptions = [];
		  this.setState({ areaOptions })
		}
			let newpostData = [];
			newpostData = [...areas].filter(item => item.regionId === postData.regionId);
			let optionList = [];
			await newpostData.map(data => (
			  optionList.push({ value: data.id, label: data.name })
			));
			console.log(optionList, newpostData)
		this.setState({ areaOptions: optionList })
	  }
	
	  getUnits  = async () => {
			const { departments, postData } = this.state;
			let newpostData = [];
			newpostData = [...departments].filter(item => item.id === postData.departmentId)[0];
			let optionList = [];
			await newpostData.units.map(data => (
			  optionList.push({ value: data.id, label: data.name })
			));
			console.log(optionList)
		this.setState({ unitOptions: optionList })
	  }
	
	  getRoleFromUnit  = () => {
		const { postData, roles } = this.state;
		let newRoles = [];
		console.log(postData.unitId)
		if(postData.unitId === null || postData.unitId === undefined){
		  return null
		}
		newRoles = [...roles].filter(item => item.unitId === postData.unitId);
		return newRoles;
	  }
	
	  getRoleFromDept = () => {
		const { postData, roles } = this.state;
		let newRoles = [];
		if(postData.departmentId === null || postData.departmentId === undefined || postData.departmentId === ''){
		  return null
		}
		newRoles = [...roles].filter(item => item.departmentId === postData.departmentId);
		return newRoles;
	  }
	  
	  getRoles = () => {
		const newRolesFromUnits = this.getRoleFromUnit();
		const newRolesFromDept = this.getRoleFromDept();
		console.log('units', newRolesFromUnits)
		console.log('depts', newRolesFromDept)
		const newValues = (newRolesFromUnits === null || !newRolesFromUnits.length) ? newRolesFromDept : newRolesFromUnits;
	
		if(typeof(newValues) === object){
		  return { value: newValues.id, label: newValues.title };
		} else if(newValues === null){
		  return [];
		} else {
		  if(newValues.length) {
			return newValues.map(data => (
			{ value: data.id, label: data.title }
		  )) 
		  } else {
			return [];
		  }
		}
		// this.setState({ roleOptions: optionList });
		}
		
		getBranches = () => {
			const { areaId } = this.state.postData;
			const { branches } = this.state;
			const branchesOptions = branches.filter(item => item.areaId === areaId);
			console.log(branches)
			return branchesOptions.map(item => (
				{ value: item.id, label: item.name }
			))
		}
	

	handleDate = (date) => {

let month = 1 + moment(date).month();
let year = moment(date).year();
		this.setState({
			startDate: date,
			
				effectiveDate: date,
				datePickerText:`${month + " " + " " + year}`
			
		});
		console.log(this.state.effectiveDate)
	};

	handleChange = async (e, nameValue) => {
		const { postData } = this.state;
    let details = e !== null ? e.target : '';
    
		if(nameValue === 'branchId'){
      postData['branchId'] = e.value;
      this.setState({ 
        postData,
        customBranchId: e,
      })

    } else if(nameValue === 'departmentId'){
      postData['departmentId'] = e.value;
      postData['unitId'] = '';
      this.setState({ 
        postData,
        customDepartmentId: e,
        customUnitId: null,
      })
      this.getUnits();
    } else if(nameValue === 'regionId'){
      postData['regionId'] = e.value;
      this.setState({ 
        postData,
        customRegionId: e,
      })
			this.getArea()
    } else if(nameValue === 'areaId'){
      postData['areaId'] = e.value;
      this.setState({ 
        postData,
        customAreaId: e,
      })
    } else if(nameValue === 'jobTitle'){
      postData['jobTitle'] = e.value;
      this.setState({ 
        postData,
        customJobTitle: e
      })

    } else if(nameValue === 'unitId'){
      postData['unitId'] = e.value;
      this.setState({ 
        postData,
        customUnitId: e
      })
      // this.getRoles();
    } else {
			this.setState({ 
				[details.name]: details.value,
			})
    }
	}
	
	closeModal =() => {
		this.setState({
			customBranchId: null,
			customDepartmentId: null,
			customJobTitle: null,
			customUnitId: null,
			customRegionId: null,
			customAreaId: null,
		})
	}

	clearPreviousSelected = () => {
		this.setState({
			postData: {
				branchId: '', 
				departmentId: '', 
				areaId: '', 
				regionId: '', 
				jobTitle: '', 
				unitId: ''
			}
		})
	}

	addSelection=()=>{
		let	{  branchId, departmentId, areaId, regionId, jobTitle, unitId} = this.state.postData;
		let { applicableTo } = this.state;
		if (departmentId !== '') {
			if(jobTitle !== '' && jobTitle !== undefined){
				applicableTo.push({
					type: 'jobTitle',
					id: jobTitle
				})
			} else if(unitId !== '' && unitId !== undefined){
				applicableTo.push({
					type: 'unitId',
					id: unitId
				})
			} else {
				applicableTo.push({
					type: 'departmentId',
					id: departmentId
				})
			}
		}
		if(regionId !== ''){
			console.log('b', typeof(branchId))
			if(branchId !== '' && branchId !== undefined){
				console.log('b1')
				applicableTo.push({
					type: 'branchId',
					id: branchId
				})
			} else if(areaId !== '' && areaId !== undefined){
				console.log('b2')
				applicableTo.push({
					type: 'areaId',
					id: areaId
				})
			} else {
				console.log('b3')
				applicableTo.push({
					type: 'regionId',
					id: regionId
				})
			}
		}
		this.setState({ applicableTo })
	}

	handleSubmit = async (e)=>{
		e.preventDefault();
		let {name,taxable,
			pensionable,
			positive,
			periodicity,
			occurence,
			itemDescription,
			applicableTo,
			effectiveDate} = this.state;
		  // if (name === "" || periodicity === ""  || itemDescription === "" || effectiveDate === "" || positive === null || pensionable === null || taxable === null || occurence === null) {
			// NotificationManager.error(
			// "Opps please fill in all fields",
			// 	"Oops!",
			// 	3000
			// );
		  // }
	
		let data = {	
			name: this.state.name,
			taxable: this.state.taxable,
			pensionable:this.state.pensionable ,
			positive: this.state.positive,
			periodicity: this.state.periodicity,
			occurence: this.state.occurence,
			itemDescription: this.state.itemDescription,
			applicableTo: !this.state.applicableTo.length ? [{ type: 'organization'}] : this.state.applicableTo,
			effectiveDate: this.state.effectiveDate
		}

		// console.log(this.state.applicableTo)

		try{
		
			showLoader()
			const res = await httpPost(`/create_payroll_item`,data)
	  
			if(res.code === 201){
				this.setState({
					name: "",
				taxable: null,
				pensionable:null ,
				positive: null,
				periodicity: "",
				occurence: "",
				itemDescription: "",
				applicableTo: [],
				effectiveDate: ""
			})
					  hideLoader();
					  NotificationManager.success(
						"A Payroll item has successfully been created",
							"Success!",
							5000
						);
			}
	  
		  }catch(error){
			hideLoader();
			console.log(error);
		  }
		
	  }

	  handleRadio=(e,clickCheck,getData)=>{
		if (clickCheck === "positive") {
			this.setState({positive:getData})
			console.log(this.state.positive)
		} 

		if (clickCheck === "taxable") {
			this.setState({taxable:getData})
			console.log(this.state.taxable)
		} 

		if (clickCheck === "pensionable") {
			this.setState({pensionable:getData})
			console.log(this.state.taxable)
		} 

		
	  }



render() {
	console.log(this.state.departmentOptions)
	return (
		<Layout page="payroll">
			<div className="app-content">
				<section className="section">
				<Goback goback={this.props.history.goBack}/>
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a href="#" className="text-muted">
								Home
							</a>
						</li>
						<li className="breadcrumb-item">
							<a href="#" className="text-muted">
								Payroll
							</a>
						</li>
					</ol>
				</section>

				<div className="wrapperPayroll">
					<div className="payroll-form">
						<div className="payroll-header">
							<h1>Add Payroll Item</h1>
						</div>
						<form>
							<div class="inputPayroll">
								<label for="">Payroll Name</label>
								<input
								required={true}
									type="text"
									class="form-control"
									id=""
									placeholder="item name"
									name="name"
									value={this.state.name} onChange={this.handleChange}
								/>
							</div>
															
							<div className="radioChecks">
															<div>
									<label>Taxable</label>
									<input required={true} checked={this.state.taxable===true} onClick={(e)=>this.handleRadio(e,"taxable",true)}  value={true} type="checkbox" name="yes_no"/>Yes 
									<input required={true}  checked={this.state.taxable===false} onClick={(e)=>this.handleRadio(e,"taxable",false)} value={false} type="checkbox" name="yes_no"/>No
								</div>

								<div>
									<label>Pensionable</label>
									<input required={true} checked={this.state.pensionable===true} onClick={(e)=>this.handleRadio(e,"pensionable",true)}  value={true} type="checkbox" name="yes_no"/>Yes 
									<input required={true}  checked={this.state.pensionable===false} onClick={(e)=>this.handleRadio(e,"pensionable",false)} value={false} type="checkbox" name="yes_no"/>No
								</div>
							</div>

							<div className="radioChecks">
														

								<div>
									<label>Positive</label>
									<input required={true} checked={this.state.positive===true} onClick={(e)=>this.handleRadio(e,"positive",true)} value={true} type="checkbox" name="yes_no"/>Yes 
									<input required={true} checked={this.state.positive===false} onClick={(e)=>this.handleRadio(e,"positive",false)} value={false} type="checkbox" name="yes_no"/>No
								</div>
							</div>

							<div class="">

								<div className="inputPayroll">
									<label for="">Periodicity</label>
									<select name="periodicity" value={this.state.periodicity} 
									onChange={this.handleChange} class="form-control" id="">
										<option>Select</option>
										<option 	 value="monthly">Monthly</option>
										<option   value="yearly">Yearly</option>
									</select>
								</div>

								<div class="inputPayroll">
									<label for="">Occurence
									</label>
									<input
									name="occurence"
										type="number"
										class="form-control"
										id=""
										placeholder="Occurence
										"
										onChange={this.handleChange}
										value={this.state.occurence}
										required={true}
									/>
								</div>

								<div class="inputPayroll">
									<label for="">Item Description</label>
									<textarea
										type="text"
										class="form-control"
										id=""
									name="itemDescription"
										placeholder="Item Description"
										onChange={this.handleChange}
										value={this.state.itemDescription}
										required={true}
									/>
								</div>

								<div class="">
									<div class="inputPayroll-Checkbox">
										<div class="checkBox1">
											<div class="checkBoxW">
												<span>Applicable to</span>
											</div>
										</div>

										<div class="checkBoxW">
											<button
												type="button"
												className="payrolBtn "
												data-toggle="modal"
												data-target="#addPayroll"
												onClick={this.clearPreviousSelected}
											>
												<i class="fa fa-plus" aria-hidden="true"></i>
												Add Payroll
											</button>
										</div>
									</div>
									<div className='pl-3 pt-2'>
										{
											this.state.applicableTo.length ? this.state.applicableTo.map(item => (
												<span>{item.type} <i class="fa fa-times" aria-hidden="true"></i></span>
											)) : <span>Entire Organization</span>
										}
									</div>
								</div>
								<div className="inputPayroll">
									<label for="">Specify Date</label>
									<div className="dataeP">
										<DatePicker
										dateFormat="MM.yyyy"
										showMonthYearPicker
										placeholderText={this.state.datePickerText}
											onChange={this.handleDate}
											className="payrolDatePicker"
										/>
										<div style={{ overflow: "hidden" }}>
											<i
												class="fa fa-calendar cal-fontAwsome"
												aria-hidden="true"
											></i>
										</div>
									</div>
								</div>
							</div>
							<div className="buttonWrap">
								<button onClick={this.handleSubmit} type="submit" class="btn btn-primary">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
				<PayRollModal
					handleChange={this.handleChange}
					units={this.state.units}
					roles={this.state.roles}
					branches={this.state.branches}
					unitOptions={this.state.unitOptions}
					roleOptions={this.state.roleOptions}
					regionOptions={this.state.regionOptions}
					areaOptions={this.state.areaOptions}
					areas={this.state.areas}
					getRoles={this.getRoles}
					getArea={this.getArea} 
					getUnits={this.getUnits}
					getRoleFromUnit={this.getRoleFromUnit}
					getRoleFromDept={this.getRoleFromDept}
					getRoles={this.getRoles}
					addSelection={this.addSelection}
					getDepartments={this.getDepartments}
					getBranches={this.getBranches}
					closeModal={this.closeModal}
				/>
			</div>
		</Layout>
	);
	}
}

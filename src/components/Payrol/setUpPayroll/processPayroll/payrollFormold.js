import React, { Component } from "react";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { datepicker } from "bootstrap";

import Layout from "../layout/index";
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
		applicableTo: ["Entire Organization"],
		effectiveDate: "",
		datePickerText:"Select Date",
		regions:[],
		regionId:null,
		areaId:null,
		branchId:null,
		areas:[],
		areaOptions: [],
		branchOptions:[],
		branches:[],
		jobTitle:[],
		departments:[],
		departmentId:null,
		units:[],
		unitOptions:[],
		selectBranch:[],
		selectedDepartment:[]
		
	};}


	componentDidMount =async()=> {
	await	this.getRegion()
	await this.getArea()
	await this.getBranch()
	await this.getDepartment()
	await this.getUnit()
	}


	getArea= async()=>{
		try{
			 
				showLoader()
				const res = await httpGet(`/all_area`)
				
				if (res.code === 200) {
					
					this.setState({
					areas:res.data.areas
					})
				}
			 hideLoader()
		  
		  
		  
			  }
			  catch(error){
				hideLoader();
				console.log(error);
			  }}



			  getBranch= async()=>{
				try{
					 
						showLoader()
						const res = await httpGet(`/all_branch`)
						
						if (res.code === 200) {
							this.setState({
								branches:res.data.branches
							})
						}
					 hideLoader()
				  
				  
				  
					  }
					  catch(error){
						hideLoader();
						console.log(error);
					  }}


					  getDepartment= async()=>{
						try{
							 
								showLoader()
								const res = await httpGet(`/departments`)
								
								if (res.code === 200) {
									this.setState({
										departments:res.data.departments
									})
								}
								console.log("departments>>>>>",this.state.departments)
							 hideLoader()
						  
						  
						  
							  }
							  catch(error){
								hideLoader();
								console.log(error);
							  }}


							  getUnit= async()=>{
								try{
									 
										showLoader()
										const res = await httpGet(`/units`)
										
										if (res.code === 200) {
											this.setState({
												units:res.data.units
											})
										}
										console.log("units>>>>>",this.state.units)
									 hideLoader()
								  
								  
								  
									  }
									  catch(error){
										hideLoader();
										console.log(error);
									  }}
							  


			  getAreaData=()=>{
					const areaData = [...this.state.areas].filter(
						(datas) => 
						datas.regionId === this.state.regionId
					)
					this.setState({
						areaOptions: areaData,
					});
			  }

			  getBranchData=()=>{
				const branchData = [...this.state.branches].filter(
					(datas) => 
					datas.areaId === this.state.areaId
				)
				this.setState({
					branchOptions:branchData
				});
			  }


			  getUnitData=()=>{
				const units = [...this.state.units].filter(
					(datas) => 
					datas.departmentId === this.state.departmentId
				)
				this.setState({
					unitOptions:units
				});
			  }


	getRegion= async()=>{
        try{
             
                showLoader()
                const res = await httpGet(`/all_region`)
                
                if (res.code === 200) {
                    this.setState({
						regions:res.data.regions
					})
				}
             hideLoader()
          
          
          
              }
              catch(error){
                hideLoader();
                console.log(error);
			  }}

	handleEdit=(id)=>{
		
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

	handleChange  =async  (e,type) => {
		e.preventDefault();

		if (type === "area") {
			this.getAreaData()
			const selected = [...this.state.areas].filter(item => item.id === e.target.value)[0];
			const areaName = selected.name;
			await this.setState({ [e.target.name]: e.target.value, areaName });
		} else if (type === "branch") {
			this.getBranchData()
			const selected = [...this.state.branches].filter(item => item.id === e.target.value)[0];
			const branchName = selected.name;
			await this.setState({ [e.target.name]: e.target.value, branchName });
		} else if(type === "region"){
			const selected = [...this.state.regions].filter(item => item.id === e.target.value)[0];
			// const regionName = this.handleRegionAbbr(selected.name);
			await this.setState({ [e.target.name]: e.target.value });
		} else {
			await this.setState({ [e.target.name]: e.target.value });
		}

		if (type === "unit") {
			this.getUnitData()
		}

		// this.setState({ [e.target.name]: e.target.value });

console.log(this.state.departmentId)
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
		  if (name === "" || periodicity === ""  || itemDescription === "" || effectiveDate === "" || positive === null || pensionable === null || taxable === null || occurence === null) {
			NotificationManager.error(
			"Opps please fill in all fields",
				"Oops!",
				3000
			);
		  }

		  else{

		  
	
		console.log(this.state)
		let data = {	
	   name: this.state.name,
		taxable: this.state.taxable,
		pensionable:this.state.pensionable ,
		positive: this.state.positive,
		periodicity: this.state.periodicity,
		occurence: this.state.occurence,
		itemDescription: this.state.itemDescription,
		applicableTo: this.state.applicableTo,
		effectiveDate: this.state.effectiveDate
	
	
	}


	

		// try{
		
		// 	showLoader()
		// 	const res = await httpPost(`/create_payroll_item`,data)
	  
		// 	if(res.code === 201){
		// 		this.setState({
		// 			name: "",
		// 		taxable: null,
		// 		pensionable:null ,
		// 		positive: null,
		// 		periodicity: "",
		// 		occurence: "",
		// 		itemDescription: "",
		// 		applicableTo: [],
		// 		effectiveDate: ""
		// 	})
		// 			  hideLoader();
		// 			  NotificationManager.success(
		// 				"A Payroll item has successfully been created",
		// 					"Success!",
		// 					5000
		// 				);
		// 	}
	  
		//   }catch(error){
		// 	hideLoader();
		// 	console.log(error);
		//   }
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

	  addSelection=()=>{
	let	{  branchId, departmentId, selectBranch,selectedDepartment} = this.state
	if (branchId === null || departmentId===null) {
		console.log("emepty")
	}
	else{
		this.setState({
		selectBranch:selectBranch.concat(branchId),
		selectedDepartment:selectedDepartment.concat(departmentId)
		
	})
	}
	
	console.log(selectBranch,selectedDepartment)
	  }


	render() {
		return (
			<Layout page="payroll">
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
										<label for="">Occurence</label>
										<input
										name="occurence"
											type="number"
											class="form-control"
											id=""
											placeholder="Occurence"
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
													
												>
													<i class="fa fa-plus" aria-hidden="true"></i>
													Add Payroll
												</button>
											</div>
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
					<PayRollModal handleChange={this.handleChange}
					 payrolldata={this.state.applicableTo}
					 regions={this.state.regions}
					 handleChange={this.handleChange}
					 areaOptions={this.state.areaOptions}
					 getAreaData={this.getAreaData}
					 getBranchData={this.getBranchData}
					 regionId={this.state.regionId}
					 areaId={this.state.areaId}
					 branchOptions={this.state.branchOptions}
					 departments={this.state.departments}
					 getUnitData={this.getUnitData}
					 units={this.state.unitOptions}
					 addSelection={this.addSelection}
					 />
				</div>
			</Layout>
		);
	}
}




























import React from "react";
import Select from "react-select";

export function PayRollModal(props) {
	console.log(props)
	return (
		<div
			className="modal fade"
			id="addPayroll"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="example-Modal3">
							Applicable To
						</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							// onClick={props.closeModal}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
								Regions
								</label>

								<select

name="regionId"
onChange={e => props.handleChange(e, 'region')} 

class="form-control" id="exampleFormControlSelect1">
	   <option value={null} >Select</option>
   {props.regions.map((data)=>{
	   return(
	   
   
	   
		   <option  name="regionName" regionName={data.name} value={data.id}>{data.name}</option>
	   
		   
	   )
   })}

</select>

										<span className="text-danger">
									{/* {props.errorMessage2 !== null ? props.errorMessage2 : ""} */}
								</span>
							</div>



							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
								Area
								</label>

								<select
										disabled={props.regionId===null}
	 name="areaId"
	 onChange={(e)=>props.handleChange(e,"area")} 
	 onClick={props.getAreaData}
	class="form-control" id="exampleFormControlSelect1">
			<option value={null}>Select</option>
		{props.areaOptions.map((data)=>{
			return(
			
		
			
				<option  value={data.id}>{data.name}</option>
			
				
			)
		})}
    
    </select>
							</div>



							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
								Branch
								</label>

								<select
										 name="branchId"
										disabled={props.areaId===null}
										 onChange={(e)=>props.handleChange(e,"branch")} 
										 onClick={props.getBranchData}
										class="form-control" id="">
											<option value={null}>Select Branch</option>
											{props.branchOptions.map((data)=>{
			return(
			
		
			
				<option value={data.id}>{data.name}</option>
			
				
			)
		})}
										</select>
							</div>




							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
								Department
								</label>

								<select
										 name="departmentId"
										// disabled={props.areaId===null}
										 onChange={(e)=>props.handleChange(e,"department")} 
										 onClick={props.getBranchData}
										class="form-control" id="">
											<option value={null}>Select Department</option>
											{props.departments.map((data)=>{
			return(
			
		
			
				<option value={data.id}>{data.name}</option>
			
				
			)
		})}
										</select>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
								Unit
								</label>

								<select
										 name="unitId"
										// disabled={props.areaId===null}
										 onChange={(e)=>props.handleChange(e,"unit")} 
										 onClick={props.getUnitData}
										class="form-control" id="">
											<option value={null}>Select Unit</option>
											{props.units.map((data)=>{
			return(
			
		
			
				<option value={data.id}>{data.name}</option>
			
				
			)
		})}
										</select>
							</div>


							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
								Job Type
								</label>

								<select
										 name="branchId"
										disabled={props.areaId===null}
										 onChange={(e)=>props.handleChange(e,"branch")} 
										 onClick={props.getBranchData}
										class="form-control" id="">
											<option value={null}>Select Job Type</option>
											{props.branchOptions.map((data)=>{
			return(
			
		
			
				<option value={data.id}>{data.name}</option>
			
				
			)
		})}
										</select>
							</div>

							

							


						
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
							// onClick={props.closeModal}
						>
							Close
						</button>
					
						<button
							type="button"
							className="btn btn-primary"
							data-dismiss="modal"
							onClick={props.addSelection}
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

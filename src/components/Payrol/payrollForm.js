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
		postData: {},
		multiValue: [],
		postData: {},
			  errorMessage1: null,
			  errorMessage2: null,
			  errorMessage3: null,
			  errorMessage4: null,
			  errorMessage5: null,
			  errorMessage6: null,
			  errorMessage7: null,
		errorMessage8: null,
		errorMessage9: null,
		staffCategoryErrorMessage: null,
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
		customDateOfResumption: undefined,
		customDepartmentId: null,
		customEmploymentDate: undefined,
		customStaffCategory: null,
		customJobTitle: null,
		customRank: null,
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
		
	};}


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
	
			let branchList = [];
			[...resData.data.branches].map(data => {
			  branchList.push({ value: data.id, label: data.name });
			});
	
			// let unitOptions = [];
			// [...res.data.units].map(data => {
			//   unitOptions.push({ value: data.name, label: data.department.name + '/' + data.name });
			// });
	
			let departmentList = [];
					await [...data.data.departmentUnit].map(data => (
						departmentList.push({ value: data.id, label: data.name })
					))
	
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
    
		if(nameValue === 'dateOfResumption'){
      // const newDate = moment(e).format('l');
      // console.log(e, newDate)
      postData[nameValue] = e;
      this.setState({ postData, customDateOfResumption: e });
      const isValidate = await validateEmpoymentFields(nameValue, this.state.postData.dateOfResumption, this.state.postData.employmentDate);
      if(!isValidate.error){
        this.setState({ 
          errorMessage2: isValidate.errorMessage, 
        })
        return;
      } else {
        this.setState({ errorMessage2: null })
      }

    } else if(nameValue === 'employmentDate'){
      // const newDate = moment(e).format('l');
      // console.log(e, newDate)
      postData[nameValue] = e;
      this.setState({ postData, customEmploymentDate: e });
      const isValidate = await validateEmpoymentFields(nameValue, this.state.postData.employmentDate);
      if(!isValidate.error){
        this.setState({ 
          errorMessage9: isValidate.errorMessage, 
        })
        return;
      } else {
        this.setState({ errorMessage9: null })
      }

    } else if(nameValue === 'staffCategory'){
      postData[nameValue] = e.value;
      this.setState({ 
        postData,
        customStaffCategory: e,
        staffCategoryErrorMessage: null
      });

    } else if(nameValue === 'branchId'){
      const isValidate = await validateEmpoymentFields('branchId', e.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage3: isValidate.errorMessage, 
        })
        return;
      }
      postData['branchId'] = e.value;
      this.setState({ 
        postData,
        customBranchId: e,
        errorMessage3: null 
      })

    } else if(nameValue === 'departmentId'){
      postData['departmentId'] = e.value;
      postData['unitId'] = '';
      this.setState({ 
        postData,
        customDepartmentId: e,
        customUnitId: null,
        errorMessage8: null 
      })
      this.getUnits();
    } else if(nameValue === 'regionId'){
      postData['regionId'] = e.value;
      this.setState({ 
        postData,
        customRegionId: e,
      })
      console.log(this.getArea())
    } else if(nameValue === 'areaId'){
      postData['areaId'] = e.value;
      this.setState({ 
        postData,
        customAreaId: e,
      })
    } else if(nameValue === 'jobTitle'){
      const isValidate = await validateEmpoymentFields('jobTitle', e.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage4: isValidate.errorMessage, 
        })
        return;
      }
      postData['jobTitle'] = e.value;
      this.setState({ 
        postData,
        customJobTitle: e,
        errorMessage4: null 
      })

    } else if(nameValue === 'unitId'){
      // const isValidate = await validateEmpoymentFields('unitId', e.value);
      // if(!isValidate.error){
      //   this.setState({ 
      //     errorMessage5: isValidate.errorMessage, 
      //   })
      //   return;
      // }
      postData['unitId'] = e.value;
      this.setState({ 
        postData,
        customUnitId: e,
        errorMessage5: null 
      })
      // this.getRoles();
    } else if(nameValue === 'rank'){
      const isValidate = await validateEmpoymentFields(nameValue, e.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage1: isValidate.errorMessage, 
        })
        return;
      }
      postData[nameValue] = e.value;
      if(e.value === 'PA2'){
        postData['salaryAmount'] = '64,473';
      } else if(e.value === 'PA1'){
        postData['salaryAmount'] = '64,473';
      } else if(e.value === 'SPO'){
        postData['salaryAmount'] = '82,024';
      } else if(e.value === 'PO1'){
        postData['salaryAmount'] = '80,024';
      } else if(e.value === 'P02'){
        postData['salaryAmount'] = '80,024';
      } else if(e.value === 'PM'){
        postData['salaryAmount'] = '71,400';
      } else if(e.value === 'DGM'){
        postData['salaryAmount'] = '200,000';
      } else if(e.value === 'Director'){
        postData['salaryAmount'] = '768,000';
      } else if(e.value === 'Manager'){
        postData['salaryAmount'] = '200,000';
      } else if(e.value === 'Senior Manager'){
        postData['salaryAmount'] = '350,000';
      }
      
      this.setState({ 
        postData,
        customRank: e,
        errorMessage1: null 
      })
    } else if(details.name === 'salaryAmount'){
      const isValidate = await validateEmpoymentFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage6: isValidate.errorMessage, 
        })
        return;
      }
      postData[details.name] = details.value;
      this.setState({ 
        postData,
        errorMessage6: null 
      })
    } else if(details.name === 'employeeNumber'){
      const isValidate = await validateEmpoymentFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage7: isValidate.errorMessage, 
        })
        return;
      } else {
        postData[details.name] = details.value;
        this.setState({ 
          postData,
          errorMessage7: null 
        })
      }
    } 
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


	  
  handleCustomSelect = (result, name) => {
	const { postData } = this.state;
const value = result !== null ? result.value : null;
if(name === 'skills'){

  this.setState(state => {
	return {
	  multiValue: result
	};
  });
}
	postData[name] = value;
	this.setState({ 
  postData,
  errorMessage8: null 
	});
}


	render() {
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
					<PayRollModal
					 handleChange={this.handleChange}
					 departmentOptions={this.state.departmentOptions}
					 customDepartmentId={this.state.customDepartmentId}
					 errorMessage1={this.state.errorMessage1}
					 errorMessage2={this.state.errorMessage2}
					 errorMessage3={this.state.errorMessage3}
					 errorMessage4={this.state.errorMessage4}
					 errorMessage5={this.state.errorMessage5}
					 errorMessage6={this.state.errorMessage6}
					 errorMessage7={this.state.errorMessage7}
			   errorMessage8={this.state.errorMessage8}
			   errorMessage9={this.state.errorMessage9}
			   staffCategoryErrorMessage={this.state.staffCategoryErrorMessage}
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
					 />
				</div>
			</Layout>
		);
	}
}

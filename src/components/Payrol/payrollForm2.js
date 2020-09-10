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
      taxable: false,
      pensionable:false ,
      positive: false,
      periodicity: "",
      occurence: null,
      itemDescription: "",
      applicableTo: [],
      effectiveDate: "",
      datePickerText:"Select Date",
      postData: {},
      multiValue: [],
      postData: {},
      regionOptions: [],
      areaOptions: [],
      branchOptions: [],
      departmentOptions: [],
      unitOptions: [],
      roleOptions: [],
      value: '',
      units: [],
      roles: [],
      departments: [],
      regions: [],
      areas: [],
      branches: [],
      customValue: null,
      valueOptions: [],
      type: ''
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

        let roleOptions = [];
        [...data.data.roles].map(data => {
          roleOptions.push({ value: data.id, label: data.title });
        });
    
        let regionOptions = [];
        [...regionData.data.regions].map(data => {
          regionOptions.push({ value: data.id, label: data.name });
        });
        
        let departmentOptions = [];
        [...data.data.departmentUnit].map(data => {
          departmentOptions.push({ value: data.id, label: data.name });
        });

        let branchOptions = [];
        [...resData.data.branches].map(data => {
          branchOptions.push({ value: data.id, label: data.name });
        });

        let unitOptions = [];
        [...res.data.units].map(data => {
          unitOptions.push({ value: data.id, label: data.name });
        });

        let areaOptions = [];
        [...areaData.data.areas].map(data => {
          areaOptions.push({ value: data.id, label: data.name });
        });
    
        this.setState({
          regionOptions,
          areaOptions,
          branchOptions,
          departmentOptions,
          unitOptions,
          roleOptions,
          roles: data.data.roles,
          units: res.data.units,
          branches: resData.data.branches,
          departments: data.data.departmentUnit,
          areas: areaData.data.areas,
          regions: regionData.data.regions
        });
		  }
	
		}catch(error){
		  hideLoader()
		  console.log(error)
		}
		}
		
	

	handleDate = (date) => {
		if (new Date(date) < new Date(Date.now())){
			NotificationManager.error(
				"Cannot select a previous date",
					"Oops!",
					3000
				);
			return;
		}
		let month = moment(date).format('MMM');
		let year = moment(date).year();
			this.setState({
				startDate: date,
					effectiveDate: date,
					datePickerText:`${month + " " + " " + year}`
				
			});
		console.log(this.state.effectiveDate)
	};

	handleChange = async (e, nameValue) => {
    const { 
      postData, applicableTo, type,
      regionOptions, areaOptions, branchOptions,
      departmentOptions, unitOptions, roleOptions,
      valueOptions 
    } = this.state;
    let details = e !== null ? e.target : '';
		console.log(nameValue)
		if(nameValue === 'applicableTo'){
      if(e.value === 'branchId'){
        this.setState({ valueOptions: branchOptions })
			} else if(e.value === 'departmentId'){
        this.setState({ valueOptions: departmentOptions })
			} else if(e.value === 'regionId'){
        this.setState({ valueOptions: regionOptions })
			} else if(e.value === 'areaId'){
        this.setState({ valueOptions: areaOptions })
			} else if(e.value === 'jobTitle'){
        this.setState({ valueOptions: roleOptions })
			} else if(e.value === 'unitId'){
        this.setState({ valueOptions: unitOptions })
      }
      this.setState({ type: e.value })
		} else if(nameValue === 'value'){
      if(type === 'regionId'){
        this.setState({ 
          value: {
            type: 'regionId',
            id: e.value
          },
          customValue: e,
        })  
      } else if(type === 'areaId'){
        this.setState({ 
          value: {
            type: 'areaId',
            id: e.value
          },
          customValue: e,
        }) 
      } else if(type === 'branchId'){
        this.setState({ 
          value: {
            type: 'branchId',
            id: e.value
          },
          customValue: e,
        }) 
      } else if(type === 'departmentId'){
        this.setState({ 
          value: {
            type: 'departmentId',
            id: e.value
          },
          customValue: e,
        }) 
      } else if(type === 'unitId'){
        this.setState({ 
          value: {
            type: 'unitId',
            id: e.value
          },
          customValue: e,
        }) 
      } else if(type === 'jobTitle'){
        this.setState({ 
          value: {
            type: 'jobTitle',
            id: e.value
          },
          customValue: e,
        }) 
      } 
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
		this.closeModal()
	}

	addSelection=()=>{
    // let	{  branchId, departmentId, areaId, regionId, jobTitle, unitId} = this.state.postData;
    let { value, applicableTo } = this.state;
		// if (departmentId !== '') {
		// 	if(jobTitle !== '' && jobTitle !== undefined){
		// 		applicableTo.push({
		// 			type: 'jobTitle',
		// 			id: jobTitle
		// 		})
		// 	} else if(unitId !== '' && unitId !== undefined){
		// 		applicableTo.push({
		// 			type: 'unitId',
		// 			id: unitId
		// 		})
		// 	} else {
		// 		applicableTo.push({
		// 			type: 'departmentId',
		// 			id: departmentId
		// 		})
		// 	}
		// }
		// if(regionId !== ''){
		// 	console.log('b', typeof(branchId))
		// 	if(branchId !== '' && branchId !== undefined){
		// 		console.log('b1')
		// 		applicableTo.push({
		// 			type: 'branchId',
		// 			id: branchId
		// 		})
		// 	} else if(areaId !== '' && areaId !== undefined){
		// 		console.log('b2')
		// 		applicableTo.push({
		// 			type: 'areaId',
		// 			id: areaId
		// 		})
		// 	} else {
		// 		console.log('b3')
		// 		applicableTo.push({
		// 			type: 'regionId',
		// 			id: regionId
		// 		})
		// 	}
    // }
    applicableTo.push(value)
    console.log(value, applicableTo)
		this.setState({ applicableTo })
		this.clearPreviousSelected()
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
				this.props.history.push('/payroll')
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
		
		getApplicableTo = () => {
			const { regions, areas, branches, departments, units, roles } = this.state;
			console.log(this.state.applicableTo, roles)
			return this.state.applicableTo.length ? this.state.applicableTo.map((item, index )=> {
				if(item.type === 'regionId'){
					const find = [...regions].filter(data => data.id === item.id)[0]
					return (<span key={index}>{find.name} <i class="fa fa-times pl-2 add-cursor" aria-hidden="true" onClick={() => this.removeApplicableTo(item.id)}></i> <br/></span>)	
				} else if(item.type === 'areaId'){
					const find = [...areas].filter(data => data.id === item.id)[0]
					return (<span key={index}>{find.name} <i class="fa fa-times pl-2 add-cursor" aria-hidden="true" onClick={() => this.removeApplicableTo(item.id)}></i> <br/></span>)	
				} else if(item.type === 'branchId'){
					const find = [...branches].filter(data => data.id === item.id)[0]
					return (<span key={index}>{find.name} <i class="fa fa-times pl-2 add-cursor" aria-hidden="true" onClick={() => this.removeApplicableTo(item.id)}></i> <br/></span>)	
				} else if(item.type === 'departmentId'){
					const find = [...departments].filter(data => data.id === item.id)[0]
					return (<span key={index}>{find.name} <i class="fa fa-times pl-2 add-cursor" aria-hidden="true" onClick={() => this.removeApplicableTo(item.id)}></i> <br/></span>)	
				} else if(item.type === 'unitId'){
					const find = [...units].filter(data => data.id === item.id)[0]
					return (<span key={index}>{find.name} <i class="fa fa-times pl-2 add-cursor" aria-hidden="true" onClick={() => this.removeApplicableTo(item.id)}></i> <br/></span>)	
				} else if(item.type === 'jobTitle'){
					const find = [...roles].filter(data => data.id === item.id)[0]
					return (<span key={index}>{find.title} <i class="fa fa-times pl-2 add-cursor" aria-hidden="true" onClick={() => this.removeApplicableTo(item.id)}></i> <br/></span>)	
				}
			}) : <span>Entire Organization</span>
		}

		removeApplicableTo = (id) => {
			this.setState({applicableTo: [...this.state.applicableTo].filter(item => item.id !== id) })
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
						<form onSubmit={this.handleSubmit}>
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
									<input checked={this.state.taxable===true} onClick={(e)=>this.handleRadio(e,"taxable",true)} value={true} type="checkbox" name="yes_no"/>Yes 
									<input checked={this.state.taxable===false} onClick={(e)=>this.handleRadio(e,"taxable",false)} value={false} type="checkbox" name="yes_no"/>No
								</div>

								<div>
									<label>Pensionable</label>
									<input checked={this.state.pensionable===true} onClick={(e)=>this.handleRadio(e,"pensionable",true)}  value={true} type="checkbox" name="yes_no"/>Yes 
									<input checked={this.state.pensionable===false} onClick={(e)=>this.handleRadio(e,"pensionable",false)} value={false} type="checkbox" name="yes_no"/>No
								</div>
							</div>

							<div className="radioChecks">
														

								<div>
									<label>Positive</label>
									<input checked={this.state.positive===true} onClick={(e)=>this.handleRadio(e,"positive",true)} value={true} type="checkbox" name="yes_no"/>Yes 
									<input checked={this.state.positive===false} onClick={(e)=>this.handleRadio(e,"positive",false)} value={false} type="checkbox" name="yes_no"/>No
								</div>
							</div>

							<div class="">

								<div className="inputPayroll">
									<label for="">Periodicity</label>
									<select name="periodicity" value={this.state.periodicity} 
									onChange={this.handleChange} class="form-control" id="" required={true}>
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
									<div class="inputPayroll-Checkbox" style={this.state.applicableTo.length ? {
                    paddingBottom: '4px',
                    borderBottom: '1px solid #003766'
                  } : {}}>
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
												Add
											</button>
										</div>
									</div>
									<div className='pl-3 pt-2'>
										{
											this.getApplicableTo()
										}
										{/* {
											this.state.applicableTo.length ? this.state.applicableTo.map(item => (
												<span>{item.type} <i class="fa fa-times" aria-hidden="true"></i></span>
											)) : <span>Entire Organization</span>
										} */}
									</div>
								</div>
								<div className="inputPayroll">
									<label for="">Effective Date</label>
									<div className="dataeP">
										<DatePicker
                    dateFormat="MMMM.yyyy"
										required={true}
										value={this.state.datePickerText}
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
								<button onSubmit={this.handleSubmit} type="submit" class="btn btn-primary">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
				<PayRollModal
          handleChange={this.handleChange}
          valueOptions={this.state.valueOptions}
          customValue={this.state.customValue}
          addSelection={this.addSelection}
					closeModal={this.closeModal}
				/>
			</div>
		</Layout>
	);
	}
}

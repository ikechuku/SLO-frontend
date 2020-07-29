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

import "react-datepicker/dist/react-datepicker.css";

import { PayRollModal } from "../Modals/payroll";
import moment from 'moment'

export default class payrollForm extends Component {
	constructor(props){
	super(props)
	this.handleChange = this.handleChange.bind(this);
	 console.log(this.props.match.params.id)
 console.log(this.props)
	this.state = {
		startDate: new Date(),
		name: "",
		taxable: false,
		pensionable:false ,
		positive: false,
		periodicity: "",
		occurence: "",
		itemDescription: "",
		applicableTo: [],
		effectiveDate: ""
	};}

	componentDidMount (){
		console.log('@@@@')
		this.getSpecificPayroll()
		
	}

	handleDate = (date) => {
		this.setState({
			startDate: date,
			
				effectiveDate: date
			
		});
		console.log(this.state.effectiveDate)
	};

	handleChange  =  (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });

		if (e.target.name === "applicableTo") {
			let PrevState = this.state.applicableTo.slice(); 
this.setState({applicableTo: [...PrevState,{ [e.target.name]: e.target.value }]});
		}
	console.log(this.state.applicableTo)

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
		  if (name === "" || periodicity === ""  || itemDescription === "" || effectiveDate === "") {
			NotificationManager.error(
			"Opps Please fill In All Field",
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
		applicableTo: ["area",'branch'],
		effectiveDate: this.state.effectiveDate}

	

		try{
		
			showLoader()
			const res = await httpPatch(`update_payroll_items/${this.props.match.params.id}`,data)
	  
			if(res.code === 201){
				this.setState({
					name: "",
				taxable: false,
				pensionable:false ,
				positive: false,
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
		  }}
		
	  }

	  getSpecificPayroll= async  ()=>{
		try{
		
			showLoader()
			const res = await httpGet(`payroll_item/${this.props.match.params.id}`)
	     console.log(res)
			if(res.code === 200){
				this.setState({
					name:res.data.payrollItem.name,
				taxable: res.data.payrollItem.taxable,
				pensionable:res.data.payrollItem.pensionable ,
				positive: res.data.payrollItem.positive,
				periodicity: res.data.payrollItem.periodicity,
				occurence: res.data.payrollItem.occurence,
				itemDescription: res.data.payrollItem.itemDescription,
				applicableTo: ["area"],
				effectiveDate: res.data.payrollItem.effectiveDate
			})
					  hideLoader();
					  console.log(res)
			}
	  
		  }catch(error){
			hideLoader();
			console.log(error);
		  }
		
	  }

	toggleRadio = (check) => {
		let taxable = this.state.taxable;
		let pensionable = this.state.pensionable;
		let positive = this.state.positive;
		if (check === "taxable") {
			this.setState({
			
				taxable:!taxable
			})

			
			
			console.log("i am taxaxble", this.state.taxable)
		}


		if (check === "pensionable") {
			this.setState({
				pensionable:!pensionable
			})

			
			
			console.log( " i am pensionable ",this.state.pensionable)
		}


		if (check === "positive") {
			this.setState({
				positive:!positive
			})

			
			
			console.log( " i am positive",this.state.positive)
		}
		// this.setState({
		// 	radioButtonCheck1: !toggleRadio,
		// });
	};
	
	render() {
		return (
			<Layout page="payrollForm">
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
								<h1>Edit Payroll Item</h1>
							</div>
							<form>
								<div class="inputPayroll">
									<label for="">Payroll Name</label>
									<input
										type="text"
										class="form-control"
										id=""
										placeholder="item name"
										name="name"
										value={this.state.name} onChange={this.handleChange}
									/>
								</div>
								<div class="">
									<div class="inputPayroll-Checkbox">
										<div class="checkBox1">
											<span
												style={{ marginRight: "6px" }}
												className="radio-button__label"
											>
												taxable
											</span>
											<label class="radio-button">
												<input
													type="radio"
													className="radio-button__input"
													value={this.state.taxable}
													
												/>

												<span
													onClick={(e)=>this.toggleRadio("taxable")}
													className={`radio-button__control	${
														this.state.taxable === true
															? " turnOn"
															: ""
													}`}
												></span>
											</label>
										</div>

										<div class="checkBoxW">
											<span
												style={{ marginRight: "6px" }}
												className="radio-button__label"
											>
												pensionable
											</span>
											<label class="radio-button">
												<input
													type="radio"
													className="radio-button__input"
													
												/>

												<span
													onClick={(e)=>this.toggleRadio("pensionable")}
													className={`radio-button__control	${
														this.state.pensionable === true
															? " turnOn"
															: ""
													}`}
												></span>
											</label>
										</div>
									</div>
									<div class="inputPayroll-Checkbox">
										<div class="checkBox1 checkbox2">
											<span
												style={{ marginRight: "6px" }}
												className="radio-button__label"
											>
												positive
											</span>
											<label class="radio-button">
												<input
													type="radio"
													className="radio-button__input"
													
												/>

												<span
												onClick={(e)=>this.toggleRadio("positive")}
													className={`radio-button__control	${
														this.state.positive === true
															? " turnOn"
															: ""
													}`}
												></span>
											</label>
										</div>
									</div>
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
										<label for="">Occurance</label>
										<input
										name="occurence"
											type="number"
											class="form-control"
											id=""
											placeholder="Occurance"
											onChange={this.handleChange}
											value={this.state.occurence}
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
												selected={this.state.startDate}
												onChange={this.handleDate}
												className="payrolDatePicker"
												value={moment(this.state.effectiveDate).toDate()}
												
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
					<PayRollModal onChangePayroll={this.handleChange} payrolldata={this.state.applicableTo}/>
				</div>
			</Layout>
		);
	}
}

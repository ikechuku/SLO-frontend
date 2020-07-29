import React, { Component } from 'react'
 import {SalaryStructureItemModal} from '../Modals/salaryStructureItemModal'
 import { NotificationManager } from "react-notifications";
import axios from "axios";
import { modal } from "bootstrap";
import { Link } from "react-router-dom";
import Layout from "../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import $ from 'jquery';
import { hideLoader, showLoader } from "../../helpers/loader";

export default class salaryStructureItem extends Component {
	constructor(props){
		super(props)
		this.state={
			payrollItems:[],
			name:null,
			amount:null,

		}
		console.log(this.props.match.params.id)
	}
componentDidMount(){
	this.getPayrollID()
}

handleChange  =  (e) => {
	e.preventDefault();
	this.setState({ [e.target.name]: e.target.value });
console.log(this.state)
  }
	getPayrollID = async ()=>{
	
	
		try{
		
			showLoader()
			const res = await httpGet(`/payroll_items`)
	  console.log(res)
			if(res.code === 200){
				this.setState({
					payrollItems:res.data.payrollItems
				})
				console.log(this.state.payrollItems)
				hideLoader();
	
				
			}
	  
		  }catch(error){
			hideLoader();
			console.log(error);
		  }
		
	  }

	  handleSubmit= async ()=>{
		const SalaryStructure = {name:this.state.name};
		if (this.state.amount === "") {
		  NotificationManager.error(
			  "Opps Salary Structure Filed Can't Be Empty",
				  "Oops!",
				  3000
			  );
  
			  
		}
  
		else{
				  
	  
		try{
		  
		  showLoader()
		  let data ={
			salaryStructureId: this.props.match.params.id,
			payrollItemId: this.state.name,
			amount: this.state.amount,
		  }
		  const res = await httpPost(`add_salary_structure`,data)
	   console.log(data)
		  if(res.code === 201){
		  this.setState({name:""})
		  $('.modal').modal('hide');
          $(document.body).removeClass('modal-open');
          $('.modal-backdrop').remove();
					hideLoader();
					NotificationManager.success(
					  "A Salary Structure item has successfully been created",
						  "Success!",
						  5000
					  );
		  }
	
		}catch(error){
		  hideLoader();
		  console.log(error);
		}}
		}
    render() {


		
        return (
            <Layout>
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
									Pay Now
								</a>
							</li>
						</ol>
						<div class="checkBoxW salaryStructure">
						

                            <i class="fa fa-plus" aria-hidden="true"></i>    <button type="button" class="" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>
						</div>
						<div className="DropDownWrap56">
							<div>
                                </div>
                                </div>
                                </section>
                            
                                </div>
                                <SalaryStructureItemModal payrollData={this.state.payrollItems}
								handleChange={this.handleChange} name={this.state.name}
								 amount={this.state.amount}
								 handleSubmit={this.handleSubmit}
								 />   
            </Layout>
        )
    }
}

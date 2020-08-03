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
import SalaryStructureItemsTable from './salaryStructureItemsTable'

export default class salaryStructureItem extends Component {
	constructor(props){
		super(props)
		this.state={
			payrollItems:[],
			name:null,
			amount:null,
			salaryData:[],
            salaryStructureItems:[{
				name:"static Data",
				amount:"500"
			},
			{
				name:"static Data",
				amount:"500"
			},

			{
				name:"static Data",
				amount:"500"
			},

		]
		}
		console.log(this.props.match.params.id)
	}
componentDidMount(){
	this.getPayrollID()
	this.getSalaryStructure()
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

		getSalaryStructure= async()=>{
			try{
				 
					showLoader()
					// const res = await httpGet(`salary_structure/8d3f5b8a-1164-4caa-8c62-3ff62d85d0e7`)
					const res = await httpGet(`salary_structure/${this.props.match.params.id}`)
					if (res.code === 200) {
						this.setState({salaryData:res.data.salaryStructureItem})
					}
					hideLoader()
			  
				console.log(res)
					
			  
				  }
				  catch(error){
					hideLoader();
					console.log(error);
				  }}
				
				  GetAlertId= async(id)=>{
					this.setState({
						modalDeleteID:id,
						hideActions: !this.state.hideActions
					})
				  }
		
    render() {


		
        return (
            <Layout page="salaryStructure">
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
						
						<div className="DropDownWrap56">
							<div>
                                </div>
<div style={{padding:"30px"}}>
<div style={{marginBottom:"22px"}} class="checkBoxW ">
						

                            
						<button style={{background: "transparent",
border: "none",cursor:"pointer",color:"#003766",fontsize:"18px",fontWeight:"600"}} type="button" class="" data-toggle="modal" data-target="#exampleModal">
						<i style={{    backgroundColor: "#003766",
width: "22px",
height: "22px",
borderRadius: "11px",
color: "white",
lineHeight: "1.7",
fontsize: "15px"}} class="fa fa-plus" aria-hidden="true"></i> Create Salary Structure Items
</button>
				</div>
	<SalaryStructureItemsTable salaryStructureItems={this.state.salaryStructureItems}/>
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

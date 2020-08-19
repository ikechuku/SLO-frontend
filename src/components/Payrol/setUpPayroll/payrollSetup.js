import React, { Component } from "react";
import $, { data } from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import {Link} from 'react-router-dom'
import Layout from "../../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../../actions/data.action";
import { hideLoader, showLoader } from "../../../helpers/loader";
import "./setup.css";
import PayHistory from "./payHistory";
export default class payrollsetup extends Component {
	constructor(props){
		super(props)
		this.state={
			regions:[],
			regionId:null,
			areaId:null,
			branchId:null,
			areas:[],
			areaOptions: [],
			branchOptions:[],
			branches:[]
		}
	}

	getRegion= async()=>{
        try{
             
                showLoader()
                const res = await httpGet(`/all_region`)
                
                if (res.code === 200) {
                    console.log(res)
                    this.setState({
						regions:res.data.regions
					})
				}
				console.log(this.state.regions)
             hideLoader()
          
          
          
              }
              catch(error){
                hideLoader();
                console.log(error);
			  }}


			  getArea= async()=>{
				try{
					 
						showLoader()
						const res = await httpGet(`/all_area`)
						
						if (res.code === 200) {
							console.log(res)
							this.setState({
							areas:res.data.areas
							})
						}
					console.log(res.data.areas)
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
									console.log(res)
									this.setState({
										branches:res.data.branches
									})
								}
							console.log(res.data)
							 hideLoader()
						  
						  
						  
							  }
							  catch(error){
								hideLoader();
								console.log(error);
							  }}
		
		

					  getAreaData=()=>{
						  console.log(">>>>>gets here", this.state.areas)
						 const areaData = [...this.state.areas].filter(
							(datas) => 
							datas.regionId === this.state.regionId
						)
						console.log("areaDatass",areaData)
						this.setState({
							areaOptions: areaData,
						});
						console.log(this.state.regionId, this.state.areas) 
					  }

					  getBranchData=()=>{
						const branchData = [...this.state.branches].filter(
							(datas) => 
							datas.areaId === this.state.areaId
						)
						this.setState({
							branchOptions:branchData
						});
					 console.log(">>>>>",this.state.areaId)
					  }



componentDidMount= async()=>{
 this.getRegion()
this.getArea()
	this.getBranch()

}

handleChange  =  async (e,type) => {
	e.preventDefault();
	await this.setState({ [e.target.name]: e.target.value });
console.log(this.state.regionId)

if (type === "area") {
	console.log(">>>>>gets herer")
	this.getAreaData()
}

if (type === "branch") {
this.getBranchData()
}
  }

  
          
	render() {
		console.log('@@', this.state.areas)
		return (
			<Layout page="payrollSetup">
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
									Process Payroll
								</a>
							</li>
						</ol>
					</section>
					<section className="paysetUpwraper">
						<div style={{ marginBottom: "20px" }} className="payroll-headr">
							<h1 style={{ fontSize: "23px", marginLeft: "50px" }}>
								Process Payroll
							</h1>
						</div>
						<div className="payroll-form-setup">
							<form>
							<div class="inputPayroll-setup">
									<div class="inputPayroll-setup-wrap">
										<label for="">Month for payment</label>
										<select class="form-control" id="">
											<option>Select Months</option>
											<option>Jan</option>
											<option>Data 2</option>
										</select>
									</div>

									
								</div>
								<div class="inputPayroll-setup">
								

									<div class="inputPayroll-setup-wrap">
										<label for="">Title</label>

										<input
											type="text"
											class="form-control"
											id=""
											placeholder="Type in the title"
										/>
									</div>

									<div class="inputPayroll-setup-wrap">
										<label>Region</label>
									<select

	 name="regionId"
	 onChange={this.handleChange} 
	
	class="form-control" id="exampleFormControlSelect1">
			<option >Select</option>
		{this.state.regions.map((data)=>{
			return(
			
		
			
				<option  value={data.id}>{data.name}</option>
			
				
			)
		})}
    
    </select>
									</div>
								</div>

								<div class="inputPayroll-setup">
									<div class="inputPayroll-setup-wrap">
										<label for="">Area</label>
										<select
										disabled={this.state.regionId===null}
	 name="areaId"
	 onChange={(e)=>this.handleChange(e,"area")} 
	 onClick={this.getAreaData}
	class="form-control" id="exampleFormControlSelect1">
			<option value={this.state.regionId}>Select</option>
		{this.state.areaOptions.map((data)=>{
			return(
			
		
			
				<option  value={data.id}>{data.name}</option>
			
				
			)
		})}
    
    </select>
									</div>

									<div class="inputPayroll-setup-wrap">
										<label for="">Branch</label>

										<select
										 name="branchId"
										
										 onChange={(e)=>this.handleChange(e,"branch")} 
										 onClick={this.getBranchData}
										class="form-control" id="">
											<option>Select Branch</option>
											{this.state.branchOptions.map((data)=>{
			return(
			
		
			
				<option value={data.id}>{data.name}</option>
			
				
			)
		})}
										</select>
									</div>
								</div>

								<div className="buttonWrap-setup">
									<Link to="/process_payroll">
									<button type="submit" class="btn btn-primary">
										Proceed
									</button>
									</Link>
									
								</div>
							</form>
						</div>
						<PayHistory />
						<br />
					</section>
				</div>
			</Layout>
		);
	}
}

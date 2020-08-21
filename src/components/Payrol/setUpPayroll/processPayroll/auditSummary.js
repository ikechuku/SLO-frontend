import React, { Component } from "react";
import $, { data } from "jquery";
import moment from 'moment'
import { NotificationManager } from "react-notifications";
import axios from "axios";
import {Link} from 'react-router-dom'
import Layout from "../../../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../../../actions/data.action";
import { hideLoader, showLoader } from "../../../../helpers/loader";
import "./index.css";
import Buttons from "react-bootstrap-sweetalert/dist/components/Buttons";

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
			branches:[],
			payrollMonth:null,
			payrollYear:new Date().getFullYear(),
			title:"",
			regionName:"",
			payrollId:null,
			branchName: '',
			areaName: '',
            regionName: '',
            pendingAdmin:true,
		}
		this.inputRef = React.createRef();
		console.log(this.props)
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
					

             


                     <div className="toggleAuditTABLE">
                  <button onClick={()=>{this.setState({pendingAdmin:false})}} className="activeAuditBtn">Pending</button>   <button onClick={()=>{this.setState({pendingAdmin:true})}} className="UnactiveAuditBtn">Approved</button>
                     </div>
					<section className="paysetUpwraper">
					<div style={{ marginBottom: "20px" }} className="payroll-headr">
							<h1 style={{ fontSize: "23px", marginLeft: "19px" }}>
							{
                                this.state.pendingAdmin?"Approved Payroll Process":"Pending Payroll Process"
                            }	
							</h1>

						</div>
                        {
                          this.state.pendingAdmin === true?(
  <div className="pendingAdminWrap">
                       <div className="pendingAdmin">
                           <div className="payrollName344">Lagos Branch</div>

                           <div className="payrollAdminActions">
                             <Link className="adminRlink" to="/audit_view_payroll">View</Link>  
                           </div>
                       </div>

                       <div className="pendingAdmin">
                           <div className="payrollName344">Lekki Branch</div>

                           <div className="payrollAdminActions">
                              <Link className="adminRlink" to="/audit_view_payroll">View</Link> 
                           </div>
                       </div>


                       <div className="pendingAdmin">
                           <div className="payrollName344">Aba Branch</div>

                           <div className="payrollAdminActions">
                              <Link className="adminRlink" to="/audit_view_payroll">View</Link> 
                           </div>
                       </div>


                       <div className="pendingAdmin">
                           <div className="payrollName344">Aba Branch</div>

                           <div className="payrollAdminActions">
                              <Link className="adminRlink" to="/audit_view_payroll">View</Link> 
                           </div>
                       </div>
                       </div>
                          ):(  <div className="pendingAdminWrap">
                       <div className="pendingAdmin">
                           <div className="payrollName344">Aba Branch</div>

                           <div className="payrollAdminActions">
                              <Link className="adminRlink" to="/audit_view_payroll">View</Link> 
                           </div>
                       </div>

                       <div className="pendingAdmin">
                           <div className="payrollName344">Aba Branch</div>

                           <div className="payrollAdminActions">
                              <Link className="adminRlink" to="/audit_view_payroll">View</Link> 
                           </div>
                       </div>


                       <div className="pendingAdmin">
                           <div className="payrollName344">Aba Branch</div>

                           <div className="payrollAdminActions">
                              <Link className="adminRlink" to="/audit_view_payroll">View</Link> 
                           </div>
                       </div>


                       <div className="pendingAdmin">
                           <div className="payrollName344">Aba Branch</div>

                           <div className="payrollAdminActions">
                              <Link className="adminRlink" to="/audit_view_payroll">View</Link> 
                           </div>
                       </div>
                       </div>)
                      }

                       


					</section>
					
				</div>
				<br/>
			</Layout>
		);
	}
}

import React, { Component } from 'react'
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";

import Layout from "../../../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../../../actions/data.action";
import { hideLoader, showLoader } from "../../../../helpers/loader";
import './index.css'
import ProcessPayrollTable from './processPayrollTable'
import PreviewTable from './previewPayrollData'
export default class processPayroll extends Component {
    constructor(props){
        super(props)
   this.state={
       processPayrollData:[],
    previewPayroll:[],
    toggleTabel:false,
    usersId:[],
    processPayroll:[]
   }
    }

    previewPayrollProcess=(e, value)=>{
        console.log(e.target.checked)
        if (e.target.checked){
          //append to array
          this.setState({
            previewPayroll: this.state.previewPayroll.concat(value),
            usersId: this.state.usersId.concat(value.staffId)
          })
         
        } else {
          //remove from array
          this.setState({
            previewPayroll : this.state.previewPayroll.filter(function(val) {return val!==value})
          })
       }
       console.log(this.state.previewPayroll)
    }
    
  

    componentDidMount= async()=>{
        this.getPayrollProcess()
       
        console.log(">>>>>getsssss")
       }

       

    
    getPayrollProcess=async()=>{
        const { id } = this.props.match.params
        try {
            showLoader()
            const res = await httpGet(`processing_payroll_users/${this.props.match.params.id}`)
            const data = await httpGet(`process_payroll/${id}`)
            if (res.code === 200) {
                hideLoader()
                this.setState({
                    processPayrollData:res.data.processPayrollUsers,
                    processPayroll: data.data.processPayroll
                })
            }
            console.log(this.state.processPayrollData)
        } catch (error) {
            
        }
    }


    changeTable=()=>{
        this.setState({
            toggleTabel:!this.state.toggleTabel
        })
    }

    handleSubmit=async()=>{
        let data = {
            staffIds: this.state.usersId
        }
        console.log("data======",data)
        showLoader()
        try {
            const res = await httpPost(`submit_payroll/${this.props.match.params.id}`,data)
            if (res.code===200) {

                hideLoader() 
                NotificationManager.success('Successfully Created', 'Success')
                this.props.history.push("/setup-payroll")
            }
           
        } catch (error) {
            hideLoader()
        }
    }


    
         
    
    render() {

        const { processPayroll } = this.state;
        const { branchId, areaId, regionId } = processPayroll;
        let regionName, areaName, branchName;
        if(branchId){
            regionName = processPayroll.branch !== undefined ? processPayroll.branch.region.name : '';
            areaName = processPayroll.branch !== undefined ? processPayroll.branch.area.name : '';
            branchName = `${processPayroll.branch.name} branch`;
        }
        if(areaId){
            regionName = processPayroll.area !== undefined ? processPayroll.area.region.name : '';
            areaName = processPayroll.area !== undefined ? processPayroll.area.name : '';
            branchName = '';
        }
        if(regionId){
            regionName = processPayroll.region !== undefined ? processPayroll.region.name : '';
            areaName = '';
            branchName = '';
        }
        const month = processPayroll.month !== undefined ? processPayroll.month.toUpperCase() : '';


        console.log(this.state.processPayrollData)
        return (
            <div>
                <Layout page="payrollSetup">
				<div className="app-content">
					<section className="section">
					
					</section>

                    <div id="appWrapResponsive">
	    <section className="PayrollLocationInfo">
                  <h1>Payroll for {regionName} region, {areaName}</h1>
                  <h2>Period: {month + ' ' + processPayroll.year} </h2>
                  <h3>{branchName}</h3>
                    </section>

    <div className="processPayrollTable">
        

    <div className={`${this.state.toggleTabel ===false? "greaterZindex":"lesserZindex"}`}>
      <ProcessPayrollTable sumUp={this.sumUp} previewPayrollProcess={this.previewPayrollProcess} payroll={this.state.processPayrollData}/>  
    </div>

    
    <div className={`${this.state.toggleTabel ===true? "greaterZindex":"lesserZindex"}`}>
    <PreviewTable payroll={this.state.previewPayroll}/>
      </div>

                
         
  <div style={{position:"relative"}}>
<div className="PayrollTotal">
      <h1>Total Gross</h1>

      <div className="payrollDataP">
 <div>
          <span>Gross Pay</span> <span>300,00</span>
      </div>

      <div>
          <span>Deduction</span> <span>300,00</span>
      </div>

      <div>
          <span>Net Pay</span> <span>300,00</span>
      </div>
      </div>
     
  </div>
  </div>
  <div className="processPayrollAction">
        <button onClick={this.handleSubmit}>Submit</button> <button onClick={this.changeTable} >{this.state.toggleTabel===false?"Preview":"Select More"}</button>
  </div>
        </div>
                  
                    </div>


                    </div>
				
                    </Layout>
            </div>
        )
    }
}

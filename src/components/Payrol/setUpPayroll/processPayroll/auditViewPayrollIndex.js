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
import ProcessPayrollTable from './auditViewPayroll'
import PreviewTable from './previewPayrollData'
export default class processPayroll extends Component {
    constructor(props){
        super(props)
   this.state={
       processPayrollData:[],
    previewPayroll:[],
    toggleTabel:false,
    usersId:[],
    user:"admin"
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
        try {
            showLoader()
            const res = await httpGet(`processing_payroll_users/${this.props.match.params.id}`)
            if (res.code === 200) {
                hideLoader()
                this.setState({
                    processPayrollData:res.data.processPayrollUsers
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
        console.log(this.state.processPayrollData)
        return (
            <div>
                <Layout page="payrollSetup">
				<div className="app-content">
					<section className="section">
					
					</section>

                    <div id="appWrapResponsive">
	<section className="PayrollLocationInfo">
                  <h1>Payroll for Northwest region, Lagos</h1>
                  <h2>Period: June 2020</h2>
                  <h3>Aba branch</h3>
                    </section>

    <div className="processPayrollTableAudit">
        

    <div className={`${this.state.toggleTabel ===false? "greaterZindex":"lesserZindex"}`}>
      <ProcessPayrollTable sumUp={this.sumUp} previewPayrollProcess={this.previewPayrollProcess} payroll={this.state.processPayrollData}/>  
    </div>

    
    <div className={`${this.state.toggleTabel ===true? "greaterZindex":"lesserZindex"}`}>
    <PreviewTable payroll={this.state.previewPayroll}/>
      </div>

                
         
  <div style={{position:"relative"}}>
<div className="PayrollTotal audit">
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
  <div style={{position:"relative"}}>
     <div className="auditCommentBox">
         {
             this.state.user==="audit"?(
                <form>
                <div  class="form-group dojdo">
                  
                  <input type="email" className="form-control removeIborders" id="exampleInputEmail1" 
                  aria-describedby="emailHelp" placeholder="Comment"/>
                   <button type="submit" className="btn  submitComment">Submit</button>
                  </div>
              
               
              </form>
             ):(
                <div className="auditcommentText">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, ea? 
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, ea?
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, ea?
                </div>
             )
         }
    
     </div>
     </div>

      
  
  <div className="processPayrollAction">
        <button onClick={this.handleSubmit}>Submit</button> <button onClick={this.changeTable} >{this.state.toggleTabel===false?"Preview":"Select More"}</button>
  </div>
        </div>
                  
                    </div>


                    </div>
				<br/>
                    </Layout>
            </div>
        )
    }
}

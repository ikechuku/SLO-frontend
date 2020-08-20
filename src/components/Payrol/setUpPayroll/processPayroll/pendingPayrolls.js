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
import PendingPayrolls from './pendingPayrollTable'

export default class processPayroll extends Component {
    constructor(props){
        super(props)
   this.state={
       processPayrollData:[],
    previewPayroll:[],
    toggleTabel:false,
    usersId:[]
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
            const res = await httpGet(`pending_processing_payroll`)
            console.log(res)
            if (res.code === 200) {
                hideLoader()
                this.setState({
                    processPayrollData:res.data.pendingProcessPayroll
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
               <PendingPayrolls previewPayrollProcess={this.previewPayrollProcess} processPayrollData={this.state.processPayrollData}/>
               <div className="processPayrollAction">
        <button >Submit</button> <button onClick={this.changeTable} >{this.state.toggleTabel===false?"Preview":"Select More"}</button>
  </div>
            </div>
        )
    }
}

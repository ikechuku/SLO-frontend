import React, { Component } from 'react'
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import PayrollModal from '../../../Modals/addPayrollItem2'
import Layout from "../../../layout/index";
// import {
// 	httpPost,
// 	httpGet,
// 	httpDelete,
// 	httpPatch,
// } from "../../../actions/data.action";
// import { hideLoader, showLoader } from "../../../helpers/loader";
import './index.css'
import ProcessPayrollTable from './processPayrollTable'
export default class processPayroll extends Component {
    constructor(props){
        super(props)
   this.state={
   
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
                  <h1>Pay slip for the month of march 2019</h1>
                  <h2>OSARUMWENSE EBOIGB</h2>
                  <h3>Aba branch</h3>
                
                    </section>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPayroll2" className="addPayrollBtn">Add Payroll Item</button>
 <h1 style={{marginLeft: "20px",
    fontSize: "20px",
    marginBottom: "-7px"}}>Payslip Details</h1>
<div className="flexPayslip">




<div className="userpayslipWrap">

    <div className="payslipheader">
   <span className="headerinfo">
   Earnings for the month
   </span>

   <span className="headerinforesult">
   Amount
   </span>
    </div>

   <div className="Userpayslip">
       <span className="Userpayslipeven">Meal</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Transport Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Housing Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Hospital Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Master Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Transport Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


 
<div className="addRelative">
     <div className="payslipheader stickAmout">
   <span className="headerinfo">
   Total
   </span>

   <span className="headerinforesult">
  900,000
   </span>
    </div>
</div>


</div>




<div className="userpayslipWrap">

    <div className="payslipheader">
   <span className="headerinfo">
   Allowances for the month
   </span>

   <span className="headerinforesult">
   Amount
   </span>
    </div>

   <div className="Userpayslip">
       <span className="Userpayslipeven">Meal</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Transport Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Housing Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Hospital Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Master Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Transport Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 

<div className="addRelative">
     <div className="payslipheader stickAmout">
   <span className="headerinfo">
   Total
   </span>

   <span className="headerinforesult">
  900,000
   </span>
    </div>
</div>
     


</div>





<div className="userpayslipWrap">

    <div className="payslipheader">
   <span className="headerinfo">
   Deduction for the month
   </span>

   <span className="headerinforesult">
   Amount
   </span>
    </div>

   <div className="Userpayslip">
       <span className="Userpayslipeven">Meal</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Transport Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Housing Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Hospital Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Master Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


          <div className="Userpayslip">
       <span className="Userpayslipeven">Transport Allowance</span>
       <span className="UserpayslipOdd">20000</span>
          </div> 


 
<div className="addRelative">
     <div className="payslipheader stickAmout">
   <span className="headerinfo">
   Total
   </span>

   <span className="headerinforesult">
  900,000
   </span>
    </div>
</div>


</div>


</div>
    







          </div>


                    </div>
                    <PayrollModal/>
				
                    </Layout>
            </div>
        )
    }
}

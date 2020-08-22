import React, { Component } from 'react'
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import PayrollModal from '../../../Modals/addPayrollItem2'
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
export default class processPayroll extends Component {
    constructor(props){
        super(props)
   this.state={
      payrollItems:[],
      amount:"",
      name:"",
   
   }
   console.log(">>>",this.props)
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
		if (this.state.amount === "" || this.state.name === "invalidData" || this.state.name === null ) {
		  NotificationManager.error(
			  "Opps Insert Data",
				  "Oops!",
				  4000
			  );
  
			  
		}
  
		else{
				  
	  
		try{
		  
		  showLoader()
		  let data ={
			payrollItemId:this.state.name,
			processPayrollUserId:this.props.match.params.id2,
			amount: this.state.amount,
        }
       
		 const res = await httpPost(`add_payroll_item_user`,data)
	   console.log(data)
		  if(res.code === 200){
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
					  this.getSalaryStructure()
					  this.clearModal()
		  }
	
		}catch(error){
		  hideLoader();
		  console.log(error);
		}}
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
                    <PayrollModal
                    payrollData={this.state.payrollItems}
                    handleChange={this.handleChange} 
                    name={this.state.name}
                    handleSubmit={this.handleSubmit}
                    />
				
                    </Layout>
            </div>
        )
    }
}

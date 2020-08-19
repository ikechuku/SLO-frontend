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
export default class processPayroll extends Component {
    constructor(props){
        super(props)
   this.state={
       processPayrollData:[{
           uid:Math.random(),
           name:"OSARUMWENSE EBOIGBE",
           employeeID:"3547D",
           Paygrade:"Junior Level",
           grossPay:"25000",
           addictions:"0.00",
           reduction:"20,00",
           netPay:"12,000",
           bankCode:"1768",
           bankAccount:"09901644363"
       },

       {
       
        uid:Math.random(),
        name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    },


    {
       
        uid:Math.random(),
      
        name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    },


    {
        
       uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    },


    {
        
       uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    },


    {
        
       uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    },

    {
        
       uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    },
    {
        
       uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    }, 
     {
     uid:Math.random(),
          name:"OSARUMWENSE EBOIGBE",
        employeeID:"3547D",
        Paygrade:"Junior Level",
        grossPay:"25000",
        addictions:"0.00",
        reduction:"20,00",
        netPay:"12,000",
        bankCode:"1768",
        bankAccount:"09901644363"
    },
    
    ],
    previewPayroll:[]
   }
    }
    
    previewPayrollProcess=(data)=>{
        console.log(this.state.previewPayroll)
        if (this.state.previewPayroll.length === 0) {
            this.state.previewPayroll.push(data)
        }
           this.state.previewPayroll.map((eachPayroll)=>{
        console.log("---each payroll----",eachPayroll.uid)
        if(eachPayroll.uid === data.uid){
          console.log("---uid----",data.uid)
       
    
         this.setState({
            previewPayroll: this.state.previewPayroll.filter(
                (datas) => datas.uid !== data.uid
            ),
        });
        console.log(this.state.previewPayroll)
        }
    
        else{
            this.state.previewPayroll.push(data)
         }
             })  
           
                
    
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

    <div className="processPayrollTable">
  <ProcessPayrollTable previewPayrollProcess={this.previewPayrollProcess} payroll={this.state.processPayrollData}/>

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
<button>Submit</button> <button>Preview</button>
  </div>
        </div>
                  
                    </div>


                    </div>
				
                    </Layout>
            </div>
        )
    }
}

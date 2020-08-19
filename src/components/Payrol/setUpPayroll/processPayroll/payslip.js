import React, { Component } from 'react'
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";

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
                  <h1>Payroll for Northwest region, Lagos</h1>
                  <h2>Period: June 2020</h2>
                  <h3>Aba branch</h3>
                    </section>

    <div className="Userpayslip">

        <div className="payslipHeader">
            <div className="payslipEarning">
            Earnings For THE MONTH
            </div>

            <div className="payslipAmount">
            AMOUNT(N)
            </div>
           </div>

           <div className="payslipBody">
               div
           </div>

       
          </div>







          </div>


                    </div>
				
                    </Layout>
            </div>
        )
    }
}

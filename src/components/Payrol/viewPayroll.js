import React, { Component } from "react";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { datepicker } from "bootstrap";

import Layout from "../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { PayRollModal } from "../Modals/payroll";

export default class payrollForm extends Component {
	constructor(props){
	super(props)
    console.log(this.props.match.params.id)
 
	this.state = {
		startDate: new Date(),
		name: "",
		taxable: "",
		pensionable:false ,
		positive: false,
		periodicity: "",
		occurence: "",
		itemDescription: "",
		applicableTo: [],
		effectiveDate: ""
    };}
    
    componentDidMount= async()=>{
        this.getPayroll()
     
    }

	getPayroll= async()=>{
        try{
             
                showLoader()
                const res = await httpGet(`/payroll_item/${this.props.match.params.id}`)
                
                if (res.code === 200) {
                    console.log(res)
                    this.setState({
                        startDate:res.data.payrollItem.itemDescription,
                        name: res.data.payrollItem.name,
                        taxable: res.data.payrollItem.taxable,
                        pensionable:res.data.payrollItem.pensionable ,
                        positive: res.data.payrollItem.positive,
                        periodicity: res.data.payrollItem.periodicity,
                        occurence: res.data.payrollItem.occurence,
                        itemDescription:res.data.payrollItem.itemDescription,
                        applicableTo:res.data.payrollItem.itemDescription,
                        effectiveDate: res.data.payrollItem.effectiveDate

					})
				}
				console.log(this.state.regions)
             hideLoader()
          
          
          
              }
              catch(error){
                hideLoader();
                console.log(error);
			  }}



	 
	componentDidMount() {}
	render() {
		return (
			<Layout page="payroll">
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
									payroll item
								</a>
							</li>
						</ol>
					</section>

					<div className=" viewPayroll">
                        <h1> Payroll Item Summary</h1>
					<div className="viewpayroll">
        <span>Payroll Name: </span> <span>{this.state.name}</span>
                    </div>

                    <div className="viewpayroll">
        <span>Taxable: </span> <span>{this.state.taxable === true ? "true" : "false"}</span>
                    </div>


                    <div className="viewpayroll">
        <span>Pensionable: </span> <span>{this.state.pensionable === true ? "true" : "false"}</span>
                    </div>


                    <div className="viewpayroll">
        <span>Positive: </span> <span>{this.state.positive === true ? "true" : "false"}</span>
                    </div>

                    <div className="viewpayroll">
        <span>Periodicity:</span> <span>{this.state.periodicity}</span>
                    </div>

                    <div className="viewpayroll">
        <span>Occurence: </span> <span>{this.state.occurence}</span>
                    </div>

                    {/* <div className="viewpayroll">
        <span>Applicable To </span> <span>{this.state.applicableTo.map((data)=>{data})}</span>
                    </div> */}

                    <div className="viewpayroll">
        <span>Item description: </span> <span>{this.state.itemDescription}</span>
                    </div>
					</div>
				
				</div>
			</Layout>
		);
	}
}

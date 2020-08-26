import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import Table from '../../../../helpers/customTable';
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom'
import _ from 'lodash'

export default class branchTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}


	bodyRow = () => {
		const viewApprovedUsers = this.props.payroll.filter(item => item.status);
		const body = viewApprovedUsers.map((data, index) => 
		(
			{
				"name": `${data.user.firstName} ${data.user.lastName}`,
				 "grossPay": <NumberFormat value={this.sumUp(data.payrollProcessingItem)} displayType={'text'} thousandSeparator={true} />,
				//  "addictions":data.addictions,
				
				"netPay": <NumberFormat value={this.getReduction(data.payrollProcessingItem, 'netpay')} displayType={'text'} thousandSeparator={true} />,
                 "bankName": (data.user.bankName).toUpperCase(),
                 "bankAccount":data.user.accountNumber,

				"action": <a><span className='edit' data-toggle="modal" data-target="#branchModal" 
                ><Link to={`/use_payslip/${data.id}`}>Edit</Link></span></a>
			}
		));

	
		return body;
	}

	getReduction = (payroll, type) => {
		let BHT = 0;
		payroll.map(item => {
			if(item.payroll.name === 'Basic Pay' || item.payroll.name === 'Transportation Allowance' || item.payroll.name === 'Housing Allowance' || item.payroll.name === 'Kidnapping'){
				BHT = BHT + parseInt(item.amount)
			}
		})
	
		let grossPay = 0;
		payroll.map(item => (
			grossPay = grossPay + parseInt(item.amount)
		))
	
		const annualGross = grossPay * 12;
		const CR = ((20/100) * annualGross) + 200000;
		// const PR = (8/100) * BHT;
		const PR = 13520;
		const TR = CR + PR;
		const taxableIncome = annualGross - TR;
	
		if(type === 'netpay'){
			return grossPay - this.getTax(taxableIncome)
		} else {
			return this.getTax(taxableIncome)
		}
			
	}
	
	getTax = (taxableIncome) => {
		let newValue = taxableIncome;
		let sumArr = [];
		let checkList = [
			{x: 300000, y: 0.07}, 
			{x: 300000, y: 0.11}, 
			{x: 500000, y: 0.15}, 
			{x: 500000, y: 0.19}, 
			{x: 1600000, y: 0.21}, 
			{x: 3200000, y: 0.24}, 
		];
		for(let i = 0; i < checkList.length; i++){
			if(newValue > checkList[i].x){
				sumArr.push(checkList[i].y * checkList[i].x)
				newValue = newValue - checkList[i].x
			} else if(newValue < checkList[i].x){
				sumArr.push(checkList[i].y * newValue)
				break;
			}
		}
		console.log(sumArr)
		const annualTax = sumArr.reduce((a, b) => a + b, 0)
		const monthlyTax = annualTax / 12;
		return (monthlyTax).toFixed(2)
	}

	sumUp=(value)=>{
		console.log(">>>>>")
		let sum = 0;
		for (let i = 0; i < value.length; i++) {
			sum = sum + parseInt(value[i].amount);
			
			}
		// console.log([sum].reduce((a, b) => a + b, 0))
		return(sum)
			}
	
	header = () => {
		const header = [
			{
				title: ' Name (filterable)',
				prop: 'name',
				sortable: true,
				filterable: true
            },
            { title: 'Gross Pay', prop: 'grossPay', sortable: true },
            { title: 'NetPay', prop: 'netPay' },
            { title: 'Bank Name', prop: 'bankName', sortable: true },
            { title: 'Bank Account', prop: 'bankAccount', sortable: true },
			{ title: 'Actions', prop: 'action' },
		];
		return header;
	}

	render() {
		return (
			<div>
				<Table className="ProcesspayrollTable54"
          body={this.bodyRow}
					head={this.header}
					rowsPerPage={10}
					rowsPerPageOption={[10, 15, 20, 25]}
        />
        
			</div>
		)
	}
}

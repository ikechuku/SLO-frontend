import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import Table from '../../../../helpers/customTable';
import {Link} from 'react-router-dom'
import _ from 'lodash'

export default class branchTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}


	bodyRow = () => {
		const body = this.props.payroll.map((data, index) => (
			
			{
        "checkbox":<div class="form-check">
				<input  
					style={{cursor:"pointer"}}
					onClick={(e)=>{this.props.previewPayrollProcess(e,data)}}
					key={data.staffId} 
					name='list' 
					type='checkbox' type="checkbox" class="form-check-input"
					disabled={data.status ? 'disabled' : ''} 
				/>
              </div>,
				"name": `${data.user.firstName} ${data.user.lastName}`,
				"employeeID": data.user.username,
                "Paygrade": data.user.employmentInfo[0].salaryStructure.name,
                "grossPay":this.sumUp(data.payrollProcessingItem),
				//  "addictions":data.addictions,
				// "addictions":0,
				//  "reduction":data.reduction,
				"reduction":0,
				//  "netPay":data.payrollProcessingItem.map((netpay)=>_.sum(netpay.amount)),
				"netPay":this.sumUp(data.payrollProcessingItem),
                 "bankCode":(data.user.bankName).toUpperCase(),
                 "bankAccount":data.user.accountNumber,

				"action": <a style={data.status ? {display: 'none'} : {}}><span className='edit' data-toggle="modal" data-target="#branchModal" 
				><Link to={`/use_payslip/${data.payrollProcessingId}/${data.payrollProcessingItem.map((data)=>data.processPayrollUserId)}/${data.staffId}`}>Edit</Link></span><span className='del' onClick={() => this.props.handleDelete(data.id)}>Delete</span></a>
			}
		));

	
		return body;
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
            { title: '', prop: 'checkbox' },
			{
				title: ' Name (filterable)',
				prop: 'name',
				sortable: true,
				filterable: true
            },
			{ title: 'Employee ID', prop: 'employeeID', sortable: true },
            { title: 'Pay Grade', prop: 'Paygrade', sortable: true },
            { title: 'Gross Pay', prop: 'grossPay', sortable: true },
            // { title: 'Addition', prop: 'addictions' },
            { title: 'Reduction', prop: 'reduction'},
            { title: 'NetPay', prop: 'netPay' },
            { title: 'Bank Code', prop: 'bankCode', sortable: true },
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

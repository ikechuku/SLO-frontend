import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import Table from '../../../../helpers/customTable';



export default class branchTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}

	bodyRow = () => {
		const body = this.props.payroll.map((data, index) => (
			
			{
                "checkbox":
                
            //     <div class="form-check">
			// 	<input  
			// 	onClick={(e)=>{this.props.previewPayrollProcess(e,data)}}
			// 	key={data.staffId} 
			// 	name='list' 
			// 	type='checkbox'   type="checkbox" class="form-check-input" />
            //   </div>
            ""
            ,
				"name": `${data.user.firstName} ${data.user.lastName}`,
				"employeeID": data.staffId,
                "Paygrade": data.user.employmentInfo.map((emI)=>emI.rank===null?"Add user rank":emI.rank),
                "grossPay":this.sumUp(data.payrollProcessingItem),
				//  "addictions":data.addictions,
				"addictions":0,
				//  "reduction":data.reduction,
				"deduction":0,
				//  "netPay":data.payrollProcessingItem.map((netpay)=>_.sum(netpay.amount)),
				"netPay":this.sumUp(data.payrollProcessingItem),
                 "bankCode":data.bankCode,
                 "bankAccount":data.user.accountNumber,

				"action": <a><span className='edit' data-toggle="modal" data-target="#branchModal" onClick={() => this.props.handleEdit(data.id)}>Edit</span><span className='del' onClick={() => this.props.handleDelete(data.id)}>Delete</span></a>
			}
		));
		return body;
	}

	sumUp=(value)=>{
		console.log(">>>>>")
		let sum = 0;
		for (let i = 0; i < value.length; i++) {
			sum = sum + parseInt(value[i].payroll.amount);
			
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
            { title: 'Addition', prop: 'addictions' },
            { title: 'Deduction', prop: 'deduction'},
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

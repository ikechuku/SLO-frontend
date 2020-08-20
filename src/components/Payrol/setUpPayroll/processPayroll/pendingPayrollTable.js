import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import Table from '../../../../helpers/customTable';
import {Link} from "react-router-dom"


export default class branchTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}

	bodyRow = () => {
		const body = this.props.processPayrollData.map((data, index) => (
			
			{
             
				"name": `${data.title}`,
				"month": data.month,
                 "year": data.year,
                "status":data.status,
                //  "addictions":data.addictions,
                //  "reduction":data.reduction,
                //  "netPay":data.netPay,
                //  "bankCode":data.bankCode,
                //  "bankAccount":data.user.accountNumber,

				"action": <a><span className='edit' >
				<Link to={`/process_pending_payroll/${data.id}`}>Process</Link>
				</span></a>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
          
			{
				title: ' Title (filterable)',
				prop: 'name',
				sortable: true,
				filterable: true
            },
			{ title: 'Month', prop: 'month', sortable: true },
            { title: 'Year', prop: 'year', sortable: true },
            { title: 'Status', prop: 'status', sortable: true },
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

import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import Table from '../../../../helpers/customTable';



export default class branchTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}

	bodyRow = () => {
		const body = this.props.processPayrollData.map((data, index) => (
			
			{
                "checkbox":<div class="form-check">
				<input  
				style={{cursor:"pointer"}}
				onClick={(e)=>{this.props.previewPayrollProcess(e,data)}}
				key={data.staffId} 
				name='list' 
				type='checkbox'   type="checkbox" class="form-check-input" />
              </div>,
				"name": `${data.title}`,
				"month": data.month,
                 "year": data.year,
                "status":data.status,
                //  "addictions":data.addictions,
                //  "reduction":data.reduction,
                //  "netPay":data.netPay,
                //  "bankCode":data.bankCode,
                //  "bankAccount":data.user.accountNumber,

				"action": <a><span className='del' onClick={() => this.props.handleDelete(data.id)}>Delete</span></a>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
            { title: '', prop: 'checkbox' },
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

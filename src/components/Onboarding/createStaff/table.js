import React, { Component } from 'react';
import Table from '../../../helpers/customTable';

export default class StaffTable extends Component {
	constructor(props){
		super(props)
	}

	bodyRow = () => {
		const body = this.props.staffs.map((data, index) => (
			{
				"username": data.username,
				"action": <a><span class='edit' data-toggle="modal" data-target="#createStaffModal" onClick={() => this.props.handleEdit(data.id)}>Edit</span><span class='del' onClick={() => this.props.handleDelete(data.id)}>Delete</span></a>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
			{
				title: 'Username (filterable)',
				prop: 'username',
				sortable: true,
				filterable: true
			},
			{ title: 'Actions', prop: 'action' },
		];
		return header;
	}

	render() {
		return (
			<div>
				<div class="table-responsive" style={{overflow: 'hidden'}}>
				<Table 
          body={this.bodyRow}
				  head={this.header}
				  rowsPerPage={10}
				  rowsPerPageOption={[10, 15, 20, 25]}
        />
				</div>
			</div>
		)
	}
}

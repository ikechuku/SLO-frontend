import React, { Component } from 'react';
import Table from '../../helpers/customTable';

export default class unitTable extends Component {
	constructor(props){
		super(props)
	}

	bodyRow = () => {
		const body = this.props.units.map((data, index) => (
			{
				"unitName": data.name,
				"departments": data.department.name,
				"action": <a><span class='edit' data-toggle="modal" data-target="#unitModal" onClick={() => this.props.handleEdit(data.id)}>Edit</span><span class='del' onClick={() => this.props.handleDelete(data.id)}>Delete</span></a>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
			{
				title: 'Unit Name (filterable)',
				prop: 'unitName',
				sortable: true,
				filterable: true
			},
			{ title: 'Departments', prop: 'departments', sortable: true },
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
					{/* <table class="table table-bordered table-hover mb-0 text-nowrap">
						<tr>
							<th>UNIT NAME</th>
							<th>DEPARTMENT</th>
							<th>Actions</th>

						</tr>
							{
								this.props.units.length ? this.props.units.map(data => (
									<tr>
										<td>{data.name}</td>
										<td>{data.department.name}</td>
			
										<td>
											<span class='edit'>Edit</span>
											<span class='del'>Delete</span>
										</td>
									</tr>
								)) : ''
							}

					</table> */}
				</div>
			</div>
		)
	}
}

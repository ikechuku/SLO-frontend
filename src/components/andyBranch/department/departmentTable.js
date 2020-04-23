import React, { Component } from 'react'

const DepartmentTable = (props) => {

	return (
		<div>
			<div class="table-responsive">
				<table class="table table-bordered table-hover mb-0 text-nowrap">
					<thead>
						<tr>
							<th>Department Nam</th>
							<th>Actions</th>
						</tr>
					</thead>
					
					<tbody>
						{
							props.departments.length ? props.departments.map(data => (
								<tr>
									<td>{data.name}</td>
									<td>
										<span class='edit' data-toggle="modal" data-target="#departmentModal" onClick={() => props.getSingleDepartment(data.id)}>Edit</span>
										<span class='del' onClick={() => props.handleDelete(data.id)}>Delete</span>
									</td>
								</tr>
							)) : ''
						}
					</tbody>

				</table>
			</div>
		</div>
	)
}

export default DepartmentTable;


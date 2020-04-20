import React, { Component } from 'react'

export default class unitTable extends Component {
	constructor(props){
		super(props)
	}
	render() {
		return (
			<div>
				<div class="table-responsive">
					<table class="table table-bordered table-hover mb-0 text-nowrap">
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

					</table>
				</div>
			</div>
		)
	}
}

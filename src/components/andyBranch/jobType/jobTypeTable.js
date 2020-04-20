import React, { Component } from 'react'

export default class jobTypeTable extends Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
            <div>
                <div class="table-responsive">
                <table class="table table-bordered table-hover mb-0 text-nowrap">
                    <tr>
                        <th>Job Type</th>
                        <th>Department/Unit</th>
                        <th>Actions</th>       
                    </tr>

										{
											this.props.roles.length ? this.props.roles.map(data => (
												<tr>		
													<td>{data.title}</td>
													<td>
														{
															data.unitId === null ? data.department.name : data.unit.name
														}
													</td>
													
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

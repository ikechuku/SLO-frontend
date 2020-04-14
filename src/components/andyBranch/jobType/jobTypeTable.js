import React, { Component } from 'react'

export default class jobTypeTable extends Component {
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
													<tr>
													
														<td>Detabase Admin</td>
                                                        <td>IT Dpt</td>
														
														<td>
                                                            <span class='edit'>Edit</span>
                                                            <span class='del'>Delete</span>
                                                        </td>
													</tr>
													<tr>
													
                                                    <td>Detabase Admin</td>
                                                        <td>IT Dpt</td>
														
														<td>
                                                             <span class='edit'>Edit</span>
                                                            <span class='del'>Delete</span>
                                                        </td>
													</tr>
												
												</table>
											</div>
            </div>
        )
    }
}

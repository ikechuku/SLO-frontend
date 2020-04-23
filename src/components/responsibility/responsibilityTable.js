import React, { Component } from 'react'

export default class responsibilityTable extends Component {
    render() {
        return (
            <div>
                <div class="table-responsive">
												<table class="table table-bordered table-hover mb-0 text-nowrap">
													<tr>
														<th>Responsibility Name</th>
                                                        <th>Roles</th>
														<th>Actions</th>
														
													</tr>
													<tr>
													
														<td>Finance</td>
                                                        <td>IT/CVT</td>
														
														<td>
                                                            <span class='edit'>Edit</span>
                                                            <span class='del'>Delete</span>
                                                        </td>
													</tr>
													<tr>
													
														<td>Human Resource</td>
                                                        <td>IT/CVT</td>
														
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

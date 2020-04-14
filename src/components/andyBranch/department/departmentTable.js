import React, { Component } from 'react'

export default class departmentTable extends Component {
    render() {
        return (
            <div>
                <div class="table-responsive">
												<table class="table table-bordered table-hover mb-0 text-nowrap">
													<tr>
														<th>Department Nam</th>
														<th>Actions</th>
														
													</tr>
													<tr>
													
														<td>Finance</td>
														
														<td>
                                                            <span class='edit'>Edit</span>
                                                            <span class='del'>Delete</span>
                                                        </td>
													</tr>
													<tr>
													
														<td>Human Resource</td>
														
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

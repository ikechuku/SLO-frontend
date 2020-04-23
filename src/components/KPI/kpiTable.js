import React, { Component } from 'react'
import { httpGet,httpDelete } from '../../actions/data.action';
import { hideLoader, showLoader } from '../../helpers/loader';
import axios from 'axios'


export default class KpiTable extends Component {

    render() {
        return (
            <div>

                <div class="table-responsive">
												<table class="table table-bordered table-hover mb-0 text-nowrap">
												<thead>
													<tr>
														<th>KPI</th>
														<th>Responsibility</th>
														<th>Job Roles</th>
														<th>Weight Mark</th>
                                                        <th>Actions</th>
														
													</tr>
													</thead>
												
														<tbody>
															
													<tr>
                                                    

														<td>Deposits mobilized as in the budget</td>
														<td>Savings mobilization</td>
														<td>Head of Finance</td>
                                                        <td>10</td>
														<td>
                                                            <span  data-toggle="modal" data-target="#exampleModal45" class='edit'>Edit</span>
															<button className="del"
															>delete</button>
                                                        </td>
													</tr>

                                                    <tr>
                                                    

                                                    <td>Deposits mobilized as in the budget</td>
                                                    <td>Savings mobilization</td>
                                                    <td>Head of Finance</td>
                                                    <td>10</td>
                                                    <td>
                                                        <span  data-toggle="modal" data-target="#exampleModal45" class='edit'>Edit</span>
                                                        <button className="del"
                                                        >delete</button>
                                                    </td>
                                                </tr>


                                                <tr>
                                                    

                                                    <td>Deposits mobilized as in the budget</td>
                                                    <td>Savings mobilization</td>
                                                    <td>Head of Finance</td>
                                                    <td>10</td>
                                                    <td>
                                                        <span  data-toggle="modal" data-target="#exampleModal45" class='edit'>Edit</span>
                                                        <button className="del"
                                                        >delete</button>
                                                    </td>
                                                </tr>


                                                <tr>
                                                    

                                                    <td>Deposits mobilized as in the budget</td>
                                                    <td>Savings mobilization</td>
                                                    <td>Head of Finance</td>
                                                    <td>10</td>
                                                    <td>
                                                        <span  data-toggle="modal" data-target="#exampleModal45" class='edit'>Edit</span>
                                                        <button className="del"
                                                        >delete</button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    

                                                    <td>Deposits mobilized as in the budget</td>
                                                    <td>Savings mobilization</td>
                                                    <td>Head of Finance</td>
                                                    <td>10</td>
                                                    <td>
                                                        <span  data-toggle="modal" data-target="#exampleModal45" class='edit'>Edit</span>
                                                        <button className="del"
                                                        >delete</button>
                                                    </td>
                                                </tr>
													</tbody>
												
												
												</table>
											
											</div>
									
            </div>
        )
    }
}

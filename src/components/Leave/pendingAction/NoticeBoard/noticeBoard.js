import React, { Component } from 'react'
import Layout from '../../../layout/index'
import '../pending.css'

export default class noticeBoard extends Component {
    render() {
        return (
            <div>
              
            <div>

              
									<div class="animation">
										
										<div class="responsiv-table">
											<div class="res ">
                                            <span className="inbox-head">
                                                           <span className="inbox-headi">Notice Board</span>
                                                           <span className="inbox-head-name"><button className="btn btn-sm btn-success">Create</button></span>
                                                       </span>
												<table  class="nowrap andy-table">
                                                    <thead>
                                                      
													<tr className="andy-tr">
														
														<th  className="andy-th">From</th>
														<th  className="andy-th">Label</th>
														<th  className="andy-th">Subject</th>
														<th  className="andy-th">Message</th>
														<th  className="andy-th">Date</th>
														
													</tr>
                                                    </thead>
                                                    <tbody>
													<tr  class='andy-tr tr'>
													
														<td  className="andy-td">Joshua Welch</td>
														<td  className="andy-td"><button className="btn btn-sm btn-primary extr">Group </button></td>
														<td  className="andy-td">App Development</td>
														<td  className="andy-td">We need more hands on the </td>
														<td  className="andy-td">15-10-2018 </td>
														
													</tr>
													<tr  class='andy-tr tr'>
														
														<td  className="andy-td">Alan	Randall</td>
                                                        <td  className="andy-td"><button className="btn btn-sm btn-danger extr">Private</button></td>
														
														<td  className="andy-td">Personal</td>
														<td  className="andy-td">We need more hands on the</td>
														<td  className="andy-td">15-10-2018 </td>
														
													</tr>
													<tr  class='andy-tr tr'>
														
														<td  className="andy-td">Jack	Greene</td>
                                                        <td  className="andy-td"><button className="btn btn-sm btn-primary extr">Group </button></td>
														
														<td  className="andy-td">Slo App Team</td>
														<td  className="andy-td">We need more hands on the</td>
														<td  className="andy-td">15-10-2018</td>
													
													</tr>
													<tr  class='andy-tr tr'>
													
														<td  className="andy-td">Sean Lawrence</td>
														<td  className="andy-td"><button className="btn btn-sm btn-danger extr">Private</button></td>
														
														<td  className="andy-td">Personal</td>
														<td  className="andy-td">We need more hands on the</td>
														<td  className="andy-td">15-10-2018</td>
													
													</tr>
													<tr  class='andy-tr tr'>
														
														<td  className="andy-td">Oliver Welch</td>
														<td  className="andy-td"><button className="btn btn-sm btn-primary extr">Group </button></td>
														
														<td  className="andy-td">Politics</td>
														<td  className="andy-td">We need more hands on the</td>
														<td  className="andy-td">15-10-2018 </td>
														
													</tr>
                                                    </tbody>
												</table>
											</div>
										</div>
									</div>
								</div>



















                
            </div>
        )
    }
}

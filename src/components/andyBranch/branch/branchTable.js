import React, { Component } from 'react'
import { httpGet,httpDelete } from '../../../actions/data.action';
import { hideLoader, showLoader } from '../../../helpers/loader';
import axios from 'axios'
import ReactTooltip from "react-tooltip";
const API_URL = 'http://jsonplaceholder.typicode.com';



export default class branchTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}

	render() {
		
		return (
				<div>
						<div class="table-responsive">
										<table class="table table-bordered table-hover mb-0 text-nowrap">
										<thead>
											<tr>
												<th>Branch Name</th>
												<th>Region</th>
												<th>Address</th>
												<th>Actions</th>
												
											</tr>
											</thead>
											{this.props.branches.map((data) => (
												<tbody>
											<tr key={data.id}>
										
												<td>{data.name}</td>
												<td>{data.region}</td>
												<td>{data.address}</td>
												<td>
																												<span class='edit'>Edit</span>
													<button data-tip="React-tooltip" disabled={this.state.loading?true : false} onClick={() => this.props.deleteBranch(data.id)}
														class='del '>{this.state.loading?'Loading...' : 'Delete'}</button>
																										</td>
											</tr>
											</tbody>
											))}
											<ReactTooltip place="right" type="warning" effect="float"/>
										</table>
									
									</div>
									
				</div>
		)
	}
}

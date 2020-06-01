import React, { Component } from "react";
import Moment from 'react-moment'
import UserLogo from "./Img/userLogo.jpg";

export default class employmentHistory extends Component {
	constructor(props){
		super(props)
	}
	render() {
		return (
			<div>
				<section className="appheaderr5 reduceMargin">
					<h1>Employment History</h1>
				</section>

				<div class="table-responsive">
					<table id="example1" class="col col-md-12 table table-hover table-bordered border-t0 text-nowrap w-100" >
						<thead>
							<tr>
								{/* <th className="wd-15p">S/N</th> */}
								<th class="wd-15p">Employer Name</th>
								<th class="wd-15p">Role</th>
								<th className="wd-15p">Address</th>
								<th className="wd-15p">Date</th>
							</tr>
						</thead>
						<tbody>                                {
								this.props.newEmploymentHistory.length ? this.props.newEmploymentHistory.map((data, index) => (
									<tr key={index}>
										{/* <td>{index + 1}</td> */}
										<td>{data.employerName}</td>
										<td>{data.role}</td>
										<td>{data.address}</td>
										<td>{<Moment format='MMM, YYYY'>{data.startDate}</Moment>} - {<Moment format='MMM, YYYY'>{data.endDate}</Moment>}</td>
									</tr>
								)) : ''
							}
						</tbody>
					</table>
			</div>
			
			</div>
		);
	}
}

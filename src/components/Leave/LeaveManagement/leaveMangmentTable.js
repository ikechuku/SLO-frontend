import React, { Component } from "react";

export default class LeaveMngementTable extends Component {
	render() {
		return (
			<div>
				<div className="table-responsive">
					<table className="table table-bordered table-hover mb-0 text-nowrap">
						<thead>
							<tr>
								<th>User ID</th>
								<th>Staff Name</th>
								<th>Position</th>
								<th>Branch</th>
								<th>Region</th>
								<th>Leave Type</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>123/44</td>
								<td>John Doe</td>
								<td>Manager</td>
								<td>Lagos Branch</td>
								<td>Benin Region</td>
								<td>Casual Leave</td>
								<td>Pending</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal2"
										className="edit"
									>
										View Application
									</span>
								</td>
							</tr>

							<tr>
								<td>123/44</td>
								<td>John Doe</td>
								<td>Manager</td>
								<td>Lagos Branch</td>
								<td>Benin Region</td>
								<td>Casual Leave</td>
								<td>Pending</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal2"
										className="edit"
									>
										View Application
									</span>
								</td>
							</tr>

							<tr>
								<td>123/44</td>
								<td>John Doe</td>
								<td>Manager</td>
								<td>Lagos Branch</td>
								<td>Benin Region</td>
								<td>Casual Leave</td>
								<td>Pending</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal2"
										className="edit"
									>
										View Application
									</span>
								</td>
							</tr>

							<tr>
								<td>123/44</td>
								<td>John Doe</td>
								<td>Manager</td>
								<td>Lagos Branch</td>
								<td>Benin Region</td>
								<td>Casual Leave</td>
								<td>Pending</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal2"
										className="edit"
									>
										View Application
									</span>
								</td>
							</tr>

							<tr>
								<td>123/44</td>
								<td>John Doe</td>
								<td>Manager</td>
								<td>Lagos Branch</td>
								<td>Benin Region</td>
								<td>Casual Leave</td>
								<td>Pending</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal2"
										className="edit"
									>
										View Application
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

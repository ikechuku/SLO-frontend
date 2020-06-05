import React, { Component } from "react";

import axios from "axios";

export default class LeaveTable extends Component {
	render() {
		return (
			<div>
				<div className="table-responsive">
					<table className="table table-bordered table-hover mb-0 text-nowrap">
						<thead>
							<tr>
								<th>Leave Type</th>
								<th>Leave Duration</th>
								<th>Disapproval Level</th>
								<th>Paid Level</th>
								<th>Active</th>
								<th>Modified</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>Anual Leave </td>
								<td>20-30 days</td>
								<td>First Level</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>2020-03-16 12:33</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="view"
									>
										View
									</span>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="edit"
									>
										Edit
									</span>
									<button className="del">delete</button>
								</td>
							</tr>

							<tr>
								<td>Anual Leave </td>
								<td>20-30 days</td>
								<td>First Level</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>2020-03-16 12:33</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="view"
									>
										View
									</span>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="edit"
									>
										Edit
									</span>
									<button className="del">delete</button>
								</td>
							</tr>

							<tr>
								<td>Anual Leave </td>
								<td>20-30 days</td>
								<td>First Level</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>2020-03-16 12:33</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="view"
									>
										View
									</span>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="edit"
									>
										Edit
									</span>
									<button className="del">delete</button>
								</td>
							</tr>

							<tr>
								<td>Anual Leave </td>
								<td>20-30 days</td>
								<td>First Level</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>2020-03-16 12:33</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="view"
									>
										View
									</span>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="edit"
									>
										Edit
									</span>
									<button className="del">delete</button>
								</td>
							</tr>

							<tr>
								<td>Anual Leave </td>
								<td>20-30 days</td>
								<td>First Level</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
									/>
								</td>
								<td>2020-03-16 12:33</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="view"
									>
										View
									</span>
									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="edit"
									>
										Edit
									</span>
									<button className="del">delete</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

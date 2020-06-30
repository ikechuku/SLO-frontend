import React, { Component } from "react";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { datepicker } from "bootstrap";
import Layout from "../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class payrollForm extends Component {
	state = {
		startDate: new Date(),
	};

	handleChange = (date) => {
		this.setState({
			startDate: date,
		});
	};
	componentDidMount() {}
	render() {
		return (
			<Layout page="payrollForm">
				<div className="app-content">
					<section className="section">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="#" className="text-muted">
									Home
								</a>
							</li>
							<li className="breadcrumb-item">
								<a href="#" className="text-muted">
									Payroll
								</a>
							</li>
						</ol>
					</section>
					<div className="payroll-header">
						<h1>Add Payroll Item</h1>
					</div>
					<div className="payroll-form">
						<form>
							<div class="inputPayroll">
								<label for="">Item Name</label>
								<input
									type="text"
									class="form-control"
									id=""
									placeholder="item name"
								/>
							</div>
							<div className="inputPayroll">
								<label for="">Taxable</label>
								<select class="form-control" id="">
									<option>Select</option>
									<option>Data 1</option>
									<option>Data 2</option>
								</select>
							</div>

							<div className="inputPayroll">
								<label for="">Passionable</label>
								<select class="form-control" id="">
									<option>Select</option>
									<option>Data 1</option>
									<option>Data 2</option>
								</select>
							</div>

							<div className="inputPayroll">
								<label for="">Positive</label>
								<select class="form-control" id="">
									<option>Select</option>
									<option>Data 1</option>
									<option>Data 2</option>
								</select>
							</div>

							<div className="inputPayroll">
								<label for="">Payable By</label>
								<select class="form-control" id="">
									<option>Select</option>
									<option>Data 1</option>
									<option>Data 2</option>
								</select>
							</div>

							<div className="inputPayroll">
								<label for="">Specify Date</label>
								<div className="dataeP">
									<DatePicker
										selected={this.state.startDate}
										onChange={this.handleChange}
										className="payrolDatePicker"
									/>
									<div style={{ overflow: "hidden" }}>
										<i
											class="fa fa-calendar cal-fontAwsome"
											aria-hidden="true"
										></i>
									</div>
								</div>
							</div>
							<div className="buttonWrap">
								<button type="submit" class="btn btn-primary">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</Layout>
		);
	}
}

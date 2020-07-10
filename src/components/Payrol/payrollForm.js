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

import { PayRollModal } from "../Modals/payroll";

export default class payrollForm extends Component {
	state = {
		startDate: new Date(),
		radioButtonCheck1: true,
	};

	handleChange = (date) => {
		this.setState({
			startDate: date,
		});
	};

	toggleRadio = () => {
		let toggleRadio = this.state.radioButtonCheck1;
		this.setState({
			radioButtonCheck1: !toggleRadio,
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

					<div className="wrapperPayroll">
						<div className="payroll-form">
							<div className="payroll-header">
								<h1>Add Payroll Item</h1>
							</div>
							<form>
								<div class="inputPayroll">
									<label for="">Payroll Name</label>
									<input
										type="text"
										class="form-control"
										id=""
										placeholder="item name"
									/>
								</div>
								<div class="">
									<div class="inputPayroll-Checkbox">
										<div class="checkBox1">
											<span
												style={{ marginRight: "6px" }}
												className="radio-button__label"
											>
												Taxable
											</span>
											<label class="radio-button">
												<input
													type="radio"
													className="radio-button__input"
													id="choice1-1"
													name="choice1"
												/>

												<span
													onClick={this.toggleRadio}
													className={`radio-button__control	${
														this.state.radioButtonCheck1 === false
															? " turnOn"
															: ""
													}`}
												></span>
											</label>
										</div>

										<div class="checkBoxW">
											<span
												style={{ marginRight: "6px" }}
												className="radio-button__label"
											>
												Pensionable
											</span>
											<label class="radio-button">
												<input
													type="radio"
													className="radio-button__input"
													id="choice1-1"
													name="choice1"
												/>

												<span
													onClick={this.toggleRadio}
													className={`radio-button__control	${
														this.state.radioButtonCheck1 === false
															? " turnOn"
															: ""
													}`}
												></span>
											</label>
										</div>
									</div>
									<div class="inputPayroll-Checkbox">
										<div class="checkBox1 checkbox2">
											<span
												style={{ marginRight: "6px" }}
												className="radio-button__label"
											>
												Positive
											</span>
											<label class="radio-button">
												<input
													type="radio"
													className="radio-button__input"
													id="choice1-1"
													name="choice1"
												/>

												<span
													onClick={this.toggleRadio}
													className={`radio-button__control	${
														this.state.radioButtonCheck1 === false
															? " turnOn"
															: ""
													}`}
												></span>
											</label>
										</div>
									</div>
									<div className="inputPayroll">
										<label for="">Periodicity</label>
										<select class="form-control" id="">
											<option>Select</option>
											<option>Data 1</option>
											<option>Data 2</option>
										</select>
									</div>

									<div class="inputPayroll">
										<label for="">Occurance</label>
										<input
											type="text"
											class="form-control"
											id=""
											placeholder="Occurance"
										/>
									</div>

									<div class="inputPayroll">
										<label for="">Item Description</label>
										<textarea
											type="text"
											class="form-control"
											id=""
											placeholder="Item Description"
										/>
									</div>

									<div class="">
										<div class="inputPayroll-Checkbox">
											<div class="checkBox1">
												<div class="checkBoxW">
													<span>Applicable to</span>
												</div>
											</div>

											<div class="checkBoxW">
												<button
													type="button"
													className="payrolBtn "
													data-toggle="modal"
													data-target="#addPayroll"
												>
													<i class="fa fa-plus" aria-hidden="true"></i>
													Add Payroll
												</button>
											</div>
										</div>
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
								</div>
								<div className="buttonWrap">
									<button type="submit" class="btn btn-primary">
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
					<PayRollModal />
				</div>
			</Layout>
		);
	}
}

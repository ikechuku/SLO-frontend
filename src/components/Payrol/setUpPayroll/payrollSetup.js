import React, { Component } from "react";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";

import Layout from "../../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../../actions/data.action";
import { hideLoader, showLoader } from "../../../helpers/loader";
import "./setup.css";
import PayHistory from "./payHistory";
export default class payrollsetup extends Component {
	state = {};

	componentDidMount() {}
	render() {
		return (
			<Layout page="payrollSetup">
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
									Payroll Setup
								</a>
							</li>
						</ol>
					</section>
					<section className="paysetUpwraper">
						<div style={{ marginBottom: "20px" }} className="payroll-headr">
							<h1 style={{ fontSize: "23px", marginLeft: "50px" }}>
								Process Payroll
							</h1>
						</div>
						<div className="payroll-form-setup">
							<form>
								<div class="inputPayroll-setup">
									<div class="inputPayroll-setup-wrap">
										<label for="">Region</label>
										<select class="form-control" id="">
											<option>Select Region</option>
											<option>Data 1</option>
											<option>Data 2</option>
										</select>
									</div>

									<div class="inputPayroll-setup-wrap">
										<label for="">Area</label>
										<select class="form-control" id="">
											<option>Select Area</option>
											<option>Data 1</option>
											<option>Data 2</option>
										</select>
									</div>
								</div>

								<div class="inputPayroll-setup">
									<div class="inputPayroll-setup-wrap">
										<label for="">Branch</label>
										<select class="form-control" id="">
											<option>Select Branch</option>
											<option>Data 1</option>
											<option>Data 2</option>
										</select>
									</div>

									<div class="inputPayroll-setup-wrap">
										<label for="">Title</label>

										<input
											type="text"
											class="form-control"
											id=""
											placeholder="Type in the title"
										/>
									</div>
								</div>

								<div className="buttonWrap-setup">
									<button type="submit" class="btn btn-primary">
										Proceed
									</button>
								</div>
							</form>
						</div>
						<PayHistory />
						<br />
					</section>
				</div>
			</Layout>
		);
	}
}

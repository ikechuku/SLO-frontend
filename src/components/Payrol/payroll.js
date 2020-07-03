import React, { Component } from "react";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { modal } from "bootstrap";
import { Link } from "react-router-dom";
import Layout from "../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";

import Payroll from "./payrollTable";
import "./payroll.css";

export default class payroll extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout page="payroll">
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
						<div className="section-body">
							<div className="row">
								<div className="col-md-7">
									<div className="card" style={{ width: "fit-content" }}>
										<div className="card-header custom-header">
											<div className="col col-md-12">
												<Link to="/payroll-form">
													<button type="button" className="payrolBtn ">
														<i class="fa fa-plus" aria-hidden="true"></i>
														Add Payroll Item
													</button>
												</Link>
											</div>
										</div>

										<div className="card-body">
											<Payroll />
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Layout>
		);
	}
}

import React, { Component } from "react";
import "./loan.css";
import Layout from "../layout/index";
import LoanTable from "./loanRequestsTable";
export default class index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout page="loan">
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
									Loan
								</a>
							</li>
						</ol>
						<div className="card">
							<div className="userRequest"></div>
						</div>
					</section>
				</div>
			</Layout>
		);
	}
}

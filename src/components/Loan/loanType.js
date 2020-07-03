import React, { Component } from "react";
import "./loan.css";
import Layout from "../layout/index";
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
						<div className="loanContainer">
							<div className="loanHeader">
								<h1>Mega Loan</h1>
							</div>
							<div className="loanDetails">
								<div className="detail1 data156">
									<div className="subDetails1">Closes:</div>
									<div className="subDetails2 responsiveOverfloy">
										{" "}
										06/12/2020{" "}
									</div>
								</div>
								<div className="detail1">
									<div className="subDetails1">Interest Rate:</div>
									<div className="subDetails2">10%</div>
								</div>
							</div>
							<div className="loanDetails">
								<div className="detail1">
									<div className="subDetails1">
										Repayment
										<br /> Every:
									</div>
									<div className="subDetails2"> 1 Month </div>
								</div>
								<div className="detail1">
									<div className="subDetails1">Interest Type:</div>
									<div className="subDetails2">Flat</div>
								</div>
							</div>

							<div className="loanForm">
								<form>
									<div class="form-group">
										<label for="amount">Amount</label>
										<input
											type="number"
											class="form-control"
											id="amount"
											placeholder="Enter Amount"
										/>
									</div>
									<div class="form-group">
										<label for="numberofrepay">Number Of Repayment</label>
										<input
											type="number"
											class="form-control"
											id="numberofrepay"
											placeholder="Number Of Repayment"
										/>
									</div>
								</form>
							</div>

							<div className="loanBtn">
								<button>Apply</button>
							</div>
						</div>

						<div className="loanContainer">
							<div className="loanHeader">
								<h1>Deluxe Loan</h1>
							</div>
							<div className="loanDetails">
								<div className="detail1 data156">
									<div className="subDetails1">Closes:</div>
									<div className="subDetails2 responsiveOverfloy">
										{" "}
										06/12/2020{" "}
									</div>
								</div>
								<div className="detail1">
									<div className="subDetails1">Interest Rate:</div>
									<div className="subDetails2">10%</div>
								</div>
							</div>
							<div className="loanDetails">
								<div className="detail1">
									<div className="subDetails1">
										Repayment
										<br /> Every:
									</div>
									<div className="subDetails2"> 1 Month </div>
								</div>
								<div className="detail1">
									<div className="subDetails1">Interest Type:</div>
									<div className="subDetails2">Flat</div>
								</div>
							</div>

							<div className="loanForm">
								<form>
									<div class="form-group">
										<label for="amount">Amount</label>
										<input
											type="number"
											class="form-control"
											id="amount"
											placeholder="Enter Amount"
										/>
									</div>
									<div class="form-group">
										<label for="numberofrepay">Number Of Repayment</label>
										<input
											type="number"
											class="form-control"
											id="numberofrepay"
											placeholder="Number Of Repayment"
										/>
									</div>
								</form>
							</div>

							<div className="loanBtn">
								<button>Apply</button>
							</div>
						</div>
					</section>
				</div>
			</Layout>
		);
	}
}

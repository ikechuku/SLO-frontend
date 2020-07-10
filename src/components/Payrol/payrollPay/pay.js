import React, { Component } from "react";
import Layout from "../../layout/index";
import { AddPayRollModal } from "../../Modals/addPayroll";

import "./pay.css";

export default class pay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accordion: "deffaultAccState",
			show: false,
			show2: false,
			accordion2: "deffaultAccState",
		};
	}
	toggleAccodion = () => {
		let showAccordion = this.state.show;
		this.setState({
			show: !showAccordion,
		});
		if (this.state.show === false) {
			this.setState({
				accordion: "showAccordion",
			});
		} else {
			this.setState({
				accordion: "hideAccordion",
			});
		}
	};

	toggleAccodionTwo = () => {
		let showAccordion2 = this.state.show2;
		this.setState({
			show2: !showAccordion2,
		});
		if (this.state.show2 === false) {
			this.setState({
				accordion2: "showAccordion2",
			});
		} else {
			this.setState({
				accordion2: "hideAccordion2",
			});
		}
	};
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
									Pay Now
								</a>
							</li>
						</ol>
						<div className="section-body">
							<div className="row">
								<div className="col-md-7">
									<div className="payWrapper">
										<section
											style={{ cursor: "pointer" }}
											className="AddPayrollItem23"
											type="button"
											data-toggle="modal"
											data-target="#addPayroll"
										>
											<span className="adP">
												{" "}
												<i
													class="fa fa-plus payr-fa"
													aria-hidden="true"
												></i>{" "}
												Payroll Item
											</span>
										</section>
										<section className="grossPay">
											<div className="grossPayTitle">Gross Pay</div>
											<div
												onClick={this.toggleAccodion}
												className="grossPayPrize"
											>
												<span>
													234,000{" "}
													<span
														className={`${
															this.state.show
																? "fa fa-chevron-up"
																: "fa fa-chevron-down"
														}`}
													></span>
												</span>
											</div>
										</section>
										<div
											style={{ width: "100%" }}
											className={`extraSt ${this.state.accordion}`}
											// className={`${
											// 	this.state.accordion === false
											// 		? "hideAccordion"
											// 		: "showAccordion"
											// }`}
										>
											<section className="paybill">
												<div className="paybillTitle">Basic Salary</div>
												<div className="paybillPrize">
													<span>
														N234,000 <span>(Pensionable | Taxable)</span>
													</span>
												</div>
											</section>
											<section className="paybill">
												<div className="paybillTitle">Housing</div>
												<div className="paybillPrize">
													<span>
														N134,000 <span>(Pensionable | Taxable)</span>
													</span>
												</div>
											</section>
										</div>
										<div className="hrLine">
											<hr />
										</div>
										<section className="grossPay">
											<div className="grossPayTitle">Total</div>
											<div onClick={this.toggleAccodion} className="Grosstotal">
												<span>234,000 </span>
											</div>
										</section>
										<section className="grossPay">
											<div className="grossPayTitle">Deductions</div>
											<div
												onClick={this.toggleAccodionTwo}
												className="grossPayPrize"
											>
												<span style={{ color: "#DB161E", fontWeight: "600" }}>
													-234,000{" "}
													<span
														className={`${
															this.state.show2
																? "fa fa-chevron-up"
																: "fa fa-chevron-down"
														}`}
													></span>
												</span>
											</div>
										</section>
										<div
											style={{ width: "100%" }}
											className={`extraSt ${this.state.accordion2}`}
										>
											<section className="paybill">
												<div className="paybillTitle">Tax</div>
												<div className="paybillPrize">
													<span>
														N234,000
														{/* <span>(Pensionable | Taxable)</span> */}
													</span>
												</div>
											</section>
											<section className="paybill">
												<div className="paybillTitle">Pension</div>
												<div className="paybillPrize">
													<span>
														N134,000
														{/* <span>(Pensionable | Taxable)</span> */}
													</span>
												</div>
											</section>
											<section className="paybill">
												<div className="paybillTitle">Loan Payment</div>
												<div className="paybillPrize">
													<span>
														N134,000
														{/* <span>(Pensionable | Taxable)</span> */}
													</span>
												</div>
											</section>
										</div>
										<div className="hrLine">
											<hr />
										</div>
										<section className="grossPay">
											<div className="grossPayTitle">Total</div>
											<div className="Grosstotal">
												<span>-24,000 </span>
											</div>
										</section>
										<div className="payButtonPayroo">
											<span className="PayrollNetpay">
												<h1>Net Pay</h1>
											</span>
											<span className="PayrollNetprize">1234,000</span>
										</div>
										<div className="saveButtonPayroll">
											<button>Save</button>
										</div>
									</div>

									{/* payWrapper end */}
								</div>
							</div>
						</div>
					</section>
					<AddPayRollModal />
				</div>
			</Layout>
		);
	}
}

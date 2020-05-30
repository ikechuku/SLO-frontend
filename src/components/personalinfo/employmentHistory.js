import React, { Component } from "react";
import UserLogo from "./Img/userLogo.jpg";

export default class employmentHistory extends Component {
	render() {
		return (
			<div>
				<section className="appheaderr5 reduceMargin">
					<h1>Employment History</h1>
				</section>

				<div className="qualifiactionGrid">
					<div className="listQ">
						<h1>Name</h1>
						<h3>Magoro Data </h3>
					</div>
					<div className="listQ">
						<h1>Role</h1>
						<h3>SSCE</h3>
					</div>
					<div className="listQ">
						<h1>Adddress</h1>
						<h3>19 Opegide Close</h3>
					</div>
					<div className="listQ">
						<h1>Date</h1>
						<h3>21 21 2020</h3>
					</div>
				</div>

				<section className="appheaderr5 reduceMargin">
					<h1>Employment Information</h1>
				</section>
				<div className="personalInfoEmploymentInfomation">
					<div className="infoGrid1EmploymentInfomation">
						<span className="files675">Files</span>
						<span>
							<i class="fas fa-link"></i> Employment Contract{" "}
						</span>
					</div>

					<div className="infoGrid2EmploymentInfomation">
						<div className="userDetailsEmploymentInfomation">
							<span>Rank at employment</span>
							<span> DGM </span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>Unit at Employment</span>
							<span> Quality Assurance </span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>Salary Amount</span>
							<span>200,000</span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>Employee Number</span>
							<span>0907547975</span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>No of dependants</span>
							<span>2</span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>Religion </span>
							<span>Christainity</span>
						</div>
					</div>
					<div className="infoGrid3EmploymentInfomation">
						<div className="userDetailsEmploymentInfomation">
							<span>Date of resumption</span>
							<span>21 20 2923</span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>Branch at employment</span>
							<span> 5 Mild </span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>Job Title</span>
							<span> System Administration Staff</span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>Skills</span>
							<span>teamwork, problem solving</span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>Seek Reference</span>
							<span>No</span>
						</div>

						<div className="userDetailsEmploymentInfomation">
							<span>Reason for leaving last employment</span>
							<span> System Administration Staff</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

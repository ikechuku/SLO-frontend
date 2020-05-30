import React, { Component } from "react";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { modal } from "bootstrap";
import Layout from "../layout/index";
import "./personInfo.css";
import UserLogo from "./Img/userLogo.jpg";
import EducationQ from "./educationQulification";
import EmploymentHistory from "./employmentHistory";
import Garantor from "./gurantor";

import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
// import "./branchStyle/responsibilities.css";

export default class info extends Component {
	render() {
		return (
			<Layout>
				<div>
					<section className="appheaderr5">
						<h1>PERSONAL INFORMATION</h1>
					</section>
					<div className="personalInfo">
						<div className="infoGrid1">
							<img src={UserLogo} alt="Profile Pic" />
							<span className="files675">Files</span>
							<span>
								<i class="fas fa-link"></i> Drivers License{" "}
							</span>
							<span>
								<i class="fas fa-link"></i> Int’l Passport
							</span>
						</div>

						<div className="infoGrid2">
							<div className="userDetails">
								<span>Full Name</span>
								<span> Okeke Andrew</span>
							</div>

							<div className="userDetails">
								<span>Date Of Birth</span>
								<span> 21 jan 2025 </span>
							</div>

							<div className="userDetails">
								<span>Marital Status</span>
								<span> Single</span>
							</div>

							<div className="userDetails">
								<span>Address</span>
								<span>Uselu(Benin, Esan South-East, Edo, Nigeria)</span>
							</div>

							<div className="userDetails">
								<span>Email</span>
								<span>Codeuiandy@gmail.com</span>
							</div>
						</div>
						<div className="infoGrid3">
							<div className="userDetails">
								<span>State of Origin</span>
								<span>Edo State</span>
							</div>

							<div className="userDetails">
								<span>Gender</span>
								<span> Male </span>
							</div>

							<div className="userDetails">
								<span>Nationality</span>
								<span> Nigeria</span>
							</div>

							<div className="userDetails">
								<span>Phone Numbers</span>
								<span>
									<span></span>
									<div style={{ display: "block" }}>0907786559</div>
									<div>0907786559</div>
									<span></span>
								</span>
							</div>
						</div>
					</div>
					<EducationQ />
					<EmploymentHistory />
					<Garantor />
				</div>
			</Layout>
		);
	}
}

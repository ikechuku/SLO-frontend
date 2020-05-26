import React, { Component } from "react";

export default class educationQulification extends Component {
	render() {
		return (
			<div>
				<section className="appheaderr5 reduceMargin">
					<h1>Education Qualification</h1>
				</section>

				<div className="qualifiactionGrid">
					<div className="listQ">
						<h1>Name</h1>
						<h3>Community Secondry School</h3>
						<h3>University of Benin</h3>
					</div>
					<div className="listQ">
						<h1>Qulification</h1>
						<h3>SSCE</h3>
						<h3>OND</h3>
					</div>
					<div className="listQ">
						<h1>Date</h1>
						<h3>May, 2003 - Jan, 2021</h3>
						<h3>May, 2003 - Jan, 2021</h3>
					</div>
					<div className="listQ">
						<h1>Document</h1>
						<h3>
							{" "}
							<i class="fas fa-link"></i> Certificate
						</h3>
						<h3>
							{" "}
							<i class="fas fa-link"></i> Certificate
						</h3>
					</div>
				</div>
			</div>
		);
	}
}

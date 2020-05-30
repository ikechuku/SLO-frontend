import React, { Component } from "react";

export default class gurantor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gurantor: {
				name: "Mr Adebayo",
				occupation: "Business Man",
				salary: "200,000",
				relationship: "Married",
				home: "0806467432",
				mobileNO: " 0907548279",
			},
		};
	}

	GetGurantorInfo = () => {
		this.setState({
			gurantor: {
				name: "Mr Adebayo",
				occupation: "Business Man",
				salary: "200,000",
				relationship: "Married",
				home: "0806467432",
				mobileNO: " 0907548279",
			},
		});
	};

	GetGurantorInfoB = () => {
		this.setState({
			gurantor: {
				name: "Mr Okeke Andrew",
				occupation: "Business Man",
				salary: "100,000",
				relationship: "Single",
				home: "095437432",
				mobileNO: " 02075848279",
			},
		});
	};
	render() {
		let {
			name,
			occupation,
			salary,
			relationship,
			home,
			mobileNO,
		} = this.state.gurantor;
		return (
			<div>
				<section className="appheaderr5 reduceMargin">
					<h1>Guarantor Information</h1>
				</section>
				<section className="gurantor-names">
					<span onClick={this.GetGurantorInfo}>{name}</span>
					<span onClick={this.GetGurantorInfoB}>Mr Okeke Andrew</span>
				</section>
				<div className="personalInfoGurantor">
					<div className="infoGrid1Gurantor">
						<span className="files675">Files</span>
						<span>
							<i class="fas fa-link"></i> Employment Contract{" "}
						</span>
					</div>

					<div className="infoGrid2Gurantor">
						<div className="userDetailsGurantor">
							<span>Name Of Guarantor</span>
							<span>{name}</span>
						</div>

						<div className="userDetailsGurantor">
							<span>Occupation</span>
							<span> {occupation}</span>
						</div>

						<div className="userDetailsGurantor">
							<span>Salary Amount</span>
							<span>{salary}</span>
						</div>

						<div className="userDetailsGurantor">
							<span>Relationship</span>
							<span>{relationship}</span>
						</div>

						<div className="userDetailsGurantor">
							<span>Home No</span>
							<span>{home}</span>
						</div>

						<div className="userDetailsGurantor">
							<span>Mobile No </span>
							<span>{mobileNO}</span>
						</div>
					</div>
					<div className="infoGrid3Gurantor">
						<div className="userDetailsGurantor">
							<span>Date of resumption</span>
							<span>21 20 2923</span>
						</div>

						<div className="userDetailsGurantor">
							<span>Marital Status</span>
							<span>Single </span>
						</div>

						<div className="userDetailsGurantor">
							<span>Involved in any crime</span>
							<span>None</span>
						</div>

						<div className="userDetailsGurantor">
							<span>How long have you know the employer</span>
							<span>12 yrs</span>
						</div>

						<div className="userDetailsGurantor">
							<span>Residential Address</span>
							<span>18 omilanin ijesha</span>
						</div>

						<div className="userDetailsGurantor">
							<span>Landed Property Address</span>
							<span> 18 omilanin ijesha</span>
						</div>

						<div className="userDetailsGurantor">
							<span>Business Addresss</span>
							<span> 18 omilanin ijesha</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

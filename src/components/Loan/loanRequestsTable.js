import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import Table from "../../helpers/customTable";
import { Link } from "react-router-dom";
import Layout from "../layout/index";
export default class loanRequests extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	bodyRow = () => {
		const datas = [
			{
				name: "Range Don",
				amount: "N50,000",
				intrest: "10%",
				status: "Accepted",
			},
			{
				name: "Range Don",
				amount: "N50,000",
				intrest: "10%",
				status: "Accepted",
			},
			{
				name: "Range Don",
				amount: "N50,000",
				intrest: "10%",
				status: "Accepted",
			},
			{
				name: "Range Don",
				amount: "N50,000",
				intrest: "10%",
				status: "Accepted",
			},
		];
		const body = datas.map((data, index) => ({
			name: data.name,
			amount: data.amount,

			intrest: data.intrest,
			status: data.status,

			action: (
				<a>
					<Link to="/user-loan-request"> View</Link>
				</a>
			),
		}));
		return body;
	};

	header = () => {
		const header = [
			{
				title: "Item Staff Name (filterable)",
				prop: "name",
				sortable: true,
				filterable: true,
			},
			{ title: "Amount", prop: "amount", sortable: true },

			{ title: "Intrest", prop: "intrest", sortable: true },

			{ title: "Status", prop: "status", sortable: true },

			{ title: "View", prop: "action" },
		];
		return header;
	};

	render() {
		return (
			<div
				className="table-responsive res-tb card"
				style={{ overflow: "hidden" }}
			>
				<Table
					body={this.bodyRow}
					head={this.header}
					rowsPerPage={10}
					rowsPerPageOption={[10, 15, 20, 25]}
				/>
			</div>
		);
	}
}

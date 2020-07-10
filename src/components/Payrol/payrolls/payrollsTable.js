import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import Table from "../../../helpers/customTable";
import { Link } from "react-router-dom";

export default class payrollLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	bodyRow = () => {
		const datas = [
			{
				name: "Okeke HeartBeat",
				Gross: "125,000",
				Tax: "20",
				Pension: "40,00",
				payableMonths: "10",
			},
			{
				name: "Femi Tijani",
				Gross: "125,000",
				Tax: "20",
				Pension: "40,00",
				payableMonths: "10",
			},
			{
				name: "Adm James",
				Gross: "125,000",
				Tax: "20",
				Pension: "40,00",
				payableMonths: "10",
			},
			{
				name: "Joe Doe",
				Gross: "125,000",
				Tax: "20",
				Pension: "40,00",
				payableMonths: "10",
			},
		];
		const body = datas.map((data, index) => ({
			name: data.name,
			Gross: data.Gross,

			Tax: data.Tax,
			Pension: data.Pension,
			PayableMonth: data.payableMonths,

			action: (
				<a>
					<Link to="/payroll-form">
						{" "}
						<span
							className="edit"
							// onClick={() => this.props.handleEdit(data.id)}
							// data-backdrop="static"
							className="fa fa-pencil-square-o mr-4 add-cursor"
						></span>
					</Link>

					<span
						className="del"
						// onClick={() => this.props.handleDelete(data.id)}
						className="fa fa-trash mr-4 add-cursor"
					></span>
				</a>
			),
		}));
		return body;
	};

	header = () => {
		const header = [
			{
				title: "Staff Name (filterable)",
				prop: "name",
				sortable: true,
				filterable: true,
			},
			{ title: "Gross Pay", prop: "Gross", sortable: true },

			{ title: "Tax", prop: "Tax", sortable: true },

			{ title: "Pension", prop: "Pension", sortable: true },

			{ title: "Not Pay", prop: "PayableMonth", sortable: true },
			{ title: "Actions", prop: "action" },
		];
		return header;
	};

	render() {
		return (
			<div className="table-responsive" style={{ overflow: "hidden" }}>
				<Table
					body={this.bodyRow}
					head={this.header}
					rowsPerPage={10}
					rowsPerPageOption={[10, 15, 20, 25]}
				/>
				<div className="payrollSubmitBtn">
					<button
						type="button"
						data-toggle="modal"
						data-target="#payrollSubmit"
					>
						Submit
					</button>
				</div>
			</div>
		);
	}
}

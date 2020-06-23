import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import Table from "../../helpers/customTable";
import { Link } from "react-router-dom";

export default class responsibilityTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	bodyRow = () => {
		const datas = [
			{
				name: "Basic Salary",
				taxable: "Yes",
				passionable: "Yes",
				positive: "Yes",
				payableMonths: "10",
			},
			{
				name: "Transport",
				taxable: "Yes",
				passionable: "Yes",
				positive: "Yes",
				payableMonths: "10",
			},
			{
				name: "Housing",
				taxable: "Yes",
				passionable: "Yes",
				positive: "Yes",
				payableMonths: "10",
			},
			{
				name: "Range Don",
				taxable: "Yes",
				passionable: "Yes",
				positive: "Yes",
				payableMonths: "10",
			},
		];
		const body = datas.map((data, index) => ({
			name: data.name,
			taxable: data.taxable,

			Pensionable: data.passionable,
			Positive: data.positive,
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
				title: "Item Name (filterable)",
				prop: "name",
				sortable: true,
				filterable: true,
			},
			{ title: "Taxable", prop: "taxable", sortable: true },

			{ title: "Pensionable", prop: "Pensionable", sortable: true },

			{ title: "Positive", prop: "Positive", sortable: true },

			{ title: "Payable Month", prop: "PayableMonth", sortable: true },
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
			</div>
		);
	}
}

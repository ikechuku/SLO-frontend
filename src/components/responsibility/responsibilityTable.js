import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import Table from "../../helpers/customTable";

export default class branchTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	bodyRow = () => {
		const body = this.props.responsibilities.map((data, index) => ({
			ResponsibilityName: data.name,
			roles: data.role.title,

			action: (
				<a>
					<span
						class="edit"
						data-toggle="modal"
						data-target="#roleModal"
						onClick={() => this.props.handleEdit(data.id)}
						data-backdrop="static"
					>
						Edit
					</span>
					<span class="del" onClick={() => this.props.handleDelete(data.id)}>
						Delete
					</span>
				</a>
			),
		}));
		return body;
	};

	header = () => {
		const header = [
			{
				title: "responsibility Name (filterable)",
				prop: "ResponsibilityName",
				sortable: true,
				filterable: true,
			},
			{ title: "roles", prop: "roles", sortable: true },
			{ title: "Actions", prop: "action" },
		];
		return header;
	};

	render() {
		return (
			<div class="table-responsive" style={{ overflow: "hidden" }}>
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

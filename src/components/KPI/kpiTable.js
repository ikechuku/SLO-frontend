import React, { Component } from "react";
import Table from "../../helpers/customTable";

class RoleTable extends Component {
	constructor(props) {
		super(props);
	}
	bodyRow = () => {
		const body = this.props.roles.map((data, index) => ({
			KPI: data.name,
			Weight: data.weightMark,
			Responsibility: data.responsibility.name,
			JobRoles: data.responsibility.role.title,
			action: (
				<a>
					<span
						className="edit"
						data-toggle="modal"
						data-target="#kpiModal"
						data-backdrop="static"
						onClick={() => this.props.handleEdit(data.id)}
					>
						Edit
					</span>
					<span className="del" onClick={() => this.props.handleDelete(data.id)}>
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
				title: "KPI (filterable)",
				prop: "KPI",
				sortable: true,
				filterable: true,
			},
			{ title: "Responsibility", prop: "Responsibility", sortable: true },
			{ title: "Job Roles", prop: "JobRoles", sortable: true },
			{ title: "Weight Mark", prop: "Weight" },
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

export default RoleTable;

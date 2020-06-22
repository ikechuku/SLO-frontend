import React, { Component } from "react";
import Table from "../../helpers/customTable";
import { DeleteSvg } from "../../helpers/Svg";

const test = [
	{
		name: 'Case Load',
		source: 'Automatic',
		type: 'Postive',
	}
]

class KpiTable extends Component {
	constructor(props) {
		super(props);
	}
	bodyRow = () => {
		const body = this.props.kpis.map((data, index) => ({
			name: data.name,
			source: data.source,
			type: data.type,
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
					<span className="del ml-5" 
						data-toggle="modal"
						data-target="#confirm"
						onClick={() => this.props.handlePassId(data.id)}
					>
						<DeleteSvg />
					</span>
				</a>
			),
		}));
		return body;
	};
	header = () => {
		const header = [
			{
				title: "Name (filterable)",
				prop: "name",
				sortable: true,
				filterable: true,
			},
			{ title: "Source", prop: "source", sortable: true },
			{ title: "Type", prop: "type", sortable: true },
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

export default KpiTable;

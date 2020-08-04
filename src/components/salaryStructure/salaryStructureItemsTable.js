import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import Table from "../../helpers/customTable";
import { Link } from "react-router-dom";
import _ from 'lodash';

export default class salaryStructureItemsTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	bodyRow = () => {
		const body = this.props.salaryStructureItems.map((data, index) => ({
			name: _.startCase(_.lowerCase(data.payrollItem.name)),
			amount:  _.startCase(_.lowerCase(`${data.amount}`)),

		

			action: (
				<a>
						{console.log(data)}
						<span
						onClick={(e)=>this.props.setModalType(data.id , data.salaryStructureId)}
					
						type="button" class="" data-toggle="modal" data-target="#exampleModal"
							className="edit"
							className="fa fa-pencil-square-o mr-4 add-cursor"
						></span>
					
					<span
						
						onClick={() => this.props.getDeleteId(data.id)}
						type="button" class="" data-toggle="modal" data-target="#ComfirmModalDelete"
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
			{ title: "Amount", prop: "amount", sortable: true },

		
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

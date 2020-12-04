import React, { Component } from "react";
import Table from "../../helpers/customTable";
import{ Link }from 'react-router-dom' 
class CategoryTable extends Component {
	constructor(props) {
		super(props);
	}



	bodyRow = () => {
		console.log(this.props.Category)
       
		const body = this.props.Category.map((data, index) => ({
			name: data.name,
			action: (
				<a>
					<span
							type="button"
                            className="edit "
                            data-toggle="modal"
                            data-target="#CategoryModal"
						onClick={() => this.props.getEditDetails(data)}
					>
						Edit
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

			{ title: "Actions", prop: "action" },
		];
		return header;
	};

	render() {
		return (
			<div>
				<div className="table-responsive" style={{ overflow: "hidden" }}>
					<Table
						body={this.bodyRow}
						head={this.header}
						rowsPerPage={10}
						rowsPerPageOption={[10, 15, 20, 25]}
					/>

				</div>
			</div>
		);
	}
}

export default CategoryTable;

import React, { Component } from "react";
import Table from "../../helpers/customTable";
import{ Link }from 'react-router-dom' 
class CategoryTable extends Component {
	constructor(props) {
		super(props);
	}



	bodyRow = () => {
       
		const body = this.props.Category.map((data, index) => ({
			name: data.name,
            Subcategorycount: <Link to={`/sub_category/${data.id}`}>{data.subCategory.length}</Link>,
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
                    <span
						type="button"
                        className="edit "
                        data-toggle="modal"
                        data-target="#CategoryModal"
						onClick={() => this.props.getDetails(data)}
					>
						Add Sub category
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
			{ title: "Sub category count", prop: "Subcategorycount", sortable: true },
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

					{/* <table className="table table-bordered table-hover mb-0 text-nowrap">
                    <tr>
                        <th>Job Title</th>
                        <th>Department/Unit</th>
                        <th>Actions</th>       
                    </tr>

										{
											props.roles.length ? props.roles.map(data => (
												<tr>		
													<td>{data.title}</td>
													<td>
														{
															data.unitId === null ? data.department.name : data.unit.name
														}
													</td>
													
													<td>
															<span className='edit' data-toggle="modal" data-target="#roleModal" onClick={() => props.handleEdit(data.id)}>Edit</span>
															<span className='del' onClick={() => props.handleDelete(data.id)}>Delete</span>
													</td>
												</tr>
											)) : ''
										}

												
												</table> */}
				</div>
			</div>
		);
	}
}

export default CategoryTable;

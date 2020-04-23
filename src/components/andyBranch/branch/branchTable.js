import React, { Component } from 'react'
import { httpGet,httpDelete } from '../../../actions/data.action';
import { hideLoader, showLoader } from '../../../helpers/loader';
import axios from 'axios'
import ReactTooltip from "react-tooltip";
import Table from '../../../helpers/customTable';



export default class branchTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}

	bodyRow = () => {
		const body = this.props.branches.map((data, index) => (
			{
				"branchName": data.name,
				"region": data.region,
				"address": data.address,
				"action": <a><span class='edit' data-toggle="modal" data-target="#branchModal" onClick={() => this.props.handleEdit(data.id)}>Edit</span><span class='del' onClick={() => this.props.handleDelete(data.id)}>Delete</span></a>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
			{
				title: 'Branch Name (filterable)',
				prop: 'branchName',
				sortable: true,
				filterable: true
			},
			{ title: 'Region', prop: 'region', sortable: true },
			{ title: 'Address', prop: 'address', sortable: true },
			{ title: 'Actions', prop: 'action' },
		];
		return header;
	}

	render() {
		return (
			<div class="table-responsive" style={{overflow: 'hidden'}}>
				<Table 
          body={this.bodyRow}
					head={this.header}
					rowsPerPage={10}
					rowsPerPageOption={[10, 15, 20, 25]}
        />
			</div>
		)
	}
}

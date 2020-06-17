import React, { Component } from 'react';
import Table from '../../helpers/customTable';
import Datatable from 'react-bs-datatable';
import './index.css'

export class AppraisalTable extends Component {
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
				"action": <span>View</span>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
			{
				title: 'Name (filterable)',
				prop: 'name',
				sortable: true,
				filterable: true
			},
			{ title: 'Role', prop: 'role', sortable: true },
      { title: 'Appraisal Score', prop: 'appraisalScore', sortable: true },
      { title: 'Status', prop: 'status', sortable: true },
			{ title: 'Actions', prop: 'action' },
		];
		return header;
	}

	render() {
		return (
			<div className="table-responsive" style={{overflow: 'hidden'}}>
        <div
          className="openChat"
        >
          <i className="fa fa-plus"></i>
        </div>
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


// Appraisal table for specific user
export class SpecificUserAppraisalTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}

	bodyRow = () => {
		const body = this.props.branches.map((data, index) => (
			{
				"kpi": data.name,
				"targetValue": data.region,
				"appraisedValue": data.address,
				"targetScore": data.region,
				"appraisedScore": data.address,
				"action": <span>View</span>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
			{
				title: 'Kpi (filterable)',
				prop: 'kpi',
				sortable: true,
				filterable: true
			},
			{ title: 'Target Value', prop: 'targetValue', sortable: true },
      { title: 'Appraised Value', prop: 'appraisedValue', sortable: true },
			{ title: 'Target Score', prop: 'targetScore', sortable: true },
			{ title: 'Appraised Score', prop: 'appraisedScore', sortable: true },
			{ title: '', prop: 'action' },
		];
		return header;
	}

	render() {
		return (
			<div className="table-responsive view-appraisal" style={{overflow: 'hidden'}}>
				{/* <Table 
          body={this.bodyRow}
					head={this.header}
					rowsPerPage={10}
					rowsPerPageOption={[10, 15, 20, 25]}
        /> */}
				<Datatable tableHeaders={this.header()} tableBody={this.bodyRow()} />
			</div>
		)
	}
}


// Table for branch, area, region
export class UserAppraisalTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}

	bodyRow = () => {
		const body = this.props.branches.map((data, index) => (
			{
				"kpi": data.name,
				"currentScore": data.region,
				"status": data.address,
				"action": <span>View</span>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
			{
				title: 'Name (filterable)',
				prop: 'name',
				sortable: true,
				filterable: true
			},
			{ title: 'Current Score', prop: 'currentScore', sortable: true },
      { title: 'Status', prop: 'status', sortable: true },
			{ title: '', prop: 'action' },
		];
		return header;
	}

	render() {
		return (
			<div className="table-responsive view-appraisal" style={{overflow: 'hidden'}}>
				<Table 
          body={this.bodyRow}
					head={this.header}
					rowsPerPage={10}
					rowsPerPageOption={[10, 15, 20, 25]}
        />
				{/* <Datatable tableHeaders={this.header()} tableBody={this.bodyRow()} /> */}
			</div>
		)
	}
}

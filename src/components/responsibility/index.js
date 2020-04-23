
import React, { Component } from 'react'
import Layout from '../layout/index'
import ResponsibilityTable from './responsibilityTable'
import  './responsibility.css'

export default class responsibilty extends Component {
	render() {
		return (
			<Layout page="responsibility">
			<div class="app-content">
			<section class="section">
			<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="#" class="text-muted">Home</a></li>
			<li class="breadcrumb-item"><a href="#" class="text-muted">Performance</a></li>
			<li class="breadcrumb-item active text-" aria-current="page">Branch</li>
			</ol>
			<div class="section-body">
			<div class="row">

			<div class="col-lg-12">
					
			<div class="card department-table-card">

			<div class="card-body department-table">
				<div class="card-header custom-header">
				<button type="button" class="btn " data-toggle="modal" data-target="#exampleModal3">CREATE NEW</button>
				{/* <div class="inputf">
								<input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
						</div> */}
							</div>

							<ResponsibilityTable/>

							</div>
						</div>
					</div>
				</div>
				</div>



				</section>
				</div>
				<div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog"  aria-hidden="true">
				<div class="modal-dialog" role="document">
				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="example-Modal3">CREATE NEW RESPONSIBILITY</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form>
					<div class="form-group">
					<label for="recipient-name" class="form-control-label">Responsibility Name</label>
						<input type="text" class="form-control" id="recipient-name"/>
					</div>

				

					<label for="recipient-name" class="form-control-label">Avalable Roles</label>
					<select    class="form-control sel" id="exampleFormControlSelect1">
																			
						<option value="nonex">Select Roles</option>
						<option value="RegionA">Region A</option>
						<option value="RegionB">Region B</option>
						<option value="RegionC">Region C</option>
						<option value="RegionD">Region D</option>
					</select>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Create Now</button>
					</div>
				</div>
			</div>
		</div>
	</Layout>
		)
	}
}


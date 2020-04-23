import React, { Component } from 'react'
import Layout from '../layout/index'
import {httpPost, httpGet,httpPatch } from '../../actions/data.action';
import { hideLoader, showLoader } from '../../helpers/loader';
import  './kpi.css'
import KpiTable from './kpiTable'
import axios from 'axios'


export default class Kpi extends Component {
 

    render() {
        return (
                <Layout page="kpi">
                 
                <div class="app-content">
          <section class="section">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#" class="text-muted">Home</a></li>
              <li class="breadcrumb-item"><a href="#" class="text-muted">Performance</a></li>
        <li class="breadcrumb-item active text-" aria-current="page">KPI</li>
            </ol>
                <div class="section-body">
                <div class="row">
                  
								<div class="col-lg-12">
                                    
									<div class="card">

										<div class="card-body">
                  		<div class="card-header custom-header remove-border">
                        <button type="button" class="btn " data-toggle="modal" data-target="#exampleModal3">CREATE NEW</button>
                          <div class="inputf">
                            <input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
                                               
                                           </div>
										</div>
                                        <div className="base-score">
                                        <span>Base Score:</span><span>50</span>
                                        </div>
                                       
									
         <KpiTable />
     
										

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
								<h5 class="modal-title" id="example-Modal3">CREATE NEW KPI</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
									<div class="form-group">
										<label for="recipient-name" class="form-control-label">KPI</label>
										<input   type="text" class="form-control" id="recipient-name"/>
									</div> 

									

                                    <div class="form-group">
                                	<label for="recipient-name" class="form-control-label">Job Type</label>
                                    <select     class="form-control sel" id="exampleFormControlSelect1">
                                        
      <option value="nonex">Select Job Type</option>
      <option value="RegionA">ob Type A</option>
      <option value="ob TypeB">ob Type B</option>
      <option value="ob TypeC">ob Type C</option>
      <option value="ob TypeD">ob Type D</option>
    </select>
    </div>

    
	<div class="form-group">
    <label for="recipient-name" class="form-control-label">Responsibility</label>
                                    <select     class="form-control sel" id="exampleFormControlSelect1">
                                        
      <option value="nonex">Select Responsibility</option>
      <option value="RegionA">Responsibility A</option>
      <option value="ResponsibilityB">Responsibility B</option>
      <option value="ResponsibilityC">Responsibility C</option>
      <option value="ResponsibilityD">Responsibility D</option>
    </select>
 
 </div>


    <div class="form-group">
										<label for="recipient-name" class="form-control-label">Weight Mark</label>
										<input type="text" class="form-control" id="recipient-name"/>
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
								<button  type="button" class="btn btn-primary" >Create Now</button>
							</div>
						</div>
					</div>
				</div>

        <div  class="modal fade" id="exampleModal45" tabindex="-1" role="dialog"  aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="example-Modal3">CREATE EDIT BRANCH</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
									<div class="form-group">
										<label  class="form-control-label">Branch Name</label>
										<input    type="text" class="form-control" id="recipient-name"/>
									</div> 

									<div class="form-group">
										<label  class="form-control-label">Address</label>
										<input    type="text" class="form-control" id="recipient-name"/>
									</div>


                                	<label for="recipient-name" class="form-control-label">Region</label>
                                    <select      class="form-control sel" id="exampleFormControlSelect1">
                                        
      <option value="">Select Region</option>
      <option value="RegionA">Region A</option>
      <option value="RegionB">Region B</option>
      <option value="RegionC">Region C</option>
      <option value="RegionD">Region D</option>
    </select>
 
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
								<button   type="button" class="btn btn-primary" >Create Now</button>
							</div>
						</div>
					</div>
				</div>
      </Layout> 
    )
  }
}

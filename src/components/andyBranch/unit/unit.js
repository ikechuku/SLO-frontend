import React, { Component } from 'react'
import Layout from '../../layout/index'
import UnitTable from './unitTable'
// import  './departmentTable.css'

export default class unit extends Component {
    render() {
        return (
            <div>

                <Layout page="units">

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
                                        <div class="inputf">
                                               <input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
                                           </div>
										</div>
											
											<UnitTable/>

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
								<h5 class="modal-title" id="example-Modal3">CREATE NEW UNIT</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>
									<div class="form-group">
										<label for="recipient-name" class="form-control-label">UNIT NAME</label>
										<input type="text" class="form-control" id="recipient-name"/>
									</div>
								
                                          
                                    <label for="recipient-name" class="form-control-label">Department</label>
                                    <select class="form-control sel" id="exampleFormControlSelect1">
                                        
      <option>Select Department</option>
      <option>Unit A</option>
      <option>Unit B</option>
      <option>Unit C</option>
      <option>Unit D</option>
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
                
            </div>
        )
    }
}

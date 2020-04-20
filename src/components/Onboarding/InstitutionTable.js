import React, { Component } from 'react';
import Moment from 'react-moment';
import ReactTooltip from "react-tooltip";



export default class institutionTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}

	render() {
		return (
      <div className="col col-md-12 ml-0 pl-0">
        <div class="table-responsive">
          <table class="table table-bordered table-hover mb-0 text-nowrap">
            <thead>
            <tr>
              {/* <th className="wd-15p">S/N</th> */}
              <th class="wd-15p">Name</th>
              <th class="wd-15p">Qualification/Certification</th>
              <th class="wd-15p">Date</th>
              <th class="wd-25p"></th>
            </tr>
            </thead>
              <tbody>
                {/* <tr>
                  <td>University of Lagos</td>
                  <td>BSC</td>
                  <td>
                  <span class='edit'>Edit</span>
                    <button data-tip="React-tooltip" disabled={this.state.loading?true : false} 
                    class='del '>{this.state.loading?'Loading...' : 'Delete'}</button>
                  </td>
                </tr>
              </tbody> */}
              { console.log(this.props.moreInstitution)}
              {
                this.props.moreInstitution.length ? this.props.moreInstitution.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.type === 'qualification' ? (data.qualification + ' ' + `(${data.course})`) : (data.certification + ' ' + `(${data.categoryOfCertification})`)}</td>
                    <td>{<Moment format='MMM DD, YYYY'>{data.startDate}</Moment>} {' to '} {<Moment format='MMM DD, YYYY'>{data.endDate}</Moment>}</td>
                    <td>
                      {
                        data.type === 'qualification' ?
                          <a className="add-more mr-2" data-toggle="modal" data-target="#qualificationModal" onClick={() => this.props.handleEdit(index, data.type)}>edit</a>
                        : 
                          <a className="add-more mr-2" data-toggle="modal" data-target="#certificationModal" onClick={() => this.props.handleEdit(index, data.type)}>edit</a>  
                      }
                      <a className="add-more" data-tip data-for="deleteWarning" onClick={() => this.props.removeMore(index, data.id)}>delete</a>
                    </td>
                  </tr>
                )) : ''
              }
              
              </tbody>
              
              {/* {this.props.branches.map((data) => (
                <tbody>
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.region}</td>
                    <td>{data.address}</td>
                    <td>
                      <span class='edit'>Edit</span>
                      <button data-tip="React-tooltip" disabled={this.state.loading?true : false} onClick={() => this.props.deleteBranch(data.id)}
                      class='del '>{this.state.loading?'Loading...' : 'Delete'}</button>
                    </td>
                  </tr>
                </tbody>
              ))} */}
            <ReactTooltip id="deleteWarning" place="right" type="warning" effect="float">
              <span>Delete warning</span>
            </ReactTooltip>
          </table>
        
        </div>
                
      </div>
		)
	}
}

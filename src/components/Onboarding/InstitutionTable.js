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
                      <span className="add-more fa fa-close" onClick={() => this.props.removeMore(index)}></span>
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
            <ReactTooltip place="right" type="warning" effect="float"/>
          </table>
        
        </div>
                
      </div>
		)
	}
}

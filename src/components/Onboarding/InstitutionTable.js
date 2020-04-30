import React, { Component } from 'react';
import Moment from 'react-moment';



export class QualificationTable extends Component {
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
              <th class="wd-15p">Institution Name</th>
              <th class="wd-15p">Qualification</th>
              <th class="wd-15p">Highest Education</th>
              <th class="wd-15p">Status</th>
              <th class="wd-15p">Date</th>
              <th class="wd-25p"></th>
            </tr>
            </thead>
              <tbody>
              {
                this.props.moreQualification.length ? this.props.moreQualification.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.qualification + ' ' + data.course}</td>
                    <td>{data.highestEducation === 'Yes' ? 'Yes' : 'No'}</td>
                    <td>{(new Date(data.endDate) > new Date(Date.now())) ? 'Awaiting result' : 'Completed'}</td>
                    <td>{<Moment format='MMM DD, YYYY'>{data.startDate}</Moment>} {' to '} {<Moment format='MMM DD, YYYY'>{data.endDate}</Moment>}</td>
                    <td>
                      {
                          <a className="add-more mr-2" data-toggle="modal" data-target="#qualificationModal" onClick={() => this.props.handleEdit(index, 'qualification')}>Edit</a>  
                      }
                      <a className="add-more" onClick={() => this.props.removeMore(index, data.id, 'qualification')}>Delete</a>
                    </td>
                  </tr>
                )) : ''
              }
              
              </tbody>
          </table>
        
        </div>
                
      </div>
		)
	}
}



export class CertificationTable extends Component {
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
              <th class="wd-15p">Institution Name</th>
              <th class="wd-15p">Certification</th>
              <th class="wd-15p">Certification Category</th>
              <th class="wd-15p">Status</th>
              <th class="wd-15p">Date</th>
              <th class="wd-25p"></th>
            </tr>
            </thead>
              <tbody>
              {
                this.props.moreCertification.length ? this.props.moreCertification.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.certification}</td>
                    <td>{data.categoryOfCertification}</td>
                    <td>{(new Date(data.endDate) > new Date(Date.now())) ? 'Awaiting result' : 'Completed'}</td>
                    <td>{<Moment format='MMM DD, YYYY'>{data.startDate}</Moment>} {' to '} {<Moment format='MMM DD, YYYY'>{data.endDate}</Moment>}</td>
                    <td>
                      {
                        <a className="add-more mr-2" data-toggle="modal" data-target="#certificationModal" onClick={() => this.props.handleEdit(index, 'certification')}>Edit</a>  
                      }
                      <a className="add-more" onClick={() => this.props.removeMore(index, data.id, 'certification')}>Delete</a>
                    </td>
                  </tr>
                )) : ''
              }
              
              </tbody>
          </table>
        
        </div>
                
      </div>
		)
	}
}

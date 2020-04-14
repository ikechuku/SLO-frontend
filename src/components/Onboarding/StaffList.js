import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';
import Layout from '../layout';
import { httpGet } from '../../actions/data.action';
import { hideLoader } from '../../helpers/loader';
import Table from '../../helpers/customTable';
import './style.css'

class StaffList extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  
  componentDidMount = async () => {
    await this.getAllStaffs();
	}

  getAllStaffs = async () => {
    try{
      const res = await httpGet('auth/all_staffs', this.state.data);
      if(res.code === 200){
        hideLoader()
        this.setState({ users: res.data.users });
      }
    } catch (error){
      hideLoader()
      console.log(error)
    }
  }

  bodyRow = () => {
    const body = this.state.users.map((data, index) => (
      {
        "sn": `${index + 1}`,
        "fullname": <span>{data.lastName} {data.firstName}</span>,
        "position": `${data.jobTitle}`,
        "startdate": <Moment format='MMM DD YYYY'>{data.createdAt}</Moment>,
        "status": `${data.applicationStatus}`,
        "action": <a><Link to={`/view_details/${data.id}`} className="add-more">View Details</Link>
        <span className="ml-3 cursor-pointer">Edit</span></a>
      }
    ));
    return body;
  }

  header = () => {
    const header = [
      { title: 'S/N', prop: 'sn' },
      {
        title: 'Full Name (filterable)',
        prop: 'fullname',
        sortable: true,
        filterable: true
      },
      { title: 'Position', prop: 'position', sortable: true },
      { title: 'Start Date', prop: 'startdate', sortable: true },
      { title: 'Status', prop: 'status', sortable: true },
      { title: ' ', prop: 'action' },
    ];
    return header;
  }

  render() {
    return (
      <Layout>
        <div className="app-content">
          <section className="section">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
              <li className="breadcrumb-item"><a href="#" className="text-muted">Staff</a></li>
              <li className="breadcrumb-item active text-" aria-current="page">Staff Listing</li>
            </ol>


            <div class="row">
							<div class="col-lg-12">
								<div class="card">
									<div class="header-card">
                    <div className="row">
                      <h4 className="col-md-6">Staff List</h4>
                      <div className="col-md-6 btn-group">
                        {/* <button className="btn btn-md btn-primary" style={{ borderRadius: '0px' }}>All</button>
                        <button className="btn btn-md">Pending</button>
                        <button className="btn btn-md">Declined</button> */}
                          <button type="button" class="btn btn-primary ml-auto">All</button>
                          <button type="button" class="btn btn-primary">Pending</button>
                          <button type="button" class="btn btn-primary">Declined</button>
                      </div>
                    </div>
									</div>
									<div class="card-body">
										<div class="table-responsive">
                       <Table 
                        body={this.bodyRow}
                        head={this.header}
                      />
									</div>
									</div>
								</div>
							</div>
						</div>
          </section>
        </div>
        
      </Layout>
    )
  }
}

export default StaffList;

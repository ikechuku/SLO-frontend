import React from 'react'
import Layout from '../layout'
import { UserAppraisalTable } from './Table'
import { Component } from 'react'
import DownloadSvg from './downloadSvg';

export default class AppraisalList extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Layout page="appraisal">
        <div className="app-content">
          <section className="section">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#" className="text-muted">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#" className="text-muted">
                  Performance
                </a>
              </li>
              <li className="breadcrumb-item active text-" aria-current="page">
                Performance
              </li>
            </ol>
            <div className="section-body">
              <div className="row">
                <div className="col-md-10">
                  <div className="card">
                    <div className="card-header custom-appraisal-btn">
                      <div className="col-md-12">
                        {/* <div className="row">
                          <div className="col-md-9 col-sm-7 pl-0 text-primary" style={{ fontWeight: '600'}}>
                            <p className="mb-0" style={{ fontSize: '20px'}}>Yinka Ayefele</p>
                          </div>
                          <div className="col-md-3 col-sm-5 text-right pr-0">
                            <div className="text-left">
                              <span>Summary:</span>
                              <span className="text-danger"> Very Poor</span>
                              <span> (10%)</span>
                            </div>
                            <div className="text-left">
                              <span className="p">Status:</span>
                              <span> Staff Responded</span>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div className="card-body">
                      <UserAppraisalTable
                        branches={this.state.appraisals || []}
                        // handleDelete={this.deleteBranch}
                        // handleEdit={this.handleEdit}
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

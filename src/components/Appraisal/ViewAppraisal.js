import React from 'react'
import Layout from '../layout'
import { SpecificUserAppraisalTable } from './Table'
import { Component } from 'react'
import DownloadSvg from './downloadSvg';
import { showLoader, hideLoader } from '../../helpers/loader';
import { httpGet } from '../../actions/data.action';
import {AddAppraisal} from './Modal';

export default class ViewAppraisal extends Component {
  constructor(props){
    super(props);
    this.state = {
      isUser: false,
      assignedKpis: [],
      userAppraisals: [],
      assignedKpisOption: [],
      assignData: {},
      customSelect: null
    }
  }

  componentDidMount = () => {
    showLoader();
    this.getUserAppraisal();
    this.getUserAssignedKpis();
    hideLoader();
  }

  //get user appraisal (all views)
  getUserAppraisal = async () => {
    const { id } = this.props.match.params;

    const res = await httpGet(`get_user_appraisals/${!this.state.isUser ? id : null}`);
    if(res.code === 200){
      this.setState({ userAppraisals: res.data.userAppraisals })
    }
  }

  // get user's role assigned kpi
  getUserAssignedKpis = async () => {
    const { id } = this.props.match.params;

    const res = await httpGet(`get_user_assigned_kpi/${id}`);
    if(res.code === 200){
      console.log(res.data.assignedKpis)
      let assignedKpisOption = [];
      await res.data.assignedKpis.length ? [...res.data.assignedKpis].map(data => 
        assignedKpisOption.push({ value: data.id, label: data.kpi !== undefined ? data.kpi.name : null })
      ) : assignedKpisOption = [];
      this.setState({ assignedKpis: res.data.assignedKpis, assignedKpisOption })
    }
  }

  handleChange = (e, name) => {
    const { assignData, assignedKpis } = this.state;
    console.log(name)
    if(name === 'assignedKpiId'){
      const data = [...assignedKpis].filter(item => item.id === e.value)[0];
      assignData[name] = e.value;
      assignData['targetValue'] = data.target;
      assignData['targetScore'] = data.score;
      this.setState({ assignData, customSelect: e });
    } else {
      assignData[e.target.name] = e.target.value;
      this.setState({ assignData });
    }
  }


  // Add appraisal to user (only branch manager, not available after submission)

  // submit appraisal (only branch manager)

  // comment ( staff, branch manager )

  render() {
    console.log(this.state.userAppraisals)
    return (
      <Layout page="branch">
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
                      <div className="mb-3 add-cursor" onClick={() => this.props.history.goBack()}>
                        <i className="fa fa-arrow-left"></i> Back
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-9 col-sm-7 pl-0 text-primary" style={{ fontWeight: '600'}}>
                            <p className="mb-0" style={{ fontSize: '20px'}}>Yinka Ayefele</p>
                            <p className="mb-0" style={{color: '#999999'}}>MIS Officer</p>
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
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div
                        className="openChat"
                        data-toggle="modal" 
                        data-target="#addAppraisal"
                      >
                        <i className="fa fa-plus"></i>
                      </div>
                      <SpecificUserAppraisalTable
                        branches={this.state.appraisals || []}
                        // handleDelete={this.deleteBranch}
                        // handleEdit={this.handleEdit}
                      />


                      <div class="col-md-12 mt-5 pt-5">
												<div class="media mt-0">
                            <div class="media-left"> <a href="javascript:void(0)"> <img src="/assets/img/avatar/avatar-2.jpg" alt="" class="media-object" /> </a> </div>
                            <div class="media-body">
                              <h4 class="media-heading">Yinka Ayefele<br />
                                <small>MIT Officer</small><br />
                              </h4>
                            </div>
                            <div>
                              <small class="text-muted"><i class="fa fa-clock-o"></i> Yesterday, 2:00 am</small>
                            </div>
												</div>
                        <div style={{
                          marginLeft: '23px',
                          padding: '5px 10px 5px 42px',
                          borderLeft: '2px solid #B1B4C1'
                        }}>
                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam obcaecati ex nemo. Similique, a porro? Aperiam nam laudantium ratione quis laborum facilis libero iure recusandae nihil! Laboriosam nobis cumque ducimus laborum, voluptate magnam modi voluptates. Quia, maiores impedit assumenda asperiores natus saepe commodi architecto odit ullam! Odit modi illum alias.</p>
                        </div>


                        <div class="media mt-0">
                          <div class="media-left"> <a href="javascript:void(0)"> <img src="/assets/img/avatar/avatar-2.jpg" alt="" class="media-object" /> </a> </div>
                            <div class="media-body">
                              <h4 class="media-heading">Ayomide Martins<br />
                                <small>Branch Manager</small><br />
                              </h4>
                            </div>
                            <div>
                              <small class="text-muted"><i class="fa fa-clock-o"></i> Yesterday, 2:00 am</small>
                            </div>
												</div>
                        <div style={{
                          marginLeft: '23px',
                          padding: '5px 10px 5px 42px',
                          borderLeft: '2px solid #B1B4C1'
                        }}>
                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam obcaecati ex nemo. Similique, a porro? Aperiam nam laudantium ratione quis laborum facilis libero iure recusandae nihil! Laboriosam nobis cumque ducimus laborum, voluptate magnam modi voluptates. Quia, maiores impedit assumenda asperiores natus saepe commodi architecto odit ullam! Odit modi illum alias.</p>
                        </div>
											</div>

                      <div className="mt-5">
                        <p>COMMENT</p>
                        <textarea type="text" 
                          className="col-12 pt-2 pb-5"
                          placeholder="Type your comment"
                          name=""
                          style={{
                            border: '1px solid #DFE3E9',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <AddAppraisal 
          assignedKpisOption={this.state.assignedKpisOption}
          assignData={this.state.assignData}
          handleChange={this.handleChange}
          customSelect={this.state.customSelect}
        />
      </Layout>
    )
  }
}

import React, { Component} from 'react';
import Moment from 'react-moment';
import { NotificationManager } from 'react-notifications';
import Layout from '../layout'
import { SpecificUserAppraisalTable } from './Table'
import DownloadSvg from './downloadSvg';
import { showLoader, hideLoader } from '../../helpers/loader';
import { httpGet, httpPost } from '../../actions/data.action';
import {AddAppraisal} from './Modal';
import dateFromNow from '../../helpers/dateFromNow';

export default class ViewAppraisal extends Component {
  constructor(props){
    super(props);
    this.state = {
      appraisal: {},
      appraisalItems: [],
      comments: [],
      assignData: {},
      customSelect: null,
      comment: '',
      percentage: null,
      labels: [],
      user: {}
    }
  }

  componentDidMount = async () => {
    showLoader();
    await this.getUserAppraisal();
    await this.getPerformanceLabel();
  }

  //get user appraisal (all views)
  getUserAppraisal = async () => {
    const { id } = this.props.match.params;
    try{
      const res = await httpGet(`get_staff_appraisal/${id}`);
      if(res.code === 200){
        const percentage = ( res.data.totalAppraisalScore[0].totalAppraisalScore / res.data.totalTargetScore[0].totalTargetScore) * 100
        this.setState({ 
          appraisal: res.data.appraisal,
          appraisalItems: res.data.appraisal.userAppraisal,
          comments: res.data.comments,
          percentage,
          user: res.data.appraisal.user
        })
        hideLoader();
      }
    }catch(error){
      hideLoader();
      console.log(error)
    }
  }

  getPerformanceLabel = async () => {
    const { id } = this.props.match.params;
    try{
      const res = await httpGet(`performance_label`);
      if(res.code === 200){
        this.setState({ 
          labels: res.data.performanceLabel,
        })
        hideLoader();
      }
    }catch(error){
      hideLoader();
      console.log(error)
    }
  }

  postComment = async (e) => {
    e.preventDefault();
    try{
      showLoader();
      const { comment, appraisal } = this.state;
      const { id } = appraisal;
      if(comment === ''){
        hideLoader();
        return NotificationManager.warning('Comment cannot be empty')
      }
      const data = {
        comment
      }
      const res = await httpPost(`pmu_comment_appraisal/${id}`, data);
      if(res.code === 201){
        this.getUserAppraisal();
        this.setState({ comment: '' })
        hideLoader();
        NotificationManager.success('Saved Successfully')
      }
    }catch(error){
      console.log(error)
    }
  }

  getLabels = () => {
    const { labels, percentage } = this.state;
    return (
      labels.length ? labels.map(item => (
        (parseInt(percentage) >= parseInt(item.lowestGrade) &&  parseInt(percentage) <= parseInt(item.highestGrade)) ?
          <span style={{ color: item.color }}>{item.name}</span> : ''
      )) : '...'
    )
  }
  // Add appraisal to user (only branch manager, not available after submission)

  // submit appraisal (only branch manager)

  // comment ( staff, branch manager )

  render() {
    const { appraisal, appraisalItems, comments, percentage, labels, user } = this.state;
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
                      <div className="mb-3 add-cursor" onClick={() => this.props.history.goBack()}>
                        <i className="fa fa-arrow-left"></i> Back
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-9 col-sm-7 pl-0 text-primary" style={{ fontWeight: '600'}}>
                            <p className="mb-0" style={{ fontSize: '20px'}}>{user.firstName + ' ' + user.lastName}</p>
                            <p className="mb-0" style={{color: '#999999'}}>MIS Officer</p>
                          </div>
                          <div className="col-md-3 col-sm-5 text-right pr-0">
                            <div className="text-left">
                              <span>Summary: </span>
                              {/* <span className="text-danger">
                                
                              </span> */}
                              {
                                this.getLabels()
                              }
                              <span> ({parseInt(percentage) || 0}%)</span>
                            </div>
                            <div className="text-left">
                              <span className="p">Status:</span>
                              <span> {appraisal.status}</span>
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
                        appraisalItems={appraisalItems || []}
                        // handleDelete={this.deleteBranch}
                        // handleEdit={this.handleEdit}
                      />


                      <div class="col-md-12 mt-5 pt-5">
												{
                          comments.length ? comments.map(item => (
                            <div>
                              <div class="media mt-0">
                                <div class="media-left"> <a href="javascript:void(0)"> <img src="/assets/img/avatar/avatar-2.jpg" alt="" class="media-object" /> </a> </div>
                                <div class="media-body">
                                  <h4 class="media-heading">{item.user.firstName + ' ' + item.user.lastName}<br />
                                    <small>{item.user.role}</small><br />
                                  </h4>
                                </div>
                                <div>
                                  <small class="text-muted"><i class="fa fa-clock-o"></i> {dateFromNow(item.createdAt)}, <Moment format='LT'>{item.createdAt}</Moment></small>
                                </div>
                              </div>
                              <div style={{
                                marginLeft: '23px',
                                padding: '5px 10px 5px 42px',
                                borderLeft: '2px solid #B1B4C1'
                              }}>
                                <p>{item.comment}</p>
                              </div>
                            </div>
                          )) :
                          <div> 
                            <div class="media mt-0">
                              <div class="media-left"> <a href="javascript:void(0)"> <img src="/assets/img/avatar/avatar-2.jpg" alt="" class="media-object" /> </a> </div>
                              <div class="media-body">
                                <h4 class="media-heading">....<br />
                                  <small>....</small><br />
                                </h4>
                              </div>
                              <div>
                                <small class="text-muted"><i class="fa fa-clock-o"></i> ...., ...</small>
                              </div>
                              </div>
                              <div style={{
                                marginLeft: '23px',
                                padding: '5px 10px 5px 42px',
                                borderLeft: '2px solid #B1B4C1'
                              }}>
                                <p>....</p>
                            </div>
                          </div>
                        }

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
                          onChange={e => this.setState({ comment: e.target.value })}
                        />
                        <div className="text-center mt-2">
                          <button className="btn btn-lg-primary"
                           style={{ 
                            minWidth: '325px', height: '45px',
                            background: '#003766', color: '#fff'
                          }}
                          disabled={
                            !comments.length || comments.length === 3 ?
                            true : false
                          }
                          onClick={this.postComment}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* <AddAppraisal 
          assignedKpisOption={this.state.assignedKpisOption}
          assignData={this.state.assignData}
          handleChange={this.handleChange}
          customSelect={this.state.customSelect}
        /> */}
      </Layout>
    )
  }
}

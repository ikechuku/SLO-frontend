import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import Moment from 'react-moment';
import { NotificationManager } from 'react-notifications';
import Layout from '../layout'
import { AppraisalTable } from './Table'
import { Component } from 'react'
import DownloadSvg from './downloadSvg';
import SetAppraisal from './SetAppraisal';
import { httpGet, httpPost } from '../../actions/data.action';
import { showLoader, hideLoader } from '../../helpers/loader';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      postData: {},
      dates: [],
      date1: undefined,
      date2: undefined,
    }
  }

  componentDidMount = () => {
    showLoader();
    this.getAppraisalDates();
    this.getAppraisals();
    hideLoader();
  }

  getAppraisalDates = async() => {
    try{
      const res = await httpGet('appraisal_dates');
      if(res.code === 200){
        this.setState({ dates: res.data.appraisalDates });
      }
    }catch(error){
      console.log(error)
    }
  }

  getAppraisals = async() => {
    try{

      const res = await httpGet(`current_appraisals`);
      if(res.code === 200){
        this.setState({ dates: res.data.appraisalDates });
      }
    }catch(error){
      console.log(error)
    }
  }

  handleDate = (e, name) => {
    const { postData } = this.state;
    if(name === 'startDate'){
      postData[name] = e;
      this.setState({ postData, date1: e })
    } else if(name === 'endDate'){
      postData[name] = e;
      this.setState({ postData, date2: e })
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log('gets here', this.state.postData)
    try{
      showLoader();
      const res = await httpPost('create_appraisal_date', this.state.postData);

      if(res.code === 201){
        NotificationManager.success('Successfully created');
        $('.modal').modal('hide');
        $(document.body).removeClass('modal-open');
        $('.modal-backdrop').remove();
        await this.getAppraisalDates();
        hideLoader();
      }  
    } catch(error){
      hideLoader();
      console.log(error)
    }
  }

  getCurrentDate = () => {
    //14 June 2020 - 30 June 2020
    const currentDate = this.state.dates.length ? [...this.state.dates].filter(item => item.current)[0] : undefined;
    if(currentDate){
      return (
        <span>
          {<Moment format='MMM DD, YYYY'>{currentDate.startDate}</Moment>} {' - '} {<Moment format='MMM DD, YYYY'>{currentDate.endDate}</Moment>}
        </span>
      )
    } else {
      return (
        <span className="text-muted">No date found</span>
      )
    }
  }

  getPreviousDate = () => {
    //14 June 2020 - 30 June 2020
    const { dates } = this.state;
    if(dates.length === 1 || !dates.length){
      return (
        <span className="text-muted">No date found</span>
      )
    } else if(dates.length > 1){
      const currentDate = this.state.dates[this.state.dates.length - 1];
      return (
        <span>
          {<Moment format='MMM DD, YYYY'>{currentDate.startDate}</Moment>} {' - '} {<Moment format='MMM DD, YYYY'>{currentDate.endDate}</Moment>}
        </span>
      )
    }
  }

  render() {
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
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-8 pl-0 mt-5 text-primary" style={{ fontWeight: '600'}}>
                            <p>Current Appraisal Period: {this.getCurrentDate()}<span className="ml-2 font-weight-normal add-cursor" style={{ color: '#999999'}}
                             data-toggle="modal" data-target="#setAppraisalModal"
                            >Change</span></p>
                            <p>Last Appraisal Period: {this.getPreviousDate()}</p>
                          </div>
                          <div className="col-4 text-right pr-0">
                            <button
                              type="button"
                              className="btn btn-danger mb-4"
                              data-toggle="modal"
                              data-target="#branchModal"
                            >
                              End Appraisal
                            </button>
                            <br/>
                            <select
                              style={{
                                background: 'linear-gradient(0deg, #F2F4F7 0%, #FFFFFF 100%)',
                                border: '1px solid #CED0DA',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                width: '200px',
                                height: '30px'
                              }}
                            >
                              <option value="" disabled selected>Select Appraisal Period</option>
                              {
                                this.state.dates.length ?
                                  this.state.dates.map(item => <option value={item.id}>
                                    {moment(item.startDate).format('MMM DD, YYYY') + ' - ' + moment(item.endDate).format('MMM DD, YYYY')}
                                  </option>) :
                                  ''
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row text-primary" style={{ fontSize: '18px'}}>
                        <p className="col-6 text-left font-weight-bold">Current Appraisal</p>
                        <p className="col-6 text-right">Download Appraisal {' '} 
                          <DownloadSvg />

                        </p>
                      </div>
                      <AppraisalTable
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
        <SetAppraisal 
          date1={this.state.date1}
          date2={this.state.date2}
          modalMode={'create'}
          handleDate={this.handleDate}
          handleSubmit={this.handleSubmit}
        />
      </Layout>
    )
  }
}

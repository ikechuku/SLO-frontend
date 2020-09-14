import React, { Component } from 'react';
import Select from "react-select";
import Layout from '../layout';
import UserList from './UserList';
import { showLoader, hideLoader } from '../../helpers/loader';
import { httpGet } from '../../actions/data.action';


export default class AssignKpi extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      userId: null,
      user: {},
      customSelect1: null,
      usersOptions: [],
      displayUserList: false
    }
  }

  handleChange = (e) => {
    const { users } = this.state;
    this.setState({ 
      userId: e.value, 
      user: [...users].filter(item => item.id === e.value)[0], 
      customSelect1: e 
    })
  }

  handleNext = () => {
    if(this.state.userId){
      this.setState({ displayUserList: true })
    }
  }

  componentDidMount = () => {
    showLoader();
    this.getUsers();
    hideLoader();
  }

  getUsers = async() => {
    const res = await httpGet('kpi_users');
    if(res.code === 200){
      let usersOptions = [];
      await res.data.users.map((data) =>
        usersOptions.push({ value: data.id, label: `${data.lastName + ' ' + data.firstName}` })
      );
      this.setState({ users: res.data.users, usersOptions });
    }

    if(res.code === 404){
      this.setState({ usersOptions: null });
    }
  }

  handleDisplay = () => {
    this.setState({ displayUserList: false })
  }

  render() {
    const { displayUserList } = this.state;

    if(!displayUserList) {
      return (
        <Layout page="kpi">
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
                  Assign KPI
                </li>
              </ol>
              <div className="section-body animation">
                <div className="row">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="mt-5 mb-5 text-center">
                        <h4>Assign KPI</h4>
                      </div>

                      <div className="card-body">
                        <form className="col-12">
                          <div className="row">
                            <label htmlFor="" className="col-md-4 text-right my-auto font-weight-bold">User</label>
                            <Select
                              className="w-100 pr-0 pl-0 col-md-6"
                              value={this.state.customSelect1}
                              onChange={this.handleChange}
                              options={this.state.usersOptions}
                              isSearchable="true"
                              name="userId"
                              placeholder="Select"
                            />
                          </div>
                          
                          <div className="col-12 text-center">
                            <button className="btn btn-primary rounded-circle p-3 pr-1 pl-1 mt-5 mb-5"
                              onClick={this.handleNext}
                            >
                              <i className="fa fa-arrow-right p-2"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Layout>
      )
    } else {
      return (
        <UserList
          props={this.props} 
          userId={this.state.userId}
          user={this.state.user}
          handleChangeDisplay={this.handleDisplay}
        />
      )
    }
  }
}

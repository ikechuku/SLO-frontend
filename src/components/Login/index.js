import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";
import { httpPost } from '../../actions/data.action';
import { showLoader, hideLoader } from '../../helpers/loader';
import { logUserIn } from "../../actions/auth.action";

import "./login.css";

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    showLoader()
    try{
      const body = {
        username: this.state.username,
        password: this.state.password
      };

      const res = await this.props.logUserIn(body);
      if (res) {
        hideLoader();
        // console.log(res.payload);
        if(res.payload.role === 'staff') {
          if(res.payload.user.onBoarding < 4 && res.payload.user.applicationStatus === 'pending'){
            if(res.payload.user.onBoarding === 3){
              this.props.history.push('/application_status');
            }else {
              localStorage.setItem('token', res.payload.token);
              this.props.history.push(`/create_staff/one/${res.payload.user.id}`);
            }
          } else {
            if(res.payload.user.applicationStatus === 'approved'){
              this.props.history.push('/staff_dashboard');
            } else {
              NotificationManager.warning('Unauthorized');
            }
            
          }
        } else {
          localStorage.setItem('token', res.payload.token);
          this.props.history.push(`/create_staff`);
          this.setState({ email: '', password: '' });
        }
      }

      // const data = await httpPost('auth/login', body)
      // if(data.code === 200){
      //   hideLoader();
      //   console.log(data)
      //   NotificationManager.success('You are logged in','Success!',3000);
      //   if(data.data.role === 'staff') {
      //     if(data.data.onBoarding < 4 && data.data.applicationStatus === 'pending'){
      //       localStorage.setItem('token', data.data.token);
      //       this.props.history.push(`/create_staff/one/${data.data.id}`);
      //     } else {
      //       console.log('User has either approved or rejected')
      //     }
      //   } else {
      //     localStorage.setItem('token', data.data.token);
      //     this.props.history.push(`/create_staff`);
      //     this.setState({ email: '', password: '' });
      //   }
      // }
    }catch(error){
      hideLoader()
      console.log(error)
      NotificationManager.error((error.response.data.message) || ('Something went wrong. Please retry.'),'Opps!',3000)
    }
  }

  render() {
    return (
      <div id="app">
        <div class="container-center">
          <h1 className="appName">SLO </h1>

          <form className="loginForm99" onSubmit={this.handleSubmit}>
            <div class="containerlogin">
              <div className="formHeader">
                <h1>LOGIN</h1>
              </div>

              <input
                className="logInInput9"
                type="text"
                placeholder="Enter Email"
                name="username"
                onChange={this.handleChange}
                required
              />

              <input
                className="logInInput9"
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={this.handleChange}
                required
              />

              <button className="logInInput9button" type="submit" onSubmit={this.handleSubmit}>
                Login To Your Account
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

//export default Login;

const mapStateToProps = ({ user }) => ({
	user,
});

export default connect(mapStateToProps, { logUserIn })(Login);
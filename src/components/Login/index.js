import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";
import { httpPost } from '../../actions/data.action';
import { showLoader, hideLoader } from '../../helpers/loader';
import { logUserIn } from "../../actions/auth.action";


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
            localStorage.setItem('token', res.payload.token);
            this.props.history.push(`/create_staff/one/${res.payload.user.id}`);
          } else {
            console.log('User has either been approved or rejected')
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
        <section class="section section-2">
          <div class="row">
            <div class="single-page single-pageimage construction-bg cover-image" style={{ background: `url(/assets/image.png)`}}>
              <div class="row">

                <div class="col-lg-6">
                  {/* <img src="/assets/image.png" alt="" /> */}
                  {/* <div class="log-wrapper text-center">
                    
                    <img src="assets/img/logo-white.png" width="50%" class="mb-2 mt-4 mt-lg-0 mb-5" alt="logo" />
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                      suffered alteration in some form, by injected humour, or randomised words which
                      don't look even slightly believable. If you are going to use a passage of Lorem
                      Ipsum, you need to be sure</p>
                  </div> */}
                </div>
                <div class="col-lg-6">
                  <div class="wrapper wrapper2" style={{height: "100vh"}}>
                    <form id="login" class="card-body form-body" tabindex="500">
                      <h3>Login</h3>
                      <div class="mail">
                        <input type="text" name="username"
                          onChange={this.handleChange}
                        />
                        <label>Username</label>
                      </div>
                      <div class="passwd">
                        <input type="password" name="password"
                          name="password"
                          onChange={this.handleChange}
                        />
                        <label>Password</label>
                      </div>
                      <div class="submit">
                        <a class="btn btn-primary btn-block" onClick={this.handleSubmit}>Login</a>
                      </div>
                      <p class="mb-2"><a href="forgot.html">Forgot Password</a></p>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

//export default Login;

const mapStateToProps = ({ user }) => ({
	user,
});

export default connect(mapStateToProps, { logUserIn })(Login);
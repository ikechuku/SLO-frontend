import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import Sidebar from './Sidebar';
import StaffSidebar from './staffSidebar';
import { getUser } from '../../actions/auth.action';

// getUser();

class Layout extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount = async () => {
    await this.props.getUser();
    console.log(this.props.user.role)
  }

  render() {
    return (
      <div className="app">
        <div className="main-wrapper">
          <Nav />
          {
            this.props.user.role === 'super admin' ? <Sidebar props={this.props}/> :
            this.props.user.role === 'staff' ? <StaffSidebar props={this.props}/> :
            <Sidebar props={this.props}/>
          }
          {this.props.children}
        </div>
      </div>
    )
  }
}

// export default Layout;
const mapStateToProps = ({ user }) => ({
	user,
});
export default connect(mapStateToProps, { getUser })(Layout);

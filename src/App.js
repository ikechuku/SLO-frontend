import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import PersonalInfo from './components/Onboarding/PersonalInfo';
import Qualification from './components/Onboarding/Qualification2';
import Employment from './components/Onboarding/Employment';
import Guarantor from './components/Onboarding/Guarantor';
import Upload from './components/Onboarding/Upload';
import PendingApplication from './components/Onboarding/Pending';
import StaffList from './components/Onboarding/StaffList';
import ViewDetails from './components/Onboarding/ViewDetails';
import Branch from './components/andyBranch/branch/branch'
import Department from './components/andyBranch/department/department'
import Unit from './components/andyBranch/unit/unit'
import Role from './components/andyBranch/role'
// import Testing from './components/testing3';

import 'react-notifications/lib/notifications.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-tooltip/dist/index.js'

// import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
      <Router>
          <NotificationContainer />
        {/* <ToastContainer /> */}
        <Switch>
          {/* <Route exact path="/" component={Homepage}/> */}
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route path="/create_staff/one" component={PersonalInfo} /> */}
          <Route exact path="/" component={PersonalInfo} />
          <Route path="/create_staff/two/:id" component={Qualification} />
          <Route path="/create_staff/three/:id" component={Employment} />
          <Route path="/create_staff/four/:id" component={Guarantor} />
          <Route path="/create_staff/five/:id" component={Upload} />
          <Route path="/create_staff/six" component={PendingApplication} />
          <Route path="/staff_list" component={StaffList} />
          <Route path="/view_details/:id" component={ViewDetails} />
          <Route path="/branches" component={Branch} />
          <Route path="/departments" component={Department} />
          <Route path="/units" component={Unit} />
          <Route path="/roles" component={Role} />
          {/* <Route path="/testing" component={Testing} /> */}
        

          
        
          
        </Switch>
      </Router>
  );
}

export default App;

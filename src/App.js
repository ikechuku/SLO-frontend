import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PersonalInfo from './components/Onboarding/PersonalInfo';
import Qualification from './components/Onboarding/Qualification';
import Employment from './components/Onboarding/Employment';
import Guarantor from './components/Onboarding/Guarantor';
import Upload from './components/Onboarding/Upload';
import PendingApplication from './components/Onboarding/Pending';
import StaffList from './components/Onboarding/StaffList';

function App() {
  return (
      <Router>
        {/* <ToastContainer /> */}
        <Switch>
          {/* <Route exact path="/" component={Homepage}/> */}
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route path="/create_staff/one" component={PersonalInfo} /> */}
          <Route path="/" component={PersonalInfo} />
          <Route path="/create_staff/two/:id" component={Qualification} />
          <Route path="/create_staff/three/:id" component={Employment} />
          <Route path="/create_staff/four/:id" component={Guarantor} />
          <Route path="/create_staff/five/:id" component={Upload} />
          <Route path="/create_staff/six" component={PendingApplication} />
          <Route path="/staff_list" component={StaffList} />
        </Switch>
      </Router>
  );
}

export default App;

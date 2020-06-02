import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";
import store from "./store";
import PersonalInfo from "./components/Onboarding/PersonalInfo";
import Qualification from "./components/Onboarding/Qualification2";
import Employment from "./components/Onboarding/Employment";
import Guarantor from "./components/Onboarding/Guarantor";
// gurantor refer to personalInfo
import Upload from "./components/Onboarding/Upload";
import PendingApplication from "./components/Onboarding/Pending";
import StaffList from "./components/Onboarding/StaffList";
import ViewDetails from "./components/Onboarding/ViewDetails";
import Branch from "./components/branch/branch";
import Department from "./components/department/department";
import Unit from "./components/unit/unit";
import Role from "./components/role";
import Kpi from "./components/KPI";
import Responsibility from "./components/responsibility";
import PendingActions from "./components/Leave/pendingAction/pendingActions";
import CreateLeave from "./components/Leave/createLeave/createLeave";
import LeaveMangement from "./components/Leave/LeaveManagement/leaveManagement";
import LeaveHistory from "./components/Leave/leaveHistory/leaveHistory";
import Testing from './components/testing';

import "react-notifications/lib/notifications.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-tooltip/dist/index.js";
import CreateStaff from "./components/Onboarding/createStaff";
import Login from "./components/Login";
import Logout from './components/Logout';
import ProtectedRoute from './helpers/ProtectedRoute';

// NEW CHANGES
import UserInfo from "./components/personalinfo/info";

// import "bootstrap/dist/css/bootstrap.css";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<NotificationContainer />
				{/* <ToastContainer /> */}
				<Switch>
					{/* <Route exact path="/" component={Homepage}/> */}
					<Route exact path="/" component={Login} />
					<Route exact path="/login" component={Login} />
					{/* <Route path="/create_staff/one" component={PersonalInfo} /> */}
					<ProtectedRoute exact path="/pending_actions" component={PendingActions} />
					<ProtectedRoute exact path="/create_staff" component={CreateStaff} />
					<ProtectedRoute exact path="/create_staff/one/:id" component={PersonalInfo} />
					<ProtectedRoute path="/create_staff/two/:id" component={Qualification} />
					<ProtectedRoute path="/create_staff/three/:id" component={Guarantor} />
					<ProtectedRoute path="/create_staff/four/:id" component={Employment} />
					{/* <Route path="/create_staff/five/:id" component={Upload} /> */}
					{/* <Route path="/create_staff/six" component={PendingApplication} /> */}
					<ProtectedRoute path="/staff_list" component={StaffList} />
					<ProtectedRoute path="/user_info/:id" component={ViewDetails} />
					<ProtectedRoute path="/branches" component={Branch} />
					<ProtectedRoute path="/departments" component={Department} />
					<ProtectedRoute path="/units" component={Unit} />
					<ProtectedRoute path="/roles" component={Role} />
					<ProtectedRoute path="/kpi" component={Kpi} />
					<ProtectedRoute path="/responsibility" component={Responsibility} />
					<ProtectedRoute path="/leave_setup" component={CreateLeave} />
					<ProtectedRoute path="/leave_management" component={LeaveMangement} />
					<ProtectedRoute path="/leave_history" component={LeaveHistory} />
					<Route path="/view_details/:id" component={UserInfo} />
					{/* <Route path="/testing" component={Testing} /> */}
					<Route path="/logout" component={Logout} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;

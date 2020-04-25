import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import PersonalInfo from "./components/Onboarding/PersonalInfo";
import Qualification from "./components/Onboarding/Qualification2";
import Employment from "./components/Onboarding/Employment";
import Guarantor from "./components/Onboarding/Guarantor";
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
// import Testing from './components/testing3';

import "react-notifications/lib/notifications.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-tooltip/dist/index.js";

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
				<Route exact path="/" component={PendingActions} />
				<Route exact path="/create_staff/one" component={PersonalInfo} />
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
				<Route path="/kpi" component={Kpi} />
				<Route path="/responsibility" component={Responsibility} />
				<Route path="/leave_setup" component={CreateLeave} />
				<Route path="/leave_management" component={LeaveMangement} />
				<Route path="/leave_history" component={LeaveHistory} />
				{/* <Route path="/testing" component={Testing} /> */}
			</Switch>
		</Router>
	);
}

export default App;

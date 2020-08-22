import React, { Component } from "react";
import $, { data } from "jquery";
import moment from 'moment'
import { connect } from 'react-redux';
import { NotificationManager } from "react-notifications";
import axios from "axios";
import {Link} from 'react-router-dom'
import Layout from "../../../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../../../actions/data.action";
import { hideLoader, showLoader } from "../../../../helpers/loader";
import "./index.css";
import Buttons from "react-bootstrap-sweetalert/dist/components/Buttons";
import payroll from "../../payrollTable";
import { getUser } from '../../../../actions/auth.action';

class payrollsetup extends Component {
	constructor(props){
		super(props)
		this.state={
			payroll: []
		}
	}

	componentDidMount = async() => {
		await this.props.getUser();
		if(this.props.user.role === "ed"){
			this.getAwaitingApproval();
		} else {
			this.getAwaitingAudit();
		}
	}

	

	getAwaitingAudit= async()=>{
		try{
			showLoader()
			const res = await httpGet(`/payroll/awaiting_audit`)
			
			if (res.code === 200) {
				console.log(res)
				this.setState({
					payroll: res.data.awaitingAudit
				})
			}
			hideLoader()

		} catch(error){
			hideLoader();
			console.log(error);
		}
	}

	getAwaitingApproval= async() => {
		try{
			showLoader()
			const res = await httpGet(`/payroll/awaiting_approval`)
			
			if (res.code === 200) {
				console.log(res)
				this.setState({
					payroll: res.data.awaitingApproval
				})
			}
			hideLoader()

		} catch(error){
			hideLoader();
			console.log(error);
		}
	}


	

	render() {
		const { role } = this.props.user;
		return (
			<Layout page="viewPending">
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
									Process Payroll
								</a>
							</li>
						</ol>
					</section>
					

             


          <div className="toggleAuditTABLE">
            <button className={role === 'audits' ? "activeAuditBtn" : 'UnactiveAuditBtn'}>Awaiting Audit</button>   
						<button className={role === 'ed' ? "activeAuditBtn" : 'UnactiveAuditBtn'}>Awaiting Approval</button>
          </div>
					<section className="paysetUpwraper">
					<div style={{ marginBottom: "20px" }} className="payroll-headr">
							<h1 style={{ fontSize: "23px", marginLeft: "19px" }}>
							{
								"Pending Payroll Process"
							}	
							</h1>

						</div> 
              {
								this.state.payroll.length ? this.state.payroll.map(item => (
									<div className="pendingAdminWrap">
										<div className="pendingAdmin">
												<div className="payrollName344">{item.title}</div>

												<div className="payrollAdminActions">
													<Link className="adminRlink" to={`/audit_view_payroll/${item.id}`}>View</Link>  
												</div>
										</div>

										
									</div>
								)) : <h2 className="text-center">No Pending Result</h2>
							}
					</section>
					
				</div>
				<br/>
			</Layout>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	user,
});
export default connect(mapStateToProps, { getUser })(payrollsetup);
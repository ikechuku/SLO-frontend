import React, { Component } from "react";
import { httpPost } from "../../actions/data.action";

export default class gurantor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			info: {},
			default: true,
			documents: []
		};
	}

	getGuarantorInfo = async (e, id, index) => {
		const { guarantorInfo } = this.props;
		await this.setState({ 
			info: guarantorInfo.filter(item => item.id === id)[0]
		});
		this.getDocuments();
	}

	getG = async (info) => {
		console.log('com', info)
		await this.setState({ 
			info: info !== undefined ? info[0] : {}
		})
		this.getDocuments();
	}

	getDocuments = async () => {
		const { documentId } = this.state.info;
		const postDocument = { documentId };
		try {
			const res = await httpPost('auth/guarantor_docs', postDocument);
			if(res.code === 200){
				this.setState({ documents: res.data.documents });
			}
		}catch(error){
			console.log(error);
			return;
		}
	}

	componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getG(this.props.guarantorInfo);
    }
  }



	render() {
		let { guarantorInfo } = this.props;
		const { info, documents } = this.state;
		return (
			<div>
				<section className="appheaderr5 reduceMargin">
					<h1>Guarantor Information</h1>
				</section>
				<section className="gurantor-names mb-3">
					{
						guarantorInfo.length ? guarantorInfo.map((info, index) => (
						<span onClick={e => this.getGuarantorInfo(e, info.id, index)} key={index}>{info.firstName + ' ' + info.lastName}</span>
						)) : ''
					}
				</section>

				{
					<div className="row">
						<div className="col-md-2">
							<div className="row">
							<span className="files675">Files</span><br/>
								{
									documents.length ? documents.map(item => (
										<a href={item.path} target="_blank">
											<i class="fa fa-link"></i> {item.fileName}{" "}
										</a>
									)) : ''
								}
							</div>
						</div>
						<div className="col-md-4 col-sm-4">
							<p className="row">
								<span className="col-md-5 font-bold">Name of Guarantor:</span> <span className="col-md-7">{!info ? '' : info.firstName + ' ' + info.lastName}</span></p>
							<p className="row">
								<span className="col-md-5 font-bold">Occupation:</span> <span className="col-md-7">{!info ? '' : info.occupation}</span></p>
							<p className="row">
								<span className="col-md-5 font-bold">Bvn:</span> <span className="col-md-7">{!info ? '' : info.bvn || ''}</span></p>
							<p className="row">
								<span className="col-md-5 font-bold">Relationship:</span> <span className="col-md-7">{!info ? '' : info.relationship}</span></p>
							<p className="row">
								<span className="col-md-5 font-bold">Home No:</span> <span className="col-md-7">{info.homePhoneCode + info.homePhone}</span></p>
							<p className="row">
								<span className="col-md-5 font-bold">Mobile No:</span> <span className="col-md-7">{info.mobilePhoneCode + info.mobilePhone}</span></p>
							<p className="row">
								<span className="col-md-5 font-bold">Marital Status:</span> <span className="col-md-7">{info.maritalStatus}</span></p>
						</div>
						<div className="col-md-6 col-sm-6 pl-md-0">
							<p className="row">
								<span className="col-md-5 font-bold">Involed in any crime:</span> <span className="col-md-7">{!info ? '' : !info.criminalHistory ? 'No' : 'Yes'}</span></p>
							<p className="row">
								<span className="col-md-5 font-bold">How long have you known the employee:</span> <span className="col-md-7">{info.employeeKnownDate}</span></p>
							<p className="row">
								<span className="col-md-5 font-bold">Residential Address:</span> <span className="col-md-7">{info.residentialAddress}
									<span style={!info.residentialCity && !info.currentLga && !info.residentialState && !info.residentialCountry  ? {display: 'none'} : {}}>(<span style={!info.residentialCity ? {display: 'none'} : {}}>{info.residentialCity}, </span>
									<span style={!info.residentialLga ? {display: 'none'} : {}}>{info.residentialLga}, </span>
									<span style={!info.residentialState ? {display: 'none'} : {}}>{info.residentialState},</span>
									<span style={!info.residentialCountry ? {display: 'none'} : {}}>{info.residentialCountry}</span>)</span>
									</span>
							</p>
							<p className="row">
								<span className="col-md-5 font-bold">Landed Property Address:</span> <span className="col-md-7">{info.landedPropertyAddress}
									<span style={!info.landedPropertyCity && !info.landedPropertyLga && !info.landedPropertyState && !info.landedPropertyCountry  ? {display: 'none'} : {}}>(<span style={!info.landedPropertyCity ? {display: 'none'} : {}}>{info.landedPropertyCity}, </span>
									<span style={!info.landedPropertyLga ? {display: 'none'} : {}}>{info.landedPropertyLga},</span>
									<span style={!info.landedPropertyState ? {display: 'none'} : {}}> {info.landedPropertyState}</span>
									<span style={!info.landedPropertyCountry ? {display: 'none'} : {}}>, {info.landedPropertyCountry}</span>)
									</span>
								</span>
							</p>
							<p className="row">
								<span className="col-md-5 font-bold">Business Address:</span> <span className="col-md-7">{info.businessAddress}
									<span style={!info.businessCity && !info.businessLga && !info.businessState && !info.businessCountry  ? {display: 'none'} : {}}>(<span style={!info.businessCity ? {display: 'none'} : {}}>{info.businessCity}, </span>
									<span style={!info.businessLga ? {display: 'none'} : {}}>{info.businessLga}</span>
									<span style={!info.businessState ? {display: 'none'} : {}}>, {info.businessState}</span>
									<span style={!info.businessCountry ? {display: 'none'} : {}}>, {info.businessCountry}</span>)</span>
								</span>
							</p>
							<p className="row">
								<span className="col-md-5 font-bold">Details:</span> <span className="col-md-7">{info.details}</span></p>
						</div>
					</div>

				}

			</div>
		);
	}
}

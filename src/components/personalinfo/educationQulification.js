import React, { Component } from "react";
import Moment from 'react-moment';

export default class educationQulification extends Component {
	constructor(props){
		super(props)
	}
	render() {
		if(!this.props.institution.length){
			return (
				<div>
					<section className="appheaderr5 reduceMargin">
						<h1>Education Qualification</h1>
					</section>
					<section className="gurantor-names mb-3">
						<p>No education qualification created yet</p>
					</section>
				</div>
			)
		} else {
			return (
				<div>
					<section className="appheaderr5 reduceMargin">
						<h1>Education Qualification</h1>
					</section>

					<div class="table-responsive">
						<table id="example1" class="col col-md-12 table table-hover table-bordered border-t0 text-nowrap w-100" >
							<thead>
								<tr>
									{/* <th className="wd-15p">S/N</th> */}
									<th class="wd-15p">Name</th>
									<th class="wd-15p">Qualification/Certification</th>
									<th className="wd-15p">Date</th>
									<th>Documents</th>
								</tr>
							</thead>
							<tbody>                                {
									this.props.institution.length ? this.props.institution.map((data, index) => (
										<tr key={index}>
											{/* <td>{index + 1}</td> */}
											<td>{data.name}</td>
											<td>{data.qualification || data.certification}</td>
											<td>{<Moment format='MMM, YYYY'>{data.startDate}</Moment>} - {<Moment format='MMM, YYYY'>{data.endDate}</Moment>}</td>
											<td><a className="add-cursor" href={data.upload.path} target="_blank"><span className="fa fa-link"> View</span></a></td>
										</tr>
									)) : ''
								}
							</tbody>
						</table>
					</div>
				</div>
			);
		}
	}
}

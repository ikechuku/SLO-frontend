import React from 'react';
import { Link } from 'react-router-dom';

export default function UnderReview() {
  return (
    <div id="app">
			<section className="section container-center">
				<div className="container mt-6 mb-5 ">
					<div className="row">
						{/* <div className="single-page"> */}
            <div className="single-page" style={{ backgroundColor: '#f7f7f7', boxShadow: 'none'}}>
							<div className="text-center construction" style={{ color: '#0d2944'}}>
								<img src="/logo.jpeg" className="mb-2 mt-4 mt-lg-0 " alt="logo" />
								<h1 className="mb-0">Application Status</h1>
								<p className="">Your application is currently under review...</p>
                <div className="page-search">
								<div className="mt-3">
									<Link to="/" className="btn btn-primary">Back to Login</Link>
								</div>
							</div>
							</div>
							<div className="row ">
                
								
								<div id="count-down" className="center-block text-white mt-3">

									{/* <div className="clock-presenter days_dash">
										<div className="digit"></div>
										<div className="digit"></div>
										<p className="mt-2">Days</p>
									</div>
									<div className="clock-presenter hours_dash">
										<div className="digit"></div>
										<div className="digit"></div>
										<p className="mt-2">Hours</p>
									</div>
									<div className="clock-presenter minutes_dash">
										<div className="digit"></div>
										<div className="digit"></div>
										<p className="mt-2">Minutes</p>
									</div>
									<div className="clock-presenter seconds_dash">
										<div className="digit"></div>
										<div className="digit"></div>
										<p className="mt-2">Seconds</p>
									</div> */}
								</div>
								
							</div>
							
						</div>		
					</div>
				</div>
           
			</section>
		</div>
  )
}

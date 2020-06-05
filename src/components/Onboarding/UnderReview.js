import React from 'react';
import { Link } from 'react-router-dom';

export default function UnderReview() {
  return (
    <div id="app">
			<section class="section container-center">
				<div class="container mt-6 mb-5 ">
					<div class="row">
						{/* <div class="single-page"> */}
            <div class="single-page" style={{ backgroundColor: '#f7f7f7', boxShadow: 'none'}}>
							<div class="text-center construction" style={{ color: '#0d2944'}}>
								<img src="/logo.jpeg" class="mb-2 mt-4 mt-lg-0 " alt="logo" />
								<h1 class="mb-0">Application Status</h1>
								<p class="">Your application is currently under review...</p>
                <div class="page-search">
								<div class="mt-3">
									<Link to="/" class="btn btn-primary">Back to Login</Link>
								</div>
							</div>
							</div>
							<div class="row ">
                
								
								<div id="count-down" class="center-block text-white mt-3">

									{/* <div class="clock-presenter days_dash">
										<div class="digit"></div>
										<div class="digit"></div>
										<p class="mt-2">Days</p>
									</div>
									<div class="clock-presenter hours_dash">
										<div class="digit"></div>
										<div class="digit"></div>
										<p class="mt-2">Hours</p>
									</div>
									<div class="clock-presenter minutes_dash">
										<div class="digit"></div>
										<div class="digit"></div>
										<p class="mt-2">Minutes</p>
									</div>
									<div class="clock-presenter seconds_dash">
										<div class="digit"></div>
										<div class="digit"></div>
										<p class="mt-2">Seconds</p>
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

import React from 'react';
import { Link } from 'react-router-dom';

export default function StaffDashboard() {
  return (
    <div id="app">
			<section class="section container-center">
				<div class="container mt-6 mb-5 ">
					<div class="row">
            <div class="single-page" style={{ backgroundColor: '#f7f7f7', boxShadow: 'none'}}>
							<div class="text-center construction" style={{ color: '#0d2944'}}>
								<img src="/logo.jpeg" class="mb-2 mt-4 mt-lg-0 " alt="logo" />
								<h1 class="mb-0">Under Construction</h1>
								<p class="">We are Currently Working on Our Site...please stay tuned</p>
                <div class="page-search">
								<div class="mt-3">
									<Link to="/" class="btn btn-primary">Back to Login</Link>
								</div>
							</div>
							</div>
							<div class="row ">
                
								
								<div id="count-down" class="center-block text-white mt-3">

									
								</div>
								
							</div>
							
						</div>		
					</div>
				</div>
           
			</section>
		</div>
  )
}

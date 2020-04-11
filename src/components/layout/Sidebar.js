import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside class="app-sidebar">
      {/* <div class="app-sidebar__user">
          <div class="dropdown">
          <a class="nav-link pl-2 pr-2 leading-none d-flex" data-toggle="dropdown" href="#">
            <img alt="image" src="/assets/img/avatar/avatar-1.jpg" class=" avatar-md rounded-circle" />
            <span class="ml-2 d-lg-block">
              <span class=" app-sidebar__user-name mt-5">Jessica Lee</span><br />
              <span class="text-muted app-sidebar__user-name text-sm"> Web-Designer</span>
            </span>
          </a>
        </div>
      </div> */}
      <ul class="side-menu">
        <li class="slide">
          <a class="side-menu__item"  data-toggle="slide" href="#"><i class="side-menu__icon fa fa-desktop"></i><span class="side-menu__label">Staff Onboarding</span><i class="angle fa fa-angle-right"></i></a>
          <ul class="slide-menu">
            <li class="slide">
							<a class="side-menu__item second-side-menu__item" data-toggle="second-slide" href="#">
                <span class="side-menu__label" style={{paddingLeft: '25px', fontSize: '12px'}}>New Staff</span><i class="angle fa fa-angle-right"></i>
              </a>
							<ul class="second-slide-menu">
								<li><Link to="/create_staff/one" class="slide-item">Personal Information</Link></li>
								<li><Link to="/create_staff/two" class="slide-item">Qualification and Experience</Link></li>
                <li><Link to="/create_staff/three" class="slide-item">Employment Information</Link></li>
                <li><Link to="/create_staff/four" class="slide-item">Guarantor Information</Link></li>
                <li><Link to="/create_staff/five" class="slide-item">Upload</Link></li>
							</ul>
						</li>
            <li><Link class="slide-item" to="/staff_list"><span>Staff Listing</span></Link></li>
            <li><a class="slide-item" href="index3.html"><span>Staff History</span></a></li>
          </ul>
        </li>
        <li>
          <a class="side-menu__item" href="widgets.html"><i class="side-menu__icon fa fa-flask"></i><span class="side-menu__label">Payroll</span></a>
        </li>
        <li>
          <a class="side-menu__item" href="widgets.html"><i class="side-menu__icon fa fa-flask"></i><span class="side-menu__label">Leave</span></a>
        </li>
        <li>
          <a class="side-menu__item" href="widgets.html"><i class="side-menu__icon fa fa-flask"></i><span class="side-menu__label">Budget</span></a>
        </li>
      </ul>
    </aside>
  )
}

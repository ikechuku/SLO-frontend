import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg main-navbar">
      <a className="header-brand" href="index.html">
        <img src="/final.png" className="header-brand-img" alt="Kharna-Admin  logo" />
      </a>
      <h4>Standard Life Organization</h4>
      <ul className="navbar-nav navbar-right ml-auto">
        {/* <li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg beep"><i className="ion-ios-email-outline"></i></a>
          <div className="dropdown-menu dropdown-list dropdown-menu-right">
            <div className="dropdown-header">Messages
              <div className="float-right">
                <a href="#">View All</a>
              </div>
            </div>
            <div className="dropdown-list-content">
              <a href="#" className="dropdown-item dropdown-item-unread">
                <img alt="image" src="assets/img/avatar/avatar-1.jpg" className="rounded-circle dropdown-item-img" />
                <div className="dropdown-item-desc">
                  <div className="dropdownmsg d-flex">
                    <div className="">
                      <b>Stewart Ball</b>
                      <p>Your template awesome</p>
                    </div>
                    <div className="time">6 hours ago</div>
                  </div>

                </div>
              </a>
              <a href="#" className="dropdown-item dropdown-item-unread">
                <img alt="image" src="assets/img/avatar/avatar-2.jpg" className="rounded-circle dropdown-item-img" />
                <div className="dropdown-item-desc">
                  <div className="dropdownmsg d-flex">
                    <div className="">
                      <b>Jonathan North</b>
                      <p>Your Order Shipped.....</p>
                    </div>
                    <div className="time">45 mins ago</div>
                  </div>
                </div>
              </a>
              <a href="#" className="dropdown-item">
                <img alt="image" src="assets/img/avatar/avatar-4.jpg" className="rounded-circle dropdown-item-img" />
                <div className="dropdown-item-desc">
                  <div className="dropdownmsg d-flex">
                    <div className="">
                      <b>Victor Taylor</b>
                      <p>Hi!, I' am web developer</p>
                    </div>
                    <div className="time"> 8 hours ago</div>
                  </div>
                </div>
              </a>
              <a href="#" className="dropdown-item">
                <img alt="image" src="assets/img/avatar/avatar-3.jpg" className="rounded-circle dropdown-item-img" />
                <div className="dropdown-item-desc">
                  <div className="dropdownmsg d-flex">
                    <div className="">
                      <b>Ruth	Arnold</b>
                      <p>Hi!, I' am web designer</p>
                    </div>
                    <div className="time"> 3 hours ago</div>
                  </div>
                </div>
              </a>
              <a href="#" className="dropdown-item">
                <img alt="image" src="assets/img/avatar/avatar-5.jpg" className="rounded-circle dropdown-item-img" />
                <div className="dropdown-item-desc">
                  <div className="dropdownmsg d-flex">
                    <div className="">
                      <b>Sam	Lyman</b>
                      <p>Hi!, I' am java developer</p>
                    </div>
                    <div className="time"> 15 mintues ago</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </li>
        <li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown" className="nav-link  nav-link-lg beep"><i className="ion-ios-bell-outline"></i></a>
          <div className="dropdown-menu dropdown-list dropdown-menu-right">
            <div className="dropdown-header">Notifications
              <div className="float-right">
                <a href="#">View All</a>
              </div>
            </div>
            <div className="dropdown-list-content">
              <a href="#" className="dropdown-item">
                <i className="fa fa-users text-primary"></i>
                <div className="dropdown-item-desc">
                  <b>So many Users Visit your template</b>
                </div>
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa fa-exclamation-triangle text-danger"></i>
                <div className="dropdown-item-desc">
                  <b>Error message occurred....</b>
                </div>
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa fa-users text-warning"></i>
                <div className="dropdown-item-desc">
                  <b> Adding new people</b>
                </div>
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa fa-shopping-cart text-success"></i>
                <div className="dropdown-item-desc">
                  <b>Your items Arrived</b>
                </div>
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa fa-comment text-primary"></i>
                <div className="dropdown-item-desc">
                  <b>New Message received</b> <div className="float-right"><span className="badge badge-pill badge-danger badge-sm">67</span></div>
                </div>
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa fa-users text-primary"></i>
                <div className="dropdown-item-desc">
                  <b>So many Users Visit your template</b>
                </div>
              </a>
            </div>
          </div>
        </li> */}
        <li className="dropdown dropdown-list-toggle">
          <a href="#" className="nav-link nav-link-lg full-screen-link">
            <i className="ion-arrow-expand"  id="fullscreen-button"></i>
          </a>
        </li>
        <li className="dropdown"><a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg">
          <img src="/assets/img/avatar/avatar-1.jpg" alt="profile-user" className="rounded-circle w-32" />
          <div className="d-sm-none d-lg-inline-block">Jessica Lee</div></a>
          <div className="dropdown-menu dropdown-menu-right">
            <a href="profile.html" className="dropdown-item has-icon">
              <i className="ion ion-android-person"></i> Profile
            </a>
            <a href="profile.html" className="dropdown-item has-icon">
              <i className="ion-android-drafts"></i> Messages
            </a>
            <a href="profile.html" className="dropdown-item has-icon">
              <i className="ion ion-gear-a"></i> Settings
            </a>
            <a href="#" className="dropdown-item has-icon">
              <i className="ion-ios-redo"></i> Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  )
}

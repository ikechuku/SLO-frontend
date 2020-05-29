import React from 'react';
import { Link } from 'react-router-dom';

export default function StaffSidebar(props) {
  return (
    <aside className="app-sidebar">
      {/* <div className="app-sidebar__user">
          <div className="dropdown">
          <a className="nav-link pl-2 pr-2 leading-none d-flex" data-toggle="dropdown" href="#">
            <img alt="image" src="/assets/img/avatar/avatar-1.jpg" className=" avatar-md rounded-circle" />
            <span className="ml-2 d-lg-block">
              <span className=" app-sidebar__user-name mt-5">Jessica Lee</span><br />
              <span className="text-muted app-sidebar__user-name text-sm"> Web-Designer</span>
            </span>
          </a>
        </div>
      </div> */}
      <ul className="side-menu">
        <li className={props.props.page === 'personalInfo' ? "active" : ""}><Link className={props.props.page === 'personalInfo' ? "side-menu__item active" : "side-menu__item"}><i className="side-menu__icon fa fa-desktop"></i><span className="side-menu__label">Personal Information</span></Link></li>
        <li className={props.props.page === 'qualification' ? "active" : ""}><Link className={props.props.page === 'qualification' ? "side-menu__item active" : "side-menu__item"}><i className="side-menu__icon fa fa-desktop"></i><span className="side-menu__label">Qualification & Experience</span></Link></li>
        <li className={props.props.page === 'guarantor' ? "active" : ""}><Link className={props.props.page === 'guarantor' ? "side-menu__item active" : "side-menu__item"}><i className="side-menu__icon fa fa-desktop"></i><span className="side-menu__label">Guarantor Information</span></Link></li>
        <li>
          <Link className="side-menu__item" to="/logout"><i className="side-menu__icon fa fa-sign-out"></i><span className="side-menu__label">Logout</span></Link>
        </li>
      </ul>
    </aside>
  )
}

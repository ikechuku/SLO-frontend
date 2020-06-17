import React from 'react';
import { Link } from 'react-router-dom';

export default function StaffSidebar(props) {
  return (
    <aside className="app-sidebar">
      <ul className="side-menu">
        <li className={props.props.page === 'appraisalDate' ? "active" : ""}>
          <Link className={props.props.page === 'appraisalDate' ? "side-menu__item active" : "side-menu__item"} to={'/set_appraisal_date'}>
            <i className="side-menu__icon fa fa-desktop"></i><span className="side-menu__label">Set Appraisal Date</span>
          </Link>
        </li>
        <li className={props.props.page === 'qualification' ? "active" : ""}><Link className={props.props.page === 'qualification' ? "side-menu__item active" : "side-menu__item"}><i className="side-menu__icon fa fa-desktop"></i><span className="side-menu__label">Qualification & Experience</span></Link></li>
        <li className={props.props.page === 'guarantor' ? "active" : ""}><Link className={props.props.page === 'guarantor' ? "side-menu__item active" : "side-menu__item"}><i className="side-menu__icon fa fa-desktop"></i><span className="side-menu__label">Guarantor Information</span></Link></li>
        <li>
          <Link className="side-menu__item" to="/logout"><i className="side-menu__icon fa fa-sign-out"></i><span className="side-menu__label">Logout</span></Link>
        </li>
      </ul>
    </aside>
  )
}

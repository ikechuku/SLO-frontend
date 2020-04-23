import React from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar'

const Layout = (props) => {
  return (
    <div className="app">
      <div className="main-wrapper">
        <Nav />
        <Sidebar props={props}/>
        {props.children}
      </div>
    </div>
  )
}

export default Layout;

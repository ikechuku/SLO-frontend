import React, { Component } from 'react';
import Layout from '../layout/index'

class PendingApplication extends Component {
  render() {
    return (
      <Layout>
        <div className="app-content">
          <section className="section">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
              <li className="breadcrumb-item"><a href="#" className="text-muted">Staff</a></li>
              <li className="breadcrumb-item active text-" aria-current="page">New Staff</li>
            </ol>

            <div className="row">
              <div className="col-lg-6 col-xl-3 col-md-6 col-12">
                
              </div>
            </div>


          </section>
        </div>
      </Layout>
    )
  }
}

export default PendingApplication;

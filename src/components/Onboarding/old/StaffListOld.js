import React, { Component } from 'react'
import Layout from '../../layout';
import { httpGet } from '../../../actions/data.action';
import { hideLoader } from '../../../helpers/loader';

class StaffList extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  
  componentDidMount = async () => {
    await this.getAllStaffs();
	}

  getAllStaffs = async () => {
    try{
      const res = await httpGet('auth/all_staffs', this.state.data);
      if(res.code === 200){
        hideLoader()
        this.setState({ users: res.data.users });
      }
      console.log(res)
    } catch (error){
      hideLoader()
      console.log(error)
    }
  }

  render() {
    return (
      <Layout>
        <div className="app-content">
          <section className="section">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
              <li className="breadcrumb-item"><a href="#" className="text-muted">Staff</a></li>
              <li className="breadcrumb-item active text-" aria-current="page">Staff Listing</li>
            </ol>


            <div className="row">
							<div className="col-lg-12">
								<div className="card">
									<div className="header-card">
                    <div className="row">
                      <h4 className="col-md-6">Staff List</h4>
                      <div className="col-md-6 btn-group">
                        {/* <button className="btn btn-md btn-primary" style={{ borderRadius: '0px' }}>All</button>
                        <button className="btn btn-md">Pending</button>
                        <button className="btn btn-md">Declined</button> */}
                          <button type="button" className="btn btn-secondary ml-auto">All</button>
                          <button type="button" className="btn btn-secondary">Pending</button>
                          <button type="button" className="btn btn-secondary">Declined</button>
                      </div>
                    </div>
									</div>
									<div className="card-body">
										<div className="table-responsive">
										<table id="example" className="table table-striped table-bordered border-t0 text-nowrap w-100" >
											<thead>
												<tr>
                          <th className="wd-15p">S/N</th>
													<th className="wd-15p">Full Name</th>
													<th className="wd-20p">Position</th>
													<th className="wd-15p">Start date</th>
													<th className="wd-10p">Status</th>
													<th className="wd-25p"></th>
												</tr>
											</thead>
											<tbody>
                        {
                          this.state.users.map(data => (
                              <tr>
                                <td>1</td>
                                <td>{data.lastName + ' ' + data.firstName}</td>
                                <td>{data.jobTitle || '' }</td>
                                <td>{data.createdAt.slice(0,10)}</td>
                                <td>{data.applicationStatus}</td>
                                <td>
																	<span className="add-more">View Details</span>
																	<span className="ml-3 cursor-pointer">Edit</span>
																</td>
                              </tr>
                            ))
                        }
												{/* <tr>
                          <td>1</td>
													<td>Bella</td>
													<td>System Developer</td>
													<td>2018/03/12</td>
													<td>pending</td>
													<td>b.Chloe@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Donna</td>
													<td>Account Manager</td>
													<td>2012/02/21</td>
													<td>pending</td>
													<td>d.bond@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Harry</td>
													<td>Technical Manager</td>
													<td>20011/02/87</td>
												<td>pending</td>
													<td>h.carr@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Lucas</td>
													<td>Javascript Developer</td>
													<td>2014/08/23</td>
													<td>pending</td>
													<td>l.dyer@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Karen</td>
													<td>Sales Manager</td>
													<td>2010/7/14</td>
													<td>pending</td>
													<td>k.hill@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Dominic</td>
													<td>Sales Assistant</td>
													<td>2015/10/16</td>
													<td>pending</td>
													<td>d.hudson@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Herrod</td>
													<td>Integration Specialist</td>
													<td>2012/08/06</td>
													<td>pending</td>
													<td>h.chandler@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Jonathan</td>
													<td>junior Manager</td>
													<td>2012/11/23</td>
													<td>pending</td>
													<td>j.ince@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Leonard</td>
													<td>Junior Javascript Developer</td>
													<td>2010/03/19</td>
													<td>pending</td>
													<td>l.ellison@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Madeleine</td>
													<td>Software Developer</td>
													<td>20015/8/23</td>
													<td>pending</td>
													<td>m.lee@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Karen</td>
													<td>Office Director</td>
													<td>2012/9/25</td>
												<td>pending</td>
													<td>k.miller@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Lisa</td>
													<td>Support Lead</td>
													<td>2011/05/21</td>
													<td>pending</td>
													<td>l.simth@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Morgan</td>
													<td>Accountant</td>
													<td>2012/11/27</td>
													<td>pending</td>
													<td>m.keith@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Nathan</td>
													<td>Senior Marketing Designer</td>
													<td>2014/10/8</td>
													<td>pending</td>
													<td>n.mills@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Ruth</td>
													<td>office Manager</td>
													<td>2010/03/17</td>
													<td>pending</td>
													<td>r.may@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Penelope</td>
													<td>Marketing Manager</td>
													<td>2013/5/22</td>
													<td>pending</td>
													<td>p.ogden@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Sean</td>
													<td>Financial Officer</td>
													<td>2014/06/11</td>
													<td>pending</td>
													<td>s.piper@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Trevor</td>
													<td>Systems Administrator</td>
													<td>2011/05/23</td>
													<td>pending</td>
													<td>t.ross@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Vanessa</td>
													<td>Software Designer</td>
													<td>2014/6/23</td>
													<td>pending</td>
													<td>v.robertson@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Una</td>
													<td>Personnel Manager</td>
													<td>2014/5/22</td>
													<td>pending</td>
													<td>u.richard@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Justin</td>
													<td>Development lead</td>
													<td>2013/10/23</td>
													<td>pending</td>
													<td>j.peters@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Adrian</td>
													<td>Marketing Officer</td>
													<td>2013/04/21</td>
													<td>pending</td>
													<td>a.terry@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Cameron</td>
													<td>Sales Support</td>
													<td>2013/9/7</td>
													<td>pending</td>
													<td>c.watson@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Evan</td>
													<td>Sales Manager</td>
													<td>2013/10/26</td>
												  <td>pending</td>
													<td>d.terry@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Angelica</td>
													<td>Chief Executive Officer</td>
													<td>20017/10/15</td>
													<td>pending</td>
													<td>a.ramos@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Connor</td>
													<td>Web Developer</td>
													<td>2011/1/25</td>
												  <td>pending</td>
													<td>C.johne@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Jennifer</td>
													<td>Regional Director</td>
													<td>2012/17/11</td>
													<td>pending</td>
													<td>j.chang@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Brenden</td>
													<td>Software Engineer</td>
													<td>2013/07/14</td>
													<td>pending</td>
													<td>b.wagner@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Fiona</td>
													<td>Chief Operating Officer</td>
													<td>2015/06/23</td>
													<td>pending</td>
													<td>f.green@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Shou</td>
													<td>Regional Marketing</td>
													<td>2013/07/19</td>
													<td>pending</td>
													<td>s.itou@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Michelle</td>
													<td>Integration Specialist</td>
													<td>2016/07/18</td>
												  <td>pending</td>
													<td>m.house@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Suki</td>
													<td>Developer</td>
													<td>2010/11/45</td>
													<td>pending</td>
													<td>s.burks@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Prescott</td>
													<td>Technical Author</td>
													<td>2014/12/25</td>
													<td>pending</td>
													<td>p.bartlett@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Gavin</td>
													<td>Team Leader</td>
													<td>2015/1/19</td>
													<td>pending</td>
													<td>g.cortez@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Martena</td>
													<td>Post-Sales support</td>
													<td>2011/03/09</td>
													<td>pending</td>
													<td>m.mccray@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Unity</td>
													<td>Marketing Designer</td>
													<td>2014/7/28</td>
												<td>pending</td>
													<td>u.butler@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Howard</td>
													<td>Office Manager</td>
													<td>2013/8/19</td>
												<td>pending</td>
													<td>h.hatfield@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Hope</td>
													<td>Secretary</td>
													<td>2015/07/28</td>
												<td>pending</td>
													<td>h.fuentes@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Vivian</td>
													<td>Financial Controller</td>
													<td>2010/02/14</td>
													<td>pending</td>
													<td>v.harrell@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Timothy</td>
													<td>Office Manager</td>
													<td>20016/12/11</td>
													<td>pending</td>
													<td>t.mooney@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Jackson</td>
													<td>Director</td>
													<td>2011/09/26</td>
													<td>pending</td>
													<td>j.bradshaw@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Olivia</td>
													<td>Support Engineer</td>
													<td>2014/02/03</td>
													<td>pending</td>
													<td>o.liang@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Bruno</td>
													<td>Software Engineer</td>
													<td>2015/05/03</td>
													<td>pending</td>
													<td>b.nash@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Sakura</td>
													<td>Support Engineer</td>
													<td>2010/08/19</td>
													<td>pending</td>
													<td>s.yamamoto@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Thor</td>
													<td>Developer</td>
													<td>2012/08/11</td>
												<td>pending</td>
													<td>t.walton@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Finn</td>
													<td>Support Engineer</td>
													<td>2016/07/07</td>
												<td>pending</td>
													<td>f.camacho@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Serge</td>
													<td>Data Coordinator</td>
													<td>2017/04/09</td>
													<td>pending</td>
													<td>s.baldwin@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Zenaida</td>
													<td>Software Engineer</td>
													<td>2018/01/04</td>
													<td>pending</td>
													<td>z.frank@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Zorita</td>
													<td>Software Engineer</td>
													<td>2017/06/01</td>
													<td>pending</td>
													<td>z.serrano@datatables.net</td>
												</tr>
												<tr>
                          <td>1</td>
													<td>Jennifer</td>
													<td>Junior Javascript Developer</td>
													<td>2017/02/01</td>
												<td>pending</td>
													<td>j.acosta@datatables.net</td>
												</tr> */}
											</tbody>
										</table>
									</div>
									</div>
								</div>
							</div>
						</div>
          </section>
        </div>
        
      </Layout>
    )
  }
}

export default StaffList;

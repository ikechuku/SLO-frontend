import React, { Component } from 'react';
import { httpPatch } from '../../actions/data.action';
import Layout from '../layout/index'

class Employment extends Component {
	constructor(props){
		super(props)
		this.state = {
			postData: {},
		}
	}

	handleChange = (e) => {
		const { postData } = this.state;
    postData[e.target.name] = e.target.value;
    this.setState({ postData });
	}

	handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.postData);
    try{
			const { id } = this.props.match.params;

      const res = await httpPatch(`auth/onboarding_three/${id}`, this.state.postData);
      if(res.code === 200){
        // setState({ userId: res.data.id });
        return this.props.history.push(`/create_staff/four/${res.data.id}`)
      }
      console.log(res)
    } catch (error){
      console.log(error)
    }
	}
	
  render() {
    return (
      <Layout>
        <div class="app-content">
          <section class="section">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#" class="text-muted">Home</a></li>
              <li class="breadcrumb-item"><a href="#" class="text-muted">Staff</a></li>
              <li class="breadcrumb-item active text-" aria-current="page">New Staff</li>
            </ol>

            <div className="row">
							<div className="col-12">
								<div className="card">
									<div className="card-header">
										<h4>Empoyment Information</h4>
									</div>
									<div className="card-body">

                    <form className="form-horizontal" >
											<div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Rank at employment</label>
												<div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="rankAtEmployment"
														onChange={this.handleChange}
													/>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Unit at employment</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="unitOfEmployment"
														onChange={this.handleChange}
													/>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Date of resumption</label>
												<div className="col-md-3">
													<input type="date" 
														className="form-control"
														name="dateOfResumption"
														onChange={this.handleChange}
													/>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Salary amount</label>
                        <div className="col-md-3">
													<input type="number" 
														className="form-control"
														name="salaryAmount"
														onChange={this.handleChange}
													/>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Branch at employment</label>
												<div className="col-md-3">
													<select className="form-control w-100" 
														name="branchAtEmployment"
														onChange={this.handleChange}
													>
														<option value="Lagos">Lagos</option>
														<option value="Abuja">Abuja</option>
														<option value="Ekiti">Ekiti</option>
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Employee Number</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="employeeNumber"
														onChange={this.handleChange}
													/>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Job Title</label>
												<div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="jobTitle"
														onChange={this.handleChange}
													/>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Skills</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="skills"
														onChange={this.handleChange}
													/>
												</div>
											</div>


                      <div class="form-group mb-0 mt-5 row justify-content-end">
												<div class="col-md-9">
                          <button 
                            type="submit"
                            class="btn btn-info mr-5"
														// onClick={() => this.props.history.push('/create_staff/four')}
														onClick={this.handleSubmit}
                          >NEXT</button>
													<button type="submit" class="btn btn-primary">SAVE</button>
												</div>
											</div>
                    </form>
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

export default Employment;

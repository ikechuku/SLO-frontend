import React, { Component } from 'react';
import { httpPatch } from '../../actions/data.action';
import Layout from '../layout/index';
import { showLoader, hideLoader } from '../../helpers/loader';
import { branchList } from './Info';

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
				// return this.props.history.push(`/create_staff/four/${res.data.id}`)
				return this.props.history.push({
          pathname: `/create_staff/four/${res.data.id}`,
          backurl: `/create_staff/three/${res.data.id}`,
          savedState: this.state
        });
      }
      console.log(res)
    } catch (error){
      console.log(error)
    }
	}

	handleSave = async (e) => {
    e.preventDefault();
    try{
			showLoader();
			const { id } = this.props.match.params;
      const res = await httpPatch(`auth/onboarding_three/${id}`, this.state.postData);
      if(res.code === 200){
        hideLoader();
      }
      console.log(res)
    } catch (error){
      hideLoader()
      console.log(error)
    }
  }

	componentDidMount(){
    if(this.props.location.savedState){
      this.setState({...this.props.location.savedState});
    }
	}
	
	handleBackButton = () => {
    // console.log(this.props.location.savedState)
    return this.props.history.push({
      pathname: `${this.props.location.backurl}`,
      savedState: this.props.location.savedState
    })
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
									<div className="row">
                    <h4 className="col col-md-6">Employment Information</h4>
                    <div className="col col-md-6 text-right">
                      <h4 className="cursor-pointer" onClick={this.handleBackButton}><i class="fa fa-arrow-left" aria-hidden="true"></i>Back</h4>
                    </div>
                    </div>
									</div>
									<div className="card-body">

                    <form className="form-horizontal" >
											<div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Rank at employment</label>
												<div className="col-md-3">
													<select className="form-control w-100" 
														name="rankAtEmployment"
														onChange={this.handleChange}
														value={this.state.postData.rankAtEmployment}
													>
														<option value="">select</option>
														<option value="PA 1">PA 1</option>
														<option value="PA 2">PA 2</option>
														<option value="PO 1">PO 1</option>
														<option value="PO 2">PO 2</option>
														<option value="SPO">SPO</option>
														<option value="Manager">Manager</option>
														<option value="Senior Manager">Senior Manager</option>
														<option value="Director">Director</option>
														<option value="PM">PM</option>
														<option value="DGM">DGM</option>
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Unit at employment</label>
                        <div className="col-md-3">
													<select className="form-control w-100" 
														name="unitOfEmployment"
														onChange={this.handleChange}
														value={this.state.postData.unitOfEmployment}
													>
														<option value="">select</option>
														<option value="select">select</option>
														<option value="select">select</option>
														<option value="select">select</option>
													</select>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Date of resumption</label>
												<div className="col-md-3">
													<select className="form-control w-100" 
														name="dateOfResumption"
														onChange={this.handleChange}
														value={this.state.postData.dateOfResumption}
													>
														<option value="">select</option>
														<option value="select">select</option>
														<option value="select">select</option>
														<option value="select">select</option>
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Salary amount</label>
                        <div className="col-md-3">
													<input type="number" 
														className="form-control"
														name="salaryAmount"
														onChange={this.handleChange}
														value={this.state.postData.salaryAmount}
													/>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Branch at employment</label>
												<div className="col-md-3">
													<select className="form-control w-100" 
														name="branchAtEmployment"
														onChange={this.handleChange}
														value={this.state.postData.branchAtEmployment}
													>
														{
															branchList.map(data => (
																data
															))
														}
														{/* <option value="Lagos">Lagos</option>
														<option value="Abuja">Abuja</option>
														<option value="Ekiti">Ekiti</option> */}
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Employee Number</label>
                        <div className="col-md-3">
													<input type="text" 
														className="form-control"
														name="employeeNumber"
														placeholder="ex 0341 (four digits)"
														value={this.state.postData.employeeNumber}
														onChange={this.handleChange}
													/>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Job Title</label>
												<div className="col-md-3">
													<select className="form-control w-100" 
														name="jobTitle"
														onChange={this.handleChange}
														value={this.state.postData.jobTitle}
													>
														<option value="">select</option>
														<option value="select">select</option>
														<option value="select">select</option>
														<option value="select">select</option>
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Skills</label>
                        <div className="col-md-3">
													<select className="form-control w-100" 
														name="skills"
														onChange={this.handleChange}
														value={this.state.postData.skills}
													>
														<option value="">select</option>
														<option value="communications">communications</option>
														<option value="teamwork">teamwork</option>
														<option value="problem solving">problem solving</option>
														<option value="initiative & enterprise">initiative & 
														enterprise</option>
														<option value="planning & organizing">planning & organizing</option>
														<option value="self-management">self-management</option>
														<option value="creative thinking">creative thinking</option>
														<option value="technology">technology</option>
														<option value="learning">learning</option>
														<option value="negotiation & persuasion">negotiation & persuasion</option>
														<option value="leadership">leadership</option>
														<option value="confidence">confidence</option>
														<option value="ability to work under pressure">ability to work under pressure</option>
														<option value="preseverance & motivation">preseverance & motivation</option>
														<option value="resilience">resilience</option>
														<option value="analytic skills">analytic skills</option>
														<option value="other">other [specify]</option>
													</select>
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
													<button type="submit" class="btn btn-primary" onClick={this.handleSave}>SAVE</button>
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

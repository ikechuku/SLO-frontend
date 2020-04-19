import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Select2 from 'react-select2-wrapper';
import Select from 'react-select';
import moment from 'moment'
// import 'react-select2-wrapper/css/select2.css';
import { NotificationManager } from 'react-notifications';
import { httpPatch, httpGet } from '../../actions/data.action';
import Layout from '../layout/index';
import { showLoader, hideLoader } from '../../helpers/loader';
import { branchList } from './Info';
import { validateEmploymentInfoForm, validateEmpoymentFields } from '../../helpers/validations';
import CustomSelect from '../../helpers/Select2';

class Employment extends Component {
	constructor(props){
		super(props)
		this.state = {
      postData: {},
      multiValue: [],
			errorMessage1: null,
			errorMessage2: null,
			errorMessage3: null,
			errorMessage4: null,
			errorMessage5: null,
			errorMessage6: null,
			errorMessage7: null,
      errorMessage8: null,
      units: [],
      roles: [],
      branches: []
		}
	}

	handleChange = async (e, nameValue) => {
		const { postData } = this.state;
    let details = e !== null ? e.target : '';
    
		if(nameValue === 'dateOfResumption'){
      // const newDate = moment(e).format('l');
      // console.log(e, newDate)
      postData[nameValue] = e;
      this.setState({ postData });
      const isValidate = await validateEmpoymentFields(nameValue, this.state.postData.dateOfResumption);
      if(!isValidate.error){
        this.setState({ 
          errorMessage2: isValidate.errorMessage, 
        })
        return;
      } else {
        this.setState({ errorMessage2: null })
      }

    } else if(nameValue === 'branchAtEmployment'){
      const isValidate = await validateEmpoymentFields('branchAtEmployment', e.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage3: isValidate.errorMessage, 
        })
        return;
      }
      postData['branchAtEmployment'] = e.value;
      this.setState({ 
        postData,
        errorMessage3: null 
      })

    } else if(nameValue === 'jobTitle'){
      const isValidate = await validateEmpoymentFields('jobTitle', e.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage4: isValidate.errorMessage, 
        })
        return;
      }
      postData['jobTitle'] = e.value;
      this.setState({ 
        postData,
        errorMessage4: null 
      })

    } else if(nameValue === 'unitAtEmployment'){
      const isValidate = await validateEmpoymentFields('unitAtEmployment', e.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage5: isValidate.errorMessage, 
        })
        return;
      }
      postData['unitAtEmployment'] = e.value;
      this.setState({ 
        postData,
        errorMessage5: null 
      })

    } else if(nameValue === 'rankAtEmployment'){
      const isValidate = await validateEmpoymentFields(nameValue, e.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage1: isValidate.errorMessage, 
        })
        return;
      }
      postData[nameValue] = e.value;
      this.setState({ 
        postData,
        errorMessage1: null 
      })
    } else if(details.name === 'salaryAmount'){
      const isValidate = await validateEmpoymentFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage6: isValidate.errorMessage, 
        })
        return;
      }
      postData[details.name] = details.value;
      this.setState({ 
        postData,
        errorMessage6: null 
      })
    } else if(details.name === 'employeeNumber'){
      const isValidate = await validateEmpoymentFields(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage7: isValidate.errorMessage, 
        })
        return;
      } else {
        postData[details.name] = details.value;
        this.setState({ 
          postData,
          errorMessage7: null 
        })
      }
    } 
  }
  
  // handleSkills = async e => {
  //   const { postData } = this.state;
  //   let details = e.target;
  //   console.log(e.target.name, e.target.value)
  //   // const isValidate = await validateEmpoymentFields(e.target.name, e.target.value);
  //   //   if(!isValidate.error){
  //   //     this.setState({ 
  //   //       errorMessage8: isValidate.errorMessage, 
  //   //     })
  //   //     return;
  //   //   }
  //     postData[details.name] = details.value;
  //     this.setState({ 
  //       postData,
  //       errorMessage8: null 
  //     })
  // }

  handleCustomSelect = (result, name) => {
		const { postData } = this.state;
    const value = result !== null ? result.value : null;
    if(name === 'skills'){

      this.setState(state => {
        return {
          multiValue: result
        };
      });
    }
		postData[name] = value;
		this.setState({ 
      postData,
      errorMessage8: null 
		});
  }

	handleSubmit = async (e, btnType) => {
		e.preventDefault()
		showLoader();
    console.log(this.state.postData);

    const {
      rankAtEmployment,
      unitAtEmployment,
      dateOfResumption,
      salaryAmount,
      branchAtEmployment,
      employeeNumber,
      jobTitle,
      skills
    } = this.state.postData;

    let newValue = [];
      this.state.multiValue.length ? this.state.multiValue.map(data => (
        newValue.push(data.value)
      )) : newValue = [];

    const data = {
      rankAtEmployment,
      unitAtEmployment,
      dateOfResumption,
      salaryAmount,
      branchAtEmployment,
      employeeNumber,
      jobTitle,
      skills: newValue
    }

    console.log(data);

		const isValidate = await validateEmploymentInfoForm(data);
    //console.log('gets hers', isValidate)
    if(!isValidate.error){
      if(isValidate.type === 'rankAtEmployment'){
        this.setState({ 
          errorMessage1: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'dateOfResumption'){
        this.setState({ 
          errorMessage2: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'branchAtEmployment'){
        this.setState({ 
          errorMessage3: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'jobTitle'){
        this.setState({ 
          errorMessage4: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'unitAtEmployment'){
        this.setState({ 
          errorMessage5: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'salaryAmount'){
        this.setState({ 
          errorMessage6: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'employeeNumber'){
        this.setState({ 
          errorMessage7: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'skills'){
        this.setState({ 
          errorMessage8: isValidate.errorMessage,
        })
      } 
    }
		
    try{
			const { id } = this.props.match.params;

			const { 
				errorMessage1, 
				errorMessage2, 
				errorMessage3, 
				errorMessage4, 
				errorMessage5, 
				errorMessage6, 
				errorMessage7, 
				errorMessage8
			} = this.state;

			if(errorMessage1 !== null || errorMessage2 !== null || errorMessage3 !== null || errorMessage4 !== null || errorMessage5 !== null || errorMessage6 !== null || errorMessage7 !== null || errorMessage8 !== null){
        hideLoader();
        NotificationManager.warning("Complete all required fields")
        return;
      }

			if(btnType === 'submit'){
				const res = await httpPatch(`auth/onboarding_three/${id}`, data);
				if(res.code === 200){
					hideLoader();
					// setState({ userId: res.data.id });
					// return this.props.history.push(`/create_staff/four/${res.data.id}`)
					return this.props.history.push({
						pathname: `/create_staff/four/${res.data.id}`,
						backurl: `/create_staff/three/${res.data.id}`,
            savedState: this.state,
            direction: 'forward'
					});
				}
			} else {
				const res = await httpPatch(`auth/onboarding_three/${id}`, data);
				if(res.code === 200){
					hideLoader();
				}
			}
      // console.log(res)
    } catch (error){
			hideLoader();
      console.log(error)
    }
	}

	// handleSave = async (e) => {
  //   e.preventDefault();
  //   try{
	// 		showLoader();
	// 		const { id } = this.props.match.params;
  //     const res = await httpPatch(`auth/onboarding_three/${id}`, this.state.postData);
  //     if(res.code === 200){
  //       hideLoader();
  //     }
  //     console.log(res)
  //   } catch (error){
  //     hideLoader()
  //     console.log(error)
  //   }
  // }



  getFieldDetails = async() => {
    try{
      const res = await httpGet('units');
      const data = await httpGet('roles');
      const resData = await httpGet('all_branch');
      if(res.code === 200){
        hideLoader()

        let optionList = [];
        [...resData.data.branches].map(data => {
          optionList.push({ value: data.name, label: data.name });
        });

        let unitOptions = [];
        [...res.data.units].map(data => {
          unitOptions.push({ value: data.name, label: data.department.name + '/' + data.name });
        });

        let roleOptions = [];
        [...data.data.roles].map(data => {
          roleOptions.push({ value: data.title, label: data.title });
        });

        this.setState({ 
          units: unitOptions, 
          roles: roleOptions,
          branches: optionList
        });
      }

    }catch(error){
      hideLoader()
      console.log(error)
    }
  }

	componentDidMount(){
    if(this.props.location.direction === 'backward'){
      this.getFieldDetails();
      this.setState({...this.props.location.savedState});
    }else if(this.props.location.direction === 'completeOnboarding'){
      this.setState({ pageMode: 'completeOnboarding'});
      this.getFieldDetails()
    } else {
      this.getFieldDetails()
    }
	}
	
	handleBackButton = () => {
    // console.log(this.props.location.savedState)
    return this.props.history.push({
      pathname: `${this.props.location.backurl}`,
      savedState: this.props.location.savedState,
      direction: 'backward'
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
							<div className="col-10">
								<div className="card">
									<div className="card-header custom-header">
									<div className="row col-12">
                    <h4 className="col col-md-6">Employment Information</h4>
                    <div className="col col-md-6 text-right pr-0" style={ this.state.pageMode === 'completeOnboarding' ? {display: 'none'} : {}}>
                      <button className="cursor-pointer btn btn-primary" onClick={this.handleBackButton}><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                    </div>
                    </div>
									</div>
									<div className="card-body">

                    <form className="form-horizontal" >
											<div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Rank at Employment</label>
												<div className="col-md-4">
													{/* <select className="form-control w-100" 
														name="rankAtEmployment"
														onChange={this.handleChange}
														defaultValue={this.state.postData.rankAtEmployment}
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
													</select> */}
                          <Select
                            name="rankAtEmployment"
                            placeholder="Select"
                            defaultValue={this.state.postData.rankAtEmployment}
                            options={[
                              { value: "PA 1", label: "PA 1" },
                              { value: "PA 2", label: "PA 2" },
                              { value: "PO 1", label: "PO 1" },
                              { value: "PO 2", label: "PO 2" },
                              { value: "SPO", label: "SPO" },
                              { value: "Manager", label: "Manager" },
                              { value: "Senior Manager", label: "Senior Manager" },
                              { value: "Director", label: "Director" },
                              { value: "PM", label: "PM" },
                              { value: "DGM", label: "DGM" },
                            ]}
                            onChange={(e) => this.handleChange(e, 'rankAtEmployment')}
                          />
													<span className="text-danger">{this.state.errorMessage1 !== null ? this.state.errorMessage1 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Branch at Employment</label>
												<div className="col-md-4">
                        <Select
                          name="branchAtEmployment"
                          placeholder="Select"
                          defaultValue={this.state.postData.branchAtEmployment}
                          options={this.state.branches}
                          onChange={(e) => this.handleChange(e, 'branchAtEmployment')}
                        />
													{/* <select className="form-control w-100" 
														name="branchAtEmployment"
														onChange={this.handleChange}
														defaultValue={this.state.postData.branchAtEmployment}
													>
														{
															branchList.map(data => (
																data
															))
														}
													</select> */}
													<span className="text-danger">{this.state.errorMessage3 !== null ? this.state.errorMessage3 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Date of Resumption</label>
												<div className="col-md-4 c-date-picker">
                          {/* <input 
                            type="date"
                            className="form-control w-100"
                            name="dateOfResumption"
														onChange={this.handleChange}
														defaultValue={this.state.postData.dateOfResumption}
                          /> */}
                          <DatePicker
                            className="form-control"
                            placeholderText="Click to select a date"
                            selected={this.state.postData.dateOfResumption}
                            onChange={(e) => this.handleChange(e, 'dateOfResumption')}
                            dateFormat="yyyy/MM/dd"
                          />
													<span className="text-danger">{this.state.errorMessage2 !== null ? this.state.errorMessage2 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Salary Amount</label>
                        <div className="col-md-4">
													<input type="text" 
														className="form-control"
														name="salaryAmount"
														onChange={this.handleChange}
														defaultValue={this.state.postData.salaryAmount}
													/>
													<span className="text-danger">{this.state.errorMessage6 !== null ? this.state.errorMessage6 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 pr-0 col-form-label">Department/Unit</label>
                        <div className="col-md-4">
                          <Select
                            name="unitAtEmployment"
                            placeholder="Select"
                            defaultValue={this.state.postData.unitAtEmployment}
                            options={this.state.units}
                            onChange={(e) => this.handleChange(e, 'unitAtEmployment')}
                          />
													{/* <select className="form-control w-100" 
														name="unitAtEmployment"
														onChange={this.handleChange}
														defaultValue={this.state.postData.unitOfEmployment}
													>
                            <option value="">select</option>
                            {
                              this.state.units.length ? this.state.units.map(data => (
                                <option value={data.name}>{data.department.name + '/' + data.name}</option>
                              )) : ''
                            }
													</select> */}
													<span className="text-danger">{this.state.errorMessage5 !== null ? this.state.errorMessage5 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Employee Number</label>
                        <div className="col-md-4">
													<input type="text" 
														className="form-control"
														name="employeeNumber"
														placeholder="ex 0341 (four digits)"
														defaultValue={this.state.postData.employeeNumber}
														onChange={this.handleChange}
													/>
													<span className="text-danger">{this.state.errorMessage7 !== null ? this.state.errorMessage7 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Job Title</label>
												<div className="col-md-4">
                          <Select
                            name="jobTitle"
                            placeholder="Select"
                            defaultValue={this.state.postData.jobTitle}
                            options={this.state.roles}
                            onChange={(e) => this.handleChange(e, 'jobTitle')}
                          />
													{/* <select className="form-control w-100" 
														name="jobTitle"
														onChange={this.handleChange}
														defaultValue={this.state.postData.jobTitle}
													>
														<option value="">select</option>
														{
                              this.state.roles.length ? this.state.roles.map(data => (
                              <option value={data.title}>{data.title}</option>
                              )) : ''
                            }
													</select> */}
													<span className="text-danger">{this.state.errorMessage4 !== null ? this.state.errorMessage4 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Skills</label>
                        <div className="col-md-4">

                        {/* <Select2
                          name={'skills'}
                          data={[
                            { value: "communications", text: 'communications', id: 1 },
                            { value: "teamwork", text: 'teamwork', id: 2 },
                            { value: "problem solving", text: 'problem solving', id: 3 },
                            { value: "initiative & enterprise", text: 'initiative & enterprise', id: 4 },
                            { value: "planning & organizing", text: 'planning & organizing', id: 5 },
                            { value: "self-management", text: 'self-management', id: 6 },
                            { value: "creative thinking", text: 'creative thinking', id: 7 },
                            { value: "technology", text: 'technology', id: 8 },
                            { value: "learning", text: 'learning', id: 9 },
                            { value: "negotiation & persuasion", text: 'negotiation & persuasion', id: 10 },
                            { value: "leadership", text: 'leadership', id: 11 },
                            { value: "confidence", text: 'confidence', id: 12 },
                            { value: "ability to work under pressure", text: 'ability to work under pressure', id: 13 },
                            { value: "preseverance & motivation", text: 'preseverance & motivation', id: 14 },
                            { value: "resilience", text: 'resilience', id: 15 },
                            { value: "analytic skills", text: 'analytic skills', id: 16 },
                          ]}
                          className="form-control"
                          multiple={false}
                          onChange={e => this.handleSkills(e)}
                          defaultValue={this.state.postData.skills}
                          options={{
                            placeholder: 'search by tags',
                            tags: true
                          }}
                        /> */}
                        <Select
                            // className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                            isMulti
                            value={this.state.multiValue}
                            onChange={e => this.handleCustomSelect(e, 'skills')}
                            options={[
                              { value: "communications", label: 'communications', },
                              { value: "teamwork", label: 'teamwork', },
                              { value: "problem solving", label: 'problem solving', },
                              { value: "initiative & enterprise", label: 'initiative & enterprise', },
                              { value: "planning & organizing", label: 'planning & organizing', },
                              { value: "self-management", label: 'self-management', },
                              { value: "creative thinking", label: 'creative thinking', },
                              { value: "technology", label: 'technology', },
                              { value: "learning", label: 'learning', },
                              { value: "negotiation & persuasion", label: 'negotiation & persuasion', },
                              { value: "leadership", label: 'leadership', },
                              { value: "confidence", label: 'confidence', },
                              { value: "ability to work under pressure", label: 'ability to work under pressure', },
                              { value: "preseverance & motivation", label: 'preseverance & motivation', },
                              { value: "resilience", label: 'resilience', },
                              { value: "analytic skills", label: 'analytic skills', },
                            ]}
                            isSearchable="true"
                            name="skills"
                          />
                          {/* <CustomSelect 
                            name={'skills'}
                            handleChange={this.handleChange}
                            defaultValue={this.state.postData.skills}
                            optionList={[
                              { value: "communications", text: 'communications', id: 1 },
                              { value: "teamwork", text: 'teamwork', id: 2 },
                              { value: "problem solving", text: 'problem solving', id: 3 },
                              { value: "initiative & enterprise", text: 'initiative & enterprise', id: 4 },
                              { value: "planning & organizing", text: 'planning & organizing', id: 5 },
                              { value: "self-management", text: 'self-management', id: 6 },
                              { value: "creative thinking", text: 'creative thinking', id: 7 },
                              { value: "technology", text: 'technology', id: 8 },
                              { value: "learning", text: 'learning', id: 9 },
                              { value: "negotiation & persuasion", text: 'negotiation & persuasion', id: 10 },
                              { value: "leadership", text: 'leadership', id: 11 },
                              { value: "confidence", text: 'confidence', id: 12 },
                              { value: "ability to work under pressure", text: 'ability to work under pressure', id: 13 },
                              { value: "preseverance & motivation", text: 'preseverance & motivation', id: 14 },
                              { value: "resilience", text: 'resilience', id: 15 },
                              { value: "analytic skills", text: 'analytic skills', id: 16 },
                            ]}
                          /> */}
													{/* <select className="form-control w-100" 
														name="skills"
														onChange={this.handleChange}
														defaultValue={this.state.postData.skills}
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
													</select> */}
													<span className="text-danger">{this.state.errorMessage8 !== null ? this.state.errorMessage8 : ''}</span>
												</div>
											</div>


                      <div class="form-group mb-0 row text-right" style={{ marginTop: '60px'}}>
												<div class="col-md-12">
                          <button 
                            type="submit"
                            class="btn btn-info mr-5"
														// onClick={() => this.props.history.push('/create_staff/four')}
														onClick={e => this.handleSubmit(e,'submit')}
                          >NEXT</button>
													<button type="submit" class="btn btn-primary" onClick={e => this.handleSave(e,'save')}>SAVE</button>
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

import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Select2 from 'react-select2-wrapper';
import Select from 'react-select';
import moment from 'moment'
// import 'react-select2-wrapper/css/select2.css';
import { NotificationManager } from 'react-notifications';
import { httpPatch, httpGet, httpPost } from '../../actions/data.action';
import Layout from '../layout/index';
import { showLoader, hideLoader } from '../../helpers/loader';
import { branchList } from './Info';
import { validateEmploymentInfoForm, validateEmpoymentFields } from '../../helpers/validations';
import CustomSelect from '../../helpers/Select2';
import { object } from 'prop-types';

const date_format = 'DD/MM/YYYY';

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
      branches: [],
      departmentOptions: [],
      departments: [],
      unitOptions: [],
      roleOptions: [],
      customBranchId: null,
      customDateOfResumption: undefined,
      customDepartmentId: null,
      customEmploymentDate: undefined,
      customJobTitle: null,
      customRank: null,
      customUnitId: null,
      pageMode: 'create'
		}
	}

	handleChange = async (e, nameValue) => {
		const { postData } = this.state;
    let details = e !== null ? e.target : '';
    
		if(nameValue === 'dateOfResumption'){
      // const newDate = moment(e).format('l');
      // console.log(e, newDate)
      postData[nameValue] = e;
      this.setState({ postData, customDateOfResumption: e });
      const isValidate = await validateEmpoymentFields(nameValue, this.state.postData.dateOfResumption);
      if(!isValidate.error){
        this.setState({ 
          errorMessage2: isValidate.errorMessage, 
        })
        return;
      } else {
        this.setState({ errorMessage2: null })
      }

    } else if(nameValue === 'employmentDate'){
      // const newDate = moment(e).format('l');
      // console.log(e, newDate)
      postData[nameValue] = e;
      this.setState({ postData, customEmploymentDate: e });
      const isValidate = await validateEmpoymentFields(nameValue, this.state.postData.employmentDate);
      if(!isValidate.error){
        this.setState({ 
          errorMessage9: isValidate.errorMessage, 
        })
        return;
      } else {
        this.setState({ errorMessage9: null })
      }

    } else if(nameValue === 'branchId'){
      const isValidate = await validateEmpoymentFields('branchId', e.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage3: isValidate.errorMessage, 
        })
        return;
      }
      postData['branchId'] = e.value;
      this.setState({ 
        postData,
        customBranchId: e,
        errorMessage3: null 
      })

    } else if(nameValue === 'departmentId'){
      postData['departmentId'] = e.value;
      this.setState({ 
        postData,
        customDepartmentId: e,
        errorMessage8: null 
      })
      this.getUnits();
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
        customJobTitle: e,
        errorMessage4: null 
      })

    } else if(nameValue === 'unitId'){
      // const isValidate = await validateEmpoymentFields('unitId', e.value);
      // if(!isValidate.error){
      //   this.setState({ 
      //     errorMessage5: isValidate.errorMessage, 
      //   })
      //   return;
      // }
      postData['unitId'] = e.value;
      this.setState({ 
        postData,
        customUnitId: e,
        errorMessage5: null 
      })
      // this.getRoles();
    } else if(nameValue === 'rank'){
      const isValidate = await validateEmpoymentFields(nameValue, e.value);
      if(!isValidate.error){
        this.setState({ 
          errorMessage1: isValidate.errorMessage, 
        })
        return;
      }
      postData[nameValue] = e.value;
      if(e.value === 'PA2'){
        postData['salaryAmount'] = '64,473';
      } else if(e.value === 'PA1'){
        postData['salaryAmount'] = '64,473';
      } else if(e.value === 'SPO'){
        postData['salaryAmount'] = '82,024';
      } else if(e.value === 'PO1'){
        postData['salaryAmount'] = '80,024';
      } else if(e.value === 'P02'){
        postData['salaryAmount'] = '80,024';
      } else if(e.value === 'PM'){
        postData['salaryAmount'] = '71,400';
      } else if(e.value === 'DGM'){
        postData['salaryAmount'] = '200,000';
      } else if(e.value === 'Director'){
        postData['salaryAmount'] = '768,000';
      } else if(e.value === 'Manager'){
        postData['salaryAmount'] = '200,000';
      } else if(e.value === 'Senior Manager'){
        postData['salaryAmount'] = '350,000';
      }
      
      this.setState({ 
        postData,
        customRank: e,
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
      rank,
      unitId,
      dateOfResumption,
      employmentDate,
      salaryAmount,
      branchId,
      employeeNumber,
      jobTitle,
      departmentId
    } = this.state.postData;

    const data = {
      rank,
      unitId,
      dateOfResumption,
      employmentDate,
      salaryAmount,
      branchId,
      employeeNumber,
      jobTitle,
      departmentId
    }

    console.log(data);

		const isValidate = await validateEmploymentInfoForm(this.state.postData);
    console.log('gets hers', isValidate)
    if(!isValidate.error){
      if(isValidate.type === 'rank'){
        this.setState({ 
          errorMessage1: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'dateOfResumption'){
        this.setState({ 
          errorMessage2: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'branchId'){
        this.setState({ 
          errorMessage3: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'jobTitle'){
        this.setState({ 
          errorMessage4: isValidate.errorMessage,
        })
      // } else if(isValidate.type === 'unitId'){
      //   this.setState({ 
      //     errorMessage5: isValidate.errorMessage,
      //   })
      } else if(isValidate.type === 'salaryAmount'){
        this.setState({ 
          errorMessage6: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'employeeNumber'){
        this.setState({ 
          errorMessage7: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'departmentId'){
        this.setState({ 
          errorMessage8: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'employmentDate'){
        this.setState({ 
          errorMessage9: isValidate.errorMessage,
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
        errorMessage8,
        errorMessage9
			} = this.state;

			if(errorMessage1 !== null || errorMessage2 !== null || errorMessage3 !== null || errorMessage4 !== null || errorMessage5 !== null || errorMessage6 !== null || errorMessage7 !== null || errorMessage8 !== null || errorMessage9 !== null){
        hideLoader();
        NotificationManager.warning("Complete all required fields")
        return;
      }

      if(this.state.pageMode === 'create'){
        if(btnType === 'submit'){
          const res = await httpPost(`auth/onboarding_three/${id}`, data);
          if(res.code === 201){
            hideLoader();
            // setState({ userId: res.data.id });
            // return this.props.history.push(`/create_staff/four/${res.data.id}`)
            return this.props.history.push({
              pathname: `/create_staff/four/${res.data.id}`,
              backurl: `/create_staff/three/${res.data.id}`,
              savedId: res.data.id,
              direction: 'forward'
            });
          }
        } else {
          const res = await httpPost(`auth/onboarding_three/${id}`, data);
          if(res.code === 201){
            hideLoader();
          }
        }
      } else {
        if(btnType === 'submit'){
          const res = await httpPatch(`auth/edit_onboarding_three/${id}`, data);
          if(res.code === 201){
            hideLoader();
            // setState({ userId: res.data.id });
            // return this.props.history.push(`/create_staff/four/${res.data.id}`)
            return this.props.history.push({
              pathname: `/create_staff/four/${res.data.id}`,
              backurl: `/create_staff/three/${res.data.id}`,
              savedId: res.data.id,
              direction: 'forward'
            });
          }
        } else {
          const res = await httpPatch(`auth/edit_onboarding_three/${id}`, data);
          if(res.code === 201){
            hideLoader();
          }
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
          optionList.push({ value: data.id, label: data.name });
        });

        // let unitOptions = [];
        // [...res.data.units].map(data => {
        //   unitOptions.push({ value: data.name, label: data.department.name + '/' + data.name });
        // });

        let departmentList = [];
				await [...data.data.departmentUnit].map(data => (
					departmentList.push({ value: data.id, label: data.name })
				))

        let roleOptions = [];
        [...data.data.roles].map(data => {
          roleOptions.push({ value: data.title, label: data.title });
        });

        this.setState({ 
          // units: unitOptions, 
          roles: data.data.roles,
          branches: optionList,
          departmentOptions: departmentList,
          departments: data.data.departmentUnit, 
        });
      }

    }catch(error){
      hideLoader()
      console.log(error)
    }
  }

  getUnits = async () => {
		const { departments, postData } = this.state;
		let newpostData = [];
		newpostData = [...departments].filter(item => item.id === postData.departmentId)[0];
		let optionList = [];
		await newpostData.units.map(data => (
		  optionList.push({ value: data.id, label: data.name })
		));
		console.log(optionList)
    this.setState({ unitOptions: optionList })
  }

  getRoleFromUnit = () => {
    const { postData, roles } = this.state;
    let newRoles = [];
    console.log(postData.unitId)
    if(postData.unitId === null || postData.unitId === undefined){
      return null
    }
    newRoles = [...roles].filter(item => item.unitId === postData.unitId);
    return newRoles;
  }

  getRoleFromDept = () => {
    const { postData, roles } = this.state;
    let newRoles = [];
    if(postData.departmentId === null || postData.departmentId === undefined){
      return null
    }
    newRoles = [...roles].filter(item => item.departmentId === postData.departmentId);
    return newRoles;
  }
  
  getRoles = () => {
    const newRolesFromUnits = this.getRoleFromUnit();
    const newRolesFromDept = this.getRoleFromDept();
    console.log('units', newRolesFromUnits)
    console.log('depts', newRolesFromDept)
    const newValues = (newRolesFromUnits === null || !newRolesFromUnits.length) ? newRolesFromDept : newRolesFromUnits;

    if(typeof(newValues) === object){
      return { value: newValues.id, label: newValues.title };
    } else if(newValues === null){
      return [];
    } else {
      if(newValues.length) {
        return newValues.map(data => (
        { value: data.id, label: data.title }
      )) 
      } else {
        return [];
      }
    }
    // this.setState({ roleOptions: optionList });
  }


  getUserDetails = async (id) => {
    try{
      const res = await httpGet(`auth/get_onboarding_three/${id}`);
      console.log(res.data.employmentInfo)
      if(res.code === 200){
        const {
          rank,
          unitId,
          dateOfResumption,
          employmentDate,
          salaryAmount,
          branchId,
          employeeNumber,
          jobTitle,
          departmentId,
          branch,
          unit,
          department
        } = res.data.employmentInfo;
        const customRank = { value: rank, label: rank };
        const customUnitId = { value: unitId, label: unit.name };
        const customEmploymentDate = moment(employmentDate).toDate();
        const customDateOfResumption = moment(dateOfResumption).toDate();
        const customBranchId = { value: branchId, label: branch.name }
        const customJobTitle = { value: jobTitle, label: jobTitle };
        const customDepartmentId = { value: departmentId, label: department.name }

        this.setState({
          postData: res.data.employmentInfo,
          customBranchId,
          customDateOfResumption,
          customDepartmentId,
          customEmploymentDate,
          customJobTitle,
          customRank,
          customUnitId
        });
      }
    }catch(error){
      hideLoader()
      console.log(error)
    }
  }

	componentDidMount(){
    const { id } = this.props.match.params;
    if(this.props.location.direction === 'backward'){
      this.getFieldDetails();
      this.getUserDetails(this.props.location.savedId || id);
      this.setState({ userId: this.props.location.savedId || id, pageMode: 'edit' });
    }else if(this.props.location.direction === 'completeOnboarding'){
      this.setState({ pageMode: 'completeOnboarding'});
      this.getFieldDetails()
    } else {
      this.getFieldDetails()
    }
  }
  
	
	handleBackButton = () => {
    // console.log(this.props.location.savedState)
    const { id } = this.props.match.params;
    return this.props.history.push({
      pathname: `/create_staff/two/${id}`,
      savedId: this.props.location.savedId,
      direction: 'backward'
    })
  }
	
  render() {
    const CustomInput = ({ value, onClick }) => (
      <input readonly className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')"
        value={this.state.customDateOfResumption === undefined ? undefined : moment(this.state.customDateOfResumption).format(date_format)} onClick={onClick}
      />
    );
    const CustomInput2 = ({ value, onClick }) => (
      <input readonly className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')"
        value={this.state.customEmploymentDate === undefined ? undefined : moment(this.state.customEmploymentDate).format(date_format)} onClick={onClick}
      />
    );

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
												<label for="inputName" className="col-md-2 col-form-label">Rank <span className="impt">*</span></label>
												<div className="col-md-4">
                          <Select
                            name="rank"
                            placeholder="Select"
                            value={this.state.customRank}
                            options={[
                              { value: "PA1", label: "PA 1" },
                              { value: "PA2", label: "PA 2" },
                              { value: "PO1", label: "PO 1" },
                              { value: "PO2", label: "PO 2" },
                              { value: "SPO", label: "SPO" },
                              { value: "Manager", label: "Manager" },
                              { value: "Senior Manager", label: "Senior Manager" },
                              { value: "Director", label: "Director" },
                              { value: "PM", label: "PM" },
                              { value: "DGM", label: "DGM" },
                            ]}
                            onChange={(e) => this.handleChange(e, 'rank')}
                          />
													<span className="text-danger">{this.state.errorMessage1 !== null ? this.state.errorMessage1 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Salary Amount <span className="impt">*</span></label>
                        <div className="col-md-4">
													<input type="text" 
														className="form-control"
														name="salaryAmount"
                            onChange={this.handleChange}
                            value={this.state.postData.salaryAmount}
                            readOnly
													/>
													<span className="text-danger">{this.state.errorMessage6 !== null ? this.state.errorMessage6 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                          <label for="inputName" className="col-md-2 pr-0 col-form-label">Departments <span className="impt">*</span></label>
                          <div className="col-md-4">
                            <Select
                              name="departmentId"
                              placeholder="Select"
                              value={this.state.customDepartmentId}
                              options={this.state.departmentOptions}
                              onChange={(e) => this.handleChange(e, 'departmentId')}
                            />
                            <span className="text-danger">{this.state.errorMessage8 !== null ? this.state.errorMessage8 : ''}</span>
                          </div>
                          <label for="inputName" className="col-md-2 col-form-label">Branch <span className="impt">*</span></label>
                          <div className="col-md-4">
                          <Select
                            name="branchId"
                            placeholder="Select"
                            value={this.state.customBranchId}
                            options={this.state.branches}
                            onChange={(e) => this.handleChange(e, 'branchId')}
                          />
													<span className="text-danger">{this.state.errorMessage3 !== null ? this.state.errorMessage3 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Units <span className="impt">*</span></label>
												<div className="col-md-4">
                          <Select
                            name="unitId"
                            placeholder="Select"
                            value={this.state.customUnitId}
                            options={this.state.unitOptions}
                            onChange={(e) => this.handleChange(e, 'unitId')}
                          />
													<span className="text-danger">{this.state.errorMessage5 !== null ? this.state.errorMessage5 : ''}</span>
                          
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Job Title <span className="impt">*</span></label>
                        <div className="col-md-4">
                          <Select
                            name="jobTitle"
                            placeholder="Select"
                            value={this.state.customJobTitle}
                            options={this.getRoles()}
                            onChange={(e) => this.handleChange(e, 'jobTitle')}
                          />
													<span className="text-danger">{this.state.errorMessage4 !== null ? this.state.errorMessage4 : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                      <label for="inputName" className="col-md-2 col-form-label">Date of Resumption <span className="impt">*</span></label>
												<div className="col-md-4 c-date-picker">
                          <DatePicker
                            className="form-control"
                            placeholderText="Click to select a date"
                            selected={this.state.customDateOfResumption}
                            onChange={(e) => this.handleChange(e, 'dateOfResumption')}
                            dateFormat="yyyy/MM/dd"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            customInput={<CustomInput />}
                          />
													<span className="text-danger">{this.state.errorMessage2 !== null ? this.state.errorMessage2 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Employment Date <span className="impt">*</span></label>
												<div className="col-md-4 c-date-picker">
                          <DatePicker
                            className="form-control"
                            placeholderText="Click to select a date"
                            selected={this.state.customEmploymentDate}
                            onChange={(e) => this.handleChange(e, 'employmentDate')}
                            dateFormat="yyyy/MM/dd"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            customInput={<CustomInput2 />}
                          />
													<span className="text-danger">{this.state.errorMessage9 !== null ? this.state.errorMessage9 : ''}</span>
												</div>
											</div>
                      <div className="form-group row" style={{display: 'none'}}>
                        <label for="inputName" className="col-md-2 col-form-label">Employee Number <span className="impt">*</span></label>
                        <div className="col-md-4">
													<input type="text" 
														className="form-control"
														name="employeeNumber"
														placeholder="ex 0341 (four digits)"
														value={this.state.postData.employeeNumber}
														onChange={this.handleChange}
													/>
													<span className="text-danger">{this.state.errorMessage7 !== null ? this.state.errorMessage7 : ''}</span>
												</div>
                      </div>
                      


                      <div class="form-group mb-0 row text-right" style={{ marginTop: '60px'}}>
												<div class="col-md-12">
                          <button 
                            type="submit"
                            class="btn btn-info mr-5"
														onClick={e => this.handleSave(e,'save')}
                          ><i class="fa fa-save"></i> SAVE</button>
													<button type="submit" class="btn btn-primary" onClick={e => this.handleSubmit(e,'submit')} ><i class="fa fa-arrow-right"></i> NEXT</button>
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

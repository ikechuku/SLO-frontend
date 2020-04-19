import React, { Component } from 'react';
import $ from 'jquery';
import { NotificationManager } from 'react-notifications';
import { httpPost, httpPatch } from '../../actions/data.action';
import { hideLoader, showLoader } from '../../helpers/loader';
import Layout from '../layout'
import InstitutionTable from './InstitutionTable';
import PreviousEmploymentTable from './PreviousEmploymentTable';
import {QualificationModal, CertificationModal} from '../Modals/Institution';
import { validateQualification, validateD } from '../../helpers/validations';
import { PreviousEmploymentModal } from '../Modals/pEmploymentModal';
import MoreInfoForm from './MoreInfoForm';


class Qualification extends Component {
  constructor(props){
    super(props)
    this.state = {
      institution: {},
      qualification: {},
      certification: {},
      moreInstitution: [],
      previousEmployment: {},
      morePrevious: [],
      objectReference: false,
      reasonForLeaving: '',
      moreInfo: '',
      showDropDown: false,
      endDateErrorMssg: null,
      endDateErrorMssg2: null,
      endDateErrorMssg3: null,
      endDateErrorMssg4: null,
      endDateErrorMssg5: null,
      endDateErrorMssg6: null,
      endDateErrorMssg7: null,
      pageMode: 'create',
      date1: new Date(),
      date2: new Date(),
      date3: new Date(),
      date4: new Date(),
    }
  }

  handleQualificationChange = (e, nameValue) => {
    const { qualification } = this.state;
    let details = e !== null ? e.target : '';
    //console.log(`${[e.target.name]}: ${e.target.value}`);
    if(nameValue === 'endDate'){
      qualification[nameValue] = e;
      this.setState({ 
        qualification
      })
      const isValidate = validateQualification(nameValue, this.state.qualification.endDate, this.state.qualification.startDate);
      if(!isValidate.error){
        this.setState({ 
          endDateErrorMssg: isValidate.errorMessage, 
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        this.setState({ endDateErrorMssg: null })
      }
    } else if(nameValue === 'startDate'){
      qualification[nameValue] = e;
      this.setState({ 
        qualification
      })
      const isValidate = validateQualification(nameValue, this.state.qualification.startDate );
      if(!isValidate.error){
        this.setState({ 
          endDateErrorMssg5: isValidate.errorMessage, 
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        this.setState({ endDateErrorMssg5: null })
      }
    } else {
      qualification[details.name] = details.value;
      qualification['type'] = 'qualification';
      this.setState({ qualification });
    }
  }

  handleCertificationChange = async (e, nameValue) => {
    const { certification } = this.state;
    let details = e !== null ? e.target : '';
    // console.log(`${[e.target.name]}: ${e.target.value}`);
    // const value = e !== null ? e : null;
    if(nameValue === 'endDate'){
      certification[nameValue] = e;
      this.setState({ 
        certification
      })
      const isValidate = await validateQualification(nameValue, this.state.certification.endDate, this.state.certification.startDate);
      if(!isValidate.error){
        this.setState({ 
          endDateErrorMssg2: isValidate.errorMessage, 
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        this.setState({ endDateErrorMssg2: null })
      }
      
    } else if(nameValue === 'startDate'){
      console.log(e)
      certification[nameValue] = e;
      this.setState({ 
        certification
      })
      const isValidate = await validateQualification(nameValue, this.state.certification.startDate );
      if(!isValidate.error){
        this.setState({ 
          endDateErrorMssg6: isValidate.errorMessage, 
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        this.setState({ endDateErrorMssg6: null })
      }

    } else if(e.target.name === 'certification'){
      certification[e.target.name] = e.target.value;
      certification['type'] = 'certification';
      this.setState({ certification, showDropDown: !this.state.showDropDown });

    } else {
      certification[details.name] = details.value;
      this.setState({ certification, showDropDown: false });
    }

  }

  handleCustomSelect = (result, name) => {
		const { certification } = this.state;
		const value = result !== null ? result.value : '';
  
		certification[name] = value;
		this.setState({ 
			certification
		});
  }

  addMore = (type) => {
    if(type === 'qualification'){
      if(this.state.qualification.name === undefined  || this.state.qualification.name === ''  || this.state.qualification.qualification === undefined || this.state.qualification.qualification === '' || this.state.qualification.course === undefined || this.state.qualification.course === '' || this.state.qualification.startDate === undefined || this.state.qualification.startDate === '' || this.state.qualification.endDate === undefined || this.state.qualification.endDate === '' ){
        return NotificationManager.warning('All fields must be filled');
      }

      const { 
        endDateErrorMssg, endDateErrorMssg5
      } = this.state;
  
      if(endDateErrorMssg !== null || endDateErrorMssg5 !== null){
        hideLoader()
        return NotificationManager.warning('Complete all required fields')
      }

      this.setState({ 
        moreInstitution: [...this.state.moreInstitution, this.state.qualification], 
      });

      $('.modal').modal('hide');
      $(document.body).removeClass('modal-open');
      $('.modal-backdrop').remove();

      this.setState({ 
        qualification: {
          name: '',
          qualification: '',
          course: '',
          startDate: '',
          endDate: ''
        } 
      });
    } else {
      console.log(this.state.certification)
      if(this.state.certification.name === undefined || this.state.certification.name === '' || this.state.certification.certification === undefined || this.state.certification.certification === '' || this.state.certification.categoryOfCertification === undefined || this.state.certification.categoryOfCertification === '' || this.state.certification.startDate === undefined || this.state.certification.startDate === '' || this.state.certification.endDate === undefined || this.state.certification.endDate === '' ){
        return NotificationManager.warning('All fields must be filled');
      }

      const { 
        endDateErrorMssg2, endDateErrorMssg6
      } = this.state;
  
      if(endDateErrorMssg2 !== null || endDateErrorMssg6 !== null){
        hideLoader()
        return NotificationManager.warning('Complete all required fields')
      }

      this.setState({ 
        moreInstitution: [...this.state.moreInstitution, this.state.certification], 
      });

      $('.modal').modal('hide');
      $(document.body).removeClass('modal-open');
      $('.modal-backdrop').remove();

      this.setState({ 
        certification: {
          name: '',
          certification: '',
          categoryOfCertification: '',
          startDate: '',
          endDate: ''
        } 
      });
    } 
    // this.showQualificationCard()
  }

  removeMore = (value) => {
    this.setState({
      moreInstitution: this.state.moreInstitution.filter((interest,index) => index !== parseInt(value))
    });
  }

  handlePrevious = async (e, nameValue) => {
    const { previousEmployment } = this.state;
    let details = e !== null ? e.target : '';
    if(nameValue === 'endDate'){
      previousEmployment[nameValue] = e;
      this.setState({ 
        previousEmployment
      })
      const isValidate = await validateQualification(nameValue, this.state.previousEmployment.endDate, this.state.previousEmployment.startDate);
      if(!isValidate.error){
        this.setState({ 
          endDateErrorMssg3: isValidate.errorMessage, 
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        this.setState({ endDateErrorMssg3: null })
      }
    } else if(nameValue === 'startDate'){
      previousEmployment[nameValue] = e;
      this.setState({ 
        previousEmployment
      })
      const isValidate = await validateQualification(nameValue, this.state.previousEmployment.startDate );
      if(!isValidate.error){
        this.setState({ 
          endDateErrorMssg7: isValidate.errorMessage, 
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        this.setState({ endDateErrorMssg7: null })
      }
    } else if(details.name === 'employerName'){
      previousEmployment[details.name] = details.value;
      this.setState({ 
        previousEmployment
      })
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          endDateErrorMssg4: isValidate.errorMessage, 
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        this.setState({ endDateErrorMssg4: null })
      }
    } else {
      previousEmployment[details.name] = details.value;
      this.setState({ previousEmployment });
    }
    //console.log(`${[e.target.name]}: ${e.target.value}`);
  }

  addMorePrevious = () => {
    if(this.state.previousEmployment.employerName === undefined || this.state.previousEmployment.address === undefined || this.state.previousEmployment.role === undefined || this.state.previousEmployment.startDate === undefined || this.state.previousEmployment.endDate === undefined ){
      return NotificationManager.warning('All fields must be filled');
    }

    const { 
      endDateErrorMssg3, endDateErrorMssg4, endDateErrorMssg7
    } = this.state;

    if(endDateErrorMssg3 !== null || endDateErrorMssg4 !== null, endDateErrorMssg7 !== null){
      hideLoader()
      return NotificationManager.warning('Complete all required fields')
    }

    this.setState({ 
      morePrevious: [...this.state.morePrevious, this.state.previousEmployment], 
    });

    $('.modal').modal('hide');
    $(document.body).removeClass('modal-open');
    $('.modal-backdrop').remove();
    
    this.setState({ previousEmployment: {
      employerName: '',
      address: '',
      role: '',
      startDate: '',
      endDate: ''
    } });
  }

  removeMorePrevious = (value) => {
    this.setState({
      morePrevious: this.state.morePrevious.filter((interest,index) => index !== parseInt(value))
    });
  }

  handleMoreInfo = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleBackButton = () => {
    return this.props.history.push({
      pathname: `${this.props.location.backurl}`,
      savedState: this.props.location.savedState,
      direction: 'backward'
    })
  }

  componentDidMount(){
    if(this.props.location.direction === 'backward'){
      this.setState({...this.props.location.savedState, pageMode: 'edit'});
    } else if(this.props.location.direction === 'completeOnboarding'){
      this.setState({ pageMode: 'completeOnboarding'});
    }
	}

  handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    // (!this.state.moreInstitution.length) ? console.log(this.state.institution) : console.log([...this.state.moreInstitution, this.state.institution]);
    try{
      const { id } = this.props.match.params;
      const data = {
        // institution: (!this.state.moreInstitution.length) ? this.state.institution : [...this.state.moreInstitution, this.state.institution],
        institution: this.state.moreInstitution,
        previousEmployment: (!this.state.morePrevious.length) ? this.state.previousEmployment : [...this.state.morePrevious],
        objectReference: this.state.objectReference,
        reasonForLeaving: this.state.reasonForLeaving,
        moreInfo: this.state.moreInfo
      };

      if(!data.institution.length){
        hideLoader();
        NotificationManager.warning("Fill in at least one institution")
        return;
      }

      if(this.state.pageMode === 'edit'){
        const res = await httpPatch(`auth/edit_onboarding_two/${id}`, data);
        if(res.code === 200){
          hideLoader();
          this.setState({ 
            institution: res.data.savedInstitution, 
            previousEmployment: res.data.savedEmployment
          });
  
          return this.props.history.push({
            pathname: `/create_staff/three/${res.data.id}`,
            backurl: `/create_staff/two/${res.data.id}`,
            savedState: this.state,
            direction: 'forward'
          });
        }
      } else {
        const res = await httpPost(`auth/onboarding_two/${id}`, data);
        if(res.code === 201){
          hideLoader();
          // setState({ userId: res.data.id });
          //return this.props.history.push(`/create_staff/three/${res.data.id}`)
          this.setState({ 
            institution: res.data.savedInstitution, 
            previousEmployment: res.data.savedEmployment
          });
  
          return this.props.history.push({
            pathname: `/create_staff/three/${res.data.id}`,
            backurl: `/create_staff/two/${res.data.id}`,
            savedState: this.state,
            direction: 'forward'
          });
        }
      }
    } catch (error){
      hideLoader();
      console.log(error)
    }
    
  }

  handleSave = async (e) => {
    e.preventDefault();
    showLoader();
    // (!this.state.moreInstitution.length) ? console.log(this.state.institution) : console.log([...this.state.moreInstitution, this.state.institution]);
    try{
      const { id } = this.props.match.params;
      const data = {
        institution: this.state.moreInstitution,
        previousEmployment: (!this.state.morePrevious.length) ? this.state.previousEmployment : [...this.state.morePrevious],
        objectReference: this.state.objectReference,
        reasonForLeaving: this.state.reasonForLeaving,
        moreInfo: this.state.moreInfo
      };

      if(!data.institution.length){
        hideLoader();
        NotificationManager.warning("Fill in at least one institution")
        return;
      }

      const res = await httpPost(`auth/onboarding_two/${id}`, data);
      if(res.code === 201){
        hideLoader();
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
                    <h4 className="col col-md-6">Qualification and Experience</h4>
                    <div className="col col-md-6 text-right" style={ this.state.pageMode === 'completeOnboarding' ? {display: 'none'} : {}}>
                      <button className="cursor-pointer btn btn-primary" onClick={this.handleBackButton}>
                        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
                    </div>
                    </div>
									</div>
									<div className="card-body">
                    <h6 className="mb-4">Institution attended with date</h6>
                    <InstitutionTable
                      moreInstitution={this.state.moreInstitution}
                      removeMore={this.removeMore}
                    />

                    <div class="card-header custom-header">
                      <a class="add-link mr-3" data-toggle="modal" data-target="#qualificationModal"><span className="fa fa-plus"></span> Add Qualification</a>
                      <a  class="add-link" data-toggle="modal" data-target="#certificationModal"><span className="fa fa-plus"></span> Add Certification</a>
										</div>


                    <h6 className="mt-5 mb-3">Place of previous employment with date</h6>

                    <PreviousEmploymentTable
                      morePrevious={this.state.morePrevious}
                      removeMorePrevious={this.removeMorePrevious}
                    />

                    <div class="card-header custom-header">
                      <a class="add-link" data-toggle="modal" data-target="#employmentModal"><span className="fa fa-plus"></span> Add Experience</a>
										</div>


                    <h6 className="mt-5">Additional Information</h6>
                    <div className="row">
                      <MoreInfoForm 
                        handleMoreInfo={this.handleMoreInfo}
                        objectReference={this.state.objectReference}
                        reasonForLeaving={this.state.reasonForLeaving}
                        moreInfo={this.state.moreInfo} 
                        erro
                      />
                    </div>

                    <div class="form-group mb-0 mt-2 text-right">
                      <div class="col-md-12">
                        <button 
                          type="submit"
                          class="btn btn-info mr-5"
                          // onClick={() => this.props.history.push('/create_staff/two')}
                          onClick={this.handleSubmit}
                        >NEXT</button>
                        <button type="submit" class="btn btn-primary" onClick={this.handleSave}>SAVE</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            
            
          
          </section>
        </div>

        <QualificationModal
          handleQualification={this.handleQualificationChange}
          handleDropDown={this.handleDropDown}
          addMore={this.addMore}
          qualification={this.state.qualification}
          handleShowDropDown={this.handleShowDropDown}
          showDropDown={this.state.showDropDown}
          endDateErrorMssg={this.state.endDateErrorMssg}
          endDateErrorMssg2={this.state.endDateErrorMssg2}
          endDateErrorMssg5={this.state.endDateErrorMssg5}
          endDateErrorMssg6={this.state.endDateErrorMssg6}
        />

        <CertificationModal
          handleCertification={this.handleCertificationChange}
          handleCustomSelect={this.handleCustomSelect}
          handleDropDown={this.handleDropDown}
          addMore={this.addMore}
          certification={this.state.certification}
          handleShowDropDown={this.handleShowDropDown}
          showDropDown={this.state.showDropDown}
          endDateErrorMssg={this.state.endDateErrorMssg}
          endDateErrorMssg2={this.state.endDateErrorMssg2}
          endDateErrorMssg5={this.state.endDateErrorMssg5}
          endDateErrorMssg6={this.state.endDateErrorMssg6}
        />

        <PreviousEmploymentModal 
          handlePrevious={this.handlePrevious}
          addMorePrevious={this.addMorePrevious}
          previousEmployment={this.state.previousEmployment}
          endDateErrorMssg3={this.state.endDateErrorMssg3}
          endDateErrorMssg4={this.state.endDateErrorMssg4}
          endDateErrorMssg7={this.state.endDateErrorMssg7}
        />
      </Layout>
    )
  }
}

export default Qualification;

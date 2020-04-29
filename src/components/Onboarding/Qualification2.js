import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';
import { NotificationManager } from 'react-notifications';
import { httpPost, httpPatch, httpDelete, httpGet, httpPostFormData } from '../../actions/data.action';
import { hideLoader, showLoader } from '../../helpers/loader';
import Layout from '../layout';
import validateImage from '../../helpers/validateImage';
import { QualificationTable, CertificationTable } from './InstitutionTable';
import PreviousEmploymentTable from './PreviousEmploymentTable';
import {QualificationModal, CertificationModal} from '../Modals/Institution';
import { validateQualification, validateD, validatePreviousExperience } from '../../helpers/validations';
import { PreviousEmploymentModal } from '../Modals/pEmploymentModal';
import MoreInfoForm from './MoreInfoForm';


class Qualification extends Component {
  constructor(props){
    super(props)
    this.state = {
      institution: {},
      qualification: {},
      certification: {},
      moreQualification: [],
      moreCertification: [],
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
      customSelectDefault1: null,
      date1: undefined,
      date2: undefined,
      date3: undefined,
      date4: undefined,
      date5: undefined,
      date6: undefined,
      modalMode: 'create',
      editIndex: null,
      selectedHighestEducation: false,
      documents: {}
    }
  }

  handleQualificationChange = (e, nameValue) => {
    const { qualification } = this.state;
    let details = e !== null ? e.target : '';
    //console.log(`${[e.target.name]}: ${e.target.value}`);
    if(nameValue === 'endDate'){
      qualification[nameValue] = e;
      this.setState({ 
        qualification, date2: e
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
        qualification, date1: e
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
        certification, date4: e
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
        certification, date3: e
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
			certification, customSelectDefault1: result
		});
  }

  addMoreQualification = async () => {
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

    if(this.state.modalMode === 'edit'){
      await this.setState({ moreQualification: [...this.state.moreQualification].filter((data,index) => index !== parseInt(this.state.editIndex)) });
      this.setState({ 
        moreQualification: [...this.state.moreQualification, this.state.qualification], 
      });
    } else {
      this.setState({ 
        moreQualification: [...this.state.moreQualification, this.state.qualification], 
      });
    }

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
      },
      modalMode: 'create',
      editIndex: null,
      date1: undefined,
      date2: undefined 
    });
  }

  addMoreCertification = async () => {
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

    if(this.state.modalMode === 'edit'){
      await this.setState({ moreCertification: [...this.state.moreCertification].filter((data,index) => index !== parseInt(this.state.editIndex)) })
      this.setState({ 
        moreCertification: [...this.state.moreCertification, this.state.certification], 
      });
    } else {
      this.setState({ 
        moreCertification: [...this.state.moreCertification, this.state.certification], 
      });
    }

    $('.modal').modal('hide');
    $(document.body).removeClass('modal-open');
    $('.modal-backdrop').remove();

    this.setState({ 
      certification: {
        name: '',
        certification: '',
        categoryOfCertification: '',
        startDate: '',
        endDate: '',
      },
      modalMode: 'create',
      editIndex: null,
      customSelectDefault1: null,
      date3: undefined,
      date4: undefined 
    });
    // this.showQualificationCard()
  }

  removeMore = (value, id, type) => {
    if(this.state.pageMode === 'create'){
      if(type === 'qualification'){
        this.setState({
          moreQualification: this.state.moreQualification.filter((interest,index) => index !== parseInt(value))
        });
      } else {
        this.setState({
          moreCertification: this.state.moreCertification.filter((interest,index) => index !== parseInt(value))
        });
      }
    } else {
      type === 'qualification' ?
      this.deleteQualification(id, value) :
      this.deleteCertification(id, value)
    }
  }

  deleteQualification = async (id, indexValue) => {
		try{
			const res = await httpDelete(`auth/delete_qualification/${id}`);
			if(res.code === 200){
				this.setState({
					moreQualification: this.state.moreQualification.filter((interest,index) => index !== parseInt(indexValue))
				})
			}
		}catch(error){
			console.log(error)
		}
  }
  
  deleteCertification = async (id, indexValue) => {
		try{
			const res = await httpDelete(`auth/delete_certification/${id}`);
			if(res.code === 200){
				this.setState({
					moreCertification: this.state.moreCertification.filter((interest,index) => index !== parseInt(indexValue))
				})
			}
		}catch(error){
			console.log(error)
		}
	}

  handlePrevious = async (e, nameValue) => {
    const { previousEmployment } = this.state;
    let details = e !== null ? e.target : '';
    if(nameValue === 'endDate'){
      previousEmployment[nameValue] = e;
      this.setState({ 
        previousEmployment, date6: e
      })
      const isValidate = await validatePreviousExperience(nameValue, this.state.previousEmployment.endDate, this.state.previousEmployment.startDate);
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
        previousEmployment, date5: e
      })
      const isValidate = await validatePreviousExperience(nameValue, this.state.previousEmployment.startDate );
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

  addMorePrevious = async () => {
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

    if(this.state.modalMode === 'edit'){
      await this.setState({ morePrevious: [...this.state.morePrevious].filter((data,index) => index !== parseInt(this.state.editIndex)) })
      this.setState({ 
        morePrevious: [...this.state.morePrevious, this.state.previousEmployment], 
      });
    } else {
      this.setState({ 
        morePrevious: [...this.state.morePrevious, this.state.previousEmployment], 
      });
    }

    $('.modal').modal('hide');
    $(document.body).removeClass('modal-open');
    $('.modal-backdrop').remove();
    
    this.setState({ 
      previousEmployment: {
        employerName: '',
        address: '',
        role: '',
        startDate: '',
        endDate: ''
      },
      modalMode: 'create',
      editIndex: null,
      date5: undefined,
      date6: undefined 
    });
  }

  removeMorePrevious = (value, id) => {
    if(this.state.pageMode === 'create'){
      this.setState({
        morePrevious: this.state.morePrevious.filter((interest,index) => index !== parseInt(value))
      });
    } else {
      this.deleteWorkHistory(id, value);
    }
  }

  deleteWorkHistory = async (id, indexValue) => {
		try{
			const res = await httpDelete(`auth/delete_work_history/${id}`);
			if(res.code === 200){
				this.setState({
					morePrevious: this.state.morePrevious.filter((interest,index) => index !== parseInt(indexValue))
				})
			}
		}catch(error){
			console.log(error)
		}
  }
  
  handleAdd = () => {
    const { moreQualification } = this.state;
    if(moreQualification.length) {
      moreQualification.map(data => (
        data.highestEducation === 'Yes' ? this.setState({ selectedHighestEducation: true })
          : this.setState({ selectedHighestEducation: false })
      ))
    }
  }

  handleEdit = async (indexValue, name) => {
    // const { qualification, certification, previousEmployment } = this.state;
    if(name === 'qualification'){
      // const qualificationObj = [...this.state.moreInstitution].filter((data,index) => index === parseInt(indexValue))[0];
      // qualification['name'] = qualificationObj.name;
      // qualification['course'] = qualificationObj.course;
      // qualification['qualification'] = qualificationObj.qualification;
      // qualification['startDate'] = qualificationObj.startDate;
      // qualification['endDate'] = qualificationObj.endDate;
      await this.setState({ qualification: [...this.state.moreQualification].filter((data,index) => index === parseInt(indexValue))[0],
        editIndex: indexValue, modalMode: 'edit' });
      const date1 = moment(this.state.qualification.startDate).toDate();
      const date2 = moment(this.state.qualification.endDate).toDate();
      this.setState({ date1, date2 });
    } else if(name === 'certification'){
      await this.setState({ certification: [...this.state.moreCertification].filter((data,index) => index === parseInt(indexValue))[0],
        editIndex: indexValue, modalMode: 'edit' });
      const customSelectValue = { value: this.state.certification.categoryOfCertification, label: this.state.certification.categoryOfCertification };
      const date3 = moment(this.state.certification.startDate).toDate();
      const date4 = moment(this.state.certification.endDate).toDate();
      this.setState({ customSelectDefault1: customSelectValue, date3, date4 });
    } else {
      await this.setState({
        previousEmployment: [...this.state.morePrevious].filter((data,index) => index === parseInt(indexValue))[0],
        editIndex: indexValue, modalMode: 'edit'
      })
      const date5 = moment(this.state.previousEmployment.startDate).toDate();
      const date6 = moment(this.state.previousEmployment.endDate).toDate();
      this.setState({ date5, date6 });
    }
  }

  closeModal = () => {
    this.setState({
      qualification: {
        name: '',
        qualification: '',
        course: '',
        startDate: '',
        endDate: '',
      },
      certification: {
        name: '',
        certification: '',
        categoryOfCertification: '',
        startDate: '',
        endDate: '',
      },
      previousEmployment: {
        employerName: '',
        address: '',
        role: '',
        startDate: '',
        endDate: ''
      },
      customSelectDefault1: null,
      modalMode: 'create',
      editIndex: null,
      date1: undefined,
      date2: undefined,
      date3: undefined,
      date4: undefined,
      date5: undefined,
      date6: undefined
    })
  }

  handleMoreInfo = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleBackButton = () => {
    return this.props.history.push({
      pathname: `${this.props.location.backurl}`,
      savedId: this.props.location.savedId,
      direction: 'backward'
    })
  }

  async componentDidMount(){
    if(this.props.location.direction === 'backward'){
      this.setState({ userId: this.props.location.savedId, pageMode: 'edit'});
      await this.getPageDetails(this.props.location.savedId)
    } else if(this.props.location.direction === 'completeOnboarding'){
      this.setState({ pageMode: 'create'});
    }
  }
  
  getPageDetails = async (id) => {
    try{
      showLoader();

      const res = await httpGet(`auth/get_onboarding_two/${id}`);
      if(res.code === 200){
        hideLoader();
        this.setState({
          moreQualification: res.data.qualification,
          moreCertification: res.data.certification,
          morePrevious: res.data.employmentHistory,
          reasonForLeaving: res.data.reasonForLeaving,
          moreInfo: res.data.moreInfo
        })
      }

    }catch(error){
      hideLoader()
      console.log(error)
    }
  }

  handleUpload = async (e, uploadType) => {
    let { documents } = this.state;
    const imageData = e.target.files[0];
    // console.log(e.target.files[0])
    const validFormat = validateImage(imageData);
    if (validFormat.valid) {
      //NotificationManager.success(validFormat.message,'Yippe!',3000);
      // postBody[fileName] = [...postBody[fileName], e.target.files[0]];
      // this.setState({ qualificationDocuments: [...qualificationDocuments, e.target.files[0]] });

      if(uploadType === 'qualification'){
        documents['qualification'] = e.target.files[0];
        this.setState({ documents });
        this.saveDoc('qualification')
      } else if(uploadType === 'certification'){
        documents['certification'] = e.target.files[0];
        this.setState({ documents });
        this.saveDoc('certification')
      } else {
        documents['previousEmployment'] = e.target.files[0];
        this.setState({ documents });
        this.saveDoc('previousEmployment')
      }
    } else {
      //NotificationManager.error(validFormat.message,'Yippe!',3000);
      e.target.value = '';
    }
  };

  saveDoc = async (uploadType) => {
    try{
      const { id } = this.props.match.params;
      const { documents, pageMode, qualification, certification, previousEmployment } = this.state;

      if(pageMode === 'create'){
        let formData = new FormData();
        if(uploadType === 'qualification') formData.append('qualification', documents.qualification);
        if(uploadType === 'certification') formData.append('certification', documents.qualification);
        if(uploadType === 'previousEmployment') formData.append('previousEmployment', documents.qualification);

        const res = await httpPostFormData(`auth/upload_onboarding_two/${id}`, formData);
        if(res.code === 201){
          hideLoader();
          if(uploadType === 'qualification'){
            qualification['documentId'] = res.data.upload.id;
            this.setState({ qualification });
          }
          if(uploadType === 'certification'){
            certification['documentId'] = res.data.upload.id;
            this.setState({ certification });
          }
          if(uploadType === 'previousEmployment'){
            previousEmployment['documentId'] = res.data.upload.id;
            this.setState({ previousEmployment });
          }
        }
      } else {
        // let formData = new FormData();
        // formData.append('passportPhotograph', uploadBody.passportPhotograph);
        // formData.append('identification', uploadBody.identification);

        // const res = await httpPostFormData(`auth/edit_onboarding_one_uploads/${id}`, formData);
        // if(res.code === 201){
        //   hideLoader();
        //   // if(uploadType === 'qualification') this.setState({ });
        //   // if(uploadType === 'certification') this.setState({ });
        //   // if(uploadType === 'previousEmployment') this.setState({ });
        // }
      }
    }catch(error){
      hideLoader();
      console.log(error)
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
        moreQualification: this.state.moreQualification,
        moreCertification: this.state.moreCertification,
        previousEmployment: this.state.morePrevious,
        reasonForLeaving: this.state.reasonForLeaving,
        moreInfo: this.state.moreInfo
      };

      // let formData = new FormData();
      //   formData.append('qualificationDocuments', this.state.qualificationDocuments);
      //   formData.append('moreQualification', this.state.moreQualification);
      //   formData.append('moreCertification', this.state.moreCertification);
      //   formData.append('previousEmployment', this.state.morePrevious);
      //   formData.append('reasonForLeaving', this.state.reasonForLeaving);
      //   formData.append('moreInfo', this.state.moreInfo);

      if(!data.moreQualification.length){
        hideLoader();
        NotificationManager.warning("Fill in at least one qualification")
        return;
      }
      console.log('req body', data)

      if(this.state.pageMode === 'edit'){
        const res = await httpPatch(`auth/edit_onboarding_two/${id}`, data);
        if(res.code === 201){
          hideLoader();

          return this.props.history.push({
            pathname: `/create_staff/three/${res.data.id}`,
            backurl: `/create_staff/two/${res.data.id}`,
            savedId: res.data.id,
            direction: 'forward'
          });
        }
      } else {
        const res = await httpPost(`auth/onboarding_two/${id}`, data);
        if(res.code === 201){
          hideLoader();
          // setState({ userId: res.data.id });
          //return this.props.history.push(`/create_staff/three/${res.data.id}`)
  
          return this.props.history.push({
            pathname: `/create_staff/three/${res.data.id}`,
            backurl: `/create_staff/two/${res.data.id}`,
            savedId: res.data.id,
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
        moreQualification: this.state.moreQualification,
        moreCertification: this.state.moreCertification,
        previousEmployment: this.state.morePrevious,
        reasonForLeaving: this.state.reasonForLeaving,
        moreInfo: this.state.moreInfo
      };

      if(!data.moreQualification.length){
        hideLoader();
        NotificationManager.warning("Fill in at least one qualification")
        return;
      }

      if(this.state.pageMode === 'edit'){
        const res = await httpPatch(`auth/edit_onboarding_two/${id}`, data);
       if(res.code === 201){
        hideLoader();
       }
     } else {
      const res = await httpPost(`auth/onboarding_two/${id}`, data);
      if(res.code === 201){
       hideLoader();
      }
     }
    } catch (error){
      hideLoader()
      console.log(error)
    }
    
  }

  render() {
    console.log(this.state.qualification)
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
                    <h6 className="mb-4">Institutions attended with dates</h6>
                    <QualificationTable
                      moreQualification={this.state.moreQualification}
                      removeMore={this.removeMore}
                      handleEdit={this.handleEdit}
                    />

                    <div class="card-header custom-header" style={{ borderBottom: 'hidden'}}>
                      <a class="add-link mr-3" data-toggle="modal" data-target="#qualificationModal" onClick={this.handleAdd}><span className="fa fa-plus"></span> Add Qualification</a>
										</div>

                    <br/>

                    <CertificationTable
                      moreCertification={this.state.moreCertification}
                      removeMore={this.removeMore}
                      handleEdit={this.handleEdit}
                    />

                    <div class="card-header custom-header">
                      <a  class="add-link" data-toggle="modal" data-target="#certificationModal"><span className="fa fa-plus"></span> Add Certification</a>
										</div>


                    <h6 className="mt-5 mb-3">Place of previous employments with dates</h6>

                    <PreviousEmploymentTable
                      morePrevious={this.state.morePrevious}
                      removeMorePrevious={this.removeMorePrevious}
                      handleEdit={this.handleEdit}
                    />

                    <div class="card-header custom-header">
                      <a class="add-link" data-toggle="modal" data-target="#employmentModal"><span className="fa fa-plus"></span> Add Experience</a>
										</div>


                    <h6 className="mt-5">Additional Information</h6>
                      <MoreInfoForm 
                        handleMoreInfo={this.handleMoreInfo}
                        reasonForLeaving={this.state.reasonForLeaving}
                        moreInfo={this.state.moreInfo} 
                        erro
                      />

                    <div class="form-group mb-0 mt-2 text-right">
                      <div class="col-md-12">
                        <button 
                          type="submit"
                          class="btn btn-info mr-5"
                          // onClick={() => this.props.history.push('/create_staff/two')}
                          onClick={this.handleSave}
                        ><i class="fa fa-save"></i> SAVE</button>
                        <button type="submit" class="btn btn-primary" onClick={this.handleSubmit}><i class="fa fa-arrow-right"></i> NEXT</button>
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
          addMoreQualification={this.addMoreQualification}
          qualification={this.state.qualification}
          handleShowDropDown={this.handleShowDropDown}
          showDropDown={this.state.showDropDown}
          endDateErrorMssg={this.state.endDateErrorMssg}
          endDateErrorMssg2={this.state.endDateErrorMssg2}
          endDateErrorMssg5={this.state.endDateErrorMssg5}
          endDateErrorMssg6={this.state.endDateErrorMssg6}
          modalMode={this.state.modalMode}
          closeModal={this.closeModal}
          date1={this.state.date1}
          date2={this.state.date2}
          // selectedHighestEducation={this.state.selectedHighestEducation}
          handleUpload={this.handleUpload}
        />

        <CertificationModal
          handleCertification={this.handleCertificationChange}
          handleCustomSelect={this.handleCustomSelect}
          handleDropDown={this.handleDropDown}
          addMoreCertification={this.addMoreCertification}
          certification={this.state.certification}
          handleShowDropDown={this.handleShowDropDown}
          showDropDown={this.state.showDropDown}
          endDateErrorMssg={this.state.endDateErrorMssg}
          endDateErrorMssg2={this.state.endDateErrorMssg2}
          endDateErrorMssg5={this.state.endDateErrorMssg5}
          endDateErrorMssg6={this.state.endDateErrorMssg6}
          modalMode={this.state.modalMode}
          customSelectDefault1={this.state.customSelectDefault1}
          closeModal={this.closeModal}
          date3={this.state.date3}
          date4={this.state.date4}
          handleUpload={this.handleUpload}
        />

        <PreviousEmploymentModal 
          handlePrevious={this.handlePrevious}
          addMorePrevious={this.addMorePrevious}
          previousEmployment={this.state.previousEmployment}
          endDateErrorMssg3={this.state.endDateErrorMssg3}
          endDateErrorMssg4={this.state.endDateErrorMssg4}
          endDateErrorMssg7={this.state.endDateErrorMssg7}
          modalMode={this.state.modalMode}
          closeModal={this.closeModal}
          date5={this.state.date5}
          date6={this.state.date6}
          handleUpload={this.handleUpload}
        />
      </Layout>
    )
  }
}

export default Qualification;

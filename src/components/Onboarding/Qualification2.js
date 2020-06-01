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

const date_format = 'DD/MM/YYYY';

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
      customPhoneNumberCode: null,
      date1: undefined,
      date2: undefined,
      date3: undefined,
      date4: undefined,
      date5: undefined,
      date6: undefined,
      modalMode: 'create',
      editIndex: null,
      selectedHighestEducation: false,
      documents: {},
      qualificationErrors: {},
      certificationErrors: {},
      previousEmploymentErrors: {}
    }
  }

  handleQualificationChange = (e, nameValue) => {
    const { qualification, qualificationErrors } = this.state;
    let details = e !== null ? e.target : '';
    //console.log(`${[e.target.name]}: ${e.target.value}`);
    if(nameValue === 'endDate'){
      qualification[nameValue] = e;
      this.setState({ 
        qualification, date2: e
      })
      const isValidate = validateQualification(nameValue, this.state.qualification.endDate, this.state.qualification.startDate);
      if(!isValidate.error){
        qualificationErrors[nameValue] = isValidate.errorMessage;
        this.setState({ 
          qualificationErrors
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        qualificationErrors[nameValue] = ''
        this.setState({ qualificationErrors })
      }
    } else if(nameValue === 'startDate'){
      qualification[nameValue] = e;
      this.setState({ 
        qualification, date1: e
      })
      const isValidate = validateQualification(nameValue, this.state.qualification.startDate );
      qualificationErrors[nameValue] = isValidate.errorMessage;
      if(!isValidate.error){
        this.setState({ 
          qualificationErrors
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        qualificationErrors[nameValue] = ''
        this.setState({ qualificationErrors })
      }
    } else if(details.name === 'name'){
      qualification[details.name] = details.value;
      qualificationErrors[details.name] = ''
      this.setState({ qualification, qualificationErrors });
    } else if(details.name === 'qualification'){
      qualification[details.name] = details.value;
      qualificationErrors[details.name] = ''
      this.setState({ qualification, qualificationErrors });
    } else if(details.name === 'course'){
      qualification[details.name] = details.value;
      qualificationErrors[details.name] = ''
      this.setState({ qualification, qualificationErrors });
    } else {
      qualification[details.name] = details.value;
      this.setState({ qualification });
    } 
  }

  handleCertificationChange = async (e, nameValue) => {
    const { certification, certificationErrors } = this.state;
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
        certificationErrors[nameValue] = isValidate.errorMessage;
        this.setState({ 
          certificationErrors
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        certificationErrors[nameValue] = '';
        this.setState({ certificationErrors })
      }
      
    } else if(nameValue === 'startDate'){
      console.log(e)
      certification[nameValue] = e;
      this.setState({ 
        certification, date3: e
      })
      const isValidate = await validateQualification(nameValue, this.state.certification.startDate );
      if(!isValidate.error){
        certificationErrors[nameValue] = isValidate.errorMessage;
        this.setState({ 
          certificationErrors
        })
        // console.log(isValidate.errorMessage)
        return;
      } else {
        certificationErrors[nameValue] = '';
        this.setState({ certificationErrors })
      }

    } else if(e.target.name === 'certification'){
      certification[e.target.name] = e.target.value;
      certificationErrors[details.name] = ''
      this.setState({ certification, showDropDown: !this.state.showDropDown, certificationErrors });

    } else if(details.name === 'name'){
      certification[details.name] = details.value;
      certificationErrors[details.name] = ''
      this.setState({ certification, certificationErrors });
    } else {
      certification[details.name] = details.value;
      this.setState({ certification, showDropDown: false });
    }

  }

  handleCustomSelect = (result, name) => {
		const { certification, certificationErrors } = this.state;
    const value = result !== null ? result.value : '';
  
    certification[name] = value;
    certificationErrors[name] = '';
		this.setState({ 
			certification, customSelectDefault1: result, certificationErrors 
		});
  }

  addMoreQualification = async () => {
    const {
      name,
      qualification,
      course,
      startDate,
      endDate,
      documentId
    } = this.state.qualification;

    const { qualificationErrors } = this.state;

    const postData = {
      name,
      qualification,
      course,
      startDate,
      endDate,
      documentId
    };
    let count = 0;
    for(let i in postData){
      if(postData[i] === undefined || postData[i] === ''){
        count++
        if(i === 'name'){
          qualificationErrors['name'] = 'Institution Name is required';
          this.setState({ qualificationErrors });
        } else if(i === 'qualification'){
          qualificationErrors['qualification'] = 'Qualification is required';
          this.setState({ qualificationErrors });
        } else if(i === 'course'){
          qualificationErrors['course'] = 'Course is required';
          this.setState({ qualificationErrors });
        } else if(i === 'startDate'){
          qualificationErrors['startDate'] = 'Start date is required';
          this.setState({ qualificationErrors });
        } else if(i === 'endDate'){
          qualificationErrors['endDate'] = 'End date is required';
          this.setState({ qualificationErrors });
        } else if(i === 'documentId'){
          qualificationErrors['documentId'] = 'Upload is required';
          this.setState({ qualificationErrors });
        }
      }
    }

    if(count){
      return false;
    }

    // return ;
    // return NotificationManager.warning('All fields must be filled');

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
      date2: undefined, 
      documents: {
        qualification: ''
      }
    });
  }

  addMoreCertification = async () => {
    // if(this.state.certification.name === undefined || this.state.certification.name === '' || this.state.certification.certification === undefined || this.state.certification.certification === '' || this.state.certification.categoryOfCertification === undefined || this.state.certification.categoryOfCertification === '' || this.state.certification.startDate === undefined || this.state.certification.startDate === '' || this.state.certification.endDate === undefined || this.state.certification.endDate === '' || this.state.documents.certification === '' || this.state.documents.certification === undefined){
    //   return NotificationManager.warning('All fields must be filled');
    // }

    const {
      name,
      certification,
      categoryOfCertification,
      startDate,
      endDate,
      documentId
    } = this.state.certification;

    const { certificationErrors } = this.state;

    const postData = {
      name,
      certification,
      categoryOfCertification,
      startDate,
      endDate,
      documentId
    };
    let count = 0;
    for(let i in postData){
      if(postData[i] === undefined || postData[i] === ''){
        count++
        if(i === 'name'){
          certificationErrors['name'] = 'Institution Name is required';
          this.setState({ certificationErrors });
        } else if(i === 'certification'){
          certificationErrors['certification'] = 'Certification is required';
          this.setState({ certificationErrors });
        } else if(i === 'categoryOfCertification'){
          certificationErrors['categoryOfCertification'] = 'Certification category is required';
          this.setState({ certificationErrors });
        } else if(i === 'startDate'){
          certificationErrors['startDate'] = 'Start date is required';
          this.setState({ certificationErrors });
        } else if(i === 'endDate'){
          certificationErrors['endDate'] = 'End date is required';
          this.setState({ certificationErrors });
        } else if(i === 'documentId'){
          certificationErrors['documentId'] = 'Upload is required';
          this.setState({ certificationErrors });
        }
      }
    }

    if(count){
      return false;
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
      date4: undefined,
      documents: {
        certification: ''
      }
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
    const { previousEmployment, previousEmploymentErrors } = this.state;
    let details = e !== null ? e.target : '';
    if(nameValue === 'endDate'){
      previousEmployment[nameValue] = e;
      this.setState({ 
        previousEmployment, date6: e
      })
      const isValidate = await validatePreviousExperience(nameValue, this.state.previousEmployment.endDate, this.state.previousEmployment.startDate);
      if(!isValidate.error){
        previousEmploymentErrors[nameValue] = isValidate.errorMessage;
        this.setState({ 
          previousEmploymentErrors, 
        })
        return;
      } else {
        previousEmploymentErrors[nameValue] = undefined
        this.setState({ previousEmploymentErrors })
      }
    } else if(nameValue === 'startDate'){
      previousEmployment[nameValue] = e;
      this.setState({ 
        previousEmployment, date5: e
      })
      const isValidate = await validatePreviousExperience(nameValue, this.state.previousEmployment.startDate );
      if(!isValidate.error){
        previousEmploymentErrors[nameValue] = isValidate.errorMessage;
        this.setState({ 
          previousEmploymentErrors, 
        })
        return;
      } else {
        previousEmploymentErrors[nameValue] = undefined;
        this.setState({ previousEmploymentErrors })
      }
    } else if(nameValue === 'phoneNumberCode') {
      previousEmployment[nameValue] = e.value;
      previousEmploymentErrors[nameValue] = undefined;
      this.setState({ previousEmployment, customPhoneNumberCode: e, previousEmploymentErrors });
    } else if(details.name === 'employerName'){
      previousEmployment[details.name] = details.value;
      this.setState({ 
        previousEmployment
      })
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        previousEmploymentErrors[details.name] = isValidate.errorMessage;
        this.setState({ previousEmploymentErrors });
        return;
      } else {
        previousEmploymentErrors[details.name] = undefined;
        this.setState({ previousEmploymentErrors })
      }
    } else if(details.name === 'address'){
      previousEmployment[details.name] = details.value;
      previousEmploymentErrors[details.name] = undefined;
      this.setState({ previousEmployment, previousEmploymentErrors });
    } else if(details.name === 'role'){
      previousEmployment[details.name] = details.value;
      previousEmploymentErrors[details.name] = undefined;
      this.setState({ previousEmployment, previousEmploymentErrors });
    } else if(details.name === 'objectReference'){
      previousEmployment[details.name] = details.value;
      previousEmploymentErrors[details.name] = undefined;
      if(details.value === 'Yes') {
        previousEmploymentErrors['email'] = undefined;
        previousEmploymentErrors['phoneNumber'] = undefined;
        previousEmployment['email'] = '';
        previousEmployment['phoneNumber'] = '';
      }
      // if(details.value === 'No'){
      //   const isValidate = await validateD('email', '');
      //   if(!isValidate.error){
      //     previousEmploymentErrors['email'] = isValidate.errorMessage;
      //     this.setState({ previousEmploymentErrors });
      //     return;
      //   } else {
      //     previousEmploymentErrors['email'] = undefined;
      //     this.setState({ previousEmploymentErrors })
      //   }
      // }
      this.setState({ previousEmployment, previousEmploymentErrors });
    } else if(details.name === 'email'){
      previousEmployment[details.name] = details.value;
      this.setState({ previousEmployment });
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        previousEmploymentErrors[details.name] = isValidate.errorMessage;
        this.setState({ previousEmploymentErrors });
        return;
      } else {
        previousEmploymentErrors[details.name] = undefined;
        this.setState({ previousEmploymentErrors })
      }
    } else if(details.name === 'phoneNumber'){
      previousEmployment[details.name] = details.value;
      this.setState({ previousEmployment });
      const isValidate = await validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        previousEmploymentErrors[details.name] = isValidate.errorMessage;
        this.setState({ previousEmploymentErrors });
        return;
      } else {
        previousEmploymentErrors[details.name] = undefined;
        this.setState({ previousEmploymentErrors })
      }
    } else{
      previousEmployment[details.name] = details.value;
      this.setState({ previousEmployment });
    }
    //console.log(`${[e.target.name]}: ${e.target.value}`);
  }

  addMorePrevious = async () => {
    // if(this.state.previousEmployment.employerName === undefined || this.state.previousEmployment.address === undefined || this.state.previousEmployment.role === undefined || this.state.previousEmployment.startDate === undefined || this.state.previousEmployment.endDate === undefined || this.state.documents.previousEmployment === '' || this.state.documents.previousEmployment === undefined || this.state.previousEmployment.objectReference === '' || this.state.previousEmployment.objectReference === undefined){
    //   return NotificationManager.warning('All fields must be filled');
    // }
    console.log(this.state.previousEmployment)
    const {
      employerName,
      address,
      role,
      startDate,
      endDate,
      objectReference,
      documentId,
      email,
      phoneNumber,
      phoneNumberCode
    } = this.state.previousEmployment;

    const { previousEmploymentErrors } = this.state;

    const postData = {
      employerName,
      address,
      role,
      startDate,
      endDate,
      objectReference: objectReference === undefined ? 'No' : objectReference,
      documentId,
    };
    let count = 0;
    for(let i in postData){
      if(postData[i] === undefined || postData[i] === ''){
        count++
        if(i === 'employerName'){
          previousEmploymentErrors['employerName'] = 'Employer Name is required';
          this.setState({ previousEmploymentErrors });
        } else if(i === 'address'){
          previousEmploymentErrors['address'] = 'Address is required';
          this.setState({ previousEmploymentErrors });
        } else if(i === 'role'){
          previousEmploymentErrors['role'] = 'Role category is required';
          this.setState({ previousEmploymentErrors });
        } else if(i === 'startDate'){
          previousEmploymentErrors['startDate'] = 'Start date is required';
          this.setState({ previousEmploymentErrors });
        } else if(i === 'endDate'){
          previousEmploymentErrors['endDate'] = 'End date is required';
          this.setState({ previousEmploymentErrors });
        } else if(i === 'objectReference'){
          previousEmploymentErrors['objectReference'] = 'This field is required';
          this.setState({ previousEmploymentErrors });
        } else if(i === 'documentId'){
          previousEmploymentErrors['documentId'] = 'Upload is required';
          this.setState({ previousEmploymentErrors });
        }
      }
    }

    if(count){
      return false;
    }

    if(postData.objectReference !== 'Yes'){
      if(email === undefined || email === ''){
        previousEmploymentErrors['email'] = 'Email is required';
        this.setState({ previousEmploymentErrors });
      } else if(phoneNumberCode === '' || phoneNumberCode === undefined){
        previousEmploymentErrors['phoneNumberCode'] = 'Country code is required';
        this.setState({ previousEmploymentErrors });
      } else if(phoneNumber === '' || phoneNumber === undefined){
        previousEmploymentErrors['phoneNumber'] = 'Phone number is required';
        this.setState({ previousEmploymentErrors });
      }
    }

    if( previousEmploymentErrors.employerName !== undefined || 
        previousEmploymentErrors.address !== undefined || 
        previousEmploymentErrors.role !== undefined || 
        previousEmploymentErrors.startDate !== undefined ||
        previousEmploymentErrors.endDate !== undefined ||
        previousEmploymentErrors.objectReference !== undefined ||
        previousEmploymentErrors.documentId !== undefined ||
        previousEmploymentErrors.email !== undefined ||
        previousEmploymentErrors.phoneNumber !== undefined ||
        previousEmploymentErrors.phoneNumberCode !== undefined
    ){
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
        endDate: '',
        email: '',
        phoneNumber: '',
        phoneNumberCode: ''
      },
      modalMode: 'create',
      editIndex: null,
      date5: undefined,
      date6: undefined,
      customPhoneNumberCode: null,
      documents: {
        previousEmployment: undefined
      } 
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
    // const { moreQualification } = this.state;
    // if(moreQualification.length) {
    //   moreQualification.map(data => (
    //     data.highestEducation === 'Yes' ? this.setState({ selectedHighestEducation: true })
    //       : this.setState({ selectedHighestEducation: false })
    //   ))
    // }
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
      const customPhoneNumberCode = { value: this.state.previousEmployment.phoneNumberCode, label: this.state.previousEmployment.phoneNumberCode};
      const date5 = moment(this.state.previousEmployment.startDate).toDate();
      const date6 = moment(this.state.previousEmployment.endDate).toDate();
      this.setState({ date5, date6, customPhoneNumberCode });
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
        endDate: '',
        email: '',
        phoneNumber: '',
        phoneNumberCode: ''
      },
      qualificationErrors: {},
      certificationErrors: {},
      previousEmploymentErrors: {},
      customSelectDefault1: null,
      customPhoneNumberCode: null,
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
    const { id } = this.props.match.params;
    return this.props.history.push({
      pathname: `/create_staff/one/${id}` ,
      savedId: this.props.location.savedId || id,
      direction: 'backward'
    })
  }

  async componentDidMount(){
    const { id } = this.props.match.params;
    if(this.props.location.direction === 'backward'){
      this.setState({ userId: this.props.location.savedId, pageMode: 'edit'});
      await this.getPageDetails(this.props.location.savedId || id)
    } else if(this.props.location.direction === 'completeOnboarding'){
      this.setState({ pageMode: 'create'});
    }
    this.getPageDetails(id);
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
    if(imageData === undefined) return;
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
      showLoader();
      const { id } = this.props.match.params;
      const { 
        documents, pageMode, qualification, 
        certification, previousEmployment, qualificationErrors,
        certificationErrors, previousEmploymentErrors 
      } = this.state;

      if(pageMode === 'create'){
        let formData = new FormData();
        if(uploadType === 'qualification') formData.append('qualification', documents.qualification);
        if(uploadType === 'certification') formData.append('certification', documents.certification);
        if(uploadType === 'previousEmployment') formData.append('previousEmployment', documents.previousEmployment);

        const res = await httpPostFormData(`auth/upload_onboarding_two/${id}`, formData);
        if(res.code === 201){
          hideLoader();
          if(uploadType === 'qualification'){
            qualification['documentId'] = res.data.upload.id;
            qualification['path'] = res.data.upload.path;
            qualificationErrors['documentId'] = '';
            this.setState({ qualification, qualificationErrors });
          }
          if(uploadType === 'certification'){
            certification['documentId'] = res.data.upload.id;
            certification['path'] = res.data.upload.path;
            certificationErrors['documentId'] = '';
            this.setState({ certification, certificationErrors });
          }
          if(uploadType === 'previousEmployment'){
            previousEmployment['documentId'] = res.data.upload.id;
            previousEmployment['path'] = res.data.upload.path;
            previousEmploymentErrors['documentId'] = undefined;
            this.setState({ previousEmployment, previousEmploymentErrors });
          }
        }
      } else {
        let formData = new FormData();
        if(uploadType === 'qualification') formData.append('qualification', documents.qualification);
        if(uploadType === 'certification') formData.append('certification', documents.certification);
        if(uploadType === 'previousEmployment') formData.append('previousEmployment', documents.previousEmployment);

        const res = await httpPostFormData(`auth/upload_onboarding_two/${id}`, formData);
        if(res.code === 201){
          hideLoader();
          if(uploadType === 'qualification'){
            qualification['documentId'] = res.data.upload.id;
            qualification['path'] = res.data.upload.path;
            qualificationErrors['documentId'] = '';
            this.setState({ qualification, qualificationErrors });
          }
          if(uploadType === 'certification'){
            certification['documentId'] = res.data.upload.id;
            certification['path'] = res.data.upload.path;
            certificationErrors['documentId'] = '';
            this.setState({ certification, certificationErrors });
          }
          if(uploadType === 'previousEmployment'){
            previousEmployment['documentId'] = res.data.upload.id;
            previousEmployment['path'] = res.data.upload.path;
            previousEmploymentErrors['documentId'] = '';
            this.setState({ previousEmployment, previousEmploymentErrors });
          }
        }
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

  deleteDoc = async (id, type) => {
    try{
      showLoader();
      if(type === 'qualification'){
        const res = await httpDelete(`auth/document/${id}`);
        if(res.code === 200){
          hideLoader();
          const { qualification } = this.state;
          qualification['documentId'] = '';
          qualification['path'] = ''
          this.setState({ qualification });
        }
        hideLoader();
      } else if(type === 'certification'){
        const res = await httpDelete(`auth/document/${id}`);
        if(res.code === 200){
          hideLoader();
          const { certification } = this.state;
          certification['documentId'] = '';
          certification['path'] = ''
          this.setState({ certification });
        }
        hideLoader();
      } else {
        const res = await httpDelete(`auth/document/${id}`);
        if(res.code === 200){
          hideLoader();
          const { previousEmployment } = this.state;
          previousEmployment['documentId'] = '';
          previousEmployment['path'] = ''
          this.setState({ previousEmployment });
        }
        hideLoader();
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

      const { moreQualification } = this.state;
      if(moreQualification.length) {
        let isCompleted = [];
        moreQualification.map(data => {
          if(new Date(data.endDate) > new Date(Date.now())){
            isCompleted.push(0)
          } else {
            isCompleted.push(1)
          }
        })

        if(!isCompleted.includes(1)){
          hideLoader()
          NotificationManager.warning("Fill in at least one completed qualification")
          return;
        }

      }

      

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
    return (
      <Layout page='qualification'>
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
                      <button className="cursor-pointer btn btn-primary" onClick={() => this.props.history.push(`/create_staff/three/${this.props.match.params.id}`)}>
                      Forward <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
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
                        <button type="submit" class="btn btn-primary" onClick={this.handleSubmit}><i class="fa fa-arrow-right"></i> {this.state.pageMode === 'create' ? 'NEXT' : 'UPDATE & CONTINUE'}</button>
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
          deleteDoc={this.deleteDoc}
          qualificationErrors={this.state.qualificationErrors}
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
          deleteDoc={this.deleteDoc}
          certificationErrors={this.state.certificationErrors}
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
          deleteDoc={this.deleteDoc}
          previousEmploymentErrors={this.state.previousEmploymentErrors}
          customPhoneNumberCode={this.state.customPhoneNumberCode}
        />
      </Layout>
    )
  }
}

export default Qualification;

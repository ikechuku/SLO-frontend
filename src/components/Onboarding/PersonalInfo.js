import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import CreatableSelect from 'react-select/creatable'; 
import Select from 'react-select';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Layout from '../layout/index';
import { httpPost, httpPatch, httpGet, httpPostFormData, httpDelete } from '../../actions/data.action';
import validateImage from '../../helpers/validateImage';
import { states, countries, countryLists, stateLists, stateLists2 } from './Info';
import { slga, getLga } from '../../helpers/states';
import { validateData, validateD } from '../../helpers/validations';
import { showLoader, hideLoader } from '../../helpers/loader';
import { getDialCode, getAllDialCode, countryCodes } from '../../helpers/dailCodes';

class PersonalInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      dob: new Date(),
      userId: null,
      country: null,
      currentCountry: null,
      permanentCountry: null,
      customNationality: null,
      customState: null,
      customLga: null,
      customCurrentCountry: null,
      customCurrentState: null,
      customCurrentLga: null,
      customPermanentCountry: null,
      customPermanentState: null,
      customPermanentLga: null,
      customStaffCategory: null,
      customMobile: null,
      customHome: null,
      customMaritalStatus: null,
      customSkills: null,
      customHobbies: null,
      customReligion: null,
      customDob: null,
      firstNameErrorMessage: null,
      lastNameErrorMessage: null,
      middleNameErrorMessage: null,
      emailErrorMessage: null,
      mobileErrorMessage: null,
      homeErrorMessage: null,
      nationalityErrorMessage: null,
      originErrorMessage: null,
      dobErrorMessage: null,
      genderErrorMessage: null,
      dependantsErrorMessage: null,
      currentErrorMessage: null,
      staffCategoryErrorMessage: null,
      immediateFamilyErrorMessage: null,
      lgaErrorMessage: null,
      maritalErrorMessage: null,
      permanentErrorMessage: null,
      pageMode: 'create',
      documents: [],
      fileName: '',
      uploadBody: {},
    }
  }

  handleFileChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  handleChange = (e, name) => {
    e.preventDefault();
    const { data } = this.state;
    let details = e.target;
    if(details.name === 'noOfDependant'){
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          dependantsErrorMessage: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = parseInt(details.value);
      this.setState({ data, dependantsErrorMessage: null });

    } else if(details.name === 'bvn'){
      const isValidate = validateD(e.target.name, e.target.value);
      console.log(isValidate.error)
      if(!isValidate.error){
        this.setState({ 
          bvnErrorMessage: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = parseInt(details.value);
      this.setState({ data, bvnErrorMessage: null });

    } else if(details.name === 'noOfImmediateFamily'){
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          immediateFamilyErrorMessage: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = parseInt(details.value);
      this.setState({ data, immediateFamilyErrorMessage: null });

    } else if(details.name === 'currentAddress'){
      data[details.name] = details.value;
      this.setState({ data });
      const isValidate = validateD(e.target.name, this.state.data.currentAddress);
      if(!isValidate.error){
        this.setState({ 
          currentErrorMessage: isValidate.errorMessage, 
        })
        return;
      } else {
        this.setState({ currentErrorMessage: null });
      }

    } else if(details.name === 'permanentAddress'){
      data[details.name] = details.value;
      this.setState({ data, permanentErrorMessage: null });

    } else if(details.name === 'firstName') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          firstNameErrorMessage: isValidate.errorMessage
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        firstNameErrorMessage: null 
      });

    } else if(details.name === 'lastName') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          lastNameErrorMessage: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data, 
        lastNameErrorMessage: null 
      });

    } else if(details.name === 'middleName') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          middleNameErrorMessage: isValidate.errorMessage,
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        middleNameErrorMessage: null 
      });

    } else if(details.name === 'email') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          emailErrorMessage: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        emailErrorMessage: null 
      });

    } if(details.name === 'mobilePhone') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          mobileErrorMessage: isValidate.errorMessage, 
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        mobileErrorMessage: null 
      });

    } else if(details.name === 'homePhone') {
      const isValidate = validateD(e.target.name, e.target.value);
      if(!isValidate.error){
        this.setState({ 
          homeErrorMessage: isValidate.errorMessage,
        })
        return;
      }
      data[details.name] = details.value;
      this.setState({ 
        data,
        homeErrorMessage: null 
      });
    } else if(details.name === 'currentCity') {
      data[details.name] = details.value;
      this.setState({ 
        data,
        currentErrorMessage: null 
      });
    } else if(details.name === 'permanentCity') {
      data[details.name] = details.value;
      this.setState({ 
        data,
        permanentErrorMessage: null 
      });
    } else if(details.name === 'gender') {
      // const isValidate = validateD(e.target.name, e.target.value);
      // if(!isValidate.error){
      //   this.setState({ 
      //     genderErrorMessage: isValidate.errorMessage,
      //   })
      //   return;
      // }
      data[details.name] = details.value;
      this.setState({ 
        data,
        genderErrorMessage: null 
      });
    } else {
      data[details.name] = details.value;
      this.setState({ 
        data
      });
    }
  }

  handleCustomSelect = async (result, name) => {
    const { data } = this.state;
    if(name === 'dob'){
      data['dob'] = result;
      this.setState({ 
        data, customDob: result
      })
      const isValidate = validateD('dob', this.state.data.dob);
      if(!isValidate.error){
        this.setState({ 
          dobErrorMessage: isValidate.errorMessage,
        })
        return;
      } else {
        this.setState({ dobErrorMessage: null })
      }
    } else if(name === 'nationality'){
      const isValidate = validateD('nationality', result.value);
      if(!isValidate.error){
        this.setState({ 
          nationalityErrorMessage: isValidate.errorMessage, 
        })
        return;
      }
      data['nationality'] = result.value;
      const customCode = getDialCode(result.value);
      data['mobilePhoneCode'] = customCode.value
      data['homePhoneCode'] = customCode.value;
      this.setState({ 
        data, 
        country: result.value,
        customNationality: result,
        customMobile: customCode,
        customHome: customCode,
        nationalityErrorMessage: null 
      })
    } else if(name === 'mobilePhoneCode'){
      data[name] = result.value;
      this.setState({ 
        data,
        customMobile: result,
      });
    } else if(name === 'homePhoneCode'){
      data[name] = result.value;
      this.setState({ 
        data,
        customHome: result,
      });
    } else if(name === 'currentCountry'){
      data[name] = result.value;
      this.setState({ 
        data,
        currentErrorMessage: null,
        customCurrentCountry: result,
        currentCountry: result.value,
      });
    } else if(name === 'currentState'){
      data[name] = result.value;
      this.setState({ 
        data,
        currentErrorMessage: null,
        customCurrentState: result
      });
    } else if(name === 'currentLga'){
      data[name] = result.value;
      this.setState({ 
        data,
        currentErrorMessage: null,
        customCurrentLga: result
      });
    } else if(name === 'permanentCountry'){
      data[name] = result.value;
      this.setState({ 
        data,
        customPermanentCountry: result,
        permanentErrorMessage: null,
        permanentCountry: result.value,
      });
    } else if(name === 'permanentState'){
      data[name] = result.value;
      this.setState({ 
        data,
        permanentErrorMessage: null,
        customPermanentState: result
      });
    } else if(name === 'permanentLga'){
      data[name] = result.value;
      this.setState({ 
        data,
        permanentErrorMessage: null,
        customPermanentLga: result
      });
    } else if(name === 'religion'){
      data[name] = result.value;
      this.setState({ 
        data,
        customReligion: result,
      });
    } else if(name === 'maritalStatus'){
      data[name] = result.value;
      this.setState({ 
        data,
        customMaritalStatus: result,
        maritalErrorMessage: null
      });
    } else if(name === 'staffCategory'){
      data[name] = result.value;
      this.setState({ 
        data,
        customStaffCategory: result,
        staffCategoryErrorMessage: null
      });

    } else if(name === 'hobbies'){
      await this.setState({ customHobbies: result });
      let newValue = [];
      this.state.customHobbies.length ? this.state.customHobbies.map(data => (
        newValue.push(data.value)
      )) : newValue = [];
      data[name] = newValue.join(',');
      this.setState({ data });

    } else if(name === 'skills'){
      await this.setState({ customSkills: result });
      let newValue = [];
      this.state.customSkills.length ? this.state.customSkills.map(data => (
        newValue.push(data.value)
      )) : newValue = [];
      data[name] = newValue.join(',');
      this.setState({ 
        data,
        customSkills: result,
      });
    } else if(name === 'stateOfOrigin') {
      data[name] = result.value;
      this.setState({ 
        data,
        customState: result,
        originErrorMessage: null 
      });
    } else if(name === 'lga') {
      data[name] = result.value;
      this.setState({ 
        data,
        customLga: result,
        lgaErrorMessage: null 
      });
    } else {
      data[name] = result.value;
      this.setState({ 
        data
      });
    }
  }

  handleSubmit = async (e, btnType) => {
    e.preventDefault()
    showLoader();
    // console.log('postdata', this.state.data);
    // console.log('state', this.state);

    const isValidate = await validateData(this.state.data);
    if(!isValidate.error){
      if(isValidate.type === 'firstName'){
        this.setState({ 
          firstNameErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'lastName'){
        this.setState({ 
          lastNameErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'email'){
        this.setState({ 
          emailErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'mobilePhone'){
        this.setState({ 
          mobileErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'homePhone'){
        this.setState({ 
          homeErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'nationality'){
        this.setState({ 
          nationalityErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'dob'){
        this.setState({ 
          dobErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'gender'){
        this.setState({ 
          genderErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'currentAddress'){
        this.setState({ 
          currentErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'currentCountry'){
        this.setState({ 
          currentErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'currentState'){
        this.setState({ 
          currentErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'currentLga'){
        this.setState({ 
          currentErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'currentCity'){
        this.setState({ 
          currentErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'lga'){
        this.setState({ 
          lgaErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'maritalStatus'){
        this.setState({ 
          maritalErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'noOfDependants'){
        this.setState({ 
          dependantsErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'staffCategory'){
        this.setState({ 
          staffCategoryErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'noOfImmediateFamily'){
        this.setState({ 
          immediateFamilyErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'permanentAddress'){
        this.setState({ 
          permanentErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'permanentCountry'){
        this.setState({ 
          permanentErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'permanentState'){
        this.setState({ 
          permanentErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'permanentLga'){
        this.setState({ 
          permanentErrorMessage: isValidate.errorMessage,
        })
      } else if(isValidate.type === 'permanentCity'){
        this.setState({ 
          permanentErrorMessage: isValidate.errorMessage,
        })
      }
    }

    const { 
      firstNameErrorMessage,
      lastNameErrorMessage,
      middleNameErrorMessage,
      emailErrorMessage,
      mobileErrorMessage,
      homeErrorMessage,
      nationalityErrorMessage,
      originErrorMessage,
      dobErrorMessage,
      genderErrorMessage,
      dependantsErrorMessage,
      currentErrorMessage,
      staffCategoryErrorMessage,
      immediateFamilyErrorMessage,
      lgaErrorMessage,
      maritalErrorMessage,
      permanentErrorMessage,
      uploadBody
    } = this.state;

    if(firstNameErrorMessage !== null ||
      lastNameErrorMessage !== null ||
      middleNameErrorMessage !== null ||
      emailErrorMessage !== null ||
      mobileErrorMessage !== null ||
      homeErrorMessage !== null ||
      nationalityErrorMessage !== null ||
      originErrorMessage !== null ||
      dobErrorMessage !== null ||
      genderErrorMessage !== null ||
      dependantsErrorMessage !== null ||
      currentErrorMessage !== null ||
      staffCategoryErrorMessage !== null ||
      immediateFamilyErrorMessage !== null ||
      lgaErrorMessage !== null ||
      maritalErrorMessage !== null ||
      permanentErrorMessage !== null){
      hideLoader()
      return NotificationManager.warning('Complete all required fields');
    }

    if(uploadBody.identification === undefined && uploadBody.passportPhotograph === undefined){
      hideLoader();
      NotificationManager.warning('Passport & Means of Identification are required')
      return;
    }


    if(this.state.pageMode === 'edit'){
      try {
        const { userId } = this.state;
        if(btnType === 'submit'){
          const res = await httpPatch(`auth/edit_staff/${userId}`, this.state.data);
          if(res.code === 200){
            await this.saveDoc();
            hideLoader();
            // setState({ userId: res.data.id });
            // return this.props.history.push(`/create_staff/four/${res.data.id}`)
            return this.props.history.push({
              pathname: `/create_staff/two/${res.data.id}`,
              backurl: `/create_staff/one`,
              // savedState: this.state
              savedId: res.data.id
            });
          }
        } else {
          const { userId } = this.state;
          const res = await httpPatch(`auth/edit_staff/${userId}`, this.state.data);
          if(res.code === 200){
            await this.saveDoc()
            hideLoader();
          }
        }
      } catch(error){
        hideLoader();
        console.log(error)
      }
    } else {
      try{
        if(btnType === 'submit'){
          const res = await httpPost('auth/create_staff', this.state.data);
          if(res.code === 201){
            hideLoader();
            await this.setState({ userId: res.data.id });
            await this.saveDoc()
            // return this.props.history.push(`/create_staff/two/${res.data.id}`)
            return this.props.history.push({
              pathname: `/create_staff/two/${res.data.id}`,
              backurl: '/create_staff/one',
              // savedState: this.state,
              savedId: res.data.id,
              direction: 'forward'
            });
          }
        } else {
          const res = await httpPost('auth/create_staff', this.state.data);
          if(res.code === 201){
            await this.saveDoc()
            hideLoader();
          }
        }
      } catch (error){
        hideLoader();
        console.log(error)
      }
    }
  }

  upload = async (e, fileName) => {
    let { uploadBody } = this.state;
    const imageData = e.target.files[0];
    const validFormat = validateImage(imageData);
    if (validFormat.valid) {
      //NotificationManager.success(validFormat.message,'Yippe!',3000);
      // postBody[fileName] = [...postBody[fileName], e.target.files[0]];

      uploadBody[fileName] = e.target.files[0];
      this.setState({ uploadBody });
    } else {
      //NotificationManager.error(validFormat.message,'Yippe!',3000);
      e.target.value = '';
    }
  };

  saveDoc = async () => {
    try{
      const { uploadBody, userId, pageMode } = this.state;

      if(pageMode === 'create'){
        let formData = new FormData();
        formData.append('passportPhotograph', uploadBody.passportPhotograph);
        formData.append('identification', uploadBody.identification);

        const res = await httpPostFormData(`auth/onboarding_one_uploads/${userId}`, formData);
        if(res.code === 201){
          hideLoader();
        }
      } else {
        let formData = new FormData();
        formData.append('passportPhotograph', uploadBody.passportPhotograph);
        formData.append('identification', uploadBody.identification);

        const res = await httpPostFormData(`auth/edit_onboarding_one_uploads/${userId}`, formData);
        if(res.code === 201){
          hideLoader();
        }
      }
    }catch(error){
      hideLoader();
      console.log(error)
    }
  }

  deleteDoc = async (id) => {
    try{

      const res = await httpDelete(`auth/document/${id}`);

      if(res.code === 200){
        this.getUserDetails()
      }
    }catch(error){
      console.log(error)
    }

  }

  async componentDidMount(){
    if(this.props.location.direction === 'backward'){
      // get User details and save to state
      const { savedId } = this.props.location;
      await this.getUserDetails(savedId);
      this.setState({ userId: savedId, pageMode: 'edit' });
    }
    // if(this.state.pageMode === 'edit'){
    //   // get User details and save to state
    //   const id = 'f657d590-a27f-4f3c-b9a1-6f61a686bb4b';
    //   this.getUserDetails(id);
    //   this.setState({ userId: id, pageMode: 'edit' });
    // }
  }
  
  getUserDetails = async (id) => {
    try {
      const res = await httpGet(`auth/get_onboarding_one/${id}`);
      if(res.code === 200){
        const { 
          nationality, 
          mobilePhoneCode, 
          homePhoneCode, 
          maritalStatus, 
          religion, 
          dob, 
          staffCategory,
          skills,
          hobbies,
          stateOfOrigin,
          lga,
          currentCountry,
          currentState,
          currentLga,
          permanentCountry,
          permanentState,
          permanentLga
        } = res.data.user;
        const customNationality = { value: nationality, label: nationality};
        const customState = { value: stateOfOrigin, label: stateOfOrigin};
        const customLga = { value: lga, label: lga};
        const customCurrentCountry = { value: currentCountry, label: currentCountry};
        const customCurrentState = { value: currentState, label: currentState};
        const customCurrentLga = { value: currentLga, label: currentLga};
        const customPermanentCountry = { value: permanentCountry, label: permanentCountry};
        const customPermanentState = { value: permanentState, label: permanentState};
        const customPermanentLga = { value: permanentLga, label: permanentLga};
        const customMobile = { value: mobilePhoneCode, label: mobilePhoneCode };
        const customHome = { value: homePhoneCode, label: homePhoneCode };
        const customMaritalStatus = { value: maritalStatus, label: maritalStatus };
        const customReligion = { value: religion, label: religion };
        const customDob = moment(dob).toDate();
        const customStaffCategory = { value: staffCategory, label: staffCategory }
        let customSkills = [], customHobbies = [];
        const newSkills = skills !== null ? skills.split(',') : [];
        await newSkills.map(data => (
          customSkills.push({ value: data, label: data })
        ));
        const newHobbies = hobbies !== null ? hobbies.split(',') : [];
        await newHobbies.map(data => (
          customHobbies.push({ value: data, label: data })
        ));
        
        this.setState({
          data: res.data.user,
          customNationality,
          customState,
          customLga,
          customCurrentCountry,
          customCurrentState,
          customCurrentLga,
          customPermanentCountry,
          customPermanentState,
          customPermanentLga,
          customMobile,
          customHome,
          customMaritalStatus,
          customStaffCategory,
          customSkills,
          customHobbies,
          customReligion,
          customDob
        });
      }
    }catch(error){
      hideLoader();
      console.log(error)
    }
  }

  getLGA = (state) => {
    const lga = getLga(state) || [];
    return lga.map(data => (
      { value: data.name, label: data.name }
    ))
  }

  getStateOption = () => {
    if((this.state.data.nationality !== 'Nigeria') || !this.state.data.nationality){
      return (
        <input type="text" 
        className="form-control"
        name="stateOfOrigin"
        value={this.state.data.stateOfOrigin}
        onChange={this.handleChange}
      />
      )
    } else {
      return (
        <Select
          className="w-100 pr-0 pl-0 mr-1"
          options={stateLists2}
          onChange={e => this.handleCustomSelect(e, 'stateOfOrigin')}
          name="stateOfOrigin"
          value={this.state.customState}
          isSearchable="true"
          placeholder='Select Your State'
        />
      )
    }
  }

  getLgaOption = () => {
    if((this.state.data.nationality !== 'Nigeria') || !this.state.data.nationality){
      return (
        <input type="text" 
        className="form-control"
        name="lga"
        value={this.state.data.lga}
        onChange={this.handleChange}
      />
      )
    } else {
      return (
        <Select
        className=" w-100 pr-0 pl-0 mr-1"
        value={this.state.customLga}
        onChange={e => this.handleCustomSelect(e, 'lga')}
        options={this.getLGA(this.state.data.stateOfOrigin)}
        isSearchable='true'
        name="currentState"
        placeholder="Select Your Lga"
      />
      )
    }
  }

  getCurrentState = () => {
    if((this.state.data.currentCountry !== 'Nigeria') || !this.state.data.currentCountry){
      return (
        <input type="text"
        disabled={this.state.data.currentCountry === null ? "disabled" : ""}  
        className="form-control col-md-3 mr-1"
        name="currentState"
        placeholder="State"
        value={this.state.data.currentState}
        onChange={this.handleChange}
      />
      )
    } else {
      return (
        <Select
          className=" w-100 col-md-3 pr-0 pl-0 mr-1"
          value={this.state.customCurrentState}
          onChange={e => this.handleCustomSelect(e, 'currentState')}
          options={stateLists2}
          isSearchable="true"
          name="currentState"
        />
      )
    }
  }

  getCurrentLga = () => {
    if((this.state.data.currentCountry !== 'Nigeria') || !this.state.data.currentCountry){
      return (
        <input type="text"
        className="form-control col-md-3 mr-1"
        placeholder="Lga"
        name="currentLga" 
        value={this.state.data.currentLGA}
        onChange={this.handleChange}
        disabled={this.state.data.currentCountry === null ? "disabled" : ""}
      />
      )
    } else {
      return (
        <Select
          className=" w-100 col-md-3 pr-0 pl-0 mr-1"
          value={this.state.customCurrentLga}
          onChange={e => this.handleCustomSelect(e, 'currentLga')}
          options={this.getLGA(this.state.data.currentState)}
          isSearchable="true"
          name="currentLga"
        />
      )
    }
  }

  getPermanentState = () => {
    if((this.state.data.permanentCountry !== 'Nigeria') || !this.state.data.permanentCountry){
      return (
        <input type="text"
        disabled={this.state.data.permanentCountry === null ? "disabled" : ""}  
        className="form-control col-md-3 mr-1"
        name="permanentState"
        placeholder="State"
        value={this.state.data.permanentState}
        onChange={this.handleChange}
      />
      )
    } else {
      return (
        <Select
          className=" w-100 col-md-3 pr-0 pl-0 mr-1"
          defaultValue={this.state.customPermanentState}
          onChange={e => this.handleCustomSelect(e, 'permanentState')}
          options={stateLists2}
          isSearchable="true"
          name="permanentState"
        />
      )
    }
  }

  getPermanentLga = () => {
    if((this.state.data.permanentCountry !== 'Nigeria') || !this.state.data.permanentCountry){
      return (
        <input type="text"
        className="form-control col-md-3 mr-1"
        placeholder="Lga"
        name="permanentLga" 
        value={this.state.data.permanentLGA}
        onChange={this.handleChange}
        disabled={this.state.data.permanentCountry === null ? "disabled" : ""}
      />
      )
    } else {
      return (
        <Select
          className=" w-100 col-md-3 pr-0 pl-0 mr-1"
          defaultValue={this.state.customPermanentLga}
          onChange={e => this.handleCustomSelect(e, 'permanentLga')}
          options={this.getLGA(this.state.data.permanentState)}
          isSearchable="true"
          name="permanentLga"
        />
      )
    }
  }

  render() {
    const { data } = this.state;
    const newUploads = data.uploads !== undefined ? data.uploads : [];

    return (
      <Layout page="staff">
        <div className="app-content">
          <section className="section">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
              <li className="breadcrumb-item"><a href="#" className="text-muted">Staff</a></li>
              <li className="breadcrumb-item active text-" aria-current="page">New Staff</li>
            </ol>

						<div className="row">
							<div className="col-10">
								<div className="card">
									<div className="card-header">
                    <div className="col-md-12">
										  <h4>Personal Information</h4>
                    </div>
									</div>
									<div className="card-body">

                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
											<div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">First Name <span className="impt">*</span></label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="firstName"
                            defaultValue={this.state.data.firstName}
                            onChange={e => this.handleChange(e)}
                          />
                          <span className="text-danger">{this.state.firstNameErrorMessage !== null ? this.state.firstNameErrorMessage : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Middle Name</label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="middleName"
                            defaultValue={this.state.data.middleName}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.middleNameErrorMessage !== null ? this.state.middleNameErrorMessage : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                      <label for="inputName" className="col-md-2 col-form-label">Surname <span className="impt">*</span></label>
                      <div className="col-md-4">
                        <input type="text" 
                          className="form-control"
                          name="lastName"
                          defaultValue={this.state.data.lastName}
                          onChange={this.handleChange}
                        />
                        <span className="text-danger">{this.state.lastNameErrorMessage !== null ? this.state.lastNameErrorMessage : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Email Address <span className="impt">*</span></label>
                        <div className="col-md-4">
                          <input type="email" 
                            className="form-control"
                            name="email"
                            defaultValue={this.state.data.email}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.emailErrorMessage !== null ? this.state.emailErrorMessage : ''}</span>
												</div>
                      </div> 
											<div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Gender <span className="impt">*</span></label>
												<div className="col-md-4">
                          <label>
                            <input type="radio"
                              name="gender" 
                              className="minimal mr-2"
                              value="Male"
                              onChange={this.handleChange}
                              // onChange={() => this.setState({ data: { gender: 'Male'}, genderErrorMessage: null }) }
                              // checked={this.state.data.gender === 'Male' ? 'true' : ''}
                            />
                            Male
													</label>
													<label style={{ paddingLeft: '10px'}}>
                            <input type="radio"
                              name="gender" 
                              className="minimal mr-2"
                              value="Female"
                              onChange={this.handleChange}
                              // checked={this.state.data.gender === 'Female' ? 'true' : ''}
                            />
														Female
													</label>
                          <br/>
                          <span className="text-danger">{this.state.genderErrorMessage !== null ? this.state.genderErrorMessage : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Date of Birth <span className="impt">*</span></label>
                        <div className="col-md-4 c-date-picker">
                          <DatePicker
                            className="form-control"
                            selected={this.state.customDob}
                            onChange={e => this.handleCustomSelect(e, 'dob')}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="Click to select a date"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />
                          <br/>
                          <span className="text-danger">{this.state.dobErrorMessage !== null ? this.state.dobErrorMessage : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Nationality <span className="impt">*</span></label>
                        <div className="col-md-4">
                          <Select
                            value={this.state.customNationality}
                            onChange={e => this.handleCustomSelect(e, 'nationality')}
                            options={countryLists}
                            isSearchable="true"
                            name="country"
                            placeholder="Select"
                          />
                          <span className="text-danger">{this.state.nationalityErrorMessage !== null ? this.state.nationalityErrorMessage : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">State of Origin <span className="impt">*</span></label>
												<div className="col-md-4">
                          { this.getStateOption() }
                          <span className="text-danger">{this.state.state !== null ? this.state.state : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Lga <span className="impt">*</span></label>
                        <div className="col-md-4">
                          { this.getLgaOption() }
                          <span className="text-danger">{this.state.lgaErrorMessage !== null ? this.state.lgaErrorMessage : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Bvn</label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="bvn"
                            defaultValue={this.state.data.bvn}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.bvnErrorMessage !== null ? this.state.bvnErrorMessage : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Mobile Phone <span className="impt">*</span></label>
												<div className="col-md-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend select2-padding">
                            <Select
                              className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                              value={this.state.customMobile}
                              onChange={e => this.handleCustomSelect(e, 'mobilePhoneCode')}
                              options={countryCodes}
                              isSearchable="true"
                              name="mobilePhoneCode"
                              placeholder="Select"
                            />
                          </div>
                          <input 
                            type="text" 
                            class="form-control" 
                            aria-describedby="basic-addon3"
                            name="mobilePhone"
                            onChange={this.handleChange}
                            defaultValue={this.state.data.mobilePhone}
                          />
                        </div>
                          <span className="text-danger">{this.state.mobileErrorMessage !== null ? this.state.mobileErrorMessage : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Home Phone <span className="impt">*</span></label>
                        <div className="col-md-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend select2-padding">
                            <Select
                              className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                              value={this.state.customHome}
                              onChange={e => this.handleCustomSelect(e, 'homePhoneCode')}
                              options={countryCodes}
                              isSearchable="true"
                              name="homePhoneCode"
                              placeholder="Select"
                            />
                          </div>
                          <input type="text" 
                            className="form-control"
                            name="homePhone"
                            onChange={this.handleChange}
                            defaultValue={this.state.data.homePhone}
                          />
                        </div>
                          <span className="text-danger">{this.state.homeErrorMessage !== null ? this.state.homeErrorMessage : ''}</span>
												</div>
											</div>
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Marital Status <span className="impt">*</span></label>
												<div className="col-md-4">
                          <Select
                            className="form-control pt-0 pb-0 pr-0 pl-0 border-0 w-100"
                            value={this.state.customMaritalStatus}
                            onChange={e => this.handleCustomSelect(e, 'maritalStatus')}
                            options={[
                              { value: 'Single', label: 'Single' },
                              { value: 'Married', label: 'Married' },
                              { value: 'Divorced', label: 'Divorced' },
                              { value: 'Widowed', label: 'Widowed' },
                            ]}
                            placeholder="Select"
                            name="maritalStatus"
                          />
                          <span className="text-danger">{this.state.maritalErrorMessage !== null ? this.state.maritalErrorMessage : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Religion</label>
                        <div className="col-md-4">
                          <Select
                            className="pt-0 pb-0 pr-0 pl-0 border-0"
                            value={this.state.customReligion}
                            onChange={e => this.handleCustomSelect(e, 'religion')}
                            options={[
                              { value: 'Islam', label: 'Islam'},
                              { value: 'Christianity', label: 'Christianity'},
                              { value: 'Others', label: 'Others'}
                            ]}
                            name="religion"
                            placeholder="Select"
                          />
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">No of Dependants <span className="impt">*</span></label>
												<div className="col-md-4">
                          <input type="number" 
                            className="form-control"
                            name="noOfDependant"
                            defaultValue={this.state.data.noOfDependant !== null ? this.state.data.noOfDependant : 0}
                            // value={this.state.data.noOfDependant}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.dependantsErrorMessage !== null ? this.state.dependantsErrorMessage : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Staff Category <span className="impt">*</span></label>
												<div className="col-md-4">
                          <Select
                            className="pt-0 pb-0 pr-0 pl-0 border-0"
                            value={this.state.customStaffCategory}
                            onChange={e => this.handleCustomSelect(e, 'staffCategory')}
                            options={[
                              { value: 'Full time', label: 'Full time'},
                              { value: 'Contact', label: 'Contact'},
                              { value: 'Casual', label: 'Casual'},
                              { value: 'Consultant', label: 'Consultant'},
                              { value: 'Part time', label: 'Part time'},
                              { value: 'Probation', label: 'Probation'},
                              { value: 'FreeLancers', label: 'FreeLancers'}
                            ]}
                            name="staffCategory"
                            placeholder="Select"
                          />
                          <span className="text-danger">{this.state.staffCategoryErrorMessage !== null ? this.state.staffCategoryErrorMessage : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Hobbies</label>
												<div className="col-md-4">
                          <CreatableSelect
                            isMulti
                            value={this.state.customHobbies}
                            onChange={e => this.handleCustomSelect(e, 'hobbies')}
                            options={[
                              { value: "reading", label: 'reading', },
                              { value: "travelling", label: 'travelling', },
                              { value: "learning new things", label: 'learning new things', },
                            ]}
                            isSearchable="true"
                            name="hobbies"
                          />
                          <span className="text-danger">{this.state.errorMessage13 !== null ? this.state.errorMessage13 : ''}</span>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Skills</label>
												<div className="col-md-4">
                          <Select
                            isMulti
                            value={this.state.customSkills}
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
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">No of Immediate Family <span className="impt">*</span></label>
												<div className="col-md-4">
                          <input type="number" 
                            className="form-control"
                            name="noOfImmediateFamily"
                            defaultValue={this.state.data.noOfImmediateFamily !== null ? this.state.data.noOfImmediateFamily : 0}
                            // value={this.state.data.noOfDependant}
                            onChange={this.handleChange}
                          />
                          <span className="text-danger">{this.state.immediateFamilyErrorMessage !== null ? this.state.immediateFamilyErrorMessage : ''}</span>
												</div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 pr-0 col-form-label">Current Address <span className="impt">*</span></label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="currentAddress"
                            onChange={this.handleChange}
                            value={this.state.data.currentAddress}
                          />
                          <span className="text-danger">{this.state.currentErrorMessage !== null ? this.state.currentErrorMessage : ''}</span>
												</div>
                        <div className="col-md-6 pr-0">
                          <div className="row">

                            <Select
                              className="w-100 pr-0 pl-0 col-md-3 mr-1"
                              defaultValue={this.state.customCurrentCountry}
                              onChange={e => this.handleCustomSelect(e, 'currentCountry')}
                              options={countryLists}
                              isSearchable="true"
                              name="country"
                              placeholder="Country"
                            />
                            
                            { this.getCurrentState() }
                            { this.getCurrentLga() }
                            <input
                              type="text" 
                              name="currentCity" 
                              className="form-control w-100 col-md-2"
                              onChange={this.handleChange}
                              value={this.state.data.currentCity} 
                              placeholder="City"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Permanent Address <span className="impt">*</span></label>
												<div className="col-md-4">
                          <input type="text" 
                            className="form-control"
                            name="permanentAddress"
                            onChange={this.handleChange}
                            value={this.state.data.permanentAddress}
                          />
                          <span className="text-danger">{this.state.permanentErrorMessage !== null ? this.state.permanentErrorMessage : ''}</span>
												</div>
                        <div className="col-md-6 pr-0">
                          <div className="row">
                            <Select
                              className="w-100 pr-0 pl-0 col-md-3 mr-1"
                              value={this.state.customPermanentCountry}
                              onChange={e => this.handleCustomSelect(e, 'permanentCountry')}
                              options={countryLists}
                              isSearchable="true"
                              name="permanentCountry"
                              placeholder='Country'
                            />
                            { this.getPermanentState()}
                            { this.getPermanentLga() }
                            <input 
                              type="text"
                              name="permanentCity" 
                              className="form-control col-md-2 "
                              onChange={this.handleChange}
                              value={this.state.data.permanentCity} 
                              placeholder="City"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-group row">
                        <label for="inputName" className="col-md-2 col-form-label">Passport Photograph <span className="impt">*</span></label>
                        <div className="col-md-4">
                          <input type="file" 
                            className="form-control" 
                            name="path"
                            ref='path'
                            onChange={e => this.upload(e, 'passportPhotograph')}
                          />
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Means of Identification <span className="impt">*</span></label>
                        <div className="col-md-4">
                          <input type="file" 
                            className="form-control" 
                            name="path"
                            ref='iPath'
                            onChange={e => this.upload(e, 'identification')}
                          />
												</div>
											</div>

                      <div className="col col-md-12 pr-0 pl-0" style={this.state.pageMode !== 'edit' ? {display: 'none'} : {}}>
                      <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 text-nowrap">
                          <thead>
                          <tr>
                            {/* <th className="wd-15p">S/N</th> */}
                            <th class="wd-15p">File Name</th>
                            <th class="wd-15p"></th>
                            <th class="wd-25p"></th>
                          </tr>
                          </thead>
                          <tbody>
                            {
                              newUploads.length ?
                                newUploads.map(data => (
                                  <tr>
                                    <td>{data.fileName}</td>
                                    <td>{<a href={`${data.path}`} target="_blank">View document</a>}</td>
                                    <td><a className="ml-3 text-danger" onClick={() => this.deleteDoc(data.id)} style={{ cursor: 'pointer' }}>Delete</a></td>
                                  </tr>
                                )) : 'No document found'
                              }
                          </tbody>
                        </table>
                      </div>
                      </div>


                      <br/>
                      <br/>

                      <div className="form-group row mb-0 mt-2 text-right">
												<div className="col-md-12">
                          <button 
                            type="submit"
                            className="btn btn-info mr-5"
                            onClick={e => this.handleSubmit(e, 'save')}
                          ><span className="fa fa-save"></span> SAVE</button>
                          <button type="submit" 
                            className="btn btn-primary"
                            onClick={e => this.handleSubmit(e, 'submit')}
                          ><span className="fa fa-arrow-right"></span> {this.state.pageMode === 'create' ? 'NEXT' : 'UPDATE & CONTINUE'}</button>
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

export default PersonalInfo;

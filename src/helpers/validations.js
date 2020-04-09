import { NotificationManager } from 'react-notifications';
import { hideLoader } from './loader';
// const validatePersonalInfo = (body) => {
//   let {
//     firstName,
//     lastName,
//     middleName,
//     email,
//     mobilePhone,
//     homePhone,
//   } = body;

//   if()

//   if (!(/^[\d+-]{3,15}$/.test(mobilePhone))) {
//     return 'error'
//   }
// }


var validation = {
  isEmailAddress:function(str) {
      var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(str);  // returns a boolean
  },
  isNotEmpty:function (str) {
      var pattern =/\S+/;
      return pattern.test(str);  // returns a boolean
  },
  isNumber:function(str) {
      var pattern = /^\d+$/;
      return pattern.test(str);  // returns a boolean
  },
  isSame:function(str1,str2){
      return str1 === str2;
  },
  isPhoneNumber: (str) => {
    const pattern = /^[\d+-]{3,15}$/;
    return pattern.test(str);
  },
  isLetterOnly: (str) => {
    const pattern = /^[a-z]{2,40}$/i;
    return pattern.test(str);
  }
};


const validateData = (postData) => {
  const {
        firstName,
        lastName,
        middleName,
        email,
        mobilePhone,
        homePhone,
        nationality
      } = postData;



  if (firstName === '' || firstName === null || firstName === undefined || firstName.length < 3){
    NotificationManager.warning('First name cannot be less than 3 characters')
    return 'error';
  }

  if(!(validation.isLetterOnly(firstName))){
    NotificationManager.warning('First name should only contain alphabets')
    return 'error';
  }

  if (lastName === '' || lastName === null || lastName === undefined || lastName.length < 3){
    NotificationManager.warning('Last name cannot be less than 3 characters')
    return 'error';
  }

  if(!(validation.isLetterOnly(lastName))){
    NotificationManager.warning('Last name should only contain alphabets')
    return 'error';
  }

  if (middleName === '' || middleName === null || middleName === undefined || middleName.length < 3){
    NotificationManager.warning('Middle name cannot be less than 3 characters')
    return 'error';
  }

  if(!(validation.isLetterOnly(middleName))){
    NotificationManager.warning('Middle name should only contain alphabets')
    return 'error';
  }

  if(!(validation.isEmailAddress(email))){
    NotificationManager.warning('Please enter a valid email address')
    return 'error';
  }

  if(!(validation.isPhoneNumber(mobilePhone))){
    NotificationManager.warning('Mobile phone must be valid: 3 - 15 characters with +, - and only numbers')
    return 'error';
  }

  if(!(validation.isPhoneNumber(homePhone))){
    NotificationManager.warning('Home phone must be valid: 3 - 15 characters with +, - and only numbers')
    return 'error';
  }

  if (nationality === '' || nationality === null || nationality === undefined ){
    NotificationManager.warning('Nationality is required')
    return 'error';
  }
}

export default validateData;

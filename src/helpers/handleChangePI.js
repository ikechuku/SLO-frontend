// import React from 'react';

// export const handleChange = (e) => {
//   e.preventDefault();
//   console.log
//   const { data } = this.state;
//   let details = e.target;
//   if(details.name === 'noOfDependant'){
//     const isValidate = validateD(e.target.name, e.target.value);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage10: isValidate.errorMessage, 
//       })
//       return;
//     }
//     data[details.name] = parseInt(details.value);
//     this.setState({ data, errorMessage10: null });

//   } else if(details.name === 'currentAddress'){
//     data[details.name] = details.value;
//     this.setState({ data });
//     const isValidate = validateD(e.target.name, this.state.data.currentAddress);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage11: isValidate.errorMessage, 
//       })
//       return;
//     } else {
//       this.setState({ errorMessage11: null });
//     }

//   } else if(details.name === 'firstName') {
//     const isValidate = validateD(e.target.name, e.target.value);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage1: isValidate.errorMessage
//       })
//       return;
//     }
//     data[details.name] = details.value;
//     this.setState({ 
//       data,
//       errorMessage1: null 
//     });

//   } else if(details.name === 'lastName') {
//     const isValidate = validateD(e.target.name, e.target.value);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage2: isValidate.errorMessage, 
//       })
//       return;
//     }
//     data[details.name] = details.value;
//     this.setState({ 
//       data, 
//       errorMessage2: null 
//     });

//   } else if(details.name === 'middleName') {
//     const isValidate = validateD(e.target.name, e.target.value);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage3: isValidate.errorMessage,
//       })
//       return;
//     }
//     data[details.name] = details.value;
//     this.setState({ 
//       data,
//       errorMessage3: null 
//     });

//   } else if(details.name === 'email') {
//     const isValidate = validateD(e.target.name, e.target.value);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage4: isValidate.errorMessage, 
//       })
//       return;
//     }
//     data[details.name] = details.value;
//     this.setState({ 
//       data,
//       errorMessage4: null 
//     });

//   } if(details.name === 'mobilePhone') {
//     const isValidate = validateD(e.target.name, e.target.value);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage5: isValidate.errorMessage, 
//       })
//       return;
//     }
//     data[details.name] = details.value;
//     this.setState({ 
//       data,
//       errorMessage5: null 
//     });

//   } else if(details.name === 'homePhone') {
//     const isValidate = validateD(e.target.name, e.target.value);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage6: isValidate.errorMessage,
//       })
//       return;
//     }
//     data[details.name] = details.value;
//     this.setState({ 
//       data,
//       errorMessage6: null 
//     });
//   } else if(details.name === 'gender') {
//     const isValidate = validateD(e.target.name, e.target.value);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage9: isValidate.errorMessage,
//       })
//       return;
//     }
//     data[details.name] = details.value;
//     this.setState({ 
//       data,
//       errorMessage9: null 
//     });
//   } else {
//     data[details.name] = details.value;
//     this.setState({ 
//       data
//     });
//   }
// }


// export const handleCustomSelect = (result, name) => {
//   const { data } = this.state;
//   if(name === 'dob'){
//     data['dob'] = result;
//     this.setState({ 
//       data
//     })
//     const isValidate = validateD('dob', this.state.data.dob);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage8: isValidate.errorMessage,
//       })
//       return;
//     } else {
//       this.setState({ errorMessage8: null })
//     }
//   } else if(name === 'nationality'){
//     const isValidate = validateD('nationality', result.value);
//     if(!isValidate.error){
//       this.setState({ 
//         errorMessage7: isValidate.errorMessage, 
//       })
//       return;
//     }
//     data['nationality'] = result.value;
//     data['mobilePhoneCode'] = getDialCode(result.value);
//     data['homePhoneCode'] = getDialCode(result.value);
//     this.setState({ 
//       data, 
//       country: result.value, 
//       errorMessage7: null 
//     })
//   } else if(name === 'mobilePhoneCode'){
//     data[name] = result.value;
//     this.setState({ 
//       data,
//       mobilePhoneCode: result,
//     });
//   } else if(name === 'homePhoneCode'){
//     data[name] = result.value;
//     this.setState({ 
//       data,
//       homePhoneCode: result,
//     });
//   } else if(name === 'currentCountry'){
//     data[name] = result.value;
//     this.setState({ 
//       data,
//       currentCountry: result.value,
//     });
//   } else if(name === 'permanentCountry'){
//     data[name] = result.value;
//     this.setState({ 
//       data,
//       permanentCountry: result.value,
//     });
//   } else {
//     data[name] = result.value;
//     this.setState({ 
//       data
//     });
//   }
// }
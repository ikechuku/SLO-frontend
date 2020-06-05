import React, {Component} from 'react';
import Moment from 'react-moment';
import SweetAlert from 'react-bootstrap-sweetalert'
import moment from 'moment';
import $ from 'jquery';
import Select from 'react-select';
import {stateLists2} from './Info';
import Layout from '../layout/index';
import {httpPost, httpPatch, httpDelete, httpGet} from '../../actions/data.action';
import {hideLoader, showLoader} from '../../helpers/loader';
import {NotificationManager} from 'react-notifications';
import {validateGuarantorFields, validateD} from '../../helpers/validations';
import {slga, getLga} from '../../helpers/states';
import GuarantorTable from './GuarantorTable';
import {GuarantorModal} from '../Modals/Guarantor';
import {getDialCode} from '../../helpers/dailCodes';

class Guarantor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postData: {
                firstName: '',
                lastName: '',
                middleName: '',
                mobilePhone: '',
                homePhone: '',
                businessPhone: '',
                mobilePhoneCode: '',
                homePhoneCode: '',
                businessPhoneCode: '',
                relationship: '',
                occupation: '',
                residentialAddress: '',
                residentialCountry: '',
                residentialState: '',
                residentialLga: '',
                residentialCity: '',
                permanentAddress: '',
                permanentCountry: '',
                permanentState: '',
                permanentLga: '',
                permanentCity: '',
                landedPropertyAddress: '',
                landedPropertyCountry: '',
                landedPropertyState: '',
                landedPropertyLga: '',
                landedPropertyCity: '',
                businessAddress: '',
                businessCountry: '',
                businessState: '',
                businessLga: '',
                businessCity: '',
                maritalStatus: '',
                employeeKnownYear: '',
                employeeKnownMonth: '',
                employeeKnownDate: '',
                criminalHistory: '',
                nationality: '',
                state: '',
                lga: '',
                bvn: '',
                documentId: []
            },
            moreData: [],
            documents: [],
            pageMode: 'create',
            errorMessage1: null,
            errorMessage2: null,
            errorMessage3: null,
            errorMessage4: null,
            errorMessage5: null,
            errorMessage6: null,
            errorMessage7: null,
            modalMode: 'create',
            editIndex: null,
            userId: null,
            customSelect1: null,
            customSelect2: null,
            customSelect3: null,
            customSelect4: null,
            customSelect5: null,
            customKnownDate: null,
            customNationality: null,
            customState: null,
            customLga: null,
            customResidentialCountry: null,
            customResidentialState: null,
            customResidentialLga: null,
            customPermanentCountry: null,
            customPermanentState: null,
            customPermanentLga: null,
            customLandedPropertyCountry: null,
            customLandedPropertyState: null,
            customLandedPropertyLga: null,
            customBusinessCountry: null,
            customBusinessState: null,
            customBusinessLga: null,
            bvnErrorMessage: null,
						taken_occupation: [],
						alert: null
        }
    }

    handleChange = async (e, nameValue) => {
				const {postData} = this.state;
        let details = e !== null ? e.target : '';

        if (details.name === 'employeeKnownMonth') {
            if (postData.employeeKnownYear === '' || postData.employeeKnownYear === null) {
                postData['employeeKnownDate'] = `${details.value} months`;
                postData['employeeKnownMonth'] = details.value;
                this.setState({postData, errorMessage6: null})
            } else {
                postData['employeeKnownDate'] = `${postData.employeeKnownYear} and ${details.value}`;
                postData['employeeKnownMonth'] = details.value;
                this.setState({postData, errorMessage6: null})
            }
        } else if (details.name === 'employeeKnownYear') {
            if (postData.employeeKnownMonth === '' || postData.employeeKnownMonth === null) {
              {
                postData['employeeKnownDate'] = details.value;
                postData['employeeKnownYear'] = details.value;
                this.setState({postData, errorMessage7: null})
              }
            } else {
                postData['employeeKnownDate'] = `${details.value} and ${postData.employeeKnownMonth}`;
                postData['employeeKnownYear'] = details.value;
                this.setState({postData, errorMessage7: null})
            }
        } else if (details.name === 'criminalHistory') {
            let value;
            if (details.value === "true") {
                value = true;
            } else {
                value = false;
            }
            postData[e.target.name] = value;
            this.setState({postData});
        } else if (details.name === 'firstName') {
            postData[details.name] = details.value;
            this.setState({
                postData
            })
            const isValidate = await validateGuarantorFields(details.name, this.state.postData.firstName);
            if (!isValidate.error) {
                this.setState({
                    errorMessage1: isValidate.errorMessage,
                })
                return;
            } else {
                this.setState({errorMessage1: null})
            }
        } else if (details.name === 'lastName') {
            postData[details.name] = details.value;
            this.setState({
                postData
            })
            const isValidate = await validateGuarantorFields(e.target.name, this.state.postData.lastName);
            if (!isValidate.error) {
                this.setState({
                    errorMessage2: isValidate.errorMessage,
                })
                return;
            } else {
                this.setState({errorMessage2: null});
            }
        } else if (details.name === 'middleName') {
            postData[details.name] = details.value;
            this.setState({
                postData
            })
            const isValidate = await validateGuarantorFields(e.target.name, this.state.postData.middleName);
            if (!isValidate.error) {
                this.setState({
                    errorMessage3: isValidate.errorMessage,
                })
                return;
            } else {
                this.setState({errorMessage3: null})
            }
        } else if (details.name === 'mobilePhone') {
            postData[details.name] = details.value;
            this.setState({
                postData
            })
            let test = false
            this.state.moreData.map(item => {
                if (item.mobilePhone === details.value) {
                    test = true;
                }
            })
            const isValidate = await validateGuarantorFields(e.target.name, this.state.postData.mobilePhone);
            if (!isValidate.error) {
                this.setState({
                    errorMessage4: isValidate.errorMessage,
                })
                return;
            } else if (test) {
                this.setState({
                    errorMessage4: "Contact number already used",
                })
            } else {
                this.setState({errorMessage4: null})
            }
        } else if (details.name === 'homePhone') {
            postData[details.name] = details.value;
            this.setState({
                postData
            })
            let test = false;
            this.state.moreData.map(item => {
                if (item.homePhone === details.value) {
                    test = true;
                }
            })
            const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
            if (!isValidate.error) {
                this.setState({
                    errorMessage5: isValidate.errorMessage,
                })
                return;
            } else if (test) {
                this.setState({
                    errorMessage5: "Contact number already used",
                })
                return
            } else {
                this.setState({errorMessage5: null})
            }
        } else if (details.name === 'businessPhone') {
            postData[details.name] = details.value;
            this.setState({
                postData
            })
            let test = false;
            this.state.moreData.map(item => {
                if (item.businessPhone === details.value) {
                    test = true;
                }
            })
            const isValidate = await validateGuarantorFields(e.target.name, e.target.value);
            if (!isValidate.error) {
                this.setState({
                    errorMessage6: isValidate.errorMessage,
                })
                return;
            } else if (test) {
                this.setState({
                    errorMessage6: "Contact number already used",
                })
            } else {
                this.setState({errorMessage6: null})
            }
        } else if (details.name === 'bvn') {
            postData[details.name] = details.value;
            this.setState({ postData });
            const isValidate = validateD(e.target.name, e.target.value);
            if(!isValidate.error){
              this.setState({ 
                bvnErrorMessage: isValidate.errorMessage, 
              })
              return;
            } else {
                this.setState({ bvnErrorMessage: null });
            }
        } else {
            postData[details.name] = details.value;
            this.setState({postData});
        }
    }

    handleCustomSelect = (result, name) => {
				const {postData} = this.state;
        const value = result !== null ? result.value : ''
        if (name === 'mobilePhoneCode') {
            postData[name] = value;
            this.setState({
                postData, customSelect1: result
            });
            // this.setState(state => {
            //   return {
            // 		...state,
            //     selected1: value
            //   };
            // });
        } else if (name === 'homePhoneCode') {
            postData[name] = value;
            this.setState({
                postData, customSelect2: result
            });
        } else if (name === 'businessPhoneCode') {
            postData[name] = value;
            this.setState({
                postData, customSelect3: result
            });
        } else if (name === 'relationship') {
            postData[name] = value;
            this.setState({
                postData, customSelect4: result
            });
        } else if (name === 'occupation') {
            postData[name] = value;
            this.setState({
                postData, customSelect5: result
            });
        } else if (name === 'residentialCountry') {
            postData[name] = value;
            this.setState({
                postData, customSelect6: result
            });
        } else if (name === 'residentialState') {
            postData[name] = value;
            this.setState({
                postData, customResidentialState: result,
                customResidentialLga: null
            });
        } else if (name === 'residentialLga') {
            postData[name] = value;
            this.setState({
                postData, customResidentialLga: result
            });
        } else if (name === 'permanentCountry') {
            postData[name] = value;
            this.setState({
                postData, customPermanentCountry: result
            });
        } else if (name === 'permanentState') {
            postData[name] = value;
            this.setState({
                postData, customPermanentState: result,
                customPermanentLga: null
            });
        } else if (name === 'permanentLga') {
            postData[name] = value;
            this.setState({
                postData, customPermanentLga: result
            });
        } else if (name === 'landedPropertyCountry') {
            postData[name] = value;
            this.setState({
                postData, customSelect7: result
            });
        } else if (name === 'landedPropertyState') {
            postData[name] = value;
            this.setState({
                postData, customLandedPropertyState: result,
                customLandedPropertyLga: null
            });
        } else if (name === 'landedPropertyLga') {
            postData[name] = value;
            this.setState({
                postData, customLandedPropertyLga: result
            });
        } else if (name === 'businessCountry') {
            postData[name] = value;
            this.setState({
                postData, customSelect8: result
            });
        } else if (name === 'businessState') {
            postData[name] = value;
            this.setState({
                postData, customBusinessState: result,
                customBusinessLga: null
            });
        } else if (name === 'businessLga') {
            postData[name] = value;
            this.setState({
                postData, customBusinessLga: result
            });
        } else if (name === 'nationality') {
            postData[name] = value;
            const customCode = getDialCode(value);
            postData['mobilePhoneCode'] = customCode.value
            postData['homePhoneCode'] = customCode.value;
            postData['businessPhoneCode'] = customCode.value;
            this.setState({
                postData, customNationality: result,
                customSelect1: customCode, customSelect2: customCode, customSelect3: customCode
            });
        } else if (name === 'state') {
            postData[name] = value;
            postData['lga'] = '';
            this.setState({
                postData, customState: result, customLga: null
            });
        } else if (name === 'lga') {
            postData[name] = value;
            this.setState({
                postData, customLga: result
            });
        } else {
            postData[name] = value;
            this.setState({
                postData
            });
        }

        // postData[name] = value;
        // this.setState({
        // 	postData
        // });
    }

    collectDocument = (document, id) => {
			const { postData } = this.state;
      postData['documentId'] = [...postData.documentId, id];
        this.setState({ 
          documents: [...this.state.documents, document],
          postData
        })
		}
		
		deleteDoc = async (id) => {
			try {
				const { postData } = this.state;
				const res = await httpDelete(`auth/document/${id}`);
				if (res.code === 200) {
					postData['documentId'] = [...this.state.postData.documentId].filter(item => item !== id);
					this.setState({
						documents: [...this.state.documents].filter(item => item.id !== id),
						postData
					});
				}
			} catch (error) {
				console.log(error)
			}
		}

    addMore = async (event) => {
        event.preventDefault();
        const {
            firstName,
            lastName,
            middleName,
            mobilePhone,
            mobilePhoneCode,
            homePhone,
            businessPhone,
            relationship,
            occupation,
            nationality,
            state,
            lga,
            residentialAddress,
            residentialCountry,
            residentialState,
            residentialLga,
            residentialCity,
            permanentAddress,
            permanentCountry,
            permanentState,
            permanentLga,
            permanentCity,
            businessAddress,
            businessCountry,
            businessState,
            businessLga,
            businessCity,
            landedPropertyAddress,
            maritalStatus,
            employeeKnownYear,
            employeeKnownMonth,
            criminalHistory,
            details,
            documentId
        } = this.state.postData;

        console.log(this.state.postData)

        // if (firstName === '' || firstName === undefined ||
        //     lastName === '' || lastName === undefined ||
        //     mobilePhone === '' || mobilePhone === undefined ||
        //     mobilePhoneCode === '' || mobilePhoneCode === undefined ||
        //     residentialAddress === '' || residentialAddress === undefined ||
        //     residentialCountry === '' || residentialCountry === undefined ||
        //     residentialState === '' || residentialState === undefined ||
        //     residentialLga === '' || residentialLga === undefined ||
        //     residentialCity === '' || residentialCity === undefined ||
        //     permanentAddress === '' || permanentAddress === undefined ||
        //     permanentCountry === '' || permanentCountry === undefined ||
        //     permanentState === '' || permanentState === undefined ||
        //     permanentLga === '' || permanentLga === undefined ||
        //     permanentCity === '' || permanentCity === undefined ||
        //     businessAddress === '' || businessAddress === undefined ||
        //     businessCountry === '' || businessCountry === undefined ||
        //     businessState === '' || businessState === undefined ||
        //     businessLga === '' || businessLga === undefined ||
        //     businessCity === '' || businessCity === undefined ||
        //     nationality === '' || nationality === undefined ||
        //     state === '' || state === undefined ||
        //     lga === '' || lga === undefined ||
        //     occupation === '' || occupation === undefined ||
        //     relationship === '' || relationship === undefined ||
        //     maritalStatus === '' || maritalStatus === undefined ||
        //     employeeKnownYear === '' || employeeKnownYear === undefined ||
        //     employeeKnownMonth === '' || employeeKnownMonth === undefined ||
        //     criminalHistory === '' || criminalHistory === undefined) {
        //     return NotificationManager.warning('All fields are required');
        // }

        // if (criminalHistory !== '' || criminalHistory !== undefined) {
        //     if (criminalHistory) {
        //         if (details === '' || details === undefined) {
        //             return NotificationManager.warning('All fields are required');
        //         }
        //     }
        // }
        
        if(!documentId.length){
          return NotificationManager.warning('Upload documents are required');
        }

        if (this.state.modalMode === 'edit') {
            await this.setState({moreData: [...this.state.moreData].filter((data, index) => index !== parseInt(this.state.editIndex))})
            this.setState({
                moreData: [...this.state.moreData, this.state.postData],
            });
        } else {
            this.setState({
                moreData: [...this.state.moreData, this.state.postData],
                taken_occupation: [occupation, ...this.state.taken_occupation]
            });
        }

        this.setState({
            postData: {
                firstName: '',
                lastName: '',
                middleName: '',
                mobilePhone: '',
                homePhone: '',
                businessPhone: '',
                mobilePhoneCode: '',
                homePhoneCode: '',
                businessPhoneCode: '',
                relationship: '',
                occupation: '',
                nationality: '',
                state: '',
                lga: '',
                bvn: '',
                permanentAddress: '',
                permanentCountry: '',
                permanentState: '',
                permanentLga: '',
                permanentCity: '',
                residentialAddress: '',
                residentialCountry: '',
                residentialState: '',
                residentialLga: '',
                residentialCity: '',
                landedPropertyAddress: '',
                landedPropertyCountry: '',
                landedPropertyState: '',
                landedPropertyLga: '',
                landedPropertyCity: '',
                businessAddress: '',
                businessCountry: '',
                businessState: '',
                businessLga: '',
                businessCity: '',
                maritalStatus: '',
                employeeKnownDate: '',
                employeeKnownYear: '',
                employeeKnownMonth: '',
                criminalHistory: '',
                documentId: [],
                details: ''
            },
            documents: [],
            modalMode: 'create',
            editIndex: null,
            customSelect1: null,
            customSelect2: null,
            customSelect3: null,
            customSelect4: null,
            customSelect5: null,
            customSelect6: null,
            customSelect7: null,
            customSelect8: null,
            customNationality: null,
            customState: null,
            customLga: null,
            customResidentialCountry: null,
            customResidentialState: null,
            customResidentialLga: null,
            customPermanentCountry: null,
            customPermanentState: null,
            customPermanentLga: null,
            customLandedPropertyCountry: null,
            customLandedPropertyState: null,
            customLandedPropertyLga: null,
            customBusinessCountry: null,
            customBusinessState: null,
            customBusinessLga: null,
        });
        
        $('#select-file').val('');
        $('.modal').modal('hide');
        $(document.body).removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    // getDocumentByIds = () => {
    //   try{

    //   }catch(error){
    //     console.log(error)
    //   }
    // }

    handleEdit = async (indexValue) => {
        const {id} = this.props.match.params;
        await this.setState({
            postData: [...this.state.moreData].filter((data, index) => index === parseInt(indexValue))[0],
            editIndex: indexValue, modalMode: 'edit', userId: id
        });

        const {
          mobilePhoneCode, homePhoneCode, businessPhoneCode,
          relationship, occupation, residentialCountry, landedPropertyCountry,
          businessCountry, nationality, state, lga, residentialState, residentialLga,
          permanentCountry, permanentState, permanentLga, landedPropertyState, landedPropertyLga,
          businessState, businessLga, employeeKnownDate, documentId
        } = this.state.postData;

        // console.log(documentId);
        // return;
        const postDocument = { documentId };
        try {
          const res = await httpPost('auth/guarantor_docs', postDocument);
          if(res.code === 200){
            this.setState({ documents: res.data.documents });
          }
        }catch(error){
          console.log(error);
          return;
        }

        const customSelect1 = {value: mobilePhoneCode, label: mobilePhoneCode};
        const customSelect2 = {value: homePhoneCode, label: homePhoneCode};
        const customSelect3 = {value: businessPhoneCode, label: businessPhoneCode};
        const customSelect4 = {value: relationship, label: relationship};
        const customSelect5 = {value: occupation, label: occupation};
        const customSelect6 = {value: residentialCountry, label: residentialCountry};
        const customSelect7 = {value: landedPropertyCountry, label: landedPropertyCountry};
        const customSelect8 = {value: businessCountry, label: businessCountry};
        const customKnownDate = moment(employeeKnownDate).toDate();
        const customNationality = {value: nationality, label: nationality};
        const customState = {value: state, label: state};
        const customLga = {value: lga, label: lga};
        const customResidentialState = {value: residentialState, label: residentialState};
        const customResidentialLga = {value: residentialLga, label: residentialLga};
        const customPermanentCountry = {value: permanentCountry, label: permanentCountry};
        const customPermanentState = {value: permanentState, label: permanentState};
        const customPermanentLga = {value: permanentLga, label: permanentLga};
        const customLandedPropertyState = {value: landedPropertyState, label: landedPropertyState};
        const customLandedPropertyLga = {value: landedPropertyLga, label: landedPropertyLga};
        const customBusinessState = {value: businessState, label: businessState};
        const customBusinessLga = {value: businessLga, label: businessLga};
        this.setState({
            customSelect1,
            customSelect2,
            customSelect3,
            customSelect4,
            customSelect5,
            customSelect6,
            customSelect7,
            customSelect8,
            customKnownDate,
            customNationality,
            customLga,
            customState,
            customResidentialState,
            customResidentialLga,
            customPermanentCountry,
            customPermanentState,
            customPermanentLga,
            customLandedPropertyState,
            customLandedPropertyLga,
            customBusinessState,
            customBusinessLga
        });
    }

    removeMore = (value, id) => {
        if (this.state.pageMode === 'create') {
            // this.setState({
            //     moreData: this.state.moreData.filter((interest, index) => index !== parseInt(value))
            // });
          this.handleDelete(id, value)
        } else {
            this.handleDelete(id, value)
        }
    }

    handleDelete = async (id, indexValue) => {
        try {
            const res = await httpDelete(`auth/delete_guarantor/${id}`);
            if (res.code === 200) {
                this.setState({
                    moreData: this.state.moreData.filter((interest, index) => index !== parseInt(indexValue))
                })
            }
            this.setState({
              moreData: this.state.moreData.filter((interest, index) => index !== parseInt(indexValue))
          })
        } catch (error) {
            console.log(error)
        }
    }

    closeModal = () => {

        // $('#select-file').val('');
        document.getElementById("select-file").value = null;


        this.setState({
            postData: {
                firstName: '',
                lastName: '',
                middleName: '',
                mobilePhone: '',
                homePhone: '',
                businessPhone: '',
                mobilePhoneCode: '',
                homePhoneCode: '',
                businessPhoneCode: '',
                relationship: '',
                occupation: '',
                residentialAddress: '',
                residentialCountry: '',
                residentialState: '',
                residentialLga: '',
                residentialCity: '',
                permanentAddress: '',
                permanentCountry: '',
                permanentState: '',
                permanentLga: '',
                permanentCity: '',
                landedPropertyAddress: '',
                landedPropertyCountry: '',
                landedPropertyState: '',
                landedPropertyLga: '',
                landedPropertyCity: '',
                businessAddress: '',
                businessCountry: '',
                businessState: '',
                businessLga: '',
                businessCity: '',
                maritalStatus: '',
                employeeKnownDate: '',
                employeeKnownYear: '',
                employeeKnownMonth: '',
                criminalHistory: '',
                nationality: '',
                state: '',
                lga: '',
								bvn: '',
								details: '',
								documentId: []
						},
						documents: [],
            modalMode: 'create',
            editIndex: null,
            customSelect1: null,
            customSelect2: null,
            customSelect3: null,
            customSelect4: null,
            customSelect5: null,
            customSelect6: null,
            customSelect7: null,
            customSelect8: null,
            customNationality: null,
            customState: null,
            customLga: null,
            customResidentialState: null,
            customResidentialLga: null,
            customPermanentCountry: null,
            customPermanentState: null,
            customPermanentLga: null,
            customLandedPropertyState: null,
            customLandedPropertyLga: null,
            customBusinessState: null,
            customBusinessLga: null,
            errorMessage1: null,
            errorMessage2: null,
            errorMessage3: null,
            errorMessage4: null,
            errorMessage5: null,
            errorMessage6: null,
            errorMessage7: null,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state.postData);
        try {
            const {id} = this.props.match.params;

            if (this.state.moreData.length < 2) {
                return NotificationManager.warning('A minimum of 2 Guarantors is required')
            }

            if (this.state.pageMode === 'edit') {
                showLoader();
                const res = await httpPatch(`auth/edit_onboarding_three/${id}`, this.state.moreData);
                if (res.code === 200) {
                    hideLoader();
                    // this.setState({ moreData: res.data.guarantor });

                    // NotificationManager.success('Completed Successfully', 'Onboarding Status')
                    const getAlert = () => (
											<SweetAlert 
												success 
												title="Onboarding Status" 
												onConfirm={() => this.hideAlert()}
											>
												Completed Successfully
											</SweetAlert>
										);
								
										this.setState({
											alert: getAlert()
										});
                }
            } else {
                showLoader();
                const res = await httpPost(`auth/onboarding_three/${id}`, this.state.moreData);
                if (res.code === 200) {
										hideLoader();
										const getAlert = () => (
											<SweetAlert 
												success 
												title="Onboarding Status" 
												onConfirm={() => this.hideAlert()}
											>
												Completed Successfully
											</SweetAlert>
										);
								
										this.setState({
											alert: getAlert()
										});
                    // NotificationManager.success('Completed Successfully', 'Onboarding Status')
                }
            }

        } catch (error) {
            hideLoader()
            console.log(error)
        }
		}
		
		hideAlert() {
			this.setState({
				alert: null
			});
			this.props.history.push('/logout');
		}

    // handleSave = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const {id} = this.props.match.params;

    //         if (this.state.moreData.length < 2) {
    //             return NotificationManager.warning('A minimum of 3 Guarantors is required')
    //         }

    //         if (this.state.pageMode === 'edit') {
    //             showLoader();
    //             const res = await httpPatch(`auth/edit_onboarding_three/${id}`, this.state.moreData);
    //             if (res.code === 201) {
		// 								hideLoader();
		// 								const getAlert = () => (
		// 									<SweetAlert 
		// 										success 
		// 										title="Onboarding Status" 
		// 										onConfirm={() => this.hideAlert()}
		// 									>
		// 										Completed Successfully
		// 									</SweetAlert>
		// 								);
								
		// 								this.setState({
		// 									alert: getAlert()
		// 								});
    //                 this.setState({moreData: res.data.guarantor});
    //             }
    //         } else {
    //             showLoader();
    //             const res = await httpPost(`auth/onboarding_three/${id}`, this.state.moreData);
    //             if (res.code === 201) {
		// 								hideLoader();
		// 								const getAlert = () => (
		// 									<SweetAlert 
		// 										success 
		// 										title="Onboarding Status" 
		// 										onConfirm={() => this.hideAlert()}
		// 									>
		// 										Completed Successfully
		// 									</SweetAlert>
		// 								);
								
		// 								this.setState({
		// 									alert: getAlert()
		// 								});
    //                 this.setState({moreData: res.data.guarantor});
    //             }
    //         }
    //     } catch (error) {
    //         hideLoader();
    //         console.log(error)
    //     }
    // }

    handleBackButton = () => {
        const {id} = this.props.match.params;
        return this.props.history.push({
            pathname: `/create_staff/two/${id}`,
            savedId: this.props.location.savedId,
            direction: 'backward'
        })
    }

    componentDidMount() {
      const {id} = this.props.match.params;
      if (this.props.location.direction === 'backward') {
          this.setState({userId: this.props.location.savedId, pageMode: 'edit'});
          this.getUserDetails(this.props.location.savedId || id)
      } else if (this.props.location.direction === 'completeOnboarding') {
          this.setState({pageMode: 'completeOnboarding'});
      }
      this.getUserDetails(id)
    }

    getUserDetails = async (id) => {
        try {
            showLoader()
            const res = await httpGet(`auth/get_onboarding_three/${id}`)
            if (res.code === 200) {
                hideLoader();
                this.setState({
                    moreData: res.data.guarantor,
                    pageMode: 'edit'
                })
            }
        } catch (error) {
            hideLoader();
            console.log(error)
        }
    }

    getLGA = (state) => {
        const lga = getLga(state) || [];
        return lga.length ? lga.map(data => (
            <option value={`${data.name}`}>{data.name}</option>
        )) : <option value="">LGA</option>
    }

    handleAdd = () => {
        const {id} = this.props.match.params;
        this.setState({userId: id})
    }

    occupationOptions = () => {
        const options = [{value: 'Civil Servant', label: 'Civil Servant'},
            {value: 'Clergy', label: 'Clergy'},
            {value: 'Business person', label: 'Business person'}];
        const get_value = [];
        this.state.moreData.map(item => {
            get_value.push(item.occupation)
        });
        const new_option = [];
        options.filter(item => {
            (!get_value.includes(item.value)) && new_option.push(item)
        });
        return new_option
    }

    homePhoneOptions = () => {

    };


    render() {
      return (
        <Layout page='guarantor'>
          {this.state.alert}
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
                                <div className="card-header custom-header">
                                    <div className="row col-12">
                                        <h4 className="col col-md-6">Guarantor Information</h4>
                                        <div className="col col-md-6 text-right pr-0"
                                              style={this.state.pageMode === 'completeOnboarding' ? {display: 'none'} : {}}>
                                            <button className="cursor-pointer btn btn-primary"
                                                    onClick={this.handleBackButton}><i className="fa fa-arrow-left"
                                                                                        aria-hidden="true"></i> Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {
                                        <GuarantorTable
                                            moreData={this.state.moreData}
                                            removeMore={this.removeMore}
                                            handleEdit={this.handleEdit}
                                        />
                                    }

                                    {(this.state.moreData.length === 3) ? (
                                        ''
                                    ) : (
                                        <div className="card-header custom-header">
                                            <a className="add-link " data-toggle="modal"
                                                data-target="#guarantorModal"
                                                onClick={this.handleAdd}><span className="fa fa-plus"></span> Add
                                                Guarantor</a>
                                        </div>
                                    )}


                                    <div className="form-group mb-0 mt-5 row text-right">
                                        <div className="col-md-12">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                onClick={this.handleSubmit}
                                            ><i className="fa fa-save"></i> {this.state.pageMode === 'create' ? 'SUBMIT' : 'UPDATE & CONTINUE'}
                                            </button>
                                            {/* <button
                                                type="submit"
                                                className="btn btn-primary"
                                                onClick={this.handleSubmit}
                                            ><i className="fa fa-arrow-right"></i> NEXT
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


            </section>
        </div>
      <GuarantorModal
          mainCustomState={this.state}
          handleChange={this.handleChange}
          addMore={this.addMore}
          passDocument={this.collectDocument}
          postData={this.state.postData}
          documents={this.state.documents}
          getLGA={this.getLGA}
          userId={this.state.userId}
          handleCustomSelect={this.handleCustomSelect}
          customSelect1={this.state.customSelect1}
          customSelect2={this.state.customSelect2}
          customSelect3={this.state.customSelect3}
          customSelect4={this.state.customSelect4}
          customSelect5={this.state.customSelect5}
          customSelect5Values={this.occupationOptions()}
          customSelect6={this.state.customSelect6}
          customSelect7={this.state.customSelect7}
          customSelect8={this.state.customSelect8}
          errorMessage1={this.state.errorMessage1}
          errorMessage2={this.state.errorMessage2}
          errorMessage3={this.state.errorMessage3}
          errorMessage4={this.state.errorMessage4}
          errorMessage5={this.state.errorMessage5}
          errorMessage6={this.state.errorMessage6}
          errorMessage7={this.state.errorMessage7}
          customKnownDate={this.state.customKnownDate}
          customNationality={this.state.customNationality}
          customPermanentCountry={this.state.customPermanentCountry}
          getStateOption={this.getStateOption}
          getLgaOption={this.getLgaOption}
          getResidentialStateOption={this.getResidentialStateOption}
          getResidentialLgaOption={this.getResidentialLgaOption}
          getPermanentStateOption={this.getPermanentStateOption}
          getPermanentLgaOption={this.getPermanentLgaOption}
          getLandedPropertyStateOption={this.getLandedPropertyStateOption}
          getLandedPropertyLgaOption={this.getLandedPropertyLgaOption}
          getBusinessStateOption={this.getBusinessStateOption}
          getBusinessLgaOption={this.getBusinessLgaOption}
          modalMode={this.state.modalMode}
          closeModal={this.closeModal}
          bvnErrorMessage={this.state.bvnErrorMessage}
          deleteDoc={this.deleteDoc}
        />
      </Layout>
    )
  }
}

export default Guarantor;

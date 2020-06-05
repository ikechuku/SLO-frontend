import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layout/index';
import { httpPostFormData } from '../../../actions/data.action';
import validateImage from '../../../helpers/validateImage';

class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {
      fileName: '',
      postBody: {
        passportPhoto: [],
        guarantorSignedDocument: [],
        identityForm: [],
        certificates: []
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  upload = async e => {
    const { fileName, postBody } = this.state;
    console.log(fileName)
    const imageData = e.target.files[0];
    const validFormat = validateImage(imageData);
    if (validFormat.valid) {
      //NotificationManager.success(validFormat.message,'Yippe!',3000);
      postBody[fileName] = [...postBody[fileName], e.target.files[0]];
      this.setState({ postBody });

    } else {
      //NotificationManager.error(validFormat.message,'Yippe!',3000);
      e.target.value = '';
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.postBody);
    try{
      const { id } = this.props.match.params;
      const { postBody } = this.state;

      let formData = new FormData();

      if(postBody.passportPhoto.length){
        for(var i = 0; i < postBody.passportPhoto.length; i++) {
          formData.append('passportPhoto', postBody.passportPhoto[i]);
        }
      }

      if(postBody.guarantorSignedDocument.length){
        for(var i = 0; i < postBody.guarantorSignedDocument.length; i++) {
          formData.append('guarantorSignedDocument', postBody.guarantorSignedDocument[i]);
        }
      }

      if(postBody.identityForm.length){
        for(var i = 0; i < postBody.identityForm.length; i++) {
          formData.append('identityForm', postBody.identityForm[i]);
        }
      }

      if(postBody.certificates.length){
        for(var i = 0; i < postBody.certificates.length;i++) {
          formData.append('certificates', postBody.certificates[i]);
        }
      }

      const res = await httpPostFormData(`auth/onboarding_five/${id}`, formData);
      if(res.code === 201){
        // setState({ userId: res.data.id });
        return this.props.history.push('/staff_list');
      }
      console.log(res)
    } catch (error){
      console.log(error)
    }
  }


  render() {
    return (
      <Layout>
        <div className="app-content">
          <section className="section">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
              <li className="breadcrumb-item"><a href="#" className="text-muted">Staff</a></li>
              <li className="breadcrumb-item active text-" aria-current="page">New Staff</li>
            </ol>

            <div className="row">
							<div className="col-12">
								<div className="card">
									<div className="card-header">
										<h4>Upload</h4>
									</div>
									<div className="card-body">

                    <form className="form-horizontal" >
											<div className="form-group row">
												<label for="inputName" className="col-md-2 col-form-label">Document Type</label>
												<div className="col-md-3">
                          <select 
                            className="form-control w-100"
                            name='fileName' 
                            onChange={this.handleChange}
                          >
                            <option value="">Select File</option>
														<option value="passportPhoto">Passport photo</option>
														<option value="guarantorSignedDocument">Guarantor's signed document</option>
														<option value="identityForm">Identity form</option>
                            <option value="certificates">Certificates</option>
													</select>
												</div>
                        <label for="inputName" className="col-md-2 col-form-label">Upload Document</label>
                        <div className="col-md-3">
                          <input type="file" 
                            className="form-control" 
                            name="path"
                            onChange={this.upload}
                          />
												</div>
											</div>
                    </form>

                    <br/>
                    <br/>
                    <br/>


                    <div>
                    <div className="form-group row justify-content-center">
                        <div className="col-md-2">File Name* </div>
                        <div className="col-md-5 ml-0 pl-0">
                          <Link></Link>
                          <Link className="ml-3 text-danger"></Link>
                        </div>
											</div>
											<div className="form-group row justify-content-center">
                        <div className="col-md-2">Passport photo</div>
                        <div className="col-md-5 ml-0 pl-0">
                          <Link>View document</Link>
                          <Link className="ml-3 text-danger">Delete</Link>
                        </div>
											</div>
                      <div className="form-group row justify-content-center">
                        <div className="col-md-2">Identity form</div>
                        <div className="col-md-5 ml-0 pl-0">
                          <Link>View document</Link>
                          <Link className="ml-3 text-danger">Delete</Link>
                        </div>
											</div>
                    </div>


                    <div className="form-group mb-0 mt-2 row justify-content-end">
												<div className="col-md-9">
                          <button 
                            type="submit"
                            className="btn btn-info mr-5"
                            // onClick={() => this.props.history.push('/create_staff/two')}
                            onClick={this.handleSubmit}
                          >NEXT</button>
													<button type="submit" className="btn btn-primary">SAVE</button>
												</div>
											</div>


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

export default Upload;

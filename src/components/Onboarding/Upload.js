import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/index';
import { httpPostFormData, httpDelete } from '../../actions/data.action';
import validateImage from '../../helpers/validateImage';

class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {
      fileName: '',
      postBody: {},
      documents: []
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
      // postBody[fileName] = [...postBody[fileName], e.target.files[0]];
      postBody[fileName] = e.target.files[0];
      this.setState({ postBody });
      await this.saveDoc()
    } else {
      //NotificationManager.error(validFormat.message,'Yippe!',3000);
      e.target.value = '';
    }
  };

  saveDoc = async () => {
    try{
      const { id } = this.props.match.params;
      const { fileName, postBody } = this.state;

      let formData = new FormData();
      if(fileName === 'passportPhoto') formData.append('passportPhoto', postBody.passportPhoto);
      if(fileName === 'guarantorSignedDocument') formData.append('guarantorSignedDocument', postBody.guarantorSignedDocument);
      if(fileName === 'identityForm') formData.append('identityForm', postBody.identityForm);
      if(fileName === 'certificates') formData.append('certificates', postBody.certificates);

      const res = await httpPostFormData(`auth/onboarding_five/${id}`, formData);
      if(res.code === 201){
        this.setState({ 
          documents: [...this.state.documents, res.data.upload ]
      });
      }
    }catch(error){
      console.log(error)
    }
  }

  deleteDoc = async (id) => {
    try{

      console.log(id)
      const res = await httpDelete(`auth/document/${id}`);

      if(res.code === 200){
        this.setState({ documents: [...this.state.documents.filter(item => item.id !== id )]});
      }
    }catch(error){
      console.log(error)
    }

  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.postBody);
    try{
      const { id } = this.props.match.params;

      const res = await httpPostFormData(`auth/complete_onboarding_five/${id}`);
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
        <div class="app-content">
          <section class="section">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#" class="text-muted">Home</a></li>
              <li class="breadcrumb-item"><a href="#" class="text-muted">Staff</a></li>
              <li class="breadcrumb-item active text-" aria-current="page">New Staff</li>
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
											
                      {
                        this.state.documents.length ?
                          this.state.documents.map(data => (
                            <div className="form-group row justify-content-center">
                              <div className="col-md-2">{data.fileName}</div>
                              <div className="col-md-5 ml-0 pl-0">
                                <a href={`${data.path}`} target="_blank">View document</a>
                                <a className="ml-3 text-danger" onClick={() => this.deleteDoc(data.id)} style={{ cursor: 'pointer' }}>Delete</a>
                              </div>
                            </div>
                          )) : ' '
                      }
                      
                    </div>


                    <div class="form-group mb-0 mt-2 row justify-content-end">
												<div class="col-md-9">
                          <button 
                            type="submit"
                            class="btn btn-info mr-5"
                            // onClick={() => this.props.history.push('/create_staff/two')}
                            onClick={this.handleSubmit}
                          >NEXT</button>
													<button type="submit" class="btn btn-primary">SAVE</button>
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
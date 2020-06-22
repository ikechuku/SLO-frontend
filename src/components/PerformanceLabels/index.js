import React, { useState, useEffect } from "react";
import $ from 'jquery';
import { NotificationManager } from 'react-notifications';
import Layout from '../layout';
import { AddLabels } from './Modal';
import { httpPost, httpPatch, httpGet, httpDelete } from "../../actions/data.action";
import { showLoader, hideLoader } from "../../helpers/loader";
import { Confirm } from "../Modals/Confirm";

export default function Index() {
  const [modalMode, setModalMode] = useState('create');
  const [postData, setPostData] = useState({});
  const [labels, setLabels] = useState([]);
  const [labelId, setLabelId] = useState(null);

  useEffect(() => {
    showLoader();
    getLabels();
    hideLoader();
  }, []);

  const getLabels = async() => {
    try{
      const res = await httpGet('performance_label');
      if(res.code === 200){
        setLabels(res.data.performanceLabel)
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(postData)
    try{
      showLoader();
      if(modalMode === 'create'){
        const res = await httpPost('performance_label', postData);

        if(res.code === 201){
          NotificationManager.success('Successfully created');
          $('.modal').modal('hide');
          $(document.body).removeClass('modal-open');
          $('.modal-backdrop').remove();
          await getLabels();
          hideLoader();
        }  
      }

      if(modalMode === 'edit'){
        const res = await httpPatch(`performance_label/${labelId}`, postData);

        if(res.code === 200){
          NotificationManager.success('Successfully updated');
          $('.modal').modal('hide');
          $(document.body).removeClass('modal-open');
          $('.modal-backdrop').remove();
          setLabelId(null);
          await getLabels();
          hideLoader();
        }  
      }
      
    } catch(error){
      hideLoader();
      console.log(error)
    }
  }

  const handleDelete = async() => {
    try{
      showLoader();
      const res = await httpDelete(`performance_label/${labelId}`);

      if(res.code === 200){
        NotificationManager.success('Successfully deleted');
        $('.modal').modal('hide');
        $(document.body).removeClass('modal-open');
        $('.modal-backdrop').remove();
        setLabelId(null);
        await getLabels();
        hideLoader();
      }

    }catch(error){
      hideLoader();
      console.log(error)
    }
  }

  const closeModal = () => {
    const clearedPost = {
      name: '',
      highestGrade: '',
      lowestGrade: '',
      color: ''
    }
    setModalMode('create');
    setPostData({ ...clearedPost });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleEdit = (id) => {
    setModalMode('edit')
    const newLabel = labels.filter(item => item.id === id)[0];
    setPostData(newLabel);
    setLabelId(id)
  }

  return (
    <Layout page="branch">
      <div className="app-content">
        <section className="section">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#" className="text-muted">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" className="text-muted">
                Performance
              </a>
            </li>
            <li className="breadcrumb-item active text-" aria-current="page">
              Performance
            </li>
          </ol>
          <div className="section-body">
            <div className="row">
              <div className="col-md-10">
                <div className="card">
                <div className="text-center pt-5 pb-5">
                  <h5>Manage Performance Labels</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive mx-auto col-md-8 mb-4" style={{overflow: 'hidden'}}>
                    <table className="table table-hover text-nowrap">
                      {/* <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead> */}
                      <tbody>
                        {
                          labels.length ? labels.map(item => (
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.lowestGrade}-{item.highestGrade}</td>
                              <td>
                                <span style={{ 
                                  border: '1px solid #E4E4E4',
                                  boxSizing: 'border-box',
                                  boxShadow: '0px 7px 64px rgba(0, 0, 0, 0.07)',
                                  borderRadius: '6px',
                                  paddingRight: '30px',
                                  background: `${item.color}` || '#00C48C'
                                }}
                                ></span>
                              </td>
                              <td>
                                <span className='edit' data-toggle="modal" data-target="#addLabels" onClick={() => handleEdit(item.id)}>Edit</span>
                                <span className='del' data-toggle="modal" data-target="#confirm" onClick={() => setLabelId(item.id)}>Delete</span>
                              </td>
                            </tr>
                          )) : ''
                        }
                        
                      </tbody>
                    </table>
                  </div>

                  <div className="col-12 text-center mt-5 mb-4">
                    <button className="btn btn-primary rounded-circle d-inline-block" style={{ padding: '6px 12px'}} data-toggle="modal" data-target="#addLabels">
                      <i className="fa fa-plus"></i>
                    </button>
                    <p className="ml-2 d-inline-block" data-toggle="modal" data-target="#addLabels">Add</p>
                  </div>

                </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AddLabels
        postData={postData}
        closeModal={closeModal}
        modalMode={modalMode || 'create'}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <Confirm
        modalAction={'delete'}
        handleAction={handleDelete}
      />
    </Layout>
      
  )
}

import React,{useState,useEffect} from 'react'
import Layout from "../layout/index";
import CreatePoll from '../Modals/createPoll';
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { NotificationManager } from "react-notifications";
import $ from 'jquery'

export default function Index(props) {
    
    const [Features, setFeatures] = useState([])
    const [FeaturesInput, setFeaturesInput] = useState("")

    const [aboutPoll,SetaboutPoll ] = useState({
      title:"",
      description:""
  })

  const handleChange=(e)=>{
       
    SetaboutPoll({...aboutPoll, [e.target.name]: e.target.value});
  }

  const CloseModal = () => {
    window.$(".modal").modal("hide");
    window.$(document.body).removeClass("modal-open");
    window.$(".modal-backdrop").remove();
  
  }

    const handleSubmit = async (event) => {
    event.preventDefault();

    const poll = {
      name: aboutPoll.title,
      category: 'general',
      description: aboutPoll.description,
      startDate: "2020-12-25",
      endDate: "2020-12-31"
    }

    try{
      const res = await httpPost('create_opinion_poll', poll);
      if(res.status === 'Success'){
      CloseModal();
        console.log(res);
        NotificationManager.success(
          "Opinion Poll Created Successfully!.",
          "Yepp!",
          3000
        );
        
        props.history.push(`/create_poll/${res.opinionPoll.id}`)
      }
    }catch(error){
      NotificationManager.error(
        "Something went wrong. Please retry.",
        "Oops!",
        3000
      );
    }
}


    return (
      <div>
        <Layout>
            <div className="app-content">
					<section className="section">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="#" className="text-muted">
									Home
								</a>
							</li>
							
							<li className="breadcrumb-item active text-" aria-current="page">
								User Role
							</li>
						</ol>
						<div className="section-body">
							<div className="row">
								<div className="col-md-7">
									<div className="card">
										<div className="card-header custom-header">
											<div className="col col-md-12">
												<button
													type="button"
													className="btn "
													data-toggle="modal"
                                                    data-target="#createPoll"
                                                    // onClick={this.reSetModal}
												>
													CREATE NEW
												</button>
												{/* <div className="inputf">
														<input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
												</div> */}
											</div>
										</div>
            <div>
            
                </div>
     </div>
 </div>
  </div>
 </div>
 </section>
 </div>
        </Layout>
        <CreatePoll aboutPoll={aboutPoll} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          push={props.history.push} />
        </div>
    )
}
// onBlur={this.handleEditDaata(id)}

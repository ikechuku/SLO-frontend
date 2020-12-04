import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import $ from "jquery";
import Layout from "../layout/index";
import LeaveTable from "./leaveTable";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import { LeaveModal } from "../Modals/usersLeave";
import { Confirm } from "../Modals/Confirm";
import './index.css' 
// import  './departmentTable.css'

export default class Role extends Component {
	constructor() {
		super();
		this.state = {
            roles: [],
            leave:[],
            modalMode:"create",
            type:"",
            duration:"",
            editID:"",
            selectedPrivilages:[]
		};
	}

	componentDidMount() {

        this.getLeaves()
	}


    
    getLeaves = async () => {
		try {
			const res = await httpGet("all_leave");
			showLoader();
			if (res.code === 200) {
			
				let leave = [];
                leave.push(res.data.leave)
                leave.map((data)=>{
                    this.setState({
                        leave:data
				});
                })
				
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state)
    }

	



    getEditDetails=(data)=>{
        this.setState({
            editID:data.id,
            modalMode:"edit",
            type:data.type,
            duration:data.duration,
           
        })
    }

    reSetModal=()=>{
        this.setState({
            modalMode:"create",
            type:"",
            duration:"",
            editID:"",
            selectedPrivilages:[]
        })
    }

     CloseModal = () => {
        window.$(".modal").modal("hide");
        window.$(document.body).removeClass("modal-open");
        window.$(".modal-backdrop").remove();
      
      }

     handleSubmit=async(e)=>{
        e.preventDefault();
         if (this.state.modalMode === "create") {
           e.preventDefault();
           try {
             showLoader()
             
             const Data = {
                type: this.state.type, 
                duration: this.state.duration,
               
                
               }
           
  
               let res = await httpPost(`create_leave`,Data)
  
              console.log("res code",res) 
              if (res.code === 201 || res.code === 200) {
                      hideLoader()
               console.log(res)
               this.setState({
                type: "",
	            duration: "",

                modalMode:"create"
             })
    
            this.CloseModal()
              this.getLeaves()
            
             
         
               NotificationManager.success(
                  "Data created successfully.",
                 "Yepp",
                 3000
             );
              }
             
           
               hideLoader()
         } catch (error) {
             console.log(error.response)
             NotificationManager.success(
                 error,
                "Opps",
                3000
            );
             hideLoader()
         // }
         }
         }
  
  
  
         if (this.state.modalMode === "edit") {
          e.preventDefault();
          try {
            showLoader()
            
            const Data = {
             type: this.state.type, 
             duration: this.state.duration,
            
            
             
            }
          
  
              let res = await httpPatch(`edit_leave/${this.state.editID}/`,Data)
  
             console.log("res code",res) 
             if (res.code === 201 || res.code === 200) {
                     hideLoader()
             this.setState({
                type: "", 
                duration:"",
                modalMode:"create"
             })
             this.CloseModal()
             this.getLeaves()
            
        
              NotificationManager.success(
                 "Data edited successfully.",
                "Yepp",
                3000
            );
             }
            
          
              hideLoader()
        } catch (error) {
            console.log(error.response)
            NotificationManager.success(
                error,
               "Opps",
               3000
           );
            hideLoader()
        // }
        }
        }
   
        
       
     
       }
  


	render() {

		return (
			<Layout page="user_roles">
				<div className="app-content">
					<section className="section">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="#" className="text-muted">
									Home
								</a>
							</li>
						
							<li className="breadcrumb-item active text-" aria-current="page">
								Leave
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
                                                    data-target="#roleModal"
                                                    onClick={this.reSetModal}
												>
													CREATE NEW
												</button>
												{/* <div className="inputf">
														<input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
												</div> */}
											</div>
										</div>

										<div className="card-body">
											<LeaveTable
                                                leave={this.state.leave}
                                                getEditDetails={this.getEditDetails}
				
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

				<LeaveModal
                    modalMode={this.state.modalMode}
                    leave={this.state}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    reSetModal={this.reSetModal}
				/>
				<Confirm
					modalAction="delete"
                    handleAction={this.handleDelete}
                    
				/>
			</Layout>
		);
	}
}

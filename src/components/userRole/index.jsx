import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import $ from "jquery";
import Layout from "../layout/index";
import RoleTable from "./userRoleTable";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import { RoleModal } from "../Modals/userRoles";
import { Confirm } from "../Modals/Confirm";
import './index.css' 
// import  './departmentTable.css'

export default class Role extends Component {
	constructor() {
		super();
		this.state = {
            roles: [],
            privileges:[],
            modalMode:"create",
            name:"",
            description:"",
            editID:"",
            selectedPrivilages:[]
		};
	}

	componentDidMount() {
        this.getRoles();
        this.getPrivileges()
	}

	getRoles = async () => {
		try {
			const res = await httpGet("user_roles");
			showLoader();
			if (res.code === 200) {
			
				let userRoles = [];
                userRoles.push(res.data.roles)
                // console.log("get roles>>>>>",userRoles)
                userRoles.map((data)=>{
                    this.setState({
					roles:data
				});
                })
				
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
    };
    
    getPrivileges = async () => {
		try {
			const res = await httpGet("all_privileges");
			showLoader();
			if (res.code === 200) {
			
				let privileges = [];
                privileges.push(res.data.privileges)
                privileges.map((data)=>{
                    this.setState({
                        privileges:data
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

	


	closeModal = () => {
	
    };
    
  removePrivilage=(id)=>{
     let selectedPrivilages = this.state.selectedPrivilages;

     let newArray = []

    let res =  selectedPrivilages.filter((res)=>{
         return(
             res !== id
         )
     })

     newArray.push(res)

     this.setState({
         selectedPrivilages:res
     })
    }

    addPrivlage=(id)=>{
        let NewArray = this.state.selectedPrivilages.slice()
        NewArray.push(id)

        this.setState({
            selectedPrivilages:NewArray
        })
     console.log("ids",this.state.selectedPrivilages)
    }

    getEditDetails=(data)=>{
       let newArrayPrivilages = data.rolePrivilege.map((data)=>{
            return data.privilegeId
        })
        this.setState({
            editID:data.id,
            modalMode:"edit",
            name:data.name,
            description:data.description,
            selectedPrivilages:newArrayPrivilages,
           
           
        })
        console.log("priv",this.state.selectedPrivilages)
    }

    reSetModal=()=>{
        this.setState({
            modalMode:"create",
            name:"",
            description:"",
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
                name: this.state.name, 
                description: this.state.description,
                privileges:this.state.selectedPrivilages
               
                
               }
           
  
               let res = await httpPost(`create_user_role`,Data)
  
              console.log("res code",res) 
              if (res.code === 201 || res.code === 200) {
                      hideLoader()
               console.log(res)
               this.setState({
                name: "", 
                description:"",
                privileges:"",
                modalMode:"create"
             })
    
            this.CloseModal()
              this.getRoles()
            
             
         
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
             name: this.state.name, 
             description: this.state.description,
             privileges:this.state.selectedPrivilages
            
             
            }
          
  
              let res = await httpPatch(`edit_user_role/${this.state.editID}`,Data)
  
             console.log("res code",res) 
             if (res.code === 201 || res.code === 200) {
                     hideLoader()
             this.setState({
                name: "", 
                description:"",
                privileges:"",
                modalMode:"create"
             })
    
             this.CloseModal()
              this.getRoles()
            
        
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
											<RoleTable
                                                roles={this.state.roles}
                                                getEditDetails={this.getEditDetails}
				
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

				<RoleModal
					
                    modalMode={this.state.modalMode}
                    role={this.state}
                    privileges={this.state.privileges}
                    selectedPrivilages={this.state.selectedPrivilages}
                    removePrivilage={this.removePrivilage}
                    addPrivlage={this.addPrivlage}
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

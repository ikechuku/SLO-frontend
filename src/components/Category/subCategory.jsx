import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import $ from "jquery";
import Layout from "../layout/index";
import CategoryTable from "./subCatTable";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import { CategoryModal } from "../Modals/subCat";
import { Confirm } from "../Modals/Confirm";

// import  './departmentTable.css'

export default class SubCategory extends Component {
	constructor() {
		super();
		this.state = {
            Category: [],
            privileges:[],
            modalMode:"create",
            name:"",
            description:"",
            editID:"",
            selectedPrivilages:[],
            departments:[],
            departmentId:"",
            actionType:"",
            categoryId:"",
		};
	}

	componentDidMount() {
        this.getCategory();
        this.getDepartments()
	}

	getCategory = async () => {
		try {
			const res = await httpGet(`get_complaint_category/${this.props.match.params.id}`);
			showLoader();
			if (res.code === 200) {
                    this.setState({
					Category:res.data.subCategories
				});
               
				
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
    };
    

    
	getDepartments = async () => {
		try{
			showLoader()
			const res = await httpGet('all_complaint_categories');
			if(res.code === 200){
				hideLoader();
				this.setState({ departments: res.data.complaintCategory });
			}
		} catch(error){
			console.log(error)
		}
    }
    

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state)
    }

	
    getEditDetails=(data)=>{
    
        this.setState({
            editID:data.id,
            modalMode:"edit",
            name:data.name,
            description:data.description,
            departmentId:data.departmentId

           
           
        })
      
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
        
                e.preventDefault();
                try {
                  showLoader()
                  
                  const Data = {
                     name: this.state.name, 
                     categoryId: this.state.departmentId,}
                    let res = await httpPatch(`edit_sub_category/${this.state.editID}`,Data)
       
                   console.log("res code",res) 
                   if (res.code === 201 || res.code === 200) {
                           hideLoader()
                    console.log(res)
                    this.setState({
                     name: "", 
                     categoryId:"",
                     modalMode:"create"
                  })
         
                 this.CloseModal()
                   this.getCategory()
                 
                  
              
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
              }
        
        }
   
        
       
     
       

       getDetails=()=>{
           this.setState({
                actionType:"sub"
           })
          
       }

     


	render() {

		return (
			<Layout page="user_Category">
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
                                                    data-target="#CategoryModal"
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
											<CategoryTable
                                                Category={this.state.Category}
                                                getEditDetails={this.getEditDetails}
                                                getDetails={this.getDetails}
				
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

				<CategoryModal
					
                    modalMode={this.state.modalMode}
                    Category={this.state}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    reSetModal={this.reSetModal}
                    departments={this.state.departments}
                    actionType={this.state.actionType}
				/>
				<Confirm
					modalAction="delete"
                    handleAction={this.handleDelete}
                    
				/>
			</Layout>
		);
	}
}

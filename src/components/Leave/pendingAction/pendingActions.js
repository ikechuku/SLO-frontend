import React, { Component } from 'react'
import Layout from '../../layout/index'
import './pending.css'
import Chats from './Chats/chats'
import NoticeBoard from './NoticeBoard/noticeBoard'
import Todo from './Todo/todo'
import Pend from './Requests/pendingRe'
import SingleMessage from './Chats/singleMessage'
import ComposeChat from './Chats/createChat'
export default class pendingActions extends Component {

	constructor(props){
	
	
		super(props)
	
		this.state={
			           pages:{
						   switcher:'chats'
					   },
					   chatControl:{
						   ChatType:'none'
					   }
					}

					this.OnchangeChatType = this.OnchangeChatType.bind(this);
			
		}
		
		switchToNotceBoard=()=>{
			this.setState({pages:{switcher:'noticeBoard'}})
	
					}

					switchToChats=()=>{
						this.setState({pages:{switcher:'chats'}})
						
					
								}
								switchTodo=()=>{
									this.setState({pages:{switcher:'todo'}})
									
								
											}

											switchToPending=()=>{
												this.setState({pages:{switcher:'pending'}})
												
											
														}

														OnchangeChatType (e) {
															this.setState({chatControl:{ChatType:e.target.value}})
														  
															console.log(this.state.chatControl.ChatType);
														  }

														  OpenChat=()=>{
															this.setState({pages:{switcher:'SingleMessage'}})
														
														  }

														  AddnewChat=()=>{
															this.setState({pages:{switcher:'ComposeChat'}})
														  }
								
								
	render(){
		
		
        return (
                <Layout page="dashboard">
                <div className="app-content">
          <section className="section">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" className="text-muted">Home</a></li>
              <li className="breadcrumb-item"><a href="#" className="text-muted">Performance</a></li>
        <li className="breadcrumb-item active text-" aria-current="page">leave</li>
            </ol>
            <div className="section-body ul">
<div class="wrap">
<div>
                    <ul class="wrapList">
                        <li className={`${this.state.pages.switcher ==='chats'? 'coloe' : ''}`} onClick={this.switchToChats}> <i class="fa fa-comments fff"></i>Messages</li>
                      
                        <li  className={`${this.state.pages.switcher ==='todo'? 'coloe' : ''}`} onClick={this.switchTodo}> <i class="fa fa-list-ul fff"></i>Todo List</li>
                        <li className={`${this.state.pages.switcher ==='noticeBoard'? 'coloe' : ''}`}  onClick={this.switchToNotceBoard}><i class="fa fa-pencil-square-o fff" ></i>Notice Board</li>
                        <li className={`${this.state.pages.switcher ==='pending'? 'coloe' : ''}`} onClick={this.switchToPending}><i class="fa fa-universal-access fff"></i>Requests</li>
                    </ul>
                </div>


	



{this.state.pages.switcher === 'chats' ? <Chats AddnewChat={this.AddnewChat} OpenChat={this.OpenChat}/> : null}
{this.state.pages.switcher ==='noticeBoard'? <NoticeBoard/> : null}
{this.state.pages.switcher ==='todo'? <Todo/> : null}
{this.state.pages.switcher ==='pending'? <Pend/> : null}
{this.state.pages.switcher ==='SingleMessage'? <SingleMessage/> : null}
{this.state.pages.switcher ==='ComposeChat'? <ComposeChat/> : null}
</div>








         </div>

            </section>
            </div>
			<div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog"  aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="example-Modal3">Compose</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<form>

                                  
									<div class="form-group">
                                	<label for="recipient-name" class="form-control-label">Messages Type</label>
                                    <select value={this.state.chatControl.ChatType}  onChange={this.OnchangeChatType}    class="form-control sel" id="exampleFormControlSelect1">
                                        
      <option value='none'>Select</option>
      <option value="Private">Private</option>
      <option value="Group">Group</option>
   
    </select>
	</div>

									<div className={`form-group ${this.state.chatControl.ChatType ==='Group'? 'hideform' : ''}`}>
										<label for="recipient-name" class="form-control-label">User Name</label>
										<input data-role="tagsinput" disabled={this.state.chatControl.ChatType==='none'?true:false}  onChange={this.branchName} type="text" class="form-control" id="recipient-name"/>
									</div> 

									<div className={`form-group ${this.state.chatControl.ChatType ==='Group'? 'hideform' : ''}`} >
										<label for="recipient-name" class="form-control-label">Message</label>
										<textarea data-role="tagsinput" disabled={this.state.chatControl.ChatType==='none'?true:false} onChange={this.branchAddress} type="text" class="form-control" id="recipient-name"/>
									</div>

									<div className={`form-group hideform ${this.state.chatControl.ChatType ==='Group'? 'showgroupDetails' : ''}`} >
										<label for="recipient-name" class="form-control-label">Group Name</label>
										<input  disabled={this.state.chatControl.ChatType==='none'?true:false} onChange={this.branchAddress} type="text" class="form-control" id="recipient-name"/>
									</div>

									<div className={`form-group hideform ${this.state.chatControl.ChatType ==='Group'? 'showgroupDetails' : ''}`} >
										<label for="recipient-name" class="form-control-label">	About Group</label>
										<input  disabled={this.state.chatControl.ChatType==='none'?true:false} onChange={this.branchAddress} type="text" class="form-control" id="recipient-name"/>
									</div>

 
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
								<button disabled={this.state.chatControl.ChatType==='none'?true:false} onClick={this.handleSubmit}  type="button" class="btn btn-primary" >{this.state.chatControl.ChatType ==='Group'? 'Create Group': 'Send'}</button>
							</div>
						</div>
					</div>
				</div>




				{/* <div class="modal fade" id="exampleModal31" tabindex="-1" role="dialog"  aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content hideC">
							
							<div class="modal-body">
						

<div class="container">
  <div class="chatbox">
    <div class="top-bar">
      <div class="close" data-dismiss="modal" class="avatar"><p>X</p></div>
      <div  class="name">Adams</div>
 
      <div class="menu">
        <div class="dots"></div>
      </div>
    </div>
    <div class="middle">
      <div class="voldemort">
        <div class="incoming">
          <div class="bubble">Hey, it 4am  and am still coding 😥😥😥😥..</div>
          <div class="bubble">What are you getting.. Oh, oops sorry dude.</div>
        </div>
        <div class="outgoing">
          <div class="bubble lower">Your Brain need REST.</div>
          <div class="bubble ">You Know?</div>
		  <div class="bubble  ">plz go to bed</div>
		  <div class="bubble ">adam you should get your Dad a cologne. Here smell it. Oh wait! ...</div>

		  
		  <br/>
<br/>
<br/>
        </div>

		<div className="spavr"></div>

	
        
      </div>
    </div>
    <div class="bottom-bar">
      <div class="chat">
        <input className="inputchat" type="text" placeholder="Type a message..." />
        <button className="chatbutton" type="submit"><i class="fa fa-paper-plane"></i></button>
      </div>
    </div>
  </div>
  </div> */}
 
							{/* </div>
						
						</div> */}
					{/* </div>
				</div> */}
    </Layout>             
    )
	}
}

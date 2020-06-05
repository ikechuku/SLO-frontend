import React, { Component } from "react";
import Layout from "../../layout/index";
import "./pending.css";
import Chats from "./Chats/chats";
import NoticeBoard from "./NoticeBoard/noticeBoard";
import Todo from "./Todo/todo";
import Pend from "./Requests/pendingRe";
import SingleMessage from "./Chats/singleMessage";
import ComposeChat from "./Chats/createChat";
export default class pendingActions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pages: {
				switcher: "chats",
			},
			chatControl: {
				ChatType: "none",
			},
		};

		this.OnchangeChatType = this.OnchangeChatType.bind(this);
	}

	switchToNotceBoard = () => {
		this.setState({ pages: { switcher: "noticeBoard" } });
	};

	switchToChats = () => {
		this.setState({ pages: { switcher: "chats" } });
	};
	switchTodo = () => {
		this.setState({ pages: { switcher: "todo" } });
	};

	switchToPending = () => {
		this.setState({ pages: { switcher: "pending" } });
	};

	OnchangeChatType(e) {
		this.setState({ chatControl: { ChatType: e.target.value } });

		console.log(this.state.chatControl.ChatType);
	}

	OpenChat = () => {
		this.setState({ pages: { switcher: "SingleMessage" } });
	};

	AddnewChat = () => {
		this.setState({ pages: { switcher: "ComposeChat" } });
	};

	render() {
		return (
			<div>
				<Layout>
					<div className="app-content remove-paddings">
						<section className="section">
							<ol className="breadcrumb add-pading">
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
								<li
									className="breadcrumb-item active text-"
									aria-current="page"
								>
									leave
								</li>
							</ol>
							<div className="section-body ul">
								<div className="wrap">
									<div>
										<ul className="wrapList">
											<li
												className={`${
													this.state.pages.switcher === "chats" ? "coloe" : ""
												}`}
												onClick={this.switchToChats}
											>
												{" "}
												<i className="fa fa-comments fff"></i>Messages
											</li>

											<li
												className={`${
													this.state.pages.switcher === "todo" ? "coloe" : ""
												}`}
												onClick={this.switchTodo}
											>
												{" "}
												<i className="fa fa-list-ul fff"></i>Todo List
											</li>
											<li
												className={`${
													this.state.pages.switcher === "noticeBoard"
														? "coloe"
														: ""
												}`}
												onClick={this.switchToNotceBoard}
											>
												<i className="fa fa-pencil-square-o fff"></i>Notice Board
											</li>
											<li
												className={`${
													this.state.pages.switcher === "pending" ? "coloe" : ""
												}`}
												onClick={this.switchToPending}
											>
												<i className="fa fa-universal-access fff"></i>Requests
											</li>
										</ul>
									</div>

									{this.state.pages.switcher === "chats" ? (
										<Chats
											AddnewChat={this.AddnewChat}
											OpenChat={this.OpenChat}
										/>
									) : null}
									{this.state.pages.switcher === "noticeBoard" ? (
										<NoticeBoard />
									) : null}
									{this.state.pages.switcher === "todo" ? <Todo /> : null}
									{this.state.pages.switcher === "pending" ? <Pend /> : null}
									{this.state.pages.switcher === "SingleMessage" ? (
										<SingleMessage />
									) : null}
									{this.state.pages.switcher === "ComposeChat" ? (
										<ComposeChat />
									) : null}
								</div>
							</div>
						</section>
					</div>
					<div
						className="modal fade"
						id="exampleModal3"
						tabindex="-1"
						role="dialog"
						aria-hidden="true"
					>
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="example-Modal3">
										Compose
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<form>
										<div className="form-group">
											<label for="recipient-name" className="form-control-label">
												Messages Type
											</label>
											<select
												value={this.state.chatControl.ChatType}
												onChange={this.OnchangeChatType}
												className="form-control sel"
												id="exampleFormControlSelect1"
											>
												<option value="none">Select</option>
												<option value="Private">Private</option>
												<option value="Group">Group</option>
											</select>
										</div>

										<div
											className={`form-group ${
												this.state.chatControl.ChatType === "Group"
													? "hideform"
													: ""
											}`}
										>
											<label for="recipient-name" className="form-control-label">
												User Name
											</label>
											<input
												data-role="tagsinput"
												disabled={
													this.state.chatControl.ChatType === "none"
														? true
														: false
												}
												onChange={this.branchName}
												type="text"
												className="form-control"
												id="recipient-name"
											/>
										</div>

										<div
											className={`form-group ${
												this.state.chatControl.ChatType === "Group"
													? "hideform"
													: ""
											}`}
										>
											<label for="recipient-name" className="form-control-label">
												Message
											</label>
											<textarea
												data-role="tagsinput"
												disabled={
													this.state.chatControl.ChatType === "none"
														? true
														: false
												}
												onChange={this.branchAddress}
												type="text"
												className="form-control"
												id="recipient-name"
											/>
										</div>

										<div
											className={`form-group hideform ${
												this.state.chatControl.ChatType === "Group"
													? "showgroupDetails"
													: ""
											}`}
										>
											<label for="recipient-name" className="form-control-label">
												Group Name
											</label>
											<input
												disabled={
													this.state.chatControl.ChatType === "none"
														? true
														: false
												}
												onChange={this.branchAddress}
												type="text"
												className="form-control"
												id="recipient-name"
											/>
										</div>

										<div
											className={`form-group hideform ${
												this.state.chatControl.ChatType === "Group"
													? "showgroupDetails"
													: ""
											}`}
										>
											<label for="recipient-name" className="form-control-label">
												{" "}
												About Group
											</label>
											<input
												disabled={
													this.state.chatControl.ChatType === "none"
														? true
														: false
												}
												onChange={this.branchAddress}
												type="text"
												className="form-control"
												id="recipient-name"
											/>
										</div>
									</form>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-danger"
										data-dismiss="modal"
									>
										Close
									</button>
									<button
										disabled={
											this.state.chatControl.ChatType === "none" ? true : false
										}
										onClick={this.handleSubmit}
										type="button"
										className="btn btn-primary"
									>
										{this.state.chatControl.ChatType === "Group"
											? "Create Group"
											: "Send"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}

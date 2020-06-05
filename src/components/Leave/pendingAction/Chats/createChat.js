import React, { Component } from "react";
import addChatMate from "./imgs/addChatMates.png";

export default class CreateNewChat extends Component {
	render() {
		return (
			<div className="centerChat animation-user-chat">
				<div className="chatBox">
					<div className="responsive-chat">
						<div className="chatHead">
							<span style={{ fontWeight: " 600" }} className="senderIcon">
								Add Perticipant
							</span>

							<span className="sendertoggle">
								<img src={addChatMate} alt="" />
							</span>
						</div>
						<div className="position-breaker"></div>
					</div>
					<div style={{ position: "absolute", height: "50px" }}></div>
					<div className="bottom-bar">
						<i className="fa fa-paperclip"></i>
						<i className="fa fa-microphone"></i>

						<input
							className="inputchat"
							type="text"
							placeholder="Type a message..."
						/>

						<i className="fa fa-smile-o"></i>
					</div>
				</div>
			</div>
		);
	}
}

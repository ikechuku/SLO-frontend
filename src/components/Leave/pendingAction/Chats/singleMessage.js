import React, { Component } from "react";
import addChatMate from "./imgs/addChatMates.png";

export default class singleMessage extends Component {
	render() {
		return (
			<div className="centerChat">
				<div className="chatBox">
					<div className="responsive-chat">
						<div className="chatHead">
							<span style={{ fontWeight: " 600" }} className="senderIcon">
								David Joe
							</span>

							<span className="sendertoggle">
								<img src={addChatMate} alt="" />
							</span>
						</div>
						<div className="position-breaker"></div>

						<div className="chatwrappUpcoming">
							<div className="upcomingMessageg">
								<p>hello Mrs danjon seeve</p>
							</div>
						</div>

						<div className="chatwrappongoing">
							<div className="ongoingMessageg">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Isse
									culpa!
								</p>
							</div>
						</div>

						<div className="chatwrappUpcoming">
							<div className="upcomingMessageg">
								<p>Do you speak English</p>
							</div>
						</div>

						<div className="chatwrappongoing">
							<div className="ongoingMessageg">
								<p>ami yahoo consectetur adipisicing elit. Isse culpa!</p>
							</div>
						</div>

						<div className="chatwrappUpcoming">
							<div className="upcomingMessageg">
								<p>I dont get i mean do you speak english</p>
							</div>
						</div>

						<div className="chatwrappongoing">
							<div className="ongoingMessageg">
								<p>ami yahoo consectetur adipisicing elit. Isse culpa!</p>
							</div>
						</div>

						<div className="chatwrappongoing">
							<div className="ongoingMessageg">
								<p>ami yahoo consectetur adipisicing elit. Isse culpa!</p>
							</div>
						</div>
					</div>
					<div style={{ position: "absolute", height: "50px" }}></div>
					<div class="bottom-bar">
						<i class="fa fa-paperclip"></i>
						<i class="fa fa-microphone"></i>

						<input
							className="inputchat"
							type="text"
							placeholder="Type a message..."
						/>

						<i class="fa fa-smile-o"></i>
					</div>
				</div>
			</div>
		);
	}
}

import React, { Component } from "react";
import "./login.css";

export default class form extends Component {
	render() {
		return (
			<div class="container-center">
				<h1 className="appName">SLO </h1>

				<form className="loginForm99">
					<div class="containerlogin">
						<div className="formHeader">
							<h1>LOGIN</h1>
						</div>

						<input
							className="logInInput9"
							type="text"
							placeholder="Enter Email"
							required
						/>

						<input
							className="logInInput9"
							type="password"
							placeholder="Enter Password"
							required
						/>

						<button className="logInInput9button" type="submit">
							Login To Your Account
						</button>
					</div>
				</form>
			</div>
		);
	}
}

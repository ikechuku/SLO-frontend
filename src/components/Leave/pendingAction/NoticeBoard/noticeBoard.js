import React, { Component } from "react";
import Layout from "../../../layout/index";
import "../Todo/todo.css";

export default class NoticeBoard extends Component {
	render() {
		return (
			<div class="animation par">
				<div className="todoHeader">
					<div className="data1">
						<h1>Saturday, 1 june 2029</h1>
						<p>3 Active Tasks</p>
					</div>
					<div className="data2">
						<button className="btn- btn-sm noticeBoard-btn">
							Notice Board
						</button>
					</div>
				</div>
				<div className="AddTodoDIV">
					<input
						placeholder="Add New Notice"
						className="todoInput"
						type="text"
					/>
					<button className="btn- btn-sm">Add</button>
				</div>
				<div className="todoss">
					<div className="checkx">
						<div class="checkbox-container circular-container">
							<label class="checkbox-label">
								<input type="checkbox" />
								<span class="checkbox-custom circular"></span>
							</label>
						</div>
					</div>

					<span className="infooo">Client Meeting at 2:30</span>

					<div className="flex2">
						<span className="date">10-12-2098</span>
						<i class="fa fa-trash"></i>
					</div>
				</div>{" "}
				<div className="todoss">
					<div className="checkx">
						<div class="checkbox-container circular-container">
							<label class="checkbox-label">
								<input type="checkbox" />
								<span class="checkbox-custom circular"></span>
							</label>
						</div>
					</div>

					<span className="infooo">Client Meeting at 2:30</span>

					<div className="flex2">
						<span className="date">10-12-2098</span>
						<i class="fa fa-trash"></i>
					</div>
				</div>
				<div className="todoss">
					<div className="checkx">
						<div class="checkbox-container circular-container">
							<label class="checkbox-label">
								<input type="checkbox" />
								<span class="checkbox-custom circular"></span>
							</label>
						</div>
					</div>

					<span className="infooo">Client Meeting at 2:30</span>

					<div className="flex2">
						<span className="date">10-12-2098</span>
						<i class="fa fa-trash"></i>
					</div>
				</div>
				<div className="todoss">
					<div className="checkx">
						<div class="checkbox-container circular-container">
							<label class="checkbox-label">
								<input type="checkbox" />
								<span class="checkbox-custom circular"></span>
							</label>
						</div>
					</div>

					<span className="infooo">Client Meeting at 2:30</span>

					<div className="flex2">
						<span className="date">10-12-2098</span>
						<i class="fa fa-trash"></i>
					</div>
				</div>{" "}
			</div>
		);
	}
}

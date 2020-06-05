import React, { Component } from "react";
import Layout from "../../../layout/index";
import "./todo.css";

export default class Todo extends Component {
	render() {
		return (
			<div className="animation par">
				<div className="todoHeader">
					<div className="data1">
						<h1>Saturday, 1 june 2029</h1>
						<p>3 Active Tasks</p>
					</div>
					<div className="data2">
						<button className="btn- btn-sm">Completed</button>
						<button className="btn- btn-sm">Incomplete</button>
					</div>
				</div>

				<div className="AddTodoDIV">
					<input placeholder="Add New Task" className="todoInput" type="text" />
					<button className="btn- btn-sm">Add</button>
				</div>

				<div className="todoss">
					<div className="checkx">
						<div className="checkbox-container circular-container">
							<label className="checkbox-label">
								<input type="checkbox" />
								<span className="checkbox-custom circular"></span>
							</label>
						</div>
					</div>

					<span className="infooo">Client Meeting at 2:30</span>

					<div className="flex2">
						<span className="date">10-12-2098</span>
						<i className="fa fa-trash"></i>
					</div>
				</div>
				<div className="todoss">
					<div className="checkx">
						<div className="checkbox-container circular-container">
							<label className="checkbox-label">
								<input type="checkbox" />
								<span className="checkbox-custom circular"></span>
							</label>
						</div>
					</div>

					<span className="infooo">Client Meeting at 2:30</span>

					<div className="flex2">
						<span className="date">10-12-2098</span>
						<i className="fa fa-trash"></i>
					</div>
				</div>

				<div className="todoss">
					<div className="checkx">
						<div className="checkbox-container circular-container">
							<label className="checkbox-label">
								<input type="checkbox" />
								<span className="checkbox-custom circular"></span>
							</label>
						</div>
					</div>

					<span className="infooo">Client Meeting at 2:30</span>

					<div className="flex2">
						<span className="date">10-12-2098</span>
						<i className="fa fa-trash"></i>
					</div>
				</div>

				<div className="todoss">
					<div className="checkx">
						<div className="checkbox-container circular-container">
							<label className="checkbox-label">
								<input type="checkbox" />
								<span className="checkbox-custom circular"></span>
							</label>
						</div>
					</div>

					<span className="infooo">Client Meeting at 2:30</span>

					<div className="flex2">
						<span className="date">10-12-2098</span>
						<i className="fa fa-trash"></i>
					</div>
				</div>
			</div>
		);
	}
}

import React, { Component } from "react";
import "./index.css";
import { Collapse } from "react-collapse";

export default class index extends Component {
	constructor(props) {
		super(props);
		const { isOpened } = this.props;
		this.state = { isOpened, paragraphs: 0 };
	}
	toggle = (toggl) => {
		let toggle = this.state.isOpened;
		if (toggl === "togge1") {
			this.setState({
				isOpened: !toggle,
			});
		}
	};
	render() {
		return (
			<div>
				<div className="config">
					<label onClick={(e) => this.toggle("togge1")} className="label">
						tog1
					</label>
				</div>

				<div className="config">
					<label onClick={(e) => this.toggle("togge1e")} className="label">
						tog2
					</label>
				</div>

				<Collapse
					className="ReactCollapse--collapse"
					isOpened={this.state.isOpened}
					hasNestedCollapse
				>
					<h1 className="subCollapse">dddddd</h1>
				</Collapse>

				<Collapse
					className="ReactCollapse--collapse"
					isOpened={this.state.isOpened}
					hasNestedCollapse
				>
					<h1 className="subCollapse">dddddd</h1>
				</Collapse>
			</div>
		);
	}
}

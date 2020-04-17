import React from "react";
import DatePicker from "react-datepicker";
import Moment from 'react-moment'
import moment from 'moment'
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class Example extends React.Component {
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
    console.log(moment(date).format('l'))
  };
 
  render() {
    return (
      <div>
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
        <Moment format='l'>{this.state.startDate}</Moment>
      </div>
    );
  }
}

export default Example;

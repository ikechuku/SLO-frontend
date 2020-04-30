// import React from 'react';
// import { MDBDatePickerV5 } from 'mdbreact';

// class DatePickerPage extends React.Component {

// render() {
// return(
// <div>
//   <MDBDatePickerV5 inline theme="warning" getValue={(e)=> console.log(e)} />
//     <MDBDatePickerV5 inline theme="danger" getValue={(e)=> console.log(e)} />
// </div>
// );
// }
// };

// export default DatePickerPage;




// import React, { Component } from "react";

// import ReactTooltip from "react-tooltip";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       place: "top",
//       type: "dark",
//       effect: "float",
//       condition: false
//     };
//   }

//   changePlace(place) {
//     this.setState({
//       place: place
//     });
//   }

//   changeType(type) {
//     this.setState({
//       type: type
//     });
//   }

//   changeEffect(effect) {
//     this.setState({
//       effect: effect
//     });
//   }

//   _onClick() {
//     this.setState({
//       condition: true
//     });
//   }

//   render() {
//     const { place, type, effect } = this.state;
//     return (
//       <div>
//         <section className="tooltip-example">
//           <h4 className="title">React Tooltip</h4>
//           <div className="demonstration">
//             <a data-tip data-for="happyFace">Is Working ?</a>

//             <ReactTooltip id="happyFace" place="top" type="warning" effect="solid">
//               <span>Happy face</span>
//             </ReactTooltip>

//           </div>
//         </section>
//       </div>
//     );
//   }
// }

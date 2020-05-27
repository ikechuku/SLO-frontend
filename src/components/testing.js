// import React, { Component } from 'react'
// import Select from 'react-select';
// import CreatableSelect from 'react-select/creatable';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];


// export default class testing extends Component {
//   constructor(){
//     super()
//     this.state = {
//       country: [ {value: 'nigeria', label: 'nigeria' }]
//     }
//   }

//   // handleChange = (result, check) => {
//   //   this.setState({
//   //     country: result
//   //   })

//   //   console.log(result, check);
//   // } 

//   handleChange = (newValue, actionMeta) => {
//     console.group('Value Changed');
//     console.log(newValue.value);
//     console.log(`action: ${actionMeta.action}`);
//     console.groupEnd();
//   };
//   // handleInputChange = (inputValue, actionMeta) => {
//   //   console.group('Input Changed');
//   //   console.log(inputValue);
//   //   console.log(`action: ${actionMeta.action}`);
//   //   console.groupEnd();
//   // };

//   render() {
//     const { country } = this.state;
//     return (
//       <div>
//         <h4>Testing</h4>      

//         <Select
//           className="col-md-4"
//           defaultValue={country}
//           onChange={e => this.handleChange(e, 'check')}
//           options={options}
//           isSearchable="true"
//           name="country"
//           ref="country"
//         />

//       {/* <CreatableSelect
//         isClearable
//         onChange={this.handleChange}
//         onInputChange={this.handleInputChange}
//         options={country}
//       /> */}

//         {/* <Select
//           className="col-md-4"
//           isMulti
//           defaultValue={country[0]}
//           onChange={this.handleChange}
//           options={options}
//           isSearchable="true"
//         /> */}

//       </div>
//     )
//   }
// }


import React from "react";
import Select from "react-select";
import { stateLists } from '../components/Onboarding/Info';
// import SweetAlert from 'sweetalert2-react';
// import { withSwalInstance } from 'sweetalert2-react';
// import swal from 'sweetalert2';
import SweetAlert from 'react-bootstrap-sweetalert'
 
// const SweetAlert = withSwalInstance(swal);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      multiValue: [],
      filterOptions: [
        { value: "foo", label: "Foo" },
        { value: "bar", label: "Bar" },
        { value: "bat", label: "Bat" }
      ],
      list: [],
      alert: null
    };

    this.hideAlert = this.hideAlert.bind(this)
    // this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }

  // handleMultiChange(option) {
  //   const { data } = this.state;
  //   this.setState(state => {
  //     return {
  //       multiValue: option
  //     };
  //   });
  //   data['check'] = this.state.multiValue
  //   this.setState({ data })
  //   //console.log(this.state.multiValue);
  // }

  // handleClick = () => {
  //   console.log(this.state.multiValue, this.state.data)
  // }

  // async componentDidMount(){
  //   // console.log(stateLists)
  //   let optionList = [];
  //   stateLists.map(data => {
  //     optionList.push({ value: data, label: data });
  //   })

  //   console.log(optionList)
  // }

  render() {
    return (
      <div>
        {/* <label>Multi (now working)</label>
        <Select
          name="filters"
          placeholder="Filters"
          value={this.state.multiValue}
          options={this.state.filterOptions}
          onChange={this.handleMultiChange}
          // isMulti
        />
        <button onClick={this.handleClick}>Click</button> */}
        {/* <button onClick={() => this.setState({ show: true })}>Alert</button> */}
        <SweetAlert
          success
          // show={this.state.show}
          // title="Demo"
          text="SweetAlert in React"
          // onConfirm={() => this.setState({ show: false })}
          // onCancel={() => this.setState({ show: false })}
          onConfirm={this.hideAlert}
        >You clicked the button</SweetAlert>
      </div>
    );
  }
}


export default App;
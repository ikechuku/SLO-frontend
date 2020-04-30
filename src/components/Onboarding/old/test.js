import React, { Component } from "react";
import Datatable from "react-bs-datatable"; // Import this package
// import "bootstrap/dist/css/bootstrap.css";
import moment from 'moment';

const header = [
  {
    title: 'Username (filterable)',
    prop: 'username',
    sortable: true,
    filterable: true
  },
  { title: 'Name', prop: 'realname', sortable: true },
  { title: 'Location', prop: 'location' },
  { title: 'Last Updated', prop: 'date', sortable: true }
];

const body = Array.from(new Array(57), () => {
  const rd = (Math.random() * 10).toFixed(1);

  if (rd > 0.5) {
    return {
      username: 'i-am-billy',
      realname: `Billy ${rd}`,
      location: 'Mars',
      date: moment()
        .subtract(1, 'days')
        .format('Do MMMM YYYY')
    };
  }

  return {
    username: 'john-nhoj',
    realname: `John ${rd}`,
    location: 'Saturn',
    date: moment()
      .subtract(2, 'days')
      .format('Do MMMM YYYY')
  };
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

    this.header = [
      {
        title: 'Username (filterable)',
        prop: 'username',
        sortable: true,
        filterable: true
      },
      { title: 'Name', prop: 'realname', sortable: true },
      { title: 'Location', prop: 'location' },
      { title: 'Last Updated', prop: 'date', sortable: true }
    ];

    // this.header = [
    //   { title: "Name", prop: "name", sortable: true, filterable: true },
    //   {
    //     title: "User Name",
    //     prop: "username",
    //     sortable: true,
    //     filterable: true
    //   },
    //   { title: "Phone", prop: "phone", sortable: true, filterable: true },
    //   { title: "Website", prop: "website", sortable: true, filterable: true }
    // ];
  }

  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         this.setState({
  //           isLoaded: true,
  //           items: result
  //         });
  //       },
  //       error => {
  //         this.setState({
  //           isLoaded: true,
  //           error: error
  //         });
  //       }
  //     );
  // }

  render() {
    // const { error, isLoaded, items } = this.state;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {
      // console.log(this.state.items);
      return (
        <div class="container">
          <Datatable
            tableHeader={this.header}
            tableBody={body}
            // keyName="userTable"
            tableClass="striped hover responsive"
            rowsPerPage={3}
            rowsPerPageOption={[3, 5, 8, 10]}
            initialSort={{ prop: "username", isAscending: true }}
          />
        </div>
      );
    // }
  }
}
export default App;
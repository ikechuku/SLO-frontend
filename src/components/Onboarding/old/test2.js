import React from 'react';
import Datatable from "react-bs-datatable";

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

// const body = Array.from(new Array(57), () => {
//   const rd = (Math.random() * 10).toFixed(1);

//   if (rd > 0.5) {
//     return {
//       username: 'i-am-billy',
//       realname: `Billy ${rd}`,
//       location: 'Mars',
//       date: moment()
//         .subtract(1, 'days')
//         .format('Do MMMM YYYY')
//     };
//   }

//   return {
//     username: 'john-nhoj',
//     realname: `John ${rd}`,
//     location: 'Saturn',
//     date: moment()
//       .subtract(2, 'days')
//       .format('Do MMMM YYYY')
//   };
// });


const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  }
};

const App = (props) => {
  // body = () => {
  //   props.body.map(data => {
  //     return 
  //   })
  // }
  //props.body()
  //console.log(props.body())
  return (
    <Datatable
      tableHeaders={header}
      tableBody={props.body()}
      tableClass="striped hover responsive"
      rowsPerPage={5}
      rowsPerPageOption={[5, 10, 15, 20]}
      initialSort={{ prop: 'username', isAscending: true }}
      classes={
        "bottom"
      }
      // onSort={onSortFunction}
    />
  )
};

export default App;



function NonMemoizedTable(props) {
  const {
    data,
    rowsPerPageOption,
    tableHeaders,
    onChangeFilter,
    onPageNavigate,
    classes,
    onRowsPerPageChange,
    onSortChange,
    tableClass,
    labels,
    filterable,
    filterText,
    rowsPerPage,
    currentPage,
    sortedProp,
    maxPage,
    Components
  } = useDatatableLifecycle(props);
  num2 += 1;
  return (
    <>
      <h3>{num2}</h3>
      <Components.Row className="controlRow__root">
        <Components.Col xs="12">
          <Filter
            classes={classes}
            tableHeaders={tableHeaders}
            placeholder={labels.filterPlaceholder}
            onChangeFilter={onChangeFilter}
            filterText={filterText}
            filterable={filterable}
            components={{
              Adornment: Components.Adornment,
              Button: Components.Button,
              ClearIcon: Components.ClearIcon,
              FormControl: Components.FormControl,
              InputGroup: Components.InputGroup
            }}
          />
        </Components.Col>
      </Components.Row>
      <Components.Row>
        <Components.Col xs="12">
          <Components.Table className={tableClass}>
            <TableHeader
              classes={classes}
              tableHeaders={tableHeaders}
              sortedProp={sortedProp}
              onSortChange={onSortChange}
              components={{
                TableHead: Components.TableHead,
                TableCell: Components.TableCell,
                TableRow: Components.TableRow
              }}
            />
            <TableBody
              classes={classes}
              tableHeaders={tableHeaders}
              labels={labels}
              data={data}
              components={{
                TableBody: Components.TableBody,
                TableCell: Components.TableCell,
                TableRow: Components.TableRow
              }}
            />
          </Components.Table>
        </Components.Col>
      </Components.Row>
      <Components.Row className="controlRow__root bottom">
        <Components.Col xs={12} md={4} />
        <Components.Col xs={12} md={4}>
          <PaginationOpts
            classes={classes}
            labels={labels}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            rowsPerPageOption={rowsPerPageOption}
            components={{
              Form: Components.Form,
              FormGroup: Components.FormGroup,
              FormControl: Components.FormControl
            }}
          />
        </Components.Col>
        <Components.Col xs={12} md={4} className="text-right">
          <Pagination
            classes={classes}
            data={data}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageNavigate={onPageNavigate}
            labels={labels}
            maxPage={maxPage}
            components={{
              Button: Components.Button,
              ButtonGroup: Components.ButtonGroup
            }}
          />
        </Components.Col>
      </Components.Row>
    </>
  );
}
import React from 'react'
import Moment from 'react-moment';

export default function PreviousEmploymentTable(props) {
  return (
    <div className="col col-md-12 ml-0 pl-0">
    <div className="table-responsive" >
    <table id="example1" class="table table-hover table-bordered border-t0 text-nowrap w-100" >
        <thead>
          <tr>
            {/* <th className="wd-15p">S/N</th> */}
            <th class="wd-15p">Employer name</th>
            <th class="wd-15p">Role</th>
            <th class="wd-15p">Date</th>
            <th class="wd-25p"></th>
          </tr>
        </thead>
        <tbody>                                {
            props.morePrevious.length ? props.morePrevious.map((data, index) => (
              <tr key={index}>
                {/* <td>{index + 1}</td> */}
                <td>{data.employerName}</td>
                <td>{data.role}</td>
                <td>{<Moment format='MMM DD, YYYY'>{data.startDate}</Moment>} {' to '} {<Moment format='MMM DD, YYYY'>{data.endDate}</Moment>}</td>
                <td>
                  <span className="add-more fa fa-close" onClick={() => props.removeMorePrevious(index)}></span>
                </td>
              </tr>
            )) : ''
          }
          </tbody>
        </table>
    </div>
  </div>
  )
}

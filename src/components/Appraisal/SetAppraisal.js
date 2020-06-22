import React from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';

const date_format = 'DD/MM/YYYY';

export default function SetAppraisal(props) {

  const CustomInput = ({ value, onClick }) => (
    <input readonly className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')"
      value={props.date1 === undefined ? undefined : moment(props.date1).format(date_format)} onClick={onClick} onKeyPress={e => e.preventDefault()}
      required
    />
  );

  const CustomInput2 = ({ value, onClick }) => (
    <input readonly className="form-control" placeholder="Click to select a date" type="text" onfocus="(this.type='date')" onKeyPress={e => e.preventDefault()}
    value={props.date2 === undefined ? undefined : moment(props.date2).format(date_format)} onClick={onClick}
    required
    />
  );


  return (
    <div className="modal fade" id="setAppraisalModal" tabIndex="-1" role="dialog"  aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body p-5 mt-5 mr-5 mb-2 ml-5">
            <h4 className="mb-4">Upcoming Appraisal Date</h4>
            <form onSubmit={props.handleSubmit}>
            <div className="mx-auto my-auto mt-5">  
              <label htmlFor="" className="col-12">Start Date</label>
              <div className="col-12 c-date-picker">
                <DatePicker
                  className="form-control"
                  selected={props.date1}
                  onChange={(e) => props.handleDate(e, 'startDate')}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Click to select a date"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  popperPlacement='right'
                  customInput={<CustomInput />}
                />
              </div>

              <label htmlFor="" className="col-12 mt-5">End Date</label>
              <div className="col-12 c-date-picker">
                <DatePicker
                  className="form-control"
                  selected={props.date2}
                  onChange={(e) => props.handleDate(e, 'endDate')}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Click to select a date"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  customInput={<CustomInput2 />}
                />
              </div>


              <div className="modal-footer justify-content-center mt-5" style={{ border: 'none'}}>
						<button
							type="button"
              className="btn btn-danger rounded-circle"
              style={{ padding: '15px 20px', fontSize: '20px'}}
							data-dismiss="modal"
							onClick={props.closeModal}
						>
							<i className="fa fa-times"></i>
						</button>
						<button
							type="submit"
							onSubmit={props.handleSubmit}
              className="btn btn-primary rounded-circle ml-5"
              style={{ padding: '15px 20px', fontSize: '20px' }}
						>
							{props.modalMode === "create" ? <i className="fa fa-check"></i> : <i className="fa fa-check"></i>}
						</button>
					</div>
              
            </div>
          </form>

          </div>
          {/* <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-danger" 
              data-dismiss="modal"
            >Close</button>
            <button type="button" className="btn btn-primary">
              send
            </button>
            
          </div> */}
        </div>
      </div>
    </div>
  )
}
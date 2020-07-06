import React from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';

const date_format = 'DD/MM/YYYY';

export default function SetAppraisalExcess(props) {

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
    <div className="modal fade" id="setAppraisalExcessModal" tabIndex="-1" role="dialog"  aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-body p-5 mt-5 mr-5 mb-2 ml-5 mx-auto">
            <div className="text-center mx-auto">
              <h4 className="mb-4">Set New Appraisal Date</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.clearInputs}>
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <form onSubmit={props.handleSubmit}>
            <div className="mx-auto my-auto mt-5">  
              {/* <label htmlFor="" className="col-12">Start Date</label> */}
              <div className="c-date-picker mb-3">
                <DatePicker
                  className="form-control"
                  selected={props.date1}
                  onChange={(e) => props.handleDate(e, 'startDate')}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="From"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  popperPlacement='right'
                  customInput={<CustomInput />}
                />
              </div>

              {/* <label htmlFor="" className="col-12 mt-5">End Date</label> */}
              <div className="c-date-picker">
                <DatePicker
                  className="form-control"
                  selected={props.date2}
                  onChange={(e) => props.handleDate(e, 'endDate')}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="To"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  customInput={<CustomInput2 />}
                />
              </div>

              <div className="mt-3">
                <input 
                  className="form-control" 
                  type="text" 
                  name="totalExcess" id="" 
                  placeholder="Total Excess Score"
                  onChange={(e) => props.handleDate(e, 'totalExcess')}
                />
              </div>


              <div className="mt-5">
                <div className="text-center">
                  <h5 className="mb-4">Convert excess to bonus</h5>
                </div>
                <div className="col-md-12">
                  <label htmlFor="" className="col-md-2 d-inline">1 score</label>
                  <input 
                    className="col-md-6 form-control d-inline" 
                    type="text" 
                    name="excessConversion" id="" 
                    placeholder="N10"
                    onChange={(e) => props.handleDate(e, 'excessConversion')}
                  />
                </div>
              </div>


              <div className="modal-footer justify-content-center mt-5" style={{ border: 'none'}}>
						{/* <button
							type="button"
              className="btn btn-danger rounded-circle"
              style={{ padding: '15px 20px', fontSize: '20px'}}
							data-dismiss="modal"
							onClick={props.closeModal}
						>
							<i className="fa fa-times"></i>
						</button> */}
						<button
							type="submit"
							onSubmit={props.handleSubmit}
              className="btn btn-danger"
              style={{ padding: '15px 20px', fontSize: '20px', minWidth: '325px', height: '45px' }}
						>
							END
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
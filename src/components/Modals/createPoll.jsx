import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {setPoll} from '../../helpers/storePollData'
export default function AddcreatePoll(props) {
const [aboutPoll,SetaboutPoll ] = useState({
    title:"",
    description:"",
    who:""
})
    const handleChange=(e)=>{
       
        SetaboutPoll({...aboutPoll, [e.target.name]: e.target.value });
       console.log(aboutPoll)
       
  
      }

  return (
    <div>
      <div class="modal fade" id="createPoll" tabindex="-1" role="dialog" aria-labelledby="createPoll" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
       
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form className="add-investment-wrap">
        <div className="form-group">
              <label  className="form-control-label">Title</label>
              <input  
                onChange={handleChange}
                value={aboutPoll.title}
                name="title" 
                type="text" 
                className="form-control" 
               
              />
            </div> 

            <div className="form-group">
              <label  className="form-control-label">Select  who you want to recieve this Poll*</label>
          <select className="form-control"
               onChange={handleChange}
                value={aboutPoll.who}
                name="who"  id="">
            <option value="">Select</option>
               <option value="agric_tech">Agric Tech</option>
            <option value="real_estate">Real Estate </option>
            <option value="fixed_income">Fixed Income</option>
            <option value="others">Others</option>
          </select> 
          </div>


          <div className="form-group">
              <label  className="form-control-label">Description (Optional)</label>
              <textarea  
                onChange={handleChange}
                value={aboutPoll.description}
                name="description"
                type="text" 
                className="form-control" 
               
              />
            </div> 

        </form>
        <button onClick={setPoll(JSON.stringify(aboutPoll))}>Next</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

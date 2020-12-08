import React,{useState,useEffect} from 'react'
import Layout from "../layout/index";
import CreatePollModal from '../Modals/createPoll'
import {getPoll} from '../../helpers/storePollData'
import './index.css'
export default function CreatePoll(props) {
    // useEffect(() => {
    //     setretrivePollHeaders(JSON.parse(getPoll))
       
    // }, [])
    const [retrivePollHeaders, setretrivePollHeaders] = useState([])
    const [PollOptions, setPollOptions] = useState([])
    const [savePollData, setsavePollData] = useState([])
    const [PollOptionsInput, setPollOptionsInput] = useState("")
    const [pollQuestion, setpollQuestion] = useState("")
    
  const handlePollOptions=(type,deleteData)=>{
    if (type === "add") {
      if (PollOptionsInput === "" || PollOptionsInput === null || PollOptionsInput === undefined) {
        return
      }
       if (PollOptions.find(data=>data === PollOptionsInput)) {
      alert(`${PollOptionsInput} already added`)
      return
    }
    setPollOptions([...PollOptions,PollOptionsInput])
    setPollOptionsInput("")
    }
    else{
      let deletData = PollOptions[deleteData]
      let filterData = PollOptions.filter(data=>{
       return data !== deletData
      })
      console.log(filterData)
      setPollOptions(filterData)
    }
    console.log(JSON.parse(getPoll))
   
  }

  const editOptions=(e,index)=>{
    const newPollOptions = [...PollOptions];
    newPollOptions[index] = e.target.value;
    setPollOptions(newPollOptions)
    console.log(getPoll)

  }

  const savePoll = ()=>{
      let data = [savePollData]

    setsavePollData([{ques:PollOptions}])
    setPollOptionsInput("")
    console.log(savePollData)
  }

    return (
      <div>
        <Layout>
            <div className="app-content">
					<section className="section">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="#" className="text-muted">
									{getPoll.who}
								</a>
							</li>
							
							<li className="breadcrumb-item active text-" aria-current="page">
								User Role
							</li>
						</ol>
						<div className="section-body">
						

                                        <div className="create-poll-container">

                                            <div className="create-poll-form-col">

                                                <div className="createPollForm-col-one-child">

                                                    <form>
                                                        <div className="poll-input-wrap">
                                                            <label>Question</label>
                                                            <textarea onChange={(e)=>setpollQuestion(e.target.value)} required placeholder="Type your first question here"  name="" id="" cols="30" rows="10"></textarea>
                                                        </div>

                                                        <div className="poll-options">
                                                                <label>Input poll option</label>

                                                                <div className="poll-input-add">
                                                                    <input  title="Click the plus button to add option"  style={{borderRadius:"5px 0px 0 5px"}} onChange={(e)=>setPollOptionsInput(e.target.value)} type="text"
                                                                    placeholder="eg, your text here" value={PollOptionsInput}/><img 
                                                                  src="./add.png"
                                                                 onClick={(data)=>handlePollOptions("add","")}/>
                                                                </div>
                                                                
                                                                <div className="poll-tags">
                                                                {
                                                                    PollOptions.map((data,index)=>{
                                                                    return (
                                                                    <div className="poll-options-drow">

                                                                        <input required value={data} onChange={(e)=>editOptions(e,index)} 
                                                                        className="funding-industry-tags-span" />
                                                                        <img src="./remove.png" onClick={(data)=>handlePollOptions("remove",index)} />
                                                            
                                                            </div>)})
                                                                }
                                                                </div>
                                                                
                                                                <div className="save-poll-btn">
                                                                     <button onClick={savePoll} type='button'>Save</button>
                                                                </div>
                                                               
                                                                </div>

                                                    </form>

                                                </div>

                                                <div className="createPollForm-col-two-child">
                                                <form>
                                                <div className="selet-poll-type">
                                                    <label htmlFor="">Add answers</label>
                                                     <select name="" id="">
            
                                                        <option value="single">Single  choice answer</option>
                                                    </select>
                                                </div>
                                                   

                                                    <div className="poll-enable-others">
                                                        <input type="checkbox"/> <label style={{fontSize:"15px",marginLeft:"10px"}}>Enable  others</label>
                                                    </div>
                                                    
                                                    
                                                </form>

                                                </div>

                                            </div>

                                            <div className="create-poll-preview">
                                            {/* <div className="poll-tags">
                                            
                                                           
                                                                </div> */}

                                            </div>
                                            

                                        </div>
									
      
           
    
 

 </div>
 </section>
 </div>
        </Layout>
        <CreatePollModal push={props.history.push} />
        </div>
    )
}


import React,{useState} from 'react'
import Layout from "../layout/index";
import CreatePoll from '../Modals/createPoll'
export default function Index(props) {
    const [Features, setFeatures] = useState([])
    const [FeaturesInput, setFeaturesInput] = useState("")
    
  const handleFeatures=(type,deleteData)=>{
    if (type === "add") {
      if (FeaturesInput === "" || FeaturesInput === null || FeaturesInput === undefined) {
        return
      }
       if (Features.find(data=>data === FeaturesInput)) {
      alert(`${FeaturesInput} already added`)
      return
    }
    setFeatures([...Features,FeaturesInput])
    setFeaturesInput("")
    }
    else{
      let deletData = Features[deleteData]
      let filterData = Features.filter(data=>{
       return data !== deletData
      })
      console.log(filterData)
      setFeatures(filterData)
    }
   
  }

  const editOptions=(e,index)=>{
    const newFeatures = [...Features];
    newFeatures[index] = e.target.value;
    setFeatures(newFeatures)
    console.log(Features)

  }

    return (
      <div>
        <Layout>
            <div className="app-content">
					<section className="section">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="#" className="text-muted">
									Home
								</a>
							</li>
							
							<li className="breadcrumb-item active text-" aria-current="page">
								User Role
							</li>
						</ol>
						<div className="section-body">
							<div className="row">
								<div className="col-md-7">
									<div className="card">
										<div className="card-header custom-header">
											<div className="col col-md-12">
												<button
													type="button"
													className="btn "
													data-toggle="modal"
                                                    data-target="#createPoll"
                                                    // onClick={this.reSetModal}
												>
													CREATE NEW
												</button>
												{/* <div className="inputf">
														<input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
												</div> */}
											</div>
										</div>
            <div>
            
                </div>
     </div>
 </div>
  </div>
 </div>
 </section>
 </div>
        </Layout>
        <CreatePoll push={props.history.push} />
        </div>
    )
}
// onBlur={this.handleEditDaata(id)}

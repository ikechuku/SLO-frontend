import React from 'react';

const index = (props) => {
    console.log(props.goback)
    return (
        <div>
           <i onClick={()=>{console.log(props.goback())}} style={{color:"#5c6287",fontSize:"25px",cursor:"pointer"}} class="fas fa-long-arrow-alt-left"></i> 
        </div>
    );
}

export default index;

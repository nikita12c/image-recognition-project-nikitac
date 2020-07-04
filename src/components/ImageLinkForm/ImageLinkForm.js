import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm=({onInputChange,onButtonSubmit})=>{
	return(
	  <div className="f3">
          <p>
             {'This Magic Brain will detect faces in your pictures. Give it a try !'}
          </p>
          <div className="new">
            <div className="form new pa4 br3 shadow-5 ">
             <input className="f4 pa2 w-70 center " type="text" onChange={onInputChange}/>
             <button style={{background:'#430505'}} className="w-30 grow f4 link ph3 pv2 dib white pointer"
             onClick={onButtonSubmit}> Detect </button>         
             </div>
          </div>
	  </div>
		);
}



export default ImageLinkForm;
import React from 'react';
const FaceRecognition=({imageUrl})=>{
	return(
     <div className="new ma">
     <div className="absolute mt2">
        <img src={imageUrl} width="500px" height="auto"/>
     </div>
     </div>
		);
}


export default FaceRecognition;

import React from "react";
import { GiCloudUpload } from "react-icons/gi"
 
const Loading = () => {
  return (
    <div className="loading-container">
        <div className="lds-dual-ring"><GiCloudUpload className="loading-photo"/></div>
    </div>
  );
};
 
export default Loading;

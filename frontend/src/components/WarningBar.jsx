import React from "react";

const WarningBar = (props)=>{
    const classname = `alert alert-${props.warningType}`;
    if(props.return){
        return(
            <div className={classname} role="alert">{props.content}</div>
        );
    }
    else{
        return null;
    }
    
}

export default WarningBar;
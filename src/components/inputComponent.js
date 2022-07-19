import React from "react";

export const InputComponent=({type, name,value, placeholder,changeFunction})=>{
    return(<input
        style={{width: 250,border:'1px solid #C3C4C9',borderRadius:4,outline:'none' }}
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        className="signup-form"
        onChange={changeFunction}

    />)
}
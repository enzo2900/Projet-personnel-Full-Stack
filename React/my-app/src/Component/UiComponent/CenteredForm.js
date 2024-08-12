import React from "react";
import { Children } from "react";

export function CenteredForm({children,  className}) {
    return (
        <div className={` ${className} centeredDivBox center container`}>
            <div className=" center row justify-content-md-center">
                {children}
            </div>
        </div>

    );
}

export function FormRowC({children,id,label}) {
    return(
        <div className=" left row offset-1 box">
            <div className=" left col-6">
                        <label htmlFor={id}>{label}</label>
                    </div>
                    <div className=" left  col-4">
                        
                        {children}
                     </div>
           
        </div>
    );
}
export function GeneralInput({type,text,onChange,value,id}) {
    return(
        <input type={type} onChange={onChange}id={id} value={value} required>{text}</input>
    );
}
export function InputText({text,onChange,value,id}){
    return(
        <GeneralInput type="text" id={id} onChange={onChange} value={value} text={text}></GeneralInput>
    );
}

export function InputEmail({text,onChange,value,id}){
    return(
        <GeneralInput type="email"  id={id} onChange={onChange} value={value} text={text}></GeneralInput>
    );
}
export function InputPassword({text,onChange,value,id}){
    return(
        <GeneralInput type="password"  id={id} onChange={onChange} value={value} text={text}></GeneralInput>
    );
}
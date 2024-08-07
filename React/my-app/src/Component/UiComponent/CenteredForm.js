import React from "react";
import { Children } from "react";
export function CenteredForm({children}) {
    return (
        <div className='centeredDivBox center container'>
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
import React from "react";
import { Controller } from "react-hook-form";
import './Input.css';

const Input = ({ label, name, control, defaultValue, error, classNames, type }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <>
                        {/* <label htmlFor={name}>{label}</label> */}
                        <input {...field} className={classNames} type={type} placeholder={`Enter ${name}`}/>
                        {error && <p className="error">{error.message}</p>}
                    </>
                )}
            />
        </>
    );
};

export default Input;

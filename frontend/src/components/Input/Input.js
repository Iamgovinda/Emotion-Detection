import React from "react";
import { Controller } from "react-hook-form";
import './Input.css';

const Input = ({ label, name, control, defaultValue, error, classNames, type }) => {
    return (
        <>
            <div className="label-div">
                <label htmlFor={name} style={{ textAlign: 'end' }}>{label}</label>
            </div>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <div>
                        <input {...field} className={classNames} type={type}/>
                        {error && <p className="error">{error.message}</p>}
                    </div>
                )}
            />
        </>
    );
};

export default Input;

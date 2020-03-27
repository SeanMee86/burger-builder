import React from "react";
import classes from './Input.module.scss'

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let validationError = null;
    if(props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>
    }

    switch(props.elementType) {
        case 'input':
            inputElement = <input
                onChange={props.onChanged}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>;
            break;
        case 'textarea':
            inputElement = <textarea
                onChange={props.onChanged}
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}/>;
            break;
        case 'select':
            inputElement = (
                <select
                    onChange={props.onChanged}
                    className={classes.InputElement}
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input
                onChange={props.onChanged}
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default input;
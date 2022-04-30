import { TextField } from "@mui/material";
import React from "react";
import styles from "./InputComponent.module.css";
import { FloatingLabel, Form } from "react-bootstrap";

const InputComponent = (props) => {
  const {
    input,
    label,
    labelFor,
    id,
    disabled,
    type,
    placeholder,
    className,
    defaultValue,
    ref,
    required,
    readOnly,
    value,
    meta: { touched, error, warning },
  } = props;

  return (
    <div className={styles.inputComponent}>
      <>
        {/* {label && <label htmlFor={labelFor}>{label}</label>} */}
        <FloatingLabel controlId={id} label={label} className="mb-3">
          <Form.Control
            ref={ref}
            disabled={disabled}
            {...input}
            type={type}
            placeholder={placeholder}
            className={className}
            defaultValue={defaultValue}
            required={required}
            autoFocus
            readOnly={readOnly}
            // value={value}
          />
        </FloatingLabel>
      </>

      {/* {touched && error && <span>{error}</span>} */}
    </div>
  );
};

export default InputComponent;

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./PhoneInputComponent.module.css";

const PhoneInputComponent = (props) => {
  const {
    input,
    disabled,
    placeholder,
    className,
    ref,
    required,
    defaultCountry,
    id,
    setDialCode,
    meta: { touched, error, warning },
  } = props;

  return (
    <div className={styles.phoneInputComponent}>
      <PhoneInput
        // ref={ref}
        // disabled={disabled}
        placeholder={placeholder}
        // className={className}
        // required={required}
        // autoFocus
        {...input}
        id={id}
        country={defaultCountry && `${defaultCountry.toLowerCase()}`}
        enableAreaCodes={true}
        inputProps={{
          name: "phoneNumber",
          required: true,
          autoFocus: true,
        }}
        inputStyle={{ padding: "2rem 2rem 2rem 48px" }}
        dropdownStyle={{ position: "absolute", height: 90 }}
        onChange={(value, data, event, formattedValue) => {
          setDialCode(data.dialCode)
          input.onChange(value, data, event, formattedValue);
        }}
      />
    </div>
  );
};

export default PhoneInputComponent;

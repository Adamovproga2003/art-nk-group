import { useState } from "react";
import AsyncSelect from "react-select";

const SelectField = (props) => {
  const { input, label, placeholder, options, meta } = props;
  const { onChange, onFocus } = props.input;

  return (
    <AsyncSelect
      name={input.name}
      cacheOptions
      options={options}
      value={input.value}
      onChange={onChange}
      onBlurResetsInput={false}
      onCloseResetsInput={false}
      onFocus={onFocus}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default SelectField;

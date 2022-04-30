import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Loader from "../../core/Loader/Loader";
import AsyncSelectField from "../../form/AsyncSelectField/AsyncSelectField";
import InputComponent from "../../form/InputComponent/InputComponent";

const ModalFormDelivery = ({
  pristine,
  reset,
  submitting,
  isLoading,
  handleSubmit,
}) => {

  const [codeOptions, setCodeOptions] = useState([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/iso")
      .then((response) => response.json())
      .then((response) => {
        let options = [];
        for (const country of response.data) {
          options.push({
            value: country.Iso2.toLowerCase(),
            label: country.Iso2,
          });
        }
        setCodeOptions(options);
      })
      .catch((e) => console.error(e))
      .finally(() => console.log("Loading was finished"));
  }, []);

  return (
    <div>
      <div>
        <h2>Choose your location</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            type="text"
            placeholder="State"
            name="state"
            component={InputComponent}
            required
          />
        </div>
        <div>
          <Field
            type="text"
            placeholder="City"
            name="city"
            component={InputComponent}
            required
          />
        </div>
        <div>
          <Field
            type="text"
            placeholder="Street"
            name="street"
            component={InputComponent}
            required
          />
        </div>
        <div>
          <Field
            type="text"
            placeholder="House number"
            name="house_number"
            component={InputComponent}
            required
          />
        </div>
        <div>
          <Field
            type="text"
            placeholder="Postal code"
            name="postal_code"
            component={InputComponent}
            required
          />
        </div>
        <div>
          <Field
            type="select"
            placeholder="Country code"
            name="country_code"
            component={AsyncSelectField}
            options={codeOptions}
          />
        </div>
        <div>
          <button type="submit">
            {!isLoading ? <span>Validate</span> : <Loader />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  (state) => ({
    isValid: state.gps.isValid,
    isLoading: state.api.isLoading,
  }),
  null
)(
  reduxForm({
    form: "delivery", // a unique identifier for this form
  })(ModalFormDelivery)
);

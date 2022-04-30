import { Button, Fade, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { verifyCode } from "../../../../actions/shipping-actions";
import InputComponent from "../../InputComponent/InputComponent";
import PhoneInputComponent from "../../PhoneInputComponent/PhoneInputComponent";
import PhoneVerifyForm from "../PhoneVerifyForm/PhoneVerifyForm";
import styles from "./ContactForm.module.css";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.surname) {
    errors.surname = "Required";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Required";
  }
  if (values.phoneNumber && values.phoneNumber.length < 10) {
    errors.phoneNumber = "No filled";
  }
  return errors;
};

function ContactForm({
  activeStep,
  containerRef,
  direction,
  defaultCountry,
  country,
  handleSubmit,
  invalid,
  pristine,
  setDirection,
  handleNext,
  change,
  verifyCode,
  verifyStep,
  setVerifyStep,
  handleComplete
}) {
  const [isVerified, setIsVerified] = useState(false);
  const [dialCode, setDialCode] = useState(null);


  useEffect(() => {
    setVerifyStep(false);
  }, [activeStep]);

  const handleVerifyNumber = () => {
    change("verifyStep", true);
    change("dialCode", dialCode);
  };

  const handleNextForm = () => {
    handleComplete()
    change("verifyStep", false);
  };

  console.log(invalid)

  return (
    <div>
      <Fade
        in={activeStep === 0 && !verifyStep}
        container={containerRef.current}
        unmountOnExit
        mountOnEnter
        timeout={{ enter: 1000, exit: 0 }}
      >
        <div>
          <Slide
            direction={direction}
            in={activeStep === 0 && !verifyStep}
            container={containerRef.current}
            unmountOnExit
            mountOnEnter
            timeout={{ enter: 1000, exit: 0 }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.contactContainer}>
                <div>
                  <h1>User contacts</h1>
                </div>
                <div className={styles.wrapperContainer}>
                  <div className={styles.inputContainer}>
                    <Field
                      name="name"
                      id="Name"
                      type="text"
                      placeholder="Enter your name"
                      component={InputComponent}
                      label="Name"
                      labelFor="Name"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Field
                      name="surname"
                      id="Surname"
                      type="text"
                      placeholder="Enter your surname"
                      component={InputComponent}
                      label="Surname"
                      labelFor="Surname"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Field
                      name="phoneNumber"
                      id="phone"
                      placeholder="Enter your phone"
                      defaultCountry={defaultCountry}
                      component={PhoneInputComponent}
                      setDialCode={setDialCode}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.submitDiv}>
                <Button
                  type="submit"
                  sx={{ mr: 1 }}
                  disabled={pristine || invalid }
                  onClick={handleVerifyNumber}
                >
                  Virefy phone
                </Button>
                <Button
                  type="submit"
                  sx={{ mr: 1 }}
                  disabled={pristine || invalid}
                  onClick={handleNextForm}
                >
                  Next
                </Button>
              </div>
            </form>
          </Slide>
        </div>
      </Fade>
      <PhoneVerifyForm
        verifyStep={verifyStep}
        direction={direction}
        containerRef={containerRef}
        onSubmit={(values) => verifyCode(values.code)}
        setVerifyStep={setVerifyStep}
        setDirection={setDirection}
      />
    </div>
  );
}

export default connect(null, { verifyCode })(
  reduxForm({
    form: "contact",
    validate,
  })(ContactForm)
);

import { Button, Slide } from "@mui/material";
import React, { useState } from "react";
import { Fade } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import InputComponent from "../../InputComponent/InputComponent";
import styles from "./PhoneVerifyForm.module.css";

function PhoneVirefyForm({
  direction,
  containerRef,
  handleSubmit,
  pristine,
  invalid,
  verifyStep,
  setVerifyStep,
  setDirection,
}) {
  const [isVerified, setIsVerified] = useState(false);
  console.log(setIsVerified)
  const handleBack = () => {
    setDirection("right");
    setVerifyStep(false);
  };
  return (
    <Fade
      in={verifyStep}
      container={containerRef.current}
      unmountOnExit
      mountOnEnter
      timeout={{ enter: 1000, exit: 0 }}
    >
      <div>
        <Slide
          direction={direction}
          in={verifyStep}
          container={containerRef.current}
          unmountOnExit
          mountOnEnter
          timeout={{ enter: 1000, exit: 0 }}
        >
          <form onSubmit={handleSubmit}>
            <div className={styles.contactContainer}>
              <div>
                <h1>Verify phone number</h1>
              </div>
              <div className={styles.wrapperContainer}>
                <div className={styles.inputContainer}>
                  <Field
                    name="code"
                    id="Code"
                    type="text"
                    placeholder="Enter your code"
                    component={InputComponent}
                    label="Code"
                    labelFor="Code"
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.submitDiv}>
              <Button
                type="submit"
                sx={{ mr: 1 }}
                disabled={pristine || invalid}
              >
                {!isVerified ? "Verify code" : "Next"}
              </Button>
              <Button type="button" sx={{ mr: 1 }} onClick={handleBack}>
                Back
              </Button>
            </div>
          </form>
        </Slide>
      </div>
    </Fade>
  );
}

export default reduxForm({
  form: "phone-code",
})(PhoneVirefyForm);

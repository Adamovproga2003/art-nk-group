import React, { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import OutsideClickHandler from "react-outside-click-handler";
import { connect, useDispatch } from "react-redux";
import {
  clearValidate,
  validateAddress,
  verifyNumber,
} from "../../../actions/shipping-actions";
import Loader from "../../core/Loader/Loader";
import ModalFormDelivery from "../ModalFormDelivery/ModalFormDelivery";
import styles from "./ModalFormUser.module.css";
import { CgCheckO, CgCloseO } from "react-icons/cg";
import {
  endValid,
  getGpsUser,
  getLocalityUser,
  startValid,
} from "../../../actions/gps-actions";
import { Field, reduxForm, reset } from "redux-form";
import InputComponent from "../../form/InputComponent/InputComponent";

import "react-phone-number-input/style.css";
import {
  Button,
  Fade,
  Slide,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import PhoneInputComponent from "../../form/PhoneInputComponent/PhoneInputComponent";
import ContactForm from "../../form/info/contactForm/ContactForm";
import InfoProductForm from "../../form/info/InfoProductFrom/InfoProductForm";

function ModalFormUser({
  product,
  setIsGetUserLoc,
  isGetUserLoc,
  validateAddress,
  isValid,
  isLoading,
  country,
  region,
  city,
  lat,
  long,
  getGpsUser,
  startValid,
  isStart,
  countryCode,
  verifyNumber,
  isConfirmedPhone,
}) {
  const [isAllowed, setIsAllowed] = useState(null);

  const [isLoadingPostion, setIsLoadingPostion] = useState(false);

  const [countOfProducts, setCountOfProducts] = useState(1);
  const [defaultCountry, setDefaultCountry] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setDefaultCountry(countryCode);
  }, [countryCode]);

  const onSubmit = (values) => {
    validateAddress({
      address_line1: `${values.house_number} ${values.street}`,
      city_locality: values.city,
      state_province: values.state,
      postal_code: values.postal_code,
      country_code: values.country_code.label,
    });
    startValid();
  };

  useEffect(() => {
    if (!isLoading && isStart) {
      endValid();
    }
    if (!isStart && !isLoading) {
      setIsGetUserLoc(false);
      dispatch(reset("delivery"));
    }
  }, [dispatch, isLoading, isStart, setIsGetUserLoc]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setIsAllowed(true);

        if (
          position.coords.latitude !== lat &&
          position.coords.longitude !== long
        ) {
          getGpsUser(position.coords.latitude, position.coords.longitude);
          await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?language=en&latlng=${
              position.coords.latitude
            },${
              position.coords.longitude
            }&location_type=ROOFTOP&key=${"AIzaSyCZ1Rg80Ktr59-rZnpBQGfAGFty6QJKilc"}`
            // `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          )
            .then((response) => {
              return response.json();
            })
            .then(async (response) => {
              if (response.results[0]) {
                var street_number = "";
                var route = "";
                var city = "";
                var state = "";
                var country = "";
                var country_short = "";
                var zipcode = "";

                var address_components = response.results[0].address_components;

                console.log(response.results);
                console.log(address_components);

                for (var i = 0; i < address_components.length; i++) {
                  if (address_components[i].types[0] === "street_number") {
                    street_number = address_components[i].long_name;
                  }
                  if (address_components[i].types[0] === "route") {
                    route = address_components[i].short_name;
                  }
                  if (
                    address_components[i].types[0] ===
                      "administrative_area_level_1" &&
                    address_components[i].types[1] === "political"
                  ) {
                    state = address_components[i].long_name;
                  }
                  if (
                    address_components[i].types[0] === "locality" &&
                    address_components[i].types[1] === "political"
                  ) {
                    city = address_components[i].long_name;
                  }

                  if (
                    address_components[i].types[0] === "postal_code" &&
                    zipcode == ""
                  ) {
                    zipcode = address_components[i].long_name;
                  }

                  if (address_components[i].types[0] === "country") {
                    country = address_components[i].long_name;
                    country_short = address_components[i].short_name;
                  }
                }
                validateAddress({
                  address_line1: `${street_number} ${route}`,
                  city_locality: city,
                  state_province: state,
                  postal_code: zipcode,
                  country_code: country_short,
                });
                setIsLoadingPostion(true);
                // getLocalityUser(city, state, country);
              }
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              setIsLoadingPostion(false);
            });
        }
      },
      (e) => e.code === 1 && setIsAllowed(false),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  const underStock = (value) => {
    if (value < 1) {
      return "1";
    } else if (value > product.stock) {
      return product.stock;
    } else {
      return value;
    }
  };

  const steps = ["User contacts", "Info product", "Delivery location"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [direction, setDirection] = React.useState("left");
  const [verifyStep, setVerifyStep] = useState();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    setDirection("left");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setDirection("right");
  };

  const handleStep = (step) => () => {
    setDirection(activeStep < step ? "left" : "right");
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const containerRef = useRef();

  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  const onContactSubmit = (values) => {
    if (values.verifyStep) {
      if (values.dialCode) {
        const rawPhone = values.phoneNumber.slice(values.dialCode.length + 1);
        verifyNumber(values.dialCode, rawPhone);
      }
    }
  };

  useEffect(() => {
    console.log(isConfirmedPhone);
    if (isConfirmedPhone !== null) {
      if (!isConfirmedPhone) {
        setVerifyStep(true);
        setDirection("left");
      } else {
      }
    }
  }, [isConfirmedPhone]);

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }} ref={containerRef}>
      <Stepper nonLinear activeStep={activeStep} className={styles.stepper}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className={styles.contentStep}>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <div className={styles.height100}>
            <div className={styles.stepForms}>
              <ContactForm
                activeStep={activeStep}
                containerRef={containerRef}
                direction={direction}
                defaultCountry={defaultCountry}
                country={country}
                onSubmit={onContactSubmit}
                setDirection={setDirection}
                handleNext={handleNext}
                verifyStep={verifyStep}
                setVerifyStep={setVerifyStep}
                handleComplete={handleComplete}
              />
              <InfoProductForm
                activeStep={activeStep}
                containerRef={containerRef}
                direction={direction}
                product={product}
                countOfProducts={countOfProducts}
                underStock={underStock}
                setCountOfProducts={setCountOfProducts}
                handleBack={handleBack}
              />

              <Fade
                in={activeStep === 2}
                container={containerRef.current}
                unmountOnExit
                mountOnEnter
                timeout={{ enter: 1000, exit: 0 }}
              >
                <div>
                  <Slide
                    direction={direction}
                    container={containerRef.current}
                    in={activeStep === 2}
                    unmountOnExit
                    timeout={{ enter: 1000, exit: 0 }}
                  >
                    <form>
                      <div>
                        <div>
                          <h1>Delivery location</h1>
                        </div>
                        <div className={styles.deliveryContainer}>
                          <button
                            onClick={() => setIsGetUserLoc(true)}
                            type="button"
                          >
                            <div>
                              <div>
                                <HiOutlineLocationMarker />
                              </div>
                              {isAllowed ? (
                                <div>
                                  <div className={styles.flexwrap}>
                                    <div>
                                      <span>Your city</span>
                                    </div>
                                    <div>
                                      {isLoading && <Loader />}
                                      {!isGetUserLoc && isValid !== null ? (
                                        isValid ? (
                                          <div className={styles.validSuccess}>
                                            <CgCheckO />
                                          </div>
                                        ) : (
                                          <div className={styles.validError}>
                                            <CgCloseO />
                                          </div>
                                        )
                                      ) : null}
                                    </div>
                                  </div>
                                  {isLoadingPostion ? (
                                    <Loader />
                                  ) : (
                                    <div className={styles.cityRegionContainer}>
                                      <span>{city}</span>
                                      <span>{region}</span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  <h5>
                                    Please, activate access to the location or
                                    tap for finding
                                  </h5>
                                </div>
                              )}
                            </div>
                            <div>
                              <FiArrowRight />
                            </div>
                          </button>
                        </div>
                      </div>
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setIsGetUserLoc(false);
                        }}
                      >
                        <div
                          className={
                            styles.locationForm +
                            " " +
                            (isGetUserLoc ? styles.show : styles.hide)
                          }
                        >
                          <ModalFormDelivery onSubmit={onSubmit} />
                        </div>
                      </OutsideClickHandler>
                    </form>
                  </Slide>
                </div>
              </Fade>
            </div>
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box> */}
          </div>
        )}
      </div>
    </Box>
  );
}

export default reduxForm({
  form: "product",
  initialValues: {
    count: "1",
  },
})(
  connect(
    (state) => ({
      isValid: state.gps.isValid,
      isLoading: state.api.isLoading,
      lat: state.gps.lat,
      long: state.gps.long,
      country: state.gps.country,
      countryCode: state.gps.country_code,
      region: state.gps.state,
      city: state.gps.city,
      isStart: state.gps.isStart,
      isConfirmedPhone: state.shipping.isConfirmedPhone,
    }),
    { validateAddress, getGpsUser, getLocalityUser, startValid, verifyNumber }
  )(ModalFormUser)
);

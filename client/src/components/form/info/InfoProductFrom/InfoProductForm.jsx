import { Button, Slide } from "@mui/material";
import React, { useState } from "react";
import { Fade, FloatingLabel, Form } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import InputComponent from "../../InputComponent/InputComponent";
import styles from "./InfoProductForm.module.css";

function InfoProductForm({
  activeStep,
  containerRef,
  direction,
  product,
  countOfProducts,
  underStock,
  setCountOfProducts,
  pristine,
  handleBack
}) {

  const handleNextForm = () => {

  }

  return (
    <Fade
      in={activeStep === 1}
      container={containerRef.current}
      unmountOnExit
      mountOnEnter
      timeout={{ enter: 1000, exit: 0 }}
      style={{ height: "100%" }}
    >
      <div>
        <Slide
          direction={direction}
          container={containerRef.current}
          in={activeStep === 1}
          unmountOnExit
          timeout={{ enter: 1000, exit: 0 }}
        >
          <form>
            <div className={styles.productContainer}>
              <div>
                <h1>{product.title}</h1>
              </div>
              <div
                className={
                  styles.wrapperContainer + " " + styles.wrapperProduct
                }
              >
                <div className={styles.productImage}>
                  <img
                    src={product.thumbnail}
                    alt="product"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className={styles.flexWrap}>
                  <div>
                    <Field
                      id="Count"
                      label="Count"
                      labelFor="Count"
                      name="count"
                      type="number"
                      placeholder="Count of needed product"
                      component={InputComponent}
                      normalize={underStock}
                      onChange={(e) =>
                        +e.target.value > 0 &&
                        +e.target.value <= +product.stock &&
                        setCountOfProducts(+e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <FloatingLabel
                      controlId="price"
                      label="Price"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Price"
                        required
                        autoFocus
                        readOnly
                        value={`${+product.price * countOfProducts} $`}
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.submitDiv}>
              <Button
                type="button"
                sx={{ mr: 1 }}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                sx={{ mr: 1 }}
                disabled={pristine}
                onClick={handleNextForm}
              >
                Next
              </Button>
            </div>
          </form>
        </Slide>
      </div>
    </Fade>
  );
}

export default reduxForm({
    form: "info-form"
})(InfoProductForm);

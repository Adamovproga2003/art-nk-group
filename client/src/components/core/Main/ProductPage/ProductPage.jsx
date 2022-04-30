import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getProduct } from "../../../../actions/app-actions";
import PreviewImageCarousel from "../../../containers/PreviewImageCarousel/PreviewImageCarousel";
import Loader from "../../Loader/Loader";
import styles from "./ProductPage.module.css";
import GooglePayButton from "@google-pay/button-react";
import OutsideClickHandler from "react-outside-click-handler";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";

import ModalFormUser from "../../../containers/ModalFormUser/ModalFormUser";

function ProductPage({ getProduct, product }) {
  const [isWant, setIsWant] = useState(false);
  const [isGetUserLoc, setIsGetUserLoc] = useState(false);

  const params = useParams();

  useEffect(() => {
    getProduct(params.id);
  }, [getProduct, params.id]);

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className={styles.productPage}>
      {product ? (
        <div key={product.id}>
          <div className="container">
            <div className={styles.infoProduct}>
              <div>
                <PreviewImageCarousel product={product} />
              </div>
              <div>
                <div className={styles.priceProduct}>
                  <div>
                    <h4>{product.price} $</h4>
                  </div>
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => setIsWant(true)}
                    >
                      To buy
                    </button>
                  </div>
                  {/* <GooglePayButton
                                        environment="TEST"
                                        paymentRequest={{
                                            apiVersion: 2,
                                            apiVersionMinor: 0,
                                            allowedPaymentMethods: [
                                            {
                                                type: 'CARD',
                                                parameters: {
                                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                },
                                                tokenizationSpecification: {
                                                type: 'PAYMENT_GATEWAY',
                                                parameters: {
                                                    gateway: 'example',
                                                    gatewayMerchantId: 'exampleGatewayMerchantId',
                                                },
                                                },
                                            },
                                            ],
                                            merchantInfo: {
                                            merchantId: 'BCR2DN6T5633HDKB',
                                            merchantName: 'Demo Merchant',
                                            },
                                            transactionInfo: {
                                            totalPriceStatus: 'FINAL',
                                            totalPriceLabel: 'Total',
                                            totalPrice: '100.00',
                                            currencyCode: 'USD',
                                            countryCode: 'US',
                                            },
                                        }}
                                        onLoadPaymentData={paymentRequest => {
                                            console.log('load payment data', paymentRequest);
                                        }}
                                        /> */}
                </div>
              </div>
            </div>
          </div>
          <OutsideClickHandler
            onOutsideClick={() => {
              if (!isGetUserLoc) {
                setIsWant(false);
              }
            }}
          >
            <div
              className={
                styles.modalPrice + " " + (isWant ? styles.show : styles.hide)
              }
            >
              {isWant && (
                <ModalFormUser
                  product={product}
                  setIsGetUserLoc={setIsGetUserLoc}
                  isGetUserLoc={isGetUserLoc}
                  // onSubmit={onSubmit}
                />
              )}
            </div>
          </OutsideClickHandler>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default connect(
  (state) => ({
    product: state.app.currentProduct,
  }),
  { getProduct }
)(ProductPage);

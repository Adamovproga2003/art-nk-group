import React, { useEffect, useRef } from "react";
import styles from "./ProductsComponent.module.css";
import { useOnLoadImages } from "../../../../../hooks/useOnLoadImages";
import Loader from "../../../Loader/Loader";
import ProductsContent from "./ProductsContent/ProductsContent";
import { connect } from "react-redux";

const ProductsComponent = ({
  isLoading,
  currentSection,
  setCurrentSection,
  countOfViewedProducts,
  sortedCategory
}) => {
  const wrapperRef = useRef(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);



  return (
    <div className={styles.productsComponent} ref={wrapperRef}>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductsContent
          imagesLoaded={imagesLoaded}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          countOfViewedProducts={countOfViewedProducts}
        />
      )}
    </div>
  );
};

export default connect((state) => ({
  isLoading: state.api.isLoading,
}))(ProductsComponent);

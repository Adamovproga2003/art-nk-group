import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getProducts,
  getProductsOfCategory,
} from "../../../../actions/app-actions";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import styles from "./HomePage.module.css";
import ProductsComponent from "./ProductsComponent/ProductsComponent";
import SortComponent from "./SortComponent/SortComponent";

const COUNT_OF_VIEW_PRODUCTS_M_1252 = 9;
const COUNT_OF_VIEW_PRODUCTS_L_1252 = 8;

const HomePage = ({ getProductsOfCategory, getProducts }) => {
  const [sortedCategory, setSortedCategory] = useState(null);
  const { width } = useWindowDimensions();
  const [countOfViewedProducts, setCount] = useState(null);
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    getProducts(countOfViewedProducts, currentSection);
  }, [countOfViewedProducts, currentSection, getProducts]);

  useEffect(() => {
    if (width >= 1252) {
      setCount(COUNT_OF_VIEW_PRODUCTS_M_1252);
      getProducts(COUNT_OF_VIEW_PRODUCTS_M_1252, currentSection);
    } else {
      setCount(COUNT_OF_VIEW_PRODUCTS_L_1252);
      getProducts(COUNT_OF_VIEW_PRODUCTS_L_1252, currentSection);
    }
  }, [width]);

  return (
    <div className={styles.homePage}>
      <SortComponent
        setSortedCategory={setSortedCategory}
        sortedCategory={sortedCategory}
        setCurrentSection={setCurrentSection}
        countOfViewedProducts={countOfViewedProducts}
        currentSection={currentSection}
      />
      <ProductsComponent
        sortedCategory={sortedCategory}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        countOfViewedProducts={countOfViewedProducts}
      />
    </div>
  );
};

export default connect(null, { getProductsOfCategory, getProducts })(HomePage);

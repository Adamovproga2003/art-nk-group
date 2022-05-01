import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./SortComponent.module.css";
import { Button } from "@mui/material";
import {
  getCategories,
  getProducts,
  getProductsOfCategory,
} from "../../../../../actions/app-actions";

const SortComponent = ({
  categories,
  setSortedCategory,
  sortedCategory,
  getCategories,
  setCurrentSection,
  countOfViewedProducts,
  currentSection,
  getProducts,
  getProductsOfCategory,
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const sortBy = (category) => {
    if (sortedCategory !== category) {
      setSortedCategory(category);
      getProductsOfCategory(category);
    } else {
      setSortedCategory(null);
      getProducts(countOfViewedProducts, currentSection);
    }
    setCurrentSection(1);
  };

  return (
    <div className={styles.sortComponent}>
      <h1>Sorted List</h1>
      <div>
        {categories.map((category, index) => {
          return (
            <div key={index} className={styles.productCategoryDiv}>
              <Button
                variant="outlined"
                className={`${styles.productCategoryButton} ${
                  sortedCategory === category && styles.active
                }`}
                onClick={() => sortBy(category)}
              >
                {category}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    categories: state.app.categories,
  }),
  { getCategories, getProductsOfCategory, getProducts }
)(SortComponent);

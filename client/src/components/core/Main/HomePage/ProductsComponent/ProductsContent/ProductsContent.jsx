import { Breadcrumbs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  clearProduct,
} from "../../../../../../actions/app-actions";
import Pagination from "../../../../../containers/Pagination/Pagination";
import ProductCard from "../../../../../containers/ProductCard/ProductCard";
import styles from "./ProductsContent.module.css";

function ProductsContent({
  sortedCategory,
  products,
  currentProduct,
  clearProduct,
  totalProducts,
  imagesLoaded,
  currentSection,
  setCurrentSection,
  countOfViewedProducts,
}) {
  const [cards, setCards] = useState(products);

  useEffect(() => {
    setCards(products);
  }, [products]);

  useEffect(() => {
    currentProduct && clearProduct();
  }, [clearProduct, currentProduct]);

  if (!imagesLoaded) {
    return <></>;
  }

  return (
    <div>
      <div className={styles.breadcrumb}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {sortedCategory}
        </Breadcrumbs>
      </div>
      <div className={styles.wrapperProductsComponent}>
        {cards &&
          cards.length > 0 &&
          cards.map((card) => <ProductCard card={card} key={card.id} />)}
      </div>
      <div>
        <Pagination
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          countOfViewedProducts={countOfViewedProducts}
          totalProducts={totalProducts}
        />
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    products: state.app.products,
    currentProduct: state.app.currentProduct,
    totalProducts: state.app.totalProducts,
    isLoading: state.api.isLoading,
  }),
  { clearProduct }
)(ProductsContent);

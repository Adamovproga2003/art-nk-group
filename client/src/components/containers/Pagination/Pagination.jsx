import React, { useEffect } from "react";
import styles from "./Pagination.module.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

function Pagination({
  currentSection,
  setCurrentSection,
  countOfViewedProducts,
  totalProducts,
}) {
  const getCountOfPagination = () => {
    return Math.ceil(totalProducts / countOfViewedProducts);
  };

  const getPrev = () => {
    currentSection !== 1 && setCurrentSection((prev) => prev - 1);
    
  };

  const getNext = () => {
    currentSection !== getCountOfPagination() &&
      setCurrentSection((prev) => prev + 1);
  };

  
  return (
    <div id="app" className={styles.container}>
      <ul className={styles.page}>
        <div className={styles.arrow_btn}>
          <button
            className={styles.prev_btn}
            onClick={getPrev}
            disabled={currentSection === 1}
          >
            <RiArrowLeftSLine />
          </button>
        </div>

        {currentSection > 2 && (
          <div>
            <button
              onClick={() => setCurrentSection(1)}
              className={styles.page__numbers}
            >
              1
            </button>
          </div>
        )}

        {currentSection > 3 && <li className={styles.page__dots}>...</li>}

        {currentSection === getCountOfPagination() &&
          getCountOfPagination() > 2 && (
            <div>
              <button
                onClick={() => {
                  getPrev();
                  getPrev();
                }}
                className={styles.page__numbers}
              >
                {currentSection - 2}
              </button>
            </div>
          )}

        {currentSection !== 1 && (
          <div>
            <button className={styles.page__numbers} onClick={getPrev}>
              {currentSection - 1}
            </button>
          </div>
        )}

        <div>
          <button className={styles.page__numbers && styles.activePage}>
            {currentSection}
          </button>
        </div>
        {currentSection !== getCountOfPagination() && (
          <div>
            <button className={styles.page__numbers} onClick={getNext}>
              {currentSection + 1}
            </button>
          </div>
        )}

        {currentSection + 2 < getCountOfPagination() && (
          <li className={styles.page__dots}>...</li>
        )}

        {currentSection + 1 < getCountOfPagination() &&
          getCountOfPagination() > 2 && (
            <div>
              <button
                onClick={() => {
                  setCurrentSection(getCountOfPagination());
                }}
                className={styles.page__numbers}
              >
                {getCountOfPagination()}
              </button>
            </div>
          )}
        <div className={styles.arrow_btn}>
          <button
            className={styles.next_btn}
            onClick={getNext}
            disabled={currentSection === getCountOfPagination()}
          >
            <RiArrowRightSLine />
          </button>
        </div>
      </ul>
    </div>
  );
}

export default Pagination;

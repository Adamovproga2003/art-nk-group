import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css'
import ProductsComponent from './ProductsComponent/ProductsComponent'
import SortComponent from './SortComponent/SortComponent'

const HomePage = () => {

    const [sortedCategories, setSortedcategory] = useState([])

    useEffect(() => {
        console.log(sortedCategories)
    }, [sortedCategories])
    
    return (
        <div className={styles.homePage}>
            <SortComponent setSortedcategory={setSortedcategory} sortedCategories={sortedCategories} />
            <ProductsComponent sortedCategories={sortedCategories} />
        </div>
    )
}

export default HomePage

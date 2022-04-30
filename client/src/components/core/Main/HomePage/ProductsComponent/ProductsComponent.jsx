import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { clearProduct } from './../../../../../actions/app-actions'
import ProductCard from '../../../../containers/ProductCard/ProductCard'
import styles from './ProductsComponent.module.css'
import { Breadcrumbs } from '@mui/material'
import SortedCards from '../../../../containers/SortedCards/SortedCards'

const ProductsComponent = ({ sortedCategories, products, currentProduct, clearProduct }) => {

    const [cards, setCards] = useState(products)

    useEffect(() => {
        setCards(products)
    }, [products])

    useEffect(() => {
        currentProduct && clearProduct()
    }, [clearProduct, currentProduct])

    return (
        <div className={styles.productsComponent}>
            <div>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {sortedCategories.map((category, index) => {
                        return <span key={index}>{category}</span>
                    })}
                </Breadcrumbs>
            </div>
            <div className={styles.wrapperProductsComponent}>
                {cards && cards.length > 0 &&
                    sortedCategories.length === 0
                    ?
                    cards.map(card => <ProductCard card={card} key={card.id} />)
                    :
                    <SortedCards sortedCategories={sortedCategories} cards={cards} />
                }
                {/* {cards && cards.length > 0 && sortedCategories.length !== 0 && cards.map(card => {
                    if (sortedCategories.includes(card.category)) {
                        return <ProductCard card={card} key={card.id} />
                    }
                    return <></>
                })} */}
            </div>
        </div>
    )
}

export default connect(
    state => ({
        products: state.app.products,
        currentProduct: state.app.currentProduct
    }),
    { clearProduct }
)(ProductsComponent)

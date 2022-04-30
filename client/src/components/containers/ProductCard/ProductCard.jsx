import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './ProductCard.module.css'

function ProductCard(props) {

    const { card } = props

    return (
        <div className={styles.productCard}>
            <div className={styles.productImage}>
                <NavLink to={`/product/${card.id}`}>
                    <img src={card.thumbnail} alt='' crossOrigin="anonymous"/>
                </NavLink>
            </div>
            <div className={styles.productTitle}>
                <h4>
                    <NavLink to={`/product/${card.id}`}>{card.title}</NavLink>
                </h4>
            </div>
            <div className={styles.productPrice}>
                <h2>{card.price} $</h2>
            </div>
        </div>
    )
}

export default ProductCard
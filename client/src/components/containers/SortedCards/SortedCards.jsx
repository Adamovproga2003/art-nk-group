import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'

function SortedCards({ sortedCategories, cards }) {

    const [sortedCards, setSortedCards] = useState([])


    useEffect(() => {
        sortedCategories.forEach(category => {
            setSortedCards([...new Set([
                ...sortedCards.filter(sortedCard => sortedCategories.includes(sortedCard.category)),
                ...cards.filter(card => card.category === category)
            ])])
        })
    }, [cards, sortedCategories])

    return (
        <>
            {sortedCards.map(card => {
                return <ProductCard card={card} key={card.id} />
            })}
        </>
    )
}

export default SortedCards
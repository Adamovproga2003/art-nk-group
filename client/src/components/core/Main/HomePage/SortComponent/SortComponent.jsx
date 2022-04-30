import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './SortComponent.module.css'
import { Button } from '@mui/material'
import { getCategories } from '../../../../../actions/app-actions'

const SortComponent = ({ categories, setSortedcategory, sortedCategories, getCategories }) => {

    useEffect(() => {
        getCategories()
    }, [getCategories])

    const sortBy = category => {
        sortedCategories.includes(category)
            ?
            setSortedcategory([...sortedCategories.filter(c => c !== category)])
            :
            setSortedcategory([...sortedCategories, category])
    }

    return (
        <div className={styles.sortComponent}>
            <h1>Sorted List</h1>
            <div>
                {categories.map((category, index) => {
                    return <div key={index} className={styles.productCategoryDiv}>
                        <Button variant="outlined" className={styles.productCategoryButton} onClick={() => sortBy(category)}>{category}</Button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default connect(
    state => ({
        categories: state.app.categories
    }),
    { getCategories }
)(SortComponent)

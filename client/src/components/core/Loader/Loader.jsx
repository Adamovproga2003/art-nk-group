import React from 'react'
import styles from './Loader.module.css'

function Loader() {
    return (
        <div className={styles.loader}>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
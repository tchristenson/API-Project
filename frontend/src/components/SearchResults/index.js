import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import styles from './SearchResults.module.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

function SearchResults() {

    const searchResults = useSelector(state => state.search)
    const searchResultsArr = Object.values(searchResults)
    console.log('searchResults', searchResults)
    console.log('searchResultsArr', searchResultsArr)

    const searchResultsList = searchResultsArr.map(result => (
        // <NavLink key={result.id}>
            <div className={styles['single-result']}>
                {result.name}
            </div>
        // {/* </NavLink> */}
    ))

    console.log('searchResultsList', searchResultsList)

    return (
        <div>
            <h1>Search Results Component</h1>
            <div>{searchResultsList}</div>
        </div>
    )
}

export default SearchResults

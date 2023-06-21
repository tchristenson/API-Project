import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import styles from './Search.module.css'
import { searchGroupsEventsThunk } from "../../store/search"
import { useHistory } from "react-router-dom";

function Search() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [query, setQuery] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        await dispatch(searchGroupsEventsThunk(query))
        setQuery('')
        history.push('/search')
    }

    return (
        <div className={styles['container']}>
            <div className={styles['search-bar-container']}>
                <input
                    className={styles['search-bar']}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    type='search'
                    placeholder="Search"
                />
                <div onClick={handleSearch} className={styles['search-icon-container']}>
                    <i id='search-icon' className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
        </div>
    )
}

export default Search

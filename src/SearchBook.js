import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksGrid from './BooksGrid'

class SearchBook extends Component {
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.props.onSearch(query, 20)
  }

  componentDidMount() {
    this.props.onReset();
  }


  render() {
    const { searchResult, onSearch, onChangeBookShelf } = this.props
    const { query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search"
            to='/'
          > Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => {
                this.updateQuery(event.target.value)
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={searchResult}
            onChangeBookShelf={onChangeBookShelf}
          />
        </div>
      </div>
    )
  }
}

export default SearchBook
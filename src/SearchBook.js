import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksGrid from './BooksGrid'

class SearchBook extends Component {
  state ={
    query : '',
    searchResult:[]
  }
  updateQuery = (query)=>{
      this.setState({query: query.trim() })
      this.findBook(query,20)
    }
    findBook = (query, maxResults) => {
      BooksAPI.search(query,maxResults).then((result) =>{
       this.setState({searchResult:result})
       console.log(this.state)
      })
    }
    handleBookShelf = (book, shelf) => {
      console.log(book,shelf,'kkkkn')
     BooksAPI.update(book, shelf).then((book) => {
     BooksAPI.getAll().then((books) => {
      this.setState({ books: books})
    })
    })
  }

  render () {
     const{query} = this.state
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
                        onChange={(event)=>this.updateQuery(event.target.value)}
                       />
              </div>
            </div>
            <div className="search-books-results">
              <BooksGrid
                        books={this.state.searchResult}
                        onChangeBookShelf={this.handleBookShelf}
                     />
            </div>
          </div>
    )
  }
}

export default SearchBook
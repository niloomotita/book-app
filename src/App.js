import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResult: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  /**
   * updates the shelf property of the book and reloads the books
   * @param {object} book 
   * @param {string} shelf - shows each book belongs to which shelf
   * @memberof BooksApp
   */
  handleBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((book) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books: books })
      })
    })
  }
  // removes the books from search result page
  resetSearchResults = () => {
    this.setState({ searchResult: [] })
  }
  /**
   * finds the books that user search for and add the shelf property to the books that have a shelf
   * @param {string} query
   * @param {number} maxResults 
   * @memberof BooksApp
   */
  findBook = (query, maxResults) => {
    const books = this.state.books;
    BooksAPI.search(query, maxResults).then((result) => {
      // add shelf info to each title 
      result.map((r) => {
        books.map(book => {
          if (book.id === r.id) {
            r.shelf = book.shelf || "none";
          }
        })
      })
      this.setState({ searchResult: result })
    })
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBook
            onSearch={this.findBook}
            searchResult={this.state.searchResult}
            onChangeBookShelf={this.handleBookShelf}
            onReset={this.resetSearchResults}
          />
        )}
        />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BooksGrid
                      books={this.state.books.filter((b) => b.shelf === 'currentlyReading')}
                      onChangeBookShelf={this.handleBookShelf}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid
                      books={this.state.books.filter((b) => b.shelf === 'wantToRead')}
                      onChangeBookShelf={this.handleBookShelf}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid
                      books={this.state.books.filter((b) => b.shelf === 'read')}
                      onChangeBookShelf={this.handleBookShelf}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link className="open-search"
                to='/search'
              >Add a book</Link>
            </div>
          </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp

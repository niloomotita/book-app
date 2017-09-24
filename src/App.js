import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books})
    })
  } 
     handleBookShelf = (book, shelf) => {
     BooksAPI.update(book, shelf).then((book) => {
     BooksAPI.getAll().then((books) => {
      this.setState({ books: books})
    })
    })
  }
  findBook = (quary, maxResults) => {
      BooksAPI.search(quary,maxResults).then((quary) =>{
        
        
      })
    }
  render() {
    return (
      <div className="app">
         <Route  exact path='/create' render={()=>(
             <SearchBook
               books={this.state.books}
               onBooksearch={this.findBook}
          />
          )}
       />
         
       <Route exact path='/' render={()=>(
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
                        books={this.state.books.filter((b)=> b.shelf ==='currentlyReading')}
                        onChangeBookShelf={this.handleBookShelf}
                     />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid
                        books={this.state.books.filter((b)=> b.shelf ==='wantToRead')}
                        onChangeBookShelf={this.handleBookShelf}
                     />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid
                        books={this.state.books.filter((b)=> b.shelf ==='read')}
                        onChangeBookShelf={this.handleBookShelf}
                     />
                  </div>
                </div>
              </div>
            </div>
          <div className="open-search">
              <Link className="open-search"
                to='/create'
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

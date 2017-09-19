import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksGrid extends Component{
    state = {
        value: 'currently reading'
    }
 
    render(){
        const {books,onChangeBookShelf} = this.props
        return(
              <ol className="books-grid">
                {books.map((book)=>
                    <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail
})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(event) => {onChangeBookShelf(book, event.target.value)}}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                
                )}
                      
                     
                    </ol>    
        )
    }
}
export default BooksGrid
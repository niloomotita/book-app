import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksGrid extends Component {
    state = {
        value: 'none'
    }
    getBookShelf(bookId, shelfSelector) {
        BooksAPI.get(bookId).then((book) => {
            shelfSelector.value = book.shelf
        })
    }
    render() {
        const { books, onChangeBookShelf } = this.props
        return (
            <ol className="books-grid">
                {books.map && books.map((book) =>
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                    width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail
                                        })`
                                }}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf || "none"} onClick={(event) => { this.getBookShelf(book.id, event.target) }} onChange={(event) => { onChangeBookShelf(book, event.target.value) }}>
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
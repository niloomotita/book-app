import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

class SearchBook extends Component {
  state ={
    quary : ''
  }
  updateQuary = (quary)=>{
      this.setState({quary: quary.trim() })
    }

  render () {
     const {books,onBookSearch} = this.props
     const{quary} = this.state
    return (
        <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" 
                 to='/'
                 > Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                       placeholder="Search by title or author"
                       value={this.state.quary}
                        onChange={(event)=>this.updateQuary(event.target.value)}
                       />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
    )
  }
}

export default SearchBook
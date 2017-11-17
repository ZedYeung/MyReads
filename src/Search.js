import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  static PropTypes = {
    queryResults: PropTypes.array.isRequired
  }

  state = {
    query: '',
    queryResults: []
  }

  componentDidMount() {
    this.setState({
      queryResults: []
    })
  }

  searchBooks = (query) => {
    query = query.trim()
    if (query) {
      BooksAPI.search(query, 10).then(
        (books) => {
          this.setState({
            query: query,
            queryResults: books
          })
        }
      )
    } else {
      this.setState({ queryResults: [] })
    }
  }

  render() {
    const { query, queryResults } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-books'
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {queryResults.length > 0 && queryResults.map((book) => (
                <li>
                  <Book key={book.id} id={book.id} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search

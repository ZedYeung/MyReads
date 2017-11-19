import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce';
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  static PropTypes = {
    queryResults: PropTypes.array.isRequired
  }

  state = {
    query: "",
    queryResults: []
  }

  componentDidMount() {
    this.setState({
      queryResults: []
    })
  }

  searchBooks = debounce(400, (query) => {
    if (query) {
      BooksAPI.search(query, 5).then(
        (results) => {
          this.setState({
            query: query,
            queryResults: ("error" in results) ? [] :
              results.map((result) => {
                let index = this.props.books.map((book) => (
                  book.id
                )).indexOf(result.id)

                return index >= 0 ? this.props.books[index] : result
            })
          })
        }
      )
    } else {
      this.setState({
        query: "",
        queryResults: [] })
    }
  })

  render() {
    const { queryResults } = this.state
    const { onUpdateBook } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-books'
              type="text"
              placeholder="Search by title or author"
              // Set value will make the query inconsistent
              // value={query}
              onChange={(event) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {queryResults.length > 0 && queryResults.map((book) => (
                  <li key={book.id}>
                    <Book
                      id={book.id}
                      book={book}
                      onUpdateBook={onUpdateBook}
                    />
                  </li>
                ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search

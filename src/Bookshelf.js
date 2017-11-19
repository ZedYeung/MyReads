import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'


class Bookshelf extends Component {

  static PropTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    category: "all"
  }

  selectCategory(category) {
    this.setState({category})
  }

  render() {
    const { books, onUpdateBook } = this.props
    const { category } = this.state

    let categories = new Set()

    for (let b of books) {
      for (let c of b.categories) {
        categories.add(c)
      }
    }

    categories = [...categories]

    let showingBooks

    if (category !== "all") {
      showingBooks =  books.filter((book) => (
        book.categories.indexOf(category) >= 0
      ))
    } else {
      showingBooks = books
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {["currentlyReading", "wantToRead", "read"].map((shelf) => (
              <div className="bookshelf" key={shelf}>
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {showingBooks.length > 0 && showingBooks.filter((book) => (
                      book.shelf === shelf
                    )).map((book) => (
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
            ))}
          </div>
        </div>
        <div className="category-changer">
          <select value={category} onChange={(event) => {
            this.selectCategory(event.target.value)
          }}>
            <option value="all">All</option>
            {categories.map((category) => (
              <option value={category} key={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="open-search">
          <Link to='/add'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookshelf

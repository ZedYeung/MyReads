import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'


// In Bookshlef component, there are 3 different bookshelfs having a lot same
// code, what is the best way to make it consice?

// I am quite confused with the key attribute, is the same with id attribute But
// used by react and would not be rendered in html, right?
class Bookshelf extends Component {

  static PropTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books, onUpdateBook } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.length > 0 && books.filter((book) => (
                    book.shelf === "currentlyReading"
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.length > 0 && books.filter((book) => (
                    book.shelf === "wantToRead"
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.length > 0 && books.filter((book) => (
                    book.shelf === "read"
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
          </div>
        </div>
        <div className="open-search">
          <Link to='/add'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookshelf

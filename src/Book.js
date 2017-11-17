import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  state = {
    book: {}
  }

  componentDidMount() {
    BooksAPI.get(this.props.id).then(
      (book) => {
        this.setState({book})
      }
    )
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState({
          book: book,
        })
    })
  }

  render() {
    // const { book } = this.props
    const { book } = this.state
    // const { id, shelf, title, author, imageLinks } = book
    console.log(book)

    return (
      <div className="book" id={book.id} key={book.id}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128, height: 193,
              backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})`: null }}>
          </div>
          <div className="book-shelf-changer">
            <select value={book.shelf || "none"} onChange={(event) => {
              this.updateBook(book, event.target.value)
            }}>
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
    )
  }
}

export default Book
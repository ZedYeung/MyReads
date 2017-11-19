import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render() {
    const { book, onUpdateBook } = this.props
    const { id, shelf, title, authors, imageLinks, previewLink } = book

    console.log(book)

    return (
      <div className="book" id={id} key={id}>
        <div className="book-top">
          <a href={previewLink}>
            <div
              className="book-cover"
              style={{
                width: 128, height: 193,
                backgroundImage: imageLinks ? `url(${imageLinks.thumbnail})`: null }}>
            </div>
          </a>
          <div className="book-shelf-changer">
            <select value={shelf || "none"} onChange={(event) => {
              onUpdateBook(book, event.target.value)
            }}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
          <div className="book-title">
            <a href={previewLink}>{title}</a>
          </div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book

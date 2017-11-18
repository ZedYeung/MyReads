import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import Search from './Search'

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(
      (books) => {
        this.setState({
          books: books.filter((book) => (
            book.shelf && book.shelf !== "none"
          ))
        })
      }
    )
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState((state) => ({
          books: state.books.filter((b) => (
            b.id !== book.id
          )).concat(shelf !== "none" ? [ book ]: [])
        }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelf
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )}/>

        <Route path="/add" render={() => (
          <Search
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
         )}/>
      </div>
    )
  }
}

export default App

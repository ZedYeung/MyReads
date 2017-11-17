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
        this.setState({books})
      })
  }

  // really ugly, is there some way to write more beutiful code?
  // In order to update all books collection when update a book
  // this code use BooksAPI twice
  // what is worse, it call this.setState separately, while in this App Component,
  // there is only one state-- books. the state book is in Book component.
  // But both of them use this.setState. So, what is that this?
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState((state) => ({
          books: state.books.filter((b) => (
            b.id !== book.id
          )).concat([ book ])
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
            onUpdateBook={this.updateBook}
          />
         )}/>
      </div>
    )
  }
}

export default App

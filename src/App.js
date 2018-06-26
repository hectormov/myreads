import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './Search'
import BookShelve from './BookShelve'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.updateBook = this.updateBook.bind(this)
  }

  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(currState => {
        let currBooks = currState.books;
        let allBooks = [];
        if (currBooks.findIndex(myBook => myBook.id === book.id) === -1) {
          book.shelf = shelf;
          currBooks.push(book);
          allBooks = currBooks;
        } else {
          allBooks = currBooks.map(b => {
            if(b.id === book.id) {
              b.shelf = shelf;
            }
            return b;
          })
        }
        return ({ books: allBooks })
      })
    })
  }
  
  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (  
          <SearchBooks 
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )}/>
        <Route exact path='/' render={() => (
          <BookShelve 
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="open-search">
            <Link to='/search'>Add a Book</Link>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp

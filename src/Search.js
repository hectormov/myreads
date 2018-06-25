import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';


class SearchBooks extends Component {
    state = {
        foundBooks: []
    }

    searchQuery(search){
        if(search !== '') {
            BooksAPI.search(search).then(bookResults => {
              if(!bookResults.hasOwnProperty('error')) {
                  const foundBooks = bookResults.map(fbook => {
                    const index = this.props.books.findIndex(myBook => myBook.id === fbook.id)
                    if(index !== -1) {
                        fbook.shelf = this.props.books[index].shelf
                    } else {
                        fbook.shelf = 'none'
                    }
                    return fbook
                  })
                  this.setState({ foundBooks })
              } else {
                  this.setState({ foundBooks: [] })
              }
            })
        } else {
            this.setState({ foundBooks: [] })
        }
    }

    render() {
        const {onUpdateBook} = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author"
                            onChange={(event) => this.searchQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {   
                            this.state.foundBooks.map(book => {
                                return ( 
                                    <ListBooks 
                                        book={book}
                                        upBook={onUpdateBook}
                                        key={book.id}
                                    />
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
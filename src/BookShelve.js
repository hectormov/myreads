import React, { Component } from 'react';
import ListBooks from './ListBooks';

class BookShelve extends Component {

    render() {
        const {books, onUpdateBook} = this.props
        console.log(books)
        let currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
        let wantToRead = books.filter(book => book.shelf === 'wantToRead')
        let read = books.filter(book => book.shelf === 'read')
        let sortedBooks = [
            { id: 1, shelveName: 'Currently Reading', booksOnShelve: currentlyReading },
            { id: 2, shelveName: 'Want to Read', booksOnShelve: wantToRead },
            { id: 3, shelveName: 'Read', booksOnShelve: read }
        ]
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
            <div className="list-books-content">
              <div>
                {sortedBooks.map(shelf => (
                    <div key={shelf.id} className="bookshelf">
                        <h2 className="bookshelf-title">{shelf.shelveName}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                { shelf.booksOnShelve.map(book => {
                                    return ( 
                                        <ListBooks 
                                            book={book}
                                            upBook={onUpdateBook}
                                        />
                                    )
                                })}
                            </ol>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        )
    }
}

export default BookShelve
import React, { Component } from 'react';

class ListBooks extends Component {

    render() {
        const {book, upBook} = this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        { book.hasOwnProperty('imageLinks') &&
                            <div className="book-cover"
                                style={{ width: 128, height: 193, 
                                backgroundImage: `url(${book.imageLinks.thumbnail}`}}>
                            </div>
                        }
                        <div className="book-shelf-changer">   
                            <select value={book.shelf} onChange={ (event) => upBook(book, event.target.value) }>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    { 
                        book.hasOwnProperty('authors') &&
                        <div className="book-authors"> { book.authors.join() }
                        </div>
                    }
                </div>
            </li>
        )
    }
}

export default ListBooks
import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

export default class Search extends Component {
    state = {
        books: []
    };
    render() {
        return <div>
            Search for books
            <form>
                <input type="text" name="terms" id="terms" />
                <input type="submit" value="Submit" onClick={event => {
                    event.preventDefault();
                    axios.get(`/api/search/${document.getElementById('terms').value}`)
                        .then(results => {
                            console.log(results);
                            this.setState({
                                books: results.data.items.filter(item =>
                                    item.kind === 'books#volume').map(item => ({
                                        title: item.volumeInfo.title,
                                        authors: item.volumeInfo.authors,
                                        description: item.volumeInfo.description,
                                        image: item.volumeInfo.imageLinks.thumbnail,
                                        link: item.volumeInfo.infoLink,
                                        saved: false
                                    }))
                            });
                        });
                }} />
            </form>
            <div>
                {this.state.books.map((book, i) => <div key={i}>
                    {['title', 'authors'].map((item, i) => <div key={i}>
                        {capitalize(item)}: {oxford(book[item])}
                    </div>)}
                    <a href={book.link}>
                        <img src={book.image} alt={book.title} />
                    </a>
                    <br />
                    {book.saved ? <p>Saved</p> :
                        <button onClick={event => axios.post('/api/books', book).then(() => {
                            const books = this.state.books;
                            book.saved = true;
                            this.setState({
                                books: [...books.slice(0, i), book, ...books.slice(i + 1)]
                            });
                        })}>Save</button>}
                </div>)}
            </div>
        </div>
    }
}
function capitalize(str) {
    // Return parameter string with first character capitalized.
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function oxford(arr) {
    return Array.isArray(arr) && arr.length > 1 ? arr
        .join(", ")
        .replace(/ ((?:.(?!, ))+)$/, ' and $1') : arr;
}

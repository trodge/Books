import React, { Component } from "react";
import "./App.css";
import { capitalize, oxford } from './string.js';
import axios from "axios";

export default class Search extends Component {
    state = {
        books: []
    };
    componentDidMount() {
        axios.get('/api/books').then(results => this.setState({ books: results }));
    }
    render() {
        return <div>
            {this.state.books.map((book, i) => <div key={i}>
                {['title', 'authors'].map((item, i) => <div key={i}>
                    {capitalize(item)}: {oxford(book[item])}
                </div>)}
                <a href={book.link}>
                    <img src={book.image} alt={book.title} />
                </a>)}
                </div>)}
        </div>
    }
}

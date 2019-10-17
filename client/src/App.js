import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

export default class App extends Component {
    render() {
        return (
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                        <li>
                            <Link to="/saved">Saved</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/search">
                        <Search />
                    </Route>
                    
                </Switch>
            </Router>
        );
    }
}

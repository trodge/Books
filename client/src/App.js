import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Search from './Search.js';
import Saved from './Saved.js';
import "./App.css";

export default function App() {
    return <Router>
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
            <Route path="/saved">
                <Saved />
            </Route>
        </Switch>
    </Router>
}

import "./App.css"
import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { Home } from "./pages/Home"
import { Search } from "./pages/Search"
import { Show } from "./pages/Show"
import { Person } from "./pages/Person"
import { Error } from "./pages/Error"

import { LinkHome } from "./components/LinkHome"
import { SearchBar } from "./components/SearchBar"

function App() {
  return (
    <Router>
      <header>
        <Link to="/">
          <LinkHome />
        </Link>
        <SearchBar />
      </header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/search/:inputString" children={<Search />}></Route>
        <Route path="/show/:id/:name" children={<Show />}></Route>
        <Route path="/person/:id/:name" children={<Person />}></Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

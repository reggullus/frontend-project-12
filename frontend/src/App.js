import React, { useContext, createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Login from './components/Login.jsx';
import Error from './components/Error.jsx';

export default function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Регистрация</Link>
            </li>
            <li>
              <Link to="/login">Hexlet Chat</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Home />
          </Route>
          <Route path="/">
            <Error />
          </Route>
          <Redirect to="/error" />
        </Switch>
      </main>
    </Router>
  );
}

const Home = () =><div>Home</div>;

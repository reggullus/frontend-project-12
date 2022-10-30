import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import LoginPage from './components/LoginPage.jsx';
import AuthContext from './context/AuthContext.jsx';
import NoMatch from './components/NoMatch.jsx';
import useAuth from './hooks/Auth.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      logIn();
    }
  });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const LoginRoute = () => {
  const auth = useAuth();

  return auth.loggedIn ? <div>Chat</div> : <Redirect to="/login" />;
};

const AuthButton = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Button onClick={auth.logOut}>Выйти</Button> : null;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Router>
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </div>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <LoginRoute />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  </div>
);

const Signup = () => <div>Signup</div>;

export default App;

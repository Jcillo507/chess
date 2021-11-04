import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import GameApp from "./components/GameApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return "Loading";
  }
  if (error) {
    return "There was an error";
  }
  if (!user) {
    return <UserForm />;
  }
  return (
    <div className="">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game/:id">
            <GameApp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

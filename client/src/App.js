import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Login from "./Login";
import "./App.css";
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Switch>
              <Route path="/">
                <SideBar />
                <Route path="/room/:roomId">
                  <Chat />
                </Route>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

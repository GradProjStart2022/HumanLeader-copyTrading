// src/App.js 

import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import leaderboard from './pages/Leaderboard';
import Settingboard from "./pages/Settingboard";
import Subboard from './pages/Subboard';
import Tradeboard from './pages/Tradeboard';
import Userboard from './pages/Userboard';
import Nav from './components/Nav';
import './styles/App.css';

class App extends React.Component {
  render() {
    return (
    
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/leaderboard" component={ leaderboard} />
          <Route path="/Settingboard" component={ Settingboard} />
          <Route path="/Subboard" component={Subboard} />
          <Route path="/Tradeboard" component={Tradeboard} />
          <Route path="/Userboard" component={Userboard} />
        </Switch>
        <Nav />
      </div>
      
    )
  }
}

export default App;
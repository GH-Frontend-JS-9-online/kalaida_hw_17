import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss';
import LoginComponent from "./components/LoginComponent/LoginComponent";
import RegisterComponent from "./components/RegisterComponent/RegisterComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent/ChangePasswordComponent";
import MessagesComponent from "./components/MessagesComponent/MessagesComponent";


const App : React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LoginComponent} />
          <Route exact path='/register' component={RegisterComponent} />
          <Route exact path='/reset' component={ChangePasswordComponent} />
          <Route exact path='/messages' component={MessagesComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

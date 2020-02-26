import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss';
import LoginComponent from "./components/LoginComponent/LoginComponent";
import RegisterComponent from "./components/RegisterComponent/RegisterComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent/ChangePasswordComponent";
import MessagesComponent from "./components/MessagesComponent/MessagesComponent";
import ProjectsComponent from "./components/ProjectsComponent/ProjectsComponent";
import AddProjectsComponent from "./components/AddProjectsComponent/AddProjectsComponent";
import InsightsComponent from "./components/InsightsComponent/InsightsComponent";


const App : React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LoginComponent} />
          <Route exact path='/register' component={RegisterComponent} />
          <Route exact path='/reset' component={ChangePasswordComponent} />
          <Route exact path='/messages' component={MessagesComponent} />
          <Route exact path='/projects' component={ProjectsComponent} />
          <Route exact path='/add_project' component={AddProjectsComponent} />
          <Route exact path='/insights' component={InsightsComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

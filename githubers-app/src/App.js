import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Home from './pages/Home';
import Details from './pages/Details';

class App extends React.Component {
  render() {
    return (
       <Switch>
         <Route exact path='/' component={ Home }/>
         <Route exact path='/details' component={ Details }/>
         <Route
            exact
            path="/details/:user"
            render={ (props) => <Details { ...props } /> }
          />
       </Switch>
    );
  }
}

export default App;
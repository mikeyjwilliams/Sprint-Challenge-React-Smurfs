import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3333/smurfs`)
      .then(response => {
        this.setState({ smurfs: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateSmurfs = smurfs => {
    this.setState({ smurfs });
  };

  render() {
    return (
      <div className="App">
        <div className="nav-section">
          <NavLink to="/" className="nav">
            Smurfs
          </NavLink>
          <NavLink to="/smurf-form" className="nav">
            Add Smurf
          </NavLink>
        </div>

        <Route
          exact
          path="/smurf-form"
          render={props => (
            <SmurfForm {...props} updateSmurfs={this.updateSmurfs} />
          )}
        />
        <Route
          exact
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />
      </div>
    );
  }
}

export default App;

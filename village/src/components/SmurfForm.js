import React, { Component } from 'react';
import axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: '',
      smurfError: ''
    };
  }

  addSmurf = event => {
    event.preventDefault();
    const { name, age, height } = this.state;
    const smurf = { name, age, height };
    axios
      .post(`http://localhost:3333/smurfs`, smurf)
      .then(response => {
        this.props.updateSmurfs(response.data);
      })
      .catch(error => {
        this.setState({ smurfError: error.response.data.Error });
        this.setState({ name: '', age: '', height: '' });
      });
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { smurfError } = this.state;
    return (
      <div className="SmurfForm">
        <h2>{smurfError}</h2>
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}
export default SmurfForm;

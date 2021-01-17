import React, { Component } from 'react'
import Table from './Table';
import Form from './Form';
import axios from 'axios'

class App extends Component {
  state = {
    characters: []
  }

  removeCharacter = index => {
    const { characters } = this.state
  
    this.makeDeleteCall(characters[index].id).then( response => {
      if (response != null && response.status === 200)
        this.setState({
          characters: characters.filter((character, i) => {
            return i !== index
          }),
      })
    })
  }

  makeDeleteCall(id){
    return axios.delete(`http://localhost:5000/users/${id}`)
     .then(function (response) {
       console.log(response);
       return response;
     })
     .catch(function (error){
       console.log(error);
       return null;
     })
  }

  handleSubmit = character => {
    this.makePostCall(character).then( response => {
       if (response != null && response.status === 201) {
          this.setState({ characters: [...this.state.characters, response.data] });
       }
    });
  }

  makePostCall(character){
    return axios.post('http://localhost:5000/users', character)
     .then(function (response) {
       console.log(response);
       return response;
     })
     .catch(function (error) {
       console.log(error);
       return null;
     });
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
     .then(res => {
       const characters = res.data.users_list;
       this.setState({ characters });
     })
     .catch(function (error) {
       //Not handling the error. Just logging into the console.
       console.log(error);
     });
 }

  render() {
    const { characters } = this.state;

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App
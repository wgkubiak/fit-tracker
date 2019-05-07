import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import axios from 'axios';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        { <Proteges />}
        { <Measures />}
      </div>
    );
  }
}

class Proteges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      apiResponse: [],
      protegesResponse: []
    }
    this.toggleDiv = this.toggleDiv.bind(this)
  }
  
  getAllProteges() {
    fetch("http://localhost:9000/proteges")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)   
  }

  toggleDiv() {
    const { show } = this.state
    this.setState({ show : !show})
  }

  componentDidMount() {
    this.getAllProteges()
  }

  render() {
    return(
      <div className="proteges">
      <h1>Podopieczni</h1>
        {this.state.apiResponse.map(resp => 
          <ReactBootstrap.ButtonToolbar>
          <ReactBootstrap.Button variant="dark" key={ resp.idp } size="md" active>
            { resp.firstname } { resp.secondname }
          </ReactBootstrap.Button>
          </ReactBootstrap.ButtonToolbar> 
        )}
          <ReactBootstrap.Button variant="light" size="md" onClick={ this.toggleDiv } active>
            <strong>+</strong>
          </ReactBootstrap.Button>
        { this.state.show && <ProtegesForm />}
        </div>
    );
  }
}

class Measures extends Proteges {
  render() {
    return (
      <div className="measures">
        <h1>Pomiary</h1> 
        <ReactBootstrap.Button variant="light" size="md" active>
          <strong>+</strong>
        </ReactBootstrap.Button>
      </div>    
    );
  }
}

class ProtegesForm extends Component {
  state = {
    firstname: '',
    secondname: '',
    phone: '',
    email: '',
    gender: '',
    height: '',
    targetweight: ''
  }
  
  handleNameChange = event => { this.setState({ firstname : event.target.value });}
  handleSurnameChange = event => { this.setState({ secondname : event.target.value });}
  handlePhoneChange = event => { this.setState({ phone : event.target.value });}
  handleEmailChange = event => { this.setState({ email : event.target.value });}
  handleGenderChange = event => { this.setState({ gender : event.target.value });}
  handleHeightChange = event => { this.setState({ height : event.target.value });}
  handleTargetChange = event => { this.setState({ targetweight : event.target.value });}

  handleSubmit = event => {
    event.preventDefault()

    axios.post('http://localhost:9000/proteges', {
      firstname: this.state.firstname,
      secondname: this.state.secondname,
      phone: this.state.phone,
      email: this.state.email,
      gender: this.state.gender,
      height: this.state.height,
      targetweight: this.state.targetweight
    })
    .then(res=> {
      console.log(res)
      console.log(res.data)
    })
  }

  render() {
    return (
      <div className="creation-form">
        <form onSubmit={this.handleSubmit}>
            <label> Imię: <input type="text" name="firstname" onChange={this.handleNameChange} required/></label>
            <label> Nazwisko: <input type="text" name="secondname" onChange={this.handleSurnameChange} required/></label>
            <label> Telefon: <input type="text" name="phone" onChange={this.handlePhoneChange} required/></label>
            <label> Email: <input type="email" name="email" onChange={this.handleEmailChange} required/></label>
            <label> Płeć: <input type="text" name="gender" onChange={this.handleGenderChange} required/></label>
            <label> Wzrost: <input type="text" name="height" onChange={this.handleHeightChange} required/></label>
            <label> Cel: <input type="text" name="targetweight" onChange={this.handleTargetChange} required/></label>
            
            <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default App;
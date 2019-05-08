import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import axios from 'axios';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        { <Proteges />}
        { <Daily />}
      </div>
    );
  }
}

class Proteges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      measuresResponse: [],
    }
    this.toggleDiv = this.toggleDiv.bind(this)
  }

  getLastMeasure() {
    fetch("http://localhost:9000/measures")
      .then(res => res.json())
      .then(res => this.setState({ measuresResponse: res}))
      .catch(err => err)
  }

  toggleDiv() {
    const { show } = this.state
    this.setState({ show : !show})
  }

  componentDidMount() {
    this.getLastMeasure()
  }

  render() {
    return(
      <div className="proteges">
      <br></br><h1><u>Podopieczni</u></h1><br></br>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Imię</th>
            <th scope="col">Nazwisko</th>
            <th scope="col">Do celu</th>
            <th scope="col">Tłuszcz</th>
          </tr>
        </thead>
        <tbody>
        {this.state.measuresResponse.map(resp => 
          <tr>
            <th scope="row">{resp.idp}</th>
            <td>{resp.firstname}</td>
            <td>{resp.secondname}</td>
            <td>{(resp.currentweight - resp.targetweight).toFixed(2)}</td>
            <td>{resp.bodyfat.toFixed(1)}</td>
          </tr>
        )}
        </tbody>
        </table>
          <ReactBootstrap.ButtonToolbar>
            <ReactBootstrap.Button variant="dark" size="md" onClick={ this.toggleDiv } active>
              <strong>Rozwiń / Zwiń formularz</strong>
            </ReactBootstrap.Button>
            { this.state.show && <ProtegesForm />}
          </ReactBootstrap.ButtonToolbar> 
        </div>
    );
  }
}

class Daily extends Proteges {
  render() {
    return (
      <div className="daily">
        <h1><u>Statystyki dzienne</u></h1> 
        <ReactBootstrap.Button variant="light" size="md" active>
          <strong>+</strong>
        </ReactBootstrap.Button>
      </div>    
    );
  }
}

class ProtegesForm extends Proteges {
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
      <h1>Formularz</h1>
        <ReactBootstrap.Form onSubmit={this.handleSubmit}>
              <ReactBootstrap.Form.Label> 
                Imię: <input type="text" name="firstname" onChange={this.handleNameChange} placeholder="Podaj imię" required/>
              </ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Label> 
                Nazwisko: <input type="text" name="secondname" onChange={this.handleSurnameChange} placeholder="Podaj nazwisko" required/>
              </ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Label> 
                Telefon: <input type="text" name="phone" onChange={this.handlePhoneChange} placeholder="Podaj numer" size="9" required/>
              </ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Label> 
                Email: <input type="email" name="email" onChange={this.handleEmailChange} placeholder="Podaj email" required/>
              </ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Label> 
                Płeć: <input type="text" name="gender" onChange={this.handleGenderChange} placeholder="Płeć (M/F)" required/>
              </ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Label> 
                Wzrost: <input type="text" name="height" onChange={this.handleHeightChange} placeholder="Podaj wzrost" required/>
              </ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Label> 
                Cel: <input type="text" name="targetweight" onChange={this.handleTargetChange} placeholder="Podaj cel" required/>
              </ReactBootstrap.Form.Label>
            <ReactBootstrap.Button type="submit" variant="dark" size="lg" block>Zatwierdź</ReactBootstrap.Button>
        </ReactBootstrap.Form>
      </div>
    );
  }
}

export default App;
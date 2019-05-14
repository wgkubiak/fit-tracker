import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      globalID: 0
    }
  }

  render() {
    return (
      <div className="container">
        { <Nav />}
        { <Proteges />}
        { <Measures />}
        { <Daily />}
        { <Foot />}
      </div>
    );
  }
}

class Proteges extends App {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      measuresResponse: [],
      userResponse: []
    }
    this.toggleDiv = this.toggleDiv.bind(this)
  }

  getLastMeasure() {
    fetch("http://localhost:9000/measures/last/1")
      .then(res => res.json())
      .then(res => this.setState({ measuresResponse: res}))
      .catch(err => err)
  }

  getUserByID() {
    fetch("http://localhost:9000/proteges/1")
      .then(res=>res.json())
      .then(res=>this.setState({ userResponse: res}))
      .catch(err=>err)
  }

  toggleDiv() {
    const { show } = this.state
    this.setState({ show : !show})
  }

  componentDidMount() {
    this.getLastMeasure()
    this.getUserByID()
  }

  render() {
    return(
      <div className="proteges">
        <br></br>
        <br></br>
        <br></br>
        <div id="proteges-header-container">
          <span id="prev-protege-btn">
            <ReactBootstrap.Button variant="success" size="md" active>
              <strong> &laquo; </strong>
            </ReactBootstrap.Button>
          </span>
          {this.state.userResponse.map(resp => 
            <span id="proteges-header">
              <h2 id="protege-header-txt"> {resp.firstname} {resp.secondname} </h2>
            </span>
          )}
          <span id="next-protege-btn">
            <ReactBootstrap.Button variant="success" size="md" active>
              <strong> &raquo; </strong>
            </ReactBootstrap.Button>
          </span>
        </div>
        {this.state.measuresResponse.map(resp => 
          <h3> Do celu: <span id="target-txt">{(resp.currentweight - resp.targetweight).toFixed(1)}</span> kg</h3>
        )}

        <ReactBootstrap.ButtonToolbar>
          <ReactBootstrap.Button variant="success" size="md" onClick={ this.toggleDiv } active>
            <strong>Rozwiń / Zwiń formularz</strong>
          </ReactBootstrap.Button>
            { this.state.show && <ProtegesForm />}
        </ReactBootstrap.ButtonToolbar> 
      </div>
    );
  }
}

class Measures extends App {
  constructor(props) {
    super(props)
    this.state = {
      measuresByIDResponse: []
    }
  }

  getMeasureByID() {
    fetch("http://localhost:9000/measures/1")
      .then(res=>res.json())
      .then(res=>this.setState({ measuresByIDResponse: res}))
      .catch(err=>err)
  }

  componentDidMount() {
    this.getMeasureByID()
  }

  render() {
    return(
      <div className="proteges">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Pas</th>
              <th scope="col">Szyja</th>
              <th scope="col">Tłuszcz</th>
              <th scope="col">Waga</th>
            </tr>
          </thead>
          <tbody>
            {this.state.measuresByIDResponse.map(resp => 
            <tr>
              <th scope="row">{resp.measuredate.slice(0, -14)}</th>
              <td>{resp.waist}</td>
              <td>{resp.neck}</td>
              <td>{resp.bodyfat.toFixed(1)}</td>
              <td>{(resp.currentweight).toFixed(2)}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

class Daily extends App {
  constructor(props) {
    super(props)
    this.state = {
      dailyResponse: []
    }
}

  render() {
    return (
      <div className="daily">
       
      </div>    
    );
  }
}

class ProtegesForm extends App {
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

class Nav extends Component {
  render() {
    return (
      <div id="menu-nav">
        <ReactBootstrap.Navbar fixed="top" bg="success" expand="lg">
          <ReactBootstrap.Navbar.Brand href="#home">Fit Tracker</ReactBootstrap.Navbar.Brand>
          <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
            <ReactBootstrap.Nav className="mr-auto">
              <ReactBootstrap.Nav.Link href="#home">Podopieczni</ReactBootstrap.Nav.Link>
              <ReactBootstrap.Nav.Link href="#link">Wymiary</ReactBootstrap.Nav.Link>
              <ReactBootstrap.NavDropdown title="Dodaj" id="basic-nav-dropdown">
          <ReactBootstrap.NavDropdown.Item href="#action/3.1">Podopiecznego</ReactBootstrap.NavDropdown.Item>
          <ReactBootstrap.NavDropdown.Item href="#action/3.2">Wymiar</ReactBootstrap.NavDropdown.Item>
          <ReactBootstrap.NavDropdown.Item href="#action/3.3">Statystykę</ReactBootstrap.NavDropdown.Item>
          </ReactBootstrap.NavDropdown>
            </ReactBootstrap.Nav>
          </ReactBootstrap.Navbar.Collapse>
          
        </ReactBootstrap.Navbar>
      </div>
    )
  }
}


class Foot extends Component {
  render() {
    return (
      <div id="footer">
        <ReactBootstrap.Navbar bg="success" expand="lg" fixed="bottom" >
          <ReactBootstrap.Container>
            <ReactBootstrap.NavbarBrand>Footer</ReactBootstrap.NavbarBrand>
          </ReactBootstrap.Container>
        </ReactBootstrap.Navbar>
      </div>
    )
  }
}

export default App;
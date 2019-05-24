import React, { Component } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalID: 0
    };
  }

  render() {
    return (
      <div className="container">
        {<Nav />}
        {<Proteges />}
        {<Measures />}
        {<Daily />}
      </div>
    );
  }
}

class Proteges extends App {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      measuresResponse: [],
      userResponse: []
    };
    this.toggleDiv = this.toggleDiv.bind(this);
  }

  getLastMeasure() {
    fetch("http://localhost:9000/measures/last/1")
      .then(res => res.json())
      .then(res => this.setState({ measuresResponse: res }))
      .catch(err => err);
  }

  getUserByID() {
    fetch("http://localhost:9000/proteges/1")
      .then(res => res.json())
      .then(res => this.setState({ userResponse: res }))
      .catch(err => err);
  }

  toggleDiv() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  componentDidMount() {
    this.getLastMeasure();
    this.getUserByID();
  }

  convertGender = x => {
      if(x === "Male") return "Mężczyzna"
      else if(x === "Female") return "Kobieta"
      else return "Inna"
  };

  render() {
    return (
      <div className="proteges">
        <br />
        <br />
        <br />
        <div id="proteges-header-container">
          <span id="prev-protege-btn">
            <rb.Button variant="success" size="md" active>
              <strong> &laquo; </strong>
            </rb.Button>
          </span>
          {this.state.userResponse.map(resp => (
            <span id="proteges-header">
              <h2 id="protege-header-txt">
                {" "}
                {resp.firstname} {resp.secondname}{" "}
              </h2>
            </span>
          ))}
          <span id="next-protege-btn">
            <rb.Button variant="success" size="md" active>
              <strong> &raquo; </strong>
            </rb.Button>
          </span>
        </div>
        <br />
        {this.state.measuresResponse.map(resp => (
          <div id="protege-data">
            <rb.Card
              className="text-center"
              bg="success"
              text="white"
              style={{ width: "100%" }}
            >
              <rb.Card.Header>Dane osobowe</rb.Card.Header>
              <rb.Card.Body>
                <p> Urodzony/a: {resp.birthdate.slice(0, -14)} </p>
                <p> Płeć: {this.convertGender(resp.gender)} </p>
                <p> Telefon: {resp.phone} </p>
                <p> Email: {resp.email} </p>
                <p> Wysokość: {resp.height}cm</p>
                <p> Cel: {resp.targetweight}kg</p>
                <p> Zapotrzebowanie: {resp.kcaldemand}kcal</p>
              </rb.Card.Body>
            </rb.Card>
          </div>
        ))}
        {this.state.measuresResponse.map(resp => (
          <div id="target">
            <h3>
              {" "}
              Do celu:{" "}
              <span id="target-txt">
                {(resp.currentweight - resp.targetweight).toFixed(1)}
              </span>{" "}
              kg
            </h3>
          </div>
        ))}
        <rb.ButtonToolbar>
          <rb.Button
            className="add-btn"
            variant="dark"
            size="md"
            onClick={this.toggleDiv}
            active
          >
            <strong>+</strong>
          </rb.Button>
          {this.state.show && <ProtegesForm />}
        </rb.ButtonToolbar>
        <RemoveProtege />
      </div>
    );
  }
}

class Measures extends App {
  constructor(props) {
    super(props);
    this.state = {
      measuresByIDResponse: []
    };
  }

  getMeasureByID() {
    fetch("http://localhost:9000/measures/1")
      .then(res => res.json())
      .then(res => this.setState({ measuresByIDResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.getMeasureByID();
  }

  render() {
    return (
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
            {this.state.measuresByIDResponse.map(resp => (
              <tr>
                <th scope="row">{resp.measuredate.slice(0, -14)}</th>
                <td>{resp.waist}</td>
                <td>{resp.neck}</td>
                <td>{resp.bodyfat.toFixed(1)}</td>
                <td>{resp.currentweight.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class Daily extends App {
  constructor(props) {
    super(props);
    this.state = {
      dailyResponse: []
    };
  }

  getDailies() {
    fetch("http://localhost:9000/daily/1")
      .then(res => res.json())
      .then(res => this.setState({ dailyResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.getDailies();
  }

  render() {
    return (
      <div className="daily">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Spożyte [Kcal]</th>
              <th scope="col">Spalone [Kcal]</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dailyResponse.map(resp => (
              <tr>
                <th scope="row">{resp.dailydate.slice(0, -14)}</th>
                <td>{resp.dailykcal}</td>
                <td>{resp.burnedkcal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class ProtegesForm extends App {
  state = {
    firstname: "",
    secondname: "",
    birthdate: "",
    phone: "",
    email: "",
    gender: "",
    height: "",
    targetweight: "",
    kcaldemand: ""
  };

  handleNameChange = event => {
    this.setState({ firstname: event.target.value });
  };
  handleDateChange = event => {
    this.setState({ birthdate: event.target.value });
  };
  handleSurnameChange = event => {
    this.setState({ secondname: event.target.value });
  };
  handlePhoneChange = event => {
    this.setState({ phone: event.target.value });
  };
  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  handleGenderChange = event => {
    this.setState({ gender: event.target.value });
  };
  handleHeightChange = event => {
    this.setState({ height: event.target.value });
  };
  handleTargetChange = event => {
    this.setState({ targetweight: event.target.value });
  };
  handleDemandChange = event => {
    this.setState({ kcaldemand: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("http://localhost:9000/proteges", {
        firstname: this.state.firstname,
        secondname: this.state.secondname,
        birthdate: this.state.birthdate,
        phone: this.state.phone,
        email: this.state.email,
        gender: this.state.gender,
        height: this.state.height,
        targetweight: this.state.targetweight,
        kcaldemand: this.state.kcaldemand
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <div className="creation-form">
      <br/>
        <rb.Form onSubmit={this.handleSubmit}>
          <rb.FormGroup>
              <rb.Row>
                  <rb.Col md={12}>
              <rb.FormControl
                type="text"
                name="firstname"
                size="md"
                onChange={this.handleNameChange}
                placeholder="Imię"
                required
              />
            </rb.Col>
            <rb.Col md={12}>
              <rb.FormControl
                type="text"
                name="secondname"
                onChange={this.handleSurnameChange}
                placeholder="Nazwisko"
                required
              />
            </rb.Col>
              </rb.Row>
          </rb.FormGroup>
            <rb.FormGroup>
          <rb.Row>
              <rb.Col md={12}>
              <rb.FormControl
                type="date"
                name="birthdate"
                onChange={this.handleDateChange}
                required
              />
            </rb.Col>
              <rb.Col md={12}>
              <rb.FormControl
                as="select"
                name="gender"
                onChange={this.handleGenderChange}
                required
              >
                <option>Wybierz płeć...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </rb.FormControl>
            </rb.Col>
          </rb.Row>
          </rb.FormGroup>
            <rb.FormGroup>
                <rb.Row>
            <rb.Col md={12}>
              <rb.FormControl
                type="text"
                name="phone"
                onChange={this.handlePhoneChange}
                placeholder="Numer telefonu (9 znaków)"
                size="9"
                required
              />
            </rb.Col>
                <rb.Col md={12}>
              <rb.FormControl
                type="email"
                name="email"
                onChange={this.handleEmailChange}
                placeholder="Adres email"
                required
              />
                </rb.Col>
            </rb.Row>
          </rb.FormGroup>
          <rb.FormGroup>
              <rb.FormControl
                type="text"
                name="height"
                onChange={this.handleHeightChange}
                placeholder="Wzrost"
                required
              />
              <rb.FormControl
                type="text"
                name="targetweight"
                onChange={this.handleTargetChange}
                placeholder="Waga docelowa"
                required
              />
              <rb.FormControl
                type="text"
                name="kcaldemand"
                onChange={this.handleDemandChange}
                placeholder="Zapotrzebowanie kcal"
                required
              />
              <rb.Button type="submit" variant="dark" size="lg" block>
                  Zatwierdź
              </rb.Button>
          </rb.FormGroup>

        </rb.Form>
      </div>
    );
  }
}

class RemoveProtege extends App {
  removeProtege = event => {
    event.preventDefault();

    // axios.delete(`http://localhost:9000/proteges/${this.state.id}`)
    axios.delete(`http://localhost:9000/proteges/33`).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <rb.Button
          className="remove-btn"
          variant="success"
          size="md"
          onClick={this.removeProtege}
          active
        >
          <strong>x</strong>
        </rb.Button>
      </div>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <div id="menu-nav">
        <rb.Navbar fixed="top" bg="dark" variant="dark" expand="lg">
          <rb.Navbar.Brand href="#home">Fit Tracker</rb.Navbar.Brand>
          <rb.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <rb.Navbar.Collapse id="basic-navbar-nav">
            <rb.Nav className="mr-auto">
              <rb.Nav.Link href="#proteges">Podopieczni</rb.Nav.Link>
              <rb.Nav.Link href="#link">Wymiary</rb.Nav.Link>
            </rb.Nav>
          </rb.Navbar.Collapse>
        </rb.Navbar>
      </div>
    );
  }
}

export default App;

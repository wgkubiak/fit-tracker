import React, { Component } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import "./../../App.css";
import utils from "./../../utils/constants";

class EditProtege extends Component {
  constructor(props) {
  super(props);
  this.state = {
    firstname: utils.firstname,
    secondname: utils.secondname,
    birthdate: "",
    phone: utils.phone,
    email: utils.email,
    gender: utils.gender,
    height: utils.height,
    targetweight: utils.targetweight,
    kcaldemand: utils.kcaldemand,
    userData: [],
    userResponse: []
    };
  }

  getUserByID() {
    fetch(`http://localhost:9000/proteges/${utils.i}`)
      .then(res => res.json())
      .then(res => this.setState({ userResponse: res }))
      .catch(err => err);
  }

  handleNameChange = event => {
    this.setState({ firstname: event.target.value });
    console.log(this.state.userResponse[0].firstname)
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
      .put(`http://localhost:9000/proteges/${utils.i}`, {
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

    window.location.reload();
  };

  componentDidMount() {
    this.getUserByID();
  }

  render() {
    return (      
      <div className="creation-form">
        {this.state.userResponse.map(resp => (
        <div>
          <br />
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
                    value={this.state.firstname}
                    required
                  />
                </rb.Col>
                <rb.Col md={12}>
                  <rb.FormControl
                    type="text"
                    name="secondname"
                    onChange={this.handleSurnameChange}
                    placeholder="Nazwisko"
                    value={this.state.secondname}
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
                    value={this.state.gender}
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
                    value={this.state.phone}
                    required
                  />
                </rb.Col>
                <rb.Col md={12}>
                  <rb.FormControl
                    type="email"
                    name="email"
                    onChange={this.handleEmailChange}
                    placeholder="Adres email"
                    value={this.state.email}
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
                value={this.state.height}
                required
              />
              <rb.FormControl
                type="text"
                name="targetweight"
                onChange={this.handleTargetChange}
                placeholder="Waga docelowa"
                value={this.state.targetweight}
                required
              />
              <rb.FormControl
                type="text"
                name="kcaldemand"
                onChange={this.handleDemandChange}
                placeholder="Zapotrzebowanie kcal"
                value={this.state.kcaldemand}
                required
              />
              <rb.Button type="submit" variant="dark" size="lg" block>
                Zatwierdź edycję
              </rb.Button>
            </rb.FormGroup>
          </rb.Form>
        </div>
        ))}
      </div>
    );
  }
}

export default EditProtege;

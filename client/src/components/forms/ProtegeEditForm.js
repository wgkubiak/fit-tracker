import React, { Component } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import "./../../App.css";
import utils from "./../../utils/constants";

class EditProtege extends Component {
  state = {
    firstname: "",
    secondname: "",
    birthdate: "",
    phone: "",
    email: "",
    gender: "",
    height: "",
    targetweight: "",
    kcaldemand: "",
    userData: [],
    userResponse: []
  };

  getUserByID() {
    fetch(`http://localhost:9000/proteges/${utils.i}`)
      .then(res => res.json())
      .then(res => this.setState({ userResponse: res }))
      .catch(err => err);
  }

//   setDefaultValues() {
//     this.state.userResponse.map(resp => (
//       this.setState({ firstname: resp.firstname}),
//       this.setState({ secondname: resp.secondname}),
//       this.setState({ birthdate: resp.birthdate}),
//       this.setState({ phone: resp.phone}),
//       this.setState({ email: resp.email}),
//       this.setState({ gender: resp.gender}),
//       this.setState({ height: resp.height}),
//       this.setState({ targetweight: resp.targetweight}),
//       this.setState({ kcaldemand: resp.kcaldemand})
//     )
//   )
// }

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
    //this.setDefaultValues();
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

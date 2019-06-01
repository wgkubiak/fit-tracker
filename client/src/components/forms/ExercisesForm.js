import React, { Component } from "react";
import * as rb from "react-bootstrap";
import "./../../App.css";
import axios from "axios";

class ExercisesForm extends Component {
  state = {
    d_did: "",
    exercisename: "",
    startat: "",
    endat: "",
    kcalperhour: ""
  };

  handleDDIDChange = event => {
    this.setState({ d_did: event.target.value });
  };
  handleExerciseChange = event => {
    this.setState({ exercisename: event.target.value });
  };
  handleStartChange = event => {
    this.setState({ startat: event.target.value });
  };
  handleEndChange = event => {
    this.setState({ endat: event.target.value });
  };
  handleKcalChange = event => {
    this.setState({ kcalperhour: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/exercises", {
        d_did: this.state.d_did,
        exercisename: this.state.exercisename,
        startat: this.state.startat,
        endat: this.state.endat,
        kcalperhour: this.state.kcalperhour
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    window.location.reload();
  };

  render() {
    return (
      <div className="creation-form">
        <br />
        <rb.Form onSubmit={this.handleSubmit}>
          <rb.FormGroup>
            <rb.Row>
              <rb.Col md={12}>
                <rb.FormControl
                  type="text"
                  name="d_did"
                  size="md"
                  onChange={this.handleDDIDChange}
                  placeholder="Wpisz ID dnia"
                  required
                />
              </rb.Col>
              <rb.Col md={12}>
                <rb.FormControl
                  type="text"
                  name="exercisename"
                  size="md"
                  onChange={this.handleExerciseChange}
                  placeholder="Ćwiczenie"
                  required
                />
              </rb.Col>
              <rb.Col md={12}>
                Początek
                <rb.FormControl
                  type="time"
                  name="startat"
                  onChange={this.handleStartChange}
                  required
                />
              </rb.Col>
            </rb.Row>
          </rb.FormGroup>
          <rb.FormGroup>
            <rb.Row>
              <rb.Col md={12}>
                Koniec
                <rb.FormControl
                  type="time"
                  name="endat"
                  onChange={this.handleEndChange}
                  required
                />
              </rb.Col>
            </rb.Row>
          </rb.FormGroup>
          <rb.FormGroup>
            <rb.Row>
              <rb.Col md={12}>
                <rb.FormControl
                  type="text"
                  name="kcalperhour"
                  onChange={this.handleKcalChange}
                  placeholder="Kalorie spalane na godzinę"
                  size="9"
                  required
                />
              </rb.Col>
            </rb.Row>
            <rb.Button type="submit" variant="dark" size="lg" block>
              Zatwierdź
            </rb.Button>
          </rb.FormGroup>
        </rb.Form>
      </div>
    );
  }
}

export default ExercisesForm;

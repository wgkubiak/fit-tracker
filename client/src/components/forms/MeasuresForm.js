import React, { Component } from "react";
import * as rb from "react-bootstrap";
import "./../../App.css";
import axios from "axios";
import utils from "./../../utils/constants";

class MeasuresForm extends Component {
  state = {
    currentweight: "",
    waist: "",
    neck: "",
    bodyfat: "",
    measuredate: ""
  };

  handleCurrentWeightChange = event => {
    this.setState({ currentweight: event.target.value });
  };

  handleWaistChange = event => {
    this.setState({ waist: event.target.value });
  };

  handleNeckChange = event => {
    this.setState({ neck: event.target.value });
  };

  handleBodyFatChange = event => {
    this.setState({ bodyfat: event.target.value });
  };

  handleMeasureDateChange = event => {
    this.setState({ measuredate: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/measures", {
        p_id: utils.i,
        currentweight: this.state.currentweight,
        waist: this.state.waist,
        neck: this.state.neck,
        bodyfat: this.state.bodyfat,
        measuredate: this.state.measuredate
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    window.location.reload();
  };

  render() {
    return (
      <div className="measure-form">
        <br />
        <rb.Form onSubmit={this.handleSubmit}>
          <rb.FormGroup>
            <rb.FormControl
              type="date"
              name="measuredate"
              onChange={this.handleMeasureDateChange}
              required
            />
            <rb.FormControl
                  type="text"
                  name="currentweight"
                  size="md"
                  onChange={this.handleCurrentWeightChange}
                  placeholder="Waga"
                  required
            />
            <rb.FormControl
                  type="text"
                  name="waist"
                  size="md"
                  onChange={this.handleWaistChange}
                  placeholder="Pas"
                  required
                />
                <rb.FormControl
                  type="text"
                  name="neck"
                  size="md"
                  onChange={this.handleBodyFatChange}
                  placeholder="Procent tłuszczu"
                  required
                />
                <rb.FormControl
                  type="text"
                  name="neck"
                  size="md"
                  onChange={this.handleNeckChange}
                  placeholder="Szyja"
                  required
                />
            <rb.Button type="submit" variant="success" size="lg" block>
              Zatwierdź
            </rb.Button>
          </rb.FormGroup>
        </rb.Form>
      </div>
    );
  }
}

export default MeasuresForm;

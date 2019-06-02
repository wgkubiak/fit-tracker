import React, { Component } from "react";
import * as rb from "react-bootstrap";
import "./../../App.css";
import MealsForm from "./../forms/MealForm";
import utils from "./../../utils/constants";
import ProtegesForm from "./../forms/ProtegesForm";
import RemoveProtege from "./../btn/RemoveProtegeBtn";
import EditProtege from "./../forms/ProtegeEditForm";
import ExercisesForm from "./../forms/ExercisesForm";
import MeasureForm from "./../forms/MeasuresForm";

if (utils.i === null) {
  localStorage.setItem("app-index", 1);
}

class Proteges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showExercisesForm: false,
      showMealsForm: false,
      showEditForm: false,
      showMeasureForm: false,
      measuresResponse: [],
      userResponse: []
    };
    this.toggleDiv = this.toggleDiv.bind(this);
    this.toggleExercises = this.toggleExercises.bind(this);
    this.toggleMeals = this.toggleMeals.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleMeasure = this.toggleMeasure.bind(this);
  }

  // TODO: Try to fix bug that shows Do celu value only if u have at least 2 entries.
  getLastMeasure() {
    fetch(`http://localhost:9000/measures/last/${utils.i}`)
      .then(res => res.json())
      .then(res => this.setState({ measuresResponse: res }))
      .catch(err => err);
  }

  getUserByID() {
    fetch(`http://localhost:9000/proteges/${utils.i}`)
      .then(res => res.json())
      .then(res => this.setState({ userResponse: res }))
      .catch(err => err);
  }

  toggleDiv() {
    const { show, showExercisesForm, showMealsForm, showEditForm, showMeasureForm } = this.state;
    this.setState({ show: !show });
    this.setState({ showExercisesForm: false });
    this.setState({ showMealsForm: false });
    this.setState({ showEditForm: false });
    this.setState({ showMeasureForm: false})
  }

  toggleExercises() {
    const { show, showExercisesForm, showMealsForm, showEditForm, showMeasureForm } = this.state;
    this.setState({ show: false });
    this.setState({ showExercisesForm: !showExercisesForm });
    this.setState({ showMealsForm: false });
    this.setState({ showEditForm: false });
    this.setState({ showMeasureForm: false})
  }

  toggleMeals() {
    const { show, showExercisesForm, showMealsForm, showEditForm, showMeasureForm } = this.state;
    this.setState({ show: false });
    this.setState({ showExercisesForm: false });
    this.setState({ showMealsForm: !showMealsForm });
    this.setState({ showEditForm: false });
    this.setState({ showMeasureForm: false})
  }

  toggleEdit() {
    const { show, showExercisesForm, showMealsForm, showEditForm, showMeasureForm } = this.state;
    this.setState({ show: false });
    this.setState({ showExercisesForm: false });
    this.setState({ showMealsForm: false });
    this.setState({ showEditForm: !showEditForm });
    this.setState({ showMeasureForm: false})
  }

  toggleMeasure() {
    const { show, showExercisesForm, showMealsForm, showEditForm, showMeasureForm } = this.state;
    this.setState({ show: false });
    this.setState({ showExercisesForm: false });
    this.setState({ showMealsForm: false });
    this.setState({ showEditForm: false});
    this.setState({ showMeasureForm: !showMeasureForm})
  }

  componentDidMount() {
    this.getLastMeasure();
    this.getUserByID();
  }

  convertGender = x => {
    if (x === "Male") return "Mężczyzna";
    else if (x === "Female") return "Kobieta";
    else return "Inna";
  };

  increase() {
    let index = localStorage.getItem("app-index");
    index++;

    localStorage.setItem("app-index", index);
    utils.i = localStorage.getItem("app-index");
    console.log(`${index} ${utils.i}`);
    window.location.reload();
  }

  decrease() {
    let index = localStorage.getItem("app-index");
    index--;

    localStorage.setItem("app-index", index);
    utils.i = localStorage.getItem("app-index");
    console.log(`${index} ${utils.i}`);
    window.location.reload();
  }
  render() {
    return (
      <div className="proteges">
        <br />
        <br />
        <br />
        <div id="proteges-header-container">
          <span id="prev-protege-btn">
            <rb.Button
              variant="success"
              size="md"
              onClick={this.decrease}
              active
            >
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
            <rb.Button
              variant="success"
              size="md"
              onClick={this.increase}
              active
            >
              <strong> &raquo; </strong>
            </rb.Button>
          </span>
        </div>
        <br />
        {this.state.userResponse.map(resp => (
          <div id="protege-data">
            <rb.Card
              className="text-center"
              bg="dark"
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
        <rb.ButtonToolbar>
          <rb.Button
            className="edit-btn"
            variant="dark"
            size="md"
            onClick={this.toggleEdit}
          >
            e
          </rb.Button>
          {this.state.showEditForm && <EditProtege />}
        </rb.ButtonToolbar>
        <rb.ButtonToolbar>
          <rb.Button
            className="measure-btn"
            variant="dark"
            size="md"
            onClick={this.toggleMeasure}
          >
            m
          </rb.Button>
          {this.state.showMeasureForm && <MeasureForm />}
        </rb.ButtonToolbar>

        <rb.ButtonToolbar>
          <RemoveProtege />
        </rb.ButtonToolbar>
        <rb.ButtonToolbar>
          <rb.ButtonGroup className="mt-3">
            <rb.Button
              className="ex-btn"
              variant="success"
              size="md"
              onClick={this.toggleExercises}
            >
              Dodaj ćwiczenie
            </rb.Button>
            {this.state.showExercisesForm && <ExercisesForm />}
            <rb.Button
              className="meals-btn"
              variant="success"
              size="md"
              onClick={this.toggleMeals}
            >
              Dodaj posiłek
            </rb.Button>
            {this.state.showMealsForm && <MealsForm />}
          </rb.ButtonGroup>
        </rb.ButtonToolbar>
      </div>
    );
  }
}

export default Proteges;

import React, { Component } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import "./App.css";
import MealsForm from "./components/MealForm"
import Measures from "./components/Measures"
import utils from "./utils/constants"


if (utils.i === null) {
  localStorage.setItem("app-index", 1);
}

class App extends Component {
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
      showExercisesForm: false,
      showMealsForm: false,
      showEditForm: false,
      measuresResponse: [],
      userResponse: []
    };
    this.toggleDiv = this.toggleDiv.bind(this);
    this.toggleExercises = this.toggleExercises.bind(this);
    this.toggleMeals = this.toggleMeals.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

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
    const { show, showExercisesForm, showMealsForm, showEditForm } = this.state;
    this.setState({ show: !show });
    this.setState({ showExercisesForm: false });
    this.setState({ showMealsForm: false });
    this.setState({ showEditForm: false});
  }

  toggleExercises() {
    const { show, showExercisesForm, showMealsForm, showEditForm } = this.state;
    this.setState({ show: false });
    this.setState({ showExercisesForm: !showExercisesForm });
    this.setState({ showMealsForm: false });
    this.setState({ showEditForm: false});
  }

  toggleMeals() {
    const { show, showExercisesForm, showMealsForm, showEditForm } = this.state;
    this.setState({ show: false });
    this.setState({ showExercisesForm: false });
    this.setState({ showMealsForm: !showMealsForm });
    this.setState({ showEditForm: false});
  }

  toggleEdit() {
    const { show, showExercisesForm, showMealsForm, showEditForm } = this.state;
    this.setState({ show: false });
    this.setState({ showExercisesForm: false });
    this.setState({ showMealsForm: false });
    this.setState({ showEditForm: !showEditForm});
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
          {this.state.showEditForm && <UserEdit />}
        </rb.ButtonToolbar>
        <rb.ButtonToolbar><RemoveProtege /></rb.ButtonToolbar>
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

class Daily extends App {
  constructor(props) {
    super(props);
    this.state = {
      dailyResponse: []
    };
  }

  getDailies() {
    fetch(`http://localhost:9000/daily/${utils.i}`)
      .then(res => res.json())
      .then(res => this.setState({ dailyResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.getDailies();
  }

  resultMessage = (demand, burned, daily) => {
    let temp = demand + burned - daily;
    if (temp < -50) {
      return "Wymaga poprawy - za dużo kcal";
    } else if (temp > 50) {
      return "Wymaga poprawy - za mało kcal";
    } else return "Idealnie";
  };

  render() {
    return (
      <div className="daily">
        {this.state.dailyResponse.map(resp => (
          <div className="proteges">
            <rb.Card
              className="text-center"
              bg="dark"
              text="white"
              style={{ width: "100%" }}
            >
              <rb.Card.Header>
                Ostatni dzień pomiarowy ({resp.dailydate.slice(0, -14)})
              </rb.Card.Header>
              <rb.Card.Body>
                <p>
                  {" "}
                  Spożyte kcal: {resp.dailykcal} Spalone kcal: {resp.burnedkcal}{" "}
                </p>
                <p>
                  {" "}
                  Rezultat: {resp.kcaldemand + resp.burnedkcal - resp.dailykcal}
                  kcal{" "}
                </p>
                <p>
                  {" "}
                  {this.resultMessage(
                    resp.kcaldemand,
                    resp.burnedkcal,
                    resp.dailykcal
                  )}{" "}
                </p>
              </rb.Card.Body>
            </rb.Card>
          </div>
        ))}
        <br />
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
    // TODO: Spraw aby można było usuwać użytkowników nie pustych
    axios.delete(`http://localhost:9000/proteges/${utils.i}`).then(res => {
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

class CreateDaily extends App {
  state = {
    dailydate: ""
  };

  handleDateChange = event => {
    this.setState({ dailydate: event.target.value });
  };

  handleSubmit = event => {
    axios
      .post("http://localhost:9000/daily", {
        p_id: "1",
        dailydate: this.state.dailydate
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <div className="daily-form">
        <br />
        <rb.Form onSubmit={this.handleSubmit}>
          <rb.FormGroup>
            <rb.FormControl
              type="date"
              name="dailydate"
              onChange={this.handleDateChange}
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

class UserEdit extends App {
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
    );
  }
}
class ExercisesForm extends App {
  state = {
    exercisename: "",
    startat: "",
    endat: "",
    kcalperhour: ""
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
    axios
      .post("http://localhost:9000/exercises", {
        d_id: utils.did,
        exercisename: this.state.exercisename,
        startat: this.state.startat,
        endat: this.state.endat,
        kcalperhour: this.state.kcalperhour
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
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

import React, { Component } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import "./../../App.css"

class MealsForm extends Component {
    state = {
      d_id: "",
      mealname: "",
      kcalperdg: "",
      gramature: ""
    };
  
    handleDIDChange = event => {
      this.setState({ d_id: event.target.value })
    }
    handleMealnameChange = event => {
      this.setState({ mealname: event.target.value });
    };
    handleKcalDgChange = event => {
      this.setState({ kcalperdg: event.target.value });
    };
    handleGramatureChange = event => {
      this.setState({ gramature: event.target.value });
    };
    
  
    handleSubmit = event => {
      event.preventDefault();
      axios
        .post("http://localhost:9000/meals", {
          d_id: this.state.d_id,
          mealname: this.state.mealname,
          kcalperdg: this.state.kcalperdg,
          gramature: this.state.gramature
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
                <rb.Col md={12}>
                  <rb.FormControl
                    type="text"
                    name="d_id"
                    onChange={this.handleDIDChange}
                    placeholder="Wpisz ID dnia"
                    required
                  />
                </rb.Col>

                  <rb.FormControl
                    type="text"
                    name="mealname"
                    size="md"
                    onChange={this.handleMealnameChange}
                    placeholder="Nazwa posiłku"
                    required
                  />
                </rb.Col>
                <rb.Col md={12}>
                  <rb.FormControl
                    type="text"
                    name="kcalperdg"
                    onChange={this.handleKcalDgChange}
                    placeholder="Ilość kalorii w 100g"
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
                    name="gramature"
                    onChange={this.handleGramatureChange}
                    placeholder="Spożyto (g)"
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

  export default MealsForm
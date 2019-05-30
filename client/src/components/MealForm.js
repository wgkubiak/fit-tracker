import React, { Component } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import "./../App.css"
import utils from "./../utils/constants"

class MealsForm extends Component {
    state = {
      mealname: "",
      kcalperdg: "",
      gramature: ""
    };
  
    handleMealnameChange = event => {
      this.setState({ exercisename: event.target.value });
    };
    handleKcalDgChange = event => {
      this.setState({ startat: event.target.value });
    };
    handleGramatureChange = event => {
      this.setState({ endat: event.target.value });
    };
    
  
    handleSubmit = event => {
      axios
        .post("http://localhost:9000/meals", {
          e_id: utils.did,
          mealname: this.state.mealname,
          kcalperdg: this.state.kcalperdg,
          gramature: this.state.gramature
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
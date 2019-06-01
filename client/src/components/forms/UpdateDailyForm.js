import React, { Component } from "react";
import * as rb from "react-bootstrap";
import "./../../App.css"
import axios from "axios";
import utils from "./../../utils/constants"

class CreateDaily extends Component {
    state = {
      dailydate: ""
    };
  
    handleDateChange = event => { this.setState({ dailydate: event.target.value }); };
  
    handleSubmit = event => {
      event.preventDefault();
      axios
        .post("http://localhost:9000/daily", {
          p_id: utils.i,
          dailydate: this.state.dailydate
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
        window.location.reload();
    };
  
    render() {
      return (
        <div className="updaily-form">
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

  export default CreateDaily
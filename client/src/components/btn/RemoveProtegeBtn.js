import React, { Component } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import "./../../App.css";
import utils from "./../../utils/constants";

class RemoveProtege extends Component {
  removeProtege = event => {
    event.preventDefault();
    axios.delete(`http://localhost:9000/proteges/${utils.i}`).then(res => {
      console.log(res);
      console.log(res.data);
    });
    window.location.reload();
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
          <strong>Usuń</strong>
        </rb.Button>
      </div>
    );
  }
}

export default RemoveProtege;

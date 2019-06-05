import React, { Component } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import "./../../App.css";
import utils from "./../../utils/constants";

class RemoveProtege extends Component {
  removeProtege = event => {
    event.preventDefault();
    // TODO: Spraw aby można było usuwać użytkowników nie pustych
    // axios.delete(`http://localhost:9000/meals/${utils.i}`).then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // });
    // axios.delete(`http://localhost:9000/exercises/${utils.i}`).then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // });
    // axios.delete(`http://localhost:9000/daily/${utils.i}`).then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // });
    // axios.delete(`http://localhost:9000/measures/${utils.i}`).then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // });
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
          <strong>x</strong>
        </rb.Button>
      </div>
    );
  }
}

export default RemoveProtege;

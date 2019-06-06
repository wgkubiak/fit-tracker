import React, { Component } from "react";
import "./../../App.css";
import utils from "./../../utils/constants";
import * as rb from "react-bootstrap";

class ListP extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userResponse: []
        };
      }
    
      getProteges() {
        fetch(`http://localhost:9000/proteges`)
          .then(res => res.json())
          .then(res => this.setState({ userResponse: res }))
          .catch(err => err);
      }
    
      moveToProtege = x => {
        // event.preventDefault();
        localStorage.setItem("app-index", x);
        localStorage.setItem("switchSite", true)
        
        window.location.reload()
      }

      componentDidMount() {
        this.getProteges();
        console.log(utils.switchMainSite)
      }

  render() {
    return (
        
      <div id="proteges-container">
          <br/>  
          <br/>  
          <br/>  
                  
          {this.state.userResponse.map(resp => (
            <span>
            <p></p>
            <rb.Button
              variant="success"
              size="lg"
              id="proteges-list"
              onClick={() => this.moveToProtege(resp.idp)}
              block
            >
              <strong> {resp.firstname} {resp.secondname} </strong>
            </rb.Button>
            </span>
          ))}
    </div>
    );
  }
}

export default ListP;

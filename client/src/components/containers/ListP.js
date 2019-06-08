import React, { Component } from "react";
import "./../../App.css";
import utils from "./../../utils/constants";
import * as rb from "react-bootstrap";
import NewProtegeBtn from "./../btn/NewProtegeBtn"
import ProtegesForm from "./../forms/ProtegesForm"

class ListP extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          userResponse: [],
          dailyresponse: []
        };
        this.toggleDiv = this.toggleDiv.bind(this);
      }
    
      toggleDiv() {
        const { show } = this.state;
        this.setState({ show: !show });
      }

      getProteges() {
        fetch(`http://localhost:9000/proteges`)
          .then(res => res.json())
          .then(res => this.setState({ userResponse: res }))
          .catch(err => err);
      }

      moveToProtege = (index, firstname, secondname, gender, phone, email, height, targetweight, kcaldemand,birthdate) => {
        // event.preventDefault();
        localStorage.setItem("app-index", index);
        localStorage.setItem("switchSite", true);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("secondname", secondname);
        localStorage.setItem("gender", gender);
        localStorage.setItem("phone", phone);
        localStorage.setItem("email", email);
        localStorage.setItem("height", height);
        localStorage.setItem("targetweight", targetweight);
        localStorage.setItem("kcaldemand", kcaldemand);  
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
                  
          <table className="table">
          <thead className="thead-dark">
            <tr>
              
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col"></th>
              
            </tr>
          </thead>
          <tbody>
            {this.state.userResponse.map(resp => (
              <tr>
                
                <td>{resp.firstname}</td>
                <td>{resp.secondname}</td>
                
                <td>
                  <span>
            
            <rb.Button
              variant="success"
              size="sm"
              id="proteges-list"
              onClick={() => this.moveToProtege(
                resp.idp,
                resp.firstname,
                resp.secondname,
                resp.gender,
                resp.phone,
                resp.email,
                resp.height,
                resp.targetweight,
                resp.kcaldemand
                )}
              block
            >
              <strong> &raquo; </strong>
            </rb.Button>
            </span>
          </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <rb.ButtonToolbar>
          <rb.Button
            className="add-btn"
            variant="dark"
            size="md"
            onClick={this.toggleDiv}
            active
          >
            <strong>Dodaj</strong>
          </rb.Button>
          {this.state.show && <ProtegesForm />}
        </rb.ButtonToolbar>
        
    </div>
    );
  }
}

export default ListP;

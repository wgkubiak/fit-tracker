import React, { Component } from "react";
import * as rb from "react-bootstrap";
import "./../../App.css";

class Header extends Component {

  switchIntoListP = event => {
    localStorage.setItem("switchSite", false)
    window.location.reload()
  }

  render() {
    return (
      <div id="menu-nav">
        <rb.Navbar fixed="top" bg="dark" variant="dark" expand="lg">
          <rb.Navbar.Brand href="#home">Fit Tracker</rb.Navbar.Brand>
          <rb.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <rb.Navbar.Collapse id="basic-navbar-nav">
            <rb.Nav className="mr-auto">
              <rb.Nav.Link onClick={this.switchIntoListP}>Podopieczni</rb.Nav.Link>
            </rb.Nav>
          </rb.Navbar.Collapse>
        </rb.Navbar>
      </div>
    );
  }
}

export default Header;

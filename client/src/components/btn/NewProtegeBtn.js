import React, { Component } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import "./../../App.css";
import utils from "./../../utils/constants";
import ProtegesForm from "./../forms/ProtegesForm"

class NewProtegeBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
        };
        this.toggleDiv = this.toggleDiv.bind(this);
    }

    toggleDiv() {
        const { show } = this.state;
        this.setState({ show: !show });
    }

    return () {
        return (
            <div>
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

export default NewProtegeBtn
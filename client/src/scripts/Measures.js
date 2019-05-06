import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import '../styles/Measures.css';

class Measures extends Component {
    constructor(props) {
        super(props)
        this.state = {measuresResponse: []}
    }

    render() {
        return (
          <div className="measures">
            <h1>Pomiary</h1> 
            <ReactBootstrap.Button variant="light" size="md" block>
            Dodaj pomiar
            </ReactBootstrap.Button>
          </div>
        );
    }
}

export default Measures;
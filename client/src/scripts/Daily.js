import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import '../styles/Daily.css';

class Daily extends Component {
    constructor(props) {
        super(props)
        this.state = {measuresResponse: []}
    }

    render() {
        return (
          <div className="dailies">
            <h1>Raport dzienny</h1> 
            <ReactBootstrap.Button variant="light" size="md" block>
            Posiłek
            </ReactBootstrap.Button>
          </div>
        );
    }
}

export default Daily;
import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {apiResponse: []}
  }

  callAPI() {
    fetch("http://localhost:9000/proteges")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)   
  }

  componentDidMount() {
    this.callAPI()
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
            {this.state.apiResponse.map(resp => 
              <ReactBootstrap.ButtonToolbar key={resp.secondname}>
                <ReactBootstrap.Button variant="primary" key={resp.idp} size="md" block>
                  {resp.firstname} {resp.secondname}
                </ReactBootstrap.Button>
              </ReactBootstrap.ButtonToolbar>
            )}
        </header>
      </div>
    );
  }
}

export default App;

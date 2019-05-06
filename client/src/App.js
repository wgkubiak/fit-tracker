import React, {Component} from 'react';
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
          <ol>
            {this.state.apiResponse.map(resp => 
              <li key={resp.idp}>{resp.firstname} {resp.secondname}</li>)
            }
          </ol>
        </header>
      </div>
    );
  }
}

export default App;

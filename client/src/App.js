import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import axios from 'axios';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        { <Proteges />}
        { <Measures />}
      </div>
    );
  }
}

class Proteges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      apiResponse: [],
      protegesResponse: []
    }
    this.toggleDiv = this.toggleDiv.bind(this)
  }
  
  getAllProteges() {
    fetch("http://localhost:9000/proteges")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)   
  }

  toggleDiv() {
    const { show } = this.state
    this.setState({ show : !show})
  }

  componentDidMount() {
    this.getAllProteges()
  }

  render() {
    return(
      <div className="proteges">
      <h1>Podopieczni</h1>
        {this.state.apiResponse.map(resp => 
          <ReactBootstrap.ButtonToolbar key={ resp.secondname }>
          <ReactBootstrap.Button variant="dark" key={ resp.idp } size="md" active>
            { resp.firstname } { resp.secondname }
          </ReactBootstrap.Button>
          </ReactBootstrap.ButtonToolbar> 
        )}
          <ReactBootstrap.Button variant="light" size="md" onClick={ this.toggleDiv } active>
            <strong>+</strong>
          </ReactBootstrap.Button>
        { this.state.show && <ProtegesForm />}
        </div>
    );
  }
}

class Measures extends Proteges {
  render() {
    return (
      <div className="measures">
        <h1>Pomiary</h1> 
        <ReactBootstrap.Button variant="light" size="md" active>
          <strong>+</strong>
        </ReactBootstrap.Button>
      </div>    
    );
  }
}

class ProtegesForm extends Component {
  state = {
    firstname: '',
    secondname: '',
    phone: '',
    email: '',
    gender: '',
    height: '',
    targetweight: ''
  }
  
  handleSubmit = event => {
    event.preventDefault()

    this.setState({
      firstname: 'Jan',
      secondname: 'Brzechwa',
      phone: '514234623',
      email: 'jan@outlook.com',
      gender: 'M',
      height: '174',
      targetweight: '74'
    });

    const protege = {
      firstame: this.state.firstname,
      secondname: this.state.secondname,
      phone: this.state.phone,
      email: this.state.email,
      gender: this.state.gender,
      height: this.state.height,
      targetweight: this.state.targetweight
    }

    axios.post('http://localhost:9000/proteges', {
      firstname: 'Jan',
      secondname: 'Brzechwa',
      phone: '514234623',
      email: 'jan@outlook.com',
      gender: 'M',
      height: '174',
      targetweight: '74'})
      .then(res=> {
        console.log(res)
        console.log(res.data)
      })
  }

  render() {
    return (
      <div className="creation-form">
        <ReactBootstrap.Button variant="light" size="md" onClick={ this.handleSubmit } active>
            <strong>+</strong>
        </ReactBootstrap.Button>
      </div>
    );
  }
}

export default App;
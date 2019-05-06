import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import '../styles/Proteges.css';

class Proteges extends Component {
  constructor(props) {
    super(props)
    this.state = {apiResponse: [], show: false}
    this.toggleDiv = this.toggleDiv.bind(this)
  }

  toggleDiv() {
    const {show} = this.state
    this.setState({ show : !show})
  }

  getAllProteges() {
    fetch("http://localhost:9000/proteges")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)   
  }

  componentDidMount() {
    this.getAllProteges()
  }
  
  render() {
    return (
      <div className="proteges">
        <h1>Podopieczni</h1>
        {this.state.apiResponse.map(resp => 
          <ReactBootstrap.ButtonToolbar key={resp.secondname}>
          <ReactBootstrap.Button variant="dark" key={resp.idp} size="md" block>
            {resp.firstname} {resp.secondname}
          </ReactBootstrap.Button>
          </ReactBootstrap.ButtonToolbar> 
        )}
        <ReactBootstrap.Button variant="light" size="md" onClick={ this.toggleDiv } block>
            Dodaj podopiecznego
        </ReactBootstrap.Button>
        { this.state.show && <ProtegesForm /> }
      </div>
    );
  }
}

class ProtegesForm extends Component {
  render() {
    return (
      <div>Tutaj bedzie form</div>
    )
  }
}
export default Proteges;
